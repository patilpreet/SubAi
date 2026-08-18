import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { n as devanagariToHinglish } from "./scriptConverter-j65-djWY.mjs";
import { n as toFile, t as Groq } from "../_libs/groq-sdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grokServer-Q8Kp4tba.js
var __fetch = globalThis.fetch;
/**
* Server-side Groq Vision analysis (llama-4-scout vision model).
* Keeps the GROQ_API_KEY on the server — the client sends a base64 image.
*/
var analyzeWithGrokServer_createServerFn_handler = createServerRpc({
	id: "8048d600a677f47bc0bbdb9e2eae9d10af0f78e46377c42d3f262ce7a800fd6e",
	name: "analyzeWithGrokServer",
	filename: "src/lib/grokServer.js"
}, (opts) => analyzeWithGrokServer.__executeServer(opts));
var analyzeWithGrokServer = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.imageBase64 !== "string") throw new Error("imageBase64 is required");
	return {
		imageBase64: payload.imageBase64,
		prompt: payload.prompt || void 0
	};
}).handler(analyzeWithGrokServer_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		console.warn("GROQ_API_KEY not set — skipping vision analysis.");
		return {
			ok: false,
			description: null,
			reason: "GROQ_API_KEY missing"
		};
	}
	const groq = new Groq({ apiKey });
	const systemPrompt = data.prompt ?? "You are a video content assistant. Describe the scene in this image in one short sentence. Focus on people, objects, and actions visible. Keep it under 20 words.";
	return {
		ok: true,
		description: (await groq.chat.completions.create({
			model: "llama-4-scout",
			messages: [{
				role: "user",
				content: [{
					type: "text",
					text: systemPrompt
				}, {
					type: "image_url",
					image_url: { url: data.imageBase64 }
				}]
			}],
			max_tokens: 120,
			temperature: .4
		})).choices?.[0]?.message?.content?.trim() ?? ""
	};
});
var WHISPER_LANG_MAP = {
	hinglish: "hi",
	hindi: "hi",
	auto: "hi",
	marathi: "mr",
	punjabi: "pa",
	gujarati: "gu",
	tamil: "ta",
	telugu: "te",
	bengali: "bn",
	kannada: "kn",
	malayalam: "ml",
	urdu: "ur",
	english: "en"
};
/**
* Server-side Groq Whisper transcription — downloads from a provided URL (e.g. signed URL)
*/
var transcribeFromStorage_createServerFn_handler = createServerRpc({
	id: "96e6da33d18257e08a7af7a3578ebf355aa590240497d7ce838ee1d6e63ff91d",
	name: "transcribeFromStorage",
	filename: "src/lib/grokServer.js"
}, (opts) => transcribeFromStorage.__executeServer(opts));
var transcribeFromStorage = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.fileUrl !== "string") throw new Error(`fileUrl is required. Input was: ${JSON.stringify(input)}`);
	return {
		fileUrl: payload.fileUrl,
		fileName: payload.fileName || "audio.mp4",
		mimeType: payload.mimeType || "video/mp4",
		language: payload.language || "hinglish"
	};
}).handler(transcribeFromStorage_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		console.warn("GROQ_API_KEY not set — skipping transcription.");
		return {
			ok: false,
			subtitles: [],
			error: "GROQ_API_KEY missing in .env"
		};
	}
	console.log(`[transcribe] Downloading file from: ${data.fileUrl.substring(0, 50)}...`);
	const response = await __fetch(data.fileUrl);
	if (!response.ok) return {
		ok: false,
		subtitles: [],
		error: `Failed to fetch file: ${response.status}`
	};
	const buffer = Buffer.from(await response.arrayBuffer());
	data.fileName;
	console.log(`[transcribe] Downloaded ${(buffer.length / 1024 / 1024).toFixed(1)} MB`);
	const groq = new Groq({ apiKey });
	let safeFileName = (data.fileName || "audio.mp4").replace(/\.(mov|quicktime|mkv|avi|wmv|ts|3gp)$/i, ".mp4");
	if (!/\.(flac|mp3|mp4|m4a|ogg|wav|webm)$/i.test(safeFileName)) safeFileName = "audio.mp4";
	const audioFile = await toFile(buffer, safeFileName, { type: "audio/mp4" });
	const isHinglish = !data.language || data.language === "hinglish" || data.language === "auto";
	const whisperLang = data.language === "hindi" ? "hi" : data.language === "english" ? "en" : data.language && WHISPER_LANG_MAP[data.language?.toLowerCase()] || void 0;
	const hinglishPrompt = isHinglish ? "This video is in Hinglish (Hindi + English mixed speech). Transcribe English words in English (e.g. model, AI, launch, outperformed, startup, options, video) and Hindi words in Roman script (e.g. unhone, ek naya, kar diya, kya, toh, hai, hain)." : void 0;
	console.log(`[transcribe] Running Whisper with language=${whisperLang}, isHinglish=${isHinglish}, file=${safeFileName}`);
	let transcription;
	try {
		transcription = await groq.audio.transcriptions.create({
			file: audioFile,
			model: "whisper-large-v3-turbo",
			temperature: 0,
			...whisperLang ? { language: whisperLang } : {},
			...hinglishPrompt ? { prompt: hinglishPrompt } : {},
			response_format: "verbose_json",
			timestamp_granularities: ["word"]
		});
	} catch (whisperErr) {
		console.error("[transcribe] Groq Whisper error:", whisperErr);
		return {
			ok: false,
			subtitles: [],
			error: whisperErr.message || "Groq Whisper transcription failed"
		};
	}
	console.log("[transcribe] Whisper raw output:", transcription.text?.slice(0, 200));
	let subtitles = [];
	const words = transcription.words || [];
	if (words.length > 0) {
		let currentLine = [];
		let lineStart = words[0]?.start ?? 0;
		let prevEnd = words[0]?.start ?? 0;
		words.forEach((wordObj, i) => {
			const wordText = wordObj.word.trim();
			if (!wordText) return;
			const isPause = wordObj.start - prevEnd > .35;
			const isLongLine = currentLine.length >= 3;
			const isMaxLine = currentLine.length >= 4;
			if (currentLine.length > 0 && (isPause || isMaxLine || isLongLine && wordObj.end - lineStart > 1.8)) {
				let lineText = currentLine.join(" ");
				if (isHinglish && /[\u0900-\u097F]/.test(lineText)) lineText = devanagariToHinglish(lineText);
				subtitles.push({
					id: `sub-${Math.random().toString(36).substring(2, 9)}`,
					start: Number(lineStart.toFixed(2)),
					end: Number(prevEnd.toFixed(2)),
					text: lineText
				});
				currentLine = [];
				lineStart = wordObj.start;
			}
			if (currentLine.length === 0) lineStart = wordObj.start;
			currentLine.push(wordText);
			prevEnd = wordObj.end;
			if (i === words.length - 1 && currentLine.length > 0) {
				let lineText = currentLine.join(" ");
				if (isHinglish && /[\u0900-\u097F]/.test(lineText)) lineText = devanagariToHinglish(lineText);
				subtitles.push({
					id: `sub-${Math.random().toString(36).substring(2, 9)}`,
					start: Number(lineStart.toFixed(2)),
					end: Number(wordObj.end.toFixed(2)),
					text: lineText
				});
			}
		});
	} else if (transcription.segments?.length > 0) transcription.segments.forEach((seg) => {
		const segWords = seg.text.trim().split(/\s+/).filter(Boolean);
		if (segWords.length <= 4) {
			let segText = seg.text.trim();
			if (isHinglish && /[\u0900-\u097F]/.test(segText)) segText = devanagariToHinglish(segText);
			subtitles.push({
				id: `sub-${Math.random().toString(36).substring(2, 9)}`,
				start: Number(seg.start.toFixed(2)),
				end: Number(seg.end.toFixed(2)),
				text: segText
			});
		} else {
			const chunkSize = 3;
			const chunkDur = (seg.end - seg.start) / Math.ceil(segWords.length / chunkSize);
			for (let c = 0; c < segWords.length; c += chunkSize) {
				let chunkText = segWords.slice(c, c + chunkSize).join(" ");
				if (isHinglish && /[\u0900-\u097F]/.test(chunkText)) chunkText = devanagariToHinglish(chunkText);
				const chunkIdx = Math.floor(c / chunkSize);
				subtitles.push({
					id: `sub-${Math.random().toString(36).substring(2, 9)}`,
					start: Number((seg.start + chunkIdx * chunkDur).toFixed(2)),
					end: Number(Math.min(seg.end, seg.start + (chunkIdx + 1) * chunkDur).toFixed(2)),
					text: chunkText
				});
			}
		}
	});
	if (isHinglish && subtitles.length > 0) try {
		const textArray = subtitles.map((s) => s.text);
		const jsonMatch = ((await groq.chat.completions.create({
			model: "openai/gpt-oss-120b",
			messages: [{
				role: "system",
				content: `You are an expert Hinglish subtitle writer for viral social media reels.
Convert each line in the array into natural, conversational Roman Hinglish (Hindi/English code-mixed speech written in the English alphabet).

CRITICAL INSTRUCTIONS:
1. If the input is in Devanagari Hindi (e.g. "लड़कियों के लिए तो ऑप्शंस हैं" or "उन्होंने एक नया मॉडल लॉन्च कर दिया"), transliterate it into Roman Hinglish: "Ladkiyon ke liye toh options hain" or "Unhone ek naya model launch kar diya".
2. If the input was translated into English by speech recognition (e.g. "They launched a new model" or "This model outperforms Mythos"), convert it into how an Indian creator actually says it in Hinglish: "Unhone ek naya model launch kiya" or "Yeh model Mythos ko outperform kar raha hai".
3. Keep tech and common English words in English (model, launch, outperform, options, startup, video, AI, bro).
4. Return ONLY a valid JSON array of strings of exact length ${textArray.length}.`
			}, {
				role: "user",
				content: JSON.stringify(textArray)
			}],
			temperature: .1,
			max_tokens: 2e3
		})).choices?.[0]?.message?.content?.trim() || "").match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			const parsed = JSON.parse(jsonMatch[0]);
			if (Array.isArray(parsed) && parsed.length === subtitles.length) subtitles = subtitles.map((s, idx) => ({
				...s,
				text: parsed[idx] || s.text
			}));
		}
	} catch (llmErr) {
		console.warn("[transcribe] Hinglish LLM refinement skipped:", llmErr.message);
	}
	return {
		ok: true,
		subtitles,
		rawText: transcription.text,
		wordCount: words.length
	};
});
var transcribeVideo_createServerFn_handler = createServerRpc({
	id: "2bafcd55d3865cdd53ba0295e2a4ff69c4668c3bb1b504ebb049a5c37bad1744",
	name: "transcribeVideo",
	filename: "src/lib/grokServer.js"
}, (opts) => transcribeVideo.__executeServer(opts));
var transcribeVideo = createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input.audioBase64 !== "string") throw new Error("audioBase64 is required");
	return {
		audioBase64: input.audioBase64,
		mimeType: input.mimeType || "audio/mp4",
		fileName: input.fileName || "audio.mp4"
	};
}).handler(transcribeVideo_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) {
		console.warn("GROQ_API_KEY not set — skipping transcription.");
		return {
			ok: false,
			subtitles: [],
			error: "GROQ_API_KEY missing in .env"
		};
	}
	const groq = new Groq({ apiKey });
	const buffer = Buffer.from(data.audioBase64, "base64");
	let safeFileName = (data.fileName || "audio.mp4").replace(/\.(mov|quicktime|mkv|avi|wmv|ts|3gp)$/i, ".mp4");
	if (!/\.(flac|mp3|mp4|m4a|ogg|wav|webm)$/i.test(safeFileName)) safeFileName = "audio.mp4";
	const audioFile = await toFile(buffer, safeFileName, { type: "audio/mp4" });
	console.log(`Sending to Groq Whisper: ${safeFileName} (${(buffer.length / 1024).toFixed(0)} KB)`);
	let transcription;
	try {
		transcription = await groq.audio.transcriptions.create({
			file: audioFile,
			model: "whisper-large-v3-turbo",
			temperature: 0,
			prompt: "This video is in Hinglish (Hindi + English mixed speech). Transcribe English words in English and Hindi words in Roman script (e.g. unhone ek naya model launch kar diya).",
			response_format: "verbose_json",
			timestamp_granularities: ["word"]
		});
	} catch (whisperErr) {
		console.error("[transcribeVideo] Groq Whisper error:", whisperErr);
		return {
			ok: false,
			subtitles: [],
			error: whisperErr.message || "Groq Whisper transcription failed"
		};
	}
	console.log("Groq Whisper transcript preview:", transcription.text?.slice(0, 150));
	let subtitles = [];
	const words = transcription.words || [];
	if (words.length > 0) {
		let currentLine = [];
		let lineStart = 0;
		words.forEach((wordObj, i) => {
			if (currentLine.length === 0) lineStart = wordObj.start;
			currentLine.push(wordObj.word.trim());
			if (currentLine.length >= 4 || i === words.length - 1) {
				let lineText = currentLine.join(" ");
				lineText = devanagariToHinglish(lineText);
				subtitles.push({
					id: Math.random().toString(36).substring(2, 9),
					start: lineStart,
					end: wordObj.end,
					text: lineText
				});
				currentLine = [];
			}
		});
	} else if (transcription.segments?.length > 0) transcription.segments.forEach((seg) => {
		let segText = devanagariToHinglish(seg.text.trim());
		subtitles.push({
			id: Math.random().toString(36).substring(2, 9),
			start: seg.start,
			end: seg.end,
			text: segText
		});
	});
	if (subtitles.length > 0) try {
		const textArray = subtitles.map((s) => s.text);
		const jsonMatch = ((await groq.chat.completions.create({
			model: "openai/gpt-oss-120b",
			messages: [{
				role: "system",
				content: `You are an expert Hinglish subtitle writer. Convert the input array of subtitle lines into conversational Roman Hinglish (Hindi/English code-mixed speech written in the English alphabet).
Rules:
- Do NOT translate Hindi into pure English. Transliterate spoken Hindi into Roman alphabet (e.g. "ladkiyon ke liye toh options hain", "mera naam preet hai", "aaj hum baat karenge").
- Keep English words in English (e.g. "options", "startup", "video", "bro", "there are").
- Maintain natural casing and punctuation.
- Return ONLY a valid JSON array of strings of exact length ${textArray.length}.`
			}, {
				role: "user",
				content: JSON.stringify(textArray)
			}],
			temperature: .1,
			max_tokens: 2e3
		})).choices?.[0]?.message?.content?.trim() || "").match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			const parsed = JSON.parse(jsonMatch[0]);
			if (Array.isArray(parsed) && parsed.length === subtitles.length) subtitles = subtitles.map((s, idx) => ({
				...s,
				text: parsed[idx] || s.text
			}));
		}
	} catch (llmErr) {
		console.warn("[transcribeVideo] Hinglish LLM refinement skipped:", llmErr.message);
	}
	return {
		ok: true,
		subtitles,
		rawText: transcription.text,
		wordCount: words.length
	};
});
var convertToHinglishServer_createServerFn_handler = createServerRpc({
	id: "767ed70a0d33bf315cbec519b4c39f18333e1f9813e140a9c543e79df987998f",
	name: "convertToHinglishServer",
	filename: "src/lib/grokServer.js"
}, (opts) => convertToHinglishServer.__executeServer(opts));
var convertToHinglishServer = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || !Array.isArray(payload.lines)) throw new Error("lines array is required");
	return { lines: payload.lines };
}).handler(convertToHinglishServer_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) return {
		ok: false,
		lines: data.lines,
		error: "GROQ_API_KEY missing"
	};
	try {
		const jsonMatch = ((await new Groq({ apiKey }).chat.completions.create({
			model: "openai/gpt-oss-120b",
			messages: [{
				role: "system",
				content: `You are an expert Hinglish subtitle writer for viral social media reels.
Convert each line in the array into natural, conversational Roman Hinglish (Hindi/English code-mixed speech written in the English alphabet).

CRITICAL INSTRUCTIONS:
1. If the input is in Devanagari Hindi (e.g. "लड़कियों के लिए तो ऑप्शंस हैं" or "उन्होंने एक नया मॉडल लॉन्च कर दिया"), transliterate it into Roman Hinglish: "Ladkiyon ke liye toh options hain" or "Unhone ek naya model launch kar diya".
2. If the input was translated into English by speech recognition (e.g. "They launched a new model" or "This model outperforms Mythos" or "There are options"), convert it into how an Indian creator actually says it in Hinglish: "Unhone ek naya model launch kiya" or "Yeh model Mythos ko outperform kar raha hai" or "Options hi options hain".
3. Keep tech and common English words in English (model, launch, outperform, options, startup, video, AI, bro).
4. Return ONLY a valid JSON array of strings of exact length ${data.lines.length}.`
			}, {
				role: "user",
				content: JSON.stringify(data.lines)
			}],
			temperature: .1,
			max_tokens: 2500
		})).choices?.[0]?.message?.content?.trim() || "").match(/\[[\s\S]*\]/);
		if (jsonMatch) {
			const parsed = JSON.parse(jsonMatch[0]);
			if (Array.isArray(parsed) && parsed.length === data.lines.length) return {
				ok: true,
				lines: parsed
			};
		}
	} catch (err) {
		console.warn("convertToHinglishServer error:", err.message);
	}
	return {
		ok: false,
		lines: data.lines.map((t) => devanagariToHinglish(t))
	};
});
//#endregion
export { analyzeWithGrokServer_createServerFn_handler, convertToHinglishServer_createServerFn_handler, transcribeFromStorage_createServerFn_handler, transcribeVideo_createServerFn_handler };
