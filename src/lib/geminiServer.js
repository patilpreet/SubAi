"use server";
import { createServerFn } from "@tanstack/react-start";
import { devanagariToHinglish } from "./scriptConverter";

const __fetch = globalThis.fetch;

const fetchWithTimeout = async (url, options = {}, timeoutMs = 60000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await __fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Server-side Google Gemini transcription.
 * Uses Gemini's multimodal capabilities to transcribe audio with timestamps.
 * Requires GEMINI_API_KEY in .env (from https://aistudio.google.com/apikey).
 */
export const transcribeWithGemini = createServerFn({ method: "POST" })
  .validator((input) => {
    const payload = input?.data ? input.data : input;
    if (!payload || typeof payload.fileUrl !== "string") {
      throw new Error("fileUrl is required");
    }
    return {
      fileUrl: payload.fileUrl,
      fileName: payload.fileName || "audio.mp4",
      mimeType: payload.mimeType || "video/mp4",
      language: payload.language || "hinglish",
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        subtitles: [],
        error: "GEMINI_API_KEY missing in .env — get one at https://aistudio.google.com/apikey",
      };
    }

    console.log(`[gemini-transcribe] Downloading: ${data.fileUrl.substring(0, 60)}...`);

    const response = await fetchWithTimeout(data.fileUrl, {}, 30000);
    if (!response.ok) {
      return { ok: false, subtitles: [], error: `Failed to fetch file: ${response.status}` };
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const audioMB = buffer.length / 1024 / 1024;
    console.log(`[gemini-transcribe] Downloaded ${audioMB.toFixed(1)} MB`);

    const base64Audio = buffer.toString("base64");
    if (audioMB > 50) {
      return {
        ok: false,
        subtitles: [],
        error: `Audio file too large (${audioMB.toFixed(1)} MB). Gemini max is ~50 MB.`,
      };
    }
    const langHint =
      data.language === "hinglish"
        ? "Hinglish (a mix of Hindi and English spoken in Roman script)"
        : data.language === "hindi"
          ? "Hindi (Devanagari script, transliterated to Roman)"
          : data.language === "english"
            ? "English"
            : data.language;

    const prompt = `You are an expert transcription assistant. Transcribe the following audio accurately.

Language context: ${langHint}
- If the speaker mixes Hindi and English (Hinglish), preserve the natural code-switching exactly as spoken.
- Do NOT translate. Transcribe exactly what is said.
- Use Roman/Latin script for all text (even Hindi words).

IMPORTANT: Return ONLY a valid JSON array, no markdown, no explanation. Each element must have:
- "start": start time in seconds (float, e.g. 0.5)
- "end": end time in seconds (float, e.g. 2.3)
- "text": the transcribed text for that segment (2-6 words per segment)

Group words into short natural phrases of 2-6 words each, matching the speaker's natural pauses.
Ensure timestamps are accurate and sequential with no gaps or overlaps.

Example output:
[{"start":0.0,"end":1.8,"text":"toh basically kya hai na"},{"start":1.8,"end":3.5,"text":"hum log jo hai wo"},{"start":3.5,"end":5.2,"text":"ek naya project bana rahe hain"}]`;

    const modelVersion = "gemini-2.0-flash";

    const apiResponse = await fetchWithTimeout(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelVersion}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: data.mimeType || "video/mp4",
                    data: base64Audio,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  start: { type: "number" },
                  end: { type: "number" },
                  text: { type: "string" },
                },
                required: ["start", "end", "text"],
              },
            },
          },
        }),
      },
    );

    if (!apiResponse.ok) {
      const errBody = await apiResponse.text();
      console.error("[gemini-transcribe] API error:", apiResponse.status, errBody.slice(0, 300));
      return {
        ok: false,
        subtitles: [],
        error: `Gemini API error ${apiResponse.status}: ${errBody.slice(0, 200)}`,
      };
    }

    const result = await apiResponse.json();

    const finishReason = result.candidates?.[0]?.finishReason;
    if (finishReason === "MAX_TOKENS" || finishReason === "RECITATION" || finishReason === "SAFETY") {
      console.error("[gemini-transcribe] Response truncated:", finishReason);
      return {
        ok: false,
        subtitles: [],
        error: `Gemini response truncated (${finishReason}). Try a shorter audio file.`,
      };
    }

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("[gemini-transcribe] Raw response preview:", text.slice(0, 200));

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      try {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch) throw new Error("no array found");
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        return {
          ok: false,
          subtitles: [],
          error: "Gemini response is not valid JSON. Raw preview: " + text.slice(0, 100),
        };
      }
    }

    const arr = Array.isArray(parsed) ? parsed : (parsed?.subtitles ?? parsed?.segments ?? []);
    if (!Array.isArray(arr) || arr.length === 0) {
      return { ok: false, subtitles: [], error: "Gemini returned empty transcription" };
    }

    const subtitles = arr
      .filter(
        (item) =>
          item && typeof item.start === "number" && typeof item.end === "number" && item.text,
      )
      .map((item) => {
        let segText = String(item.text).trim();
        const isHinglish = !data.language || data.language === "hinglish" || data.language === "auto";
        if (isHinglish && /[\u0900-\u097F]/.test(segText)) {
          segText = devanagariToHinglish(segText);
        }
        return {
          id: Math.random().toString(36).substring(2, 9),
          start: Math.max(0, Number(item.start)),
          end: Math.max(Number(item.start) + 0.1, Number(item.end)),
          text: segText,
        };
      })
      .sort((a, b) => a.start - b.start);

    if (subtitles.length === 0) {
      return {
        ok: false,
        subtitles: [],
        error: "Gemini response did not contain valid subtitle segments. Check the prompt.",
      };
    }

    console.log(`[gemini-transcribe] Parsed ${subtitles.length} subtitle segments`);

    return {
      ok: true,
      subtitles,
      rawText: subtitles.map((s) => s.text).join(" "),
      wordCount: subtitles.reduce((n, s) => n + s.text.split(" ").length, 0),
    };
  });
