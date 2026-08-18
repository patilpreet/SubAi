import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as Groq } from "../_libs/groq-sdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hooksServer-WuqL2pUg.js
var generateHook_createServerFn_handler = createServerRpc({
	id: "cf288efb0876832b1b0763ad95f241d1d3cb444ea93ed9287efe2cb4b7fb2110",
	name: "generateHook",
	filename: "src/lib/hooksServer.js"
}, (opts) => generateHook.__executeServer(opts));
var generateHook = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.transcript !== "string") throw new Error("transcript is required");
	return {
		transcript: payload.transcript,
		style: payload.style || "engaging"
	};
}).handler(generateHook_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.GROQ_API_KEY;
	if (!apiKey) return {
		ok: false,
		hook: null,
		error: "GROQ_API_KEY missing"
	};
	const groq = new Groq({ apiKey });
	const prompt = `You are a social media hook expert. Given the following video transcript, rewrite the opening 30 seconds (the hook) to be more engaging, curiosity-driven, and retention-focused. Keep it under 3 short sentences. Output ONLY the hook text, no labels or quotes.

Transcript excerpt:
${data.transcript.slice(0, 1e3)}

Style: ${data.style}`;
	try {
		return {
			ok: true,
			hook: (await groq.chat.completions.create({
				model: "llama-4-scout",
				messages: [{
					role: "user",
					content: prompt
				}],
				max_tokens: 120,
				temperature: .7
			})).choices?.[0]?.message?.content?.trim() ?? ""
		};
	} catch (e) {
		return {
			ok: false,
			hook: null,
			error: e.message
		};
	}
});
//#endregion
export { generateHook_createServerFn_handler };
