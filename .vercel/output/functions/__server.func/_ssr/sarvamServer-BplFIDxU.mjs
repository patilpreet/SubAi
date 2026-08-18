import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { n as devanagariToHinglish } from "./scriptConverter-j65-djWY.mjs";
import { n as toFile } from "../_libs/groq-sdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sarvamServer-BplFIDxU.js
var __fetch = globalThis.fetch;
var SARVAM_LANG_MAP = {
	hindi: "hi-IN",
	bengali: "bn-IN",
	kannada: "kn-IN",
	malayalam: "ml-IN",
	marathi: "mr-IN",
	odia: "od-IN",
	punjabi: "pa-IN",
	tamil: "ta-IN",
	telugu: "te-IN",
	english: "en-IN",
	gujarati: "gu-IN",
	assamese: "as-IN",
	urdu: "ur-IN",
	nepali: "ne-IN",
	konkani: "kok-IN",
	kashmiri: "ks-IN",
	sindhi: "sd-IN",
	sanskrit: "sa-IN",
	santali: "sat-IN",
	manipuri: "mni-IN",
	bodo: "brx-IN",
	maithili: "mai-IN",
	dogri: "doi-IN",
	hinglish: "unknown"
};
/**
* Server-side SarvamAI Speech-to-Text transcription.
* Downloads from a provided URL and sends to SarvamAI API.
*/
var fetchWithTimeout = async (url, options = {}, timeoutMs = 6e4) => {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	try {
		return await __fetch(url, {
			...options,
			signal: controller.signal
		});
	} finally {
		clearTimeout(timer);
	}
};
var transcribeWithSarvam_createServerFn_handler = createServerRpc({
	id: "0516e413e92ecc8c4b7fc994fe891b423cb4074da40fe137527401987960c961",
	name: "transcribeWithSarvam",
	filename: "src/lib/sarvamServer.js"
}, (opts) => transcribeWithSarvam.__executeServer(opts));
var transcribeWithSarvam = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.fileUrl !== "string") throw new Error(`fileUrl is required. Input was: ${JSON.stringify(input)}`);
	return {
		fileUrl: payload.fileUrl,
		fileName: payload.fileName || "audio.mp4",
		mimeType: payload.mimeType || "video/mp4",
		language: payload.language || "hinglish"
	};
}).handler(transcribeWithSarvam_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.SARVAM_API_KEY;
	if (!apiKey) {
		console.warn("SARVAM_API_KEY not set — skipping Sarvam transcription.");
		return {
			ok: false,
			subtitles: [],
			error: "SARVAM_API_KEY missing in .env"
		};
	}
	console.log(`[sarvam] Downloading file from: ${data.fileUrl.substring(0, 50)}...`);
	const response = await fetchWithTimeout(data.fileUrl, {}, 3e4);
	if (!response.ok) return {
		ok: false,
		subtitles: [],
		error: `Failed to fetch file: ${response.status}`
	};
	const buffer = Buffer.from(await response.arrayBuffer());
	const fileName = data.fileName || "audio.mp4";
	console.log(`[sarvam] Downloaded ${(buffer.length / 1024 / 1024).toFixed(1)} MB`);
	const languageCode = SARVAM_LANG_MAP[data.language?.toLowerCase()] || "unknown";
	let mimeType = data.mimeType || "audio/mp4";
	if (mimeType === "video/mp4" || mimeType === "video/x-mp4") mimeType = "audio/mp4";
	if (mimeType === "video/quicktime") mimeType = "audio/mp4";
	const formData = new FormData();
	const audioFile = await toFile(buffer, fileName, { type: mimeType });
	formData.append("file", audioFile, fileName);
	formData.append("model", "saaras:v3");
	formData.append("mode", "transcribe");
	formData.append("language_code", languageCode);
	console.log(`[sarvam] Transcribing with language: ${languageCode}`);
	const sarvamRes = await fetchWithTimeout("https://api.sarvam.ai/speech-to-text", {
		method: "POST",
		headers: { "api-subscription-key": apiKey },
		body: formData
	}, 12e4);
	if (!sarvamRes.ok) {
		const errText = await sarvamRes.text();
		console.error("[sarvam] API error:", sarvamRes.status, errText);
		return {
			ok: false,
			subtitles: [],
			error: `SarvamAI sync API failed (${sarvamRes.status}): ${errText.slice(0, 300)}`
		};
	}
	const result = await sarvamRes.json();
	console.log("[sarvam] Response keys:", Object.keys(result));
	console.log("[sarvam] Transcript value:", JSON.stringify(result.transcript));
	console.log("[sarvam] Language code:", result.language_code);
	const subtitles = [];
	const rawWords = result.words || result.word_data || result.tokenized_words || [];
	const timestamps = result.timestamps || result.ts || result.timing;
	let wordEntries = [];
	if (Array.isArray(rawWords) && rawWords.length > 0) wordEntries = rawWords.map((w) => {
		const text = String(w.word ?? w.text ?? w.token ?? w.content ?? w.value ?? "").trim();
		if (!text) return null;
		return {
			word: text,
			start: Number(w.start ?? w.start_time_seconds ?? w.start_sec ?? w.from ?? 0),
			end: Number(w.end ?? w.end_time_seconds ?? w.end_sec ?? w.to ?? 0)
		};
	}).filter(Boolean);
	else if (timestamps && Array.isArray(timestamps.words)) {
		const ts = timestamps;
		for (let i = 0; i < ts.words.length; i++) {
			const text = String(ts.words[i] ?? "").trim();
			if (!text) continue;
			wordEntries.push({
				word: text,
				start: Number(ts.start_time_seconds?.[i] ?? ts.start?.[i] ?? 0),
				end: Number(ts.end_time_seconds?.[i] ?? ts.end?.[i] ?? 0)
			});
		}
	} else if (timestamps && Array.isArray(timestamps)) wordEntries = timestamps.map((t) => {
		const text = String(t.text ?? t.word ?? t.token ?? "").trim();
		if (!text) return null;
		return {
			word: text,
			start: Number(t.start ?? t.start_time_seconds ?? 0),
			end: Number(t.end ?? t.end_time_seconds ?? 0)
		};
	}).filter(Boolean);
	if (wordEntries.length > 0) {
		let currentLine = [];
		let lineStart = 0;
		for (let i = 0; i < wordEntries.length; i++) {
			const { word, start, end } = wordEntries[i];
			if (currentLine.length === 0) lineStart = start;
			currentLine.push(word);
			if (currentLine.length >= 4 || i === wordEntries.length - 1) {
				let lineText = currentLine.join(" ");
				if ((!data.language || data.language === "hinglish" || data.language === "auto") && /[\u0900-\u097F]/.test(lineText)) lineText = devanagariToHinglish(lineText);
				subtitles.push({
					id: Math.random().toString(36).substring(2, 9),
					start: lineStart,
					end,
					text: lineText
				});
				currentLine = [];
			}
		}
	}
	if (subtitles.length === 0 && result.transcript != null && result.transcript !== "") {
		let fullText = String(result.transcript).trim();
		if ((!data.language || data.language === "hinglish" || data.language === "auto") && /[\u0900-\u097F]/.test(fullText)) fullText = devanagariToHinglish(fullText);
		subtitles.push({
			id: Math.random().toString(36).substring(2, 9),
			start: 0,
			end: 5,
			text: fullText
		});
	}
	const errorMsg = subtitles.length === 0 ? `SarvamAI returned no captions. Transcript: ${JSON.stringify(result.transcript)}. Keys: ${Object.keys(result).join(", ")}` : null;
	return {
		ok: subtitles.length > 0,
		subtitles,
		rawText: result.transcript ?? "",
		language: result.language_code ?? "unknown",
		wordCount: wordEntries.length || 0,
		error: errorMsg
	};
});
//#endregion
export { transcribeWithSarvam_createServerFn_handler };
