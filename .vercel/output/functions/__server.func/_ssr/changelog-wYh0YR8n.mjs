import { s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { t as Layout } from "./Layout-Ca1l4-uv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/changelog-wYh0YR8n.js
var import_jsx_runtime = require_jsx_runtime();
var CHANGES = [
	{
		version: "1.2.0",
		date: "August 2026",
		items: [
			"Multi-Track NLE Timeline with 60FPS magnetic playhead tracking",
			"Editorial Duo kinetic typography (stacked italic serif + glowing bold uppercase)",
			"Pause-aware speech segmentation with Whisper-large-v3 timestamping",
			"AI Hook Generator — rewrite opening hooks with Groq LLM",
			"Real-time audio waveform visualizer and drag-to-trim subtitle capsules",
			"NLE plugin support page for Premiere Pro, After Effects, and DaVinci Resolve",
			"Templates gallery with live animated typography previews"
		]
	},
	{
		version: "1.1.0",
		date: "June 15, 2026",
		items: [
			"Word-level timeline editing — drag and retime individual words",
			"Remotion-based live preview with video background",
			"SRT and WebM video export",
			"Undo/Redo history stack",
			"AI Cleanup for Hinglish normalization"
		]
	},
	{
		version: "1.0.0",
		date: "May 20, 2026",
		items: [
			"Initial release",
			"Groq Whisper transcription with word-level timestamps",
			"Groq Vision AI scene analysis",
			"6 caption style presets (Beast, Karaoke, Minimal, Hype, Clean, Glitch)",
			"Supabase auth with email/password",
			"Dashboard with drag-and-drop video upload",
			"Hinglish, Hindi, English support"
		]
	}
];
function ChangelogPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-36 pb-24 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[clamp(2.2rem,5vw,3.2rem)] font-black tracking-tight leading-[1.06] mb-3",
					children: "Changelog"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[var(--text-secondary)] mb-12",
					children: "Every update to SubAI, in one place."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-10",
					children: CHANGES.map((release) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-l-2 border-[var(--primary)]/30 pl-6 relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 top-0 -translate-x-[5px] w-2 h-2 rounded-full bg-[var(--primary)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-bold text-white",
									children: ["v", release.version]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--text-secondary)]",
									children: release.date
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: release.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-sm text-[var(--text-tertiary)] flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-3.5 h-3.5 text-[var(--primary)] mt-0.5 shrink-0",
										fill: "none",
										viewBox: "0 0 24 24",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 13l4 4L19 7" })
									}), item]
								}, i))
							})
						]
					}, release.version))
				})
			]
		})
	}) });
}
//#endregion
export { ChangelogPage as component };
