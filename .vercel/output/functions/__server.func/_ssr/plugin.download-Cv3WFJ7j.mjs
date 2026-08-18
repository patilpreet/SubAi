import { s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { t as Layout } from "./Layout-Ca1l4-uv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plugin.download-Cv3WFJ7j.js
var import_jsx_runtime = require_jsx_runtime();
var PLUGINS = [
	{
		name: "Premiere Pro",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "32",
			height: "32",
			viewBox: "0 0 24 24",
			fill: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2",
				y: "2",
				width: "20",
				height: "20",
				rx: "4",
				fill: "var(--primary)",
				fillOpacity: "0.2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "12",
				y: "16",
				textAnchor: "middle",
				fill: "var(--primary)",
				fontSize: "12",
				fontWeight: "bold",
				fontFamily: "sans-serif",
				children: "Pr"
			})]
		}),
		color: "var(--primary)",
		desc: "Caption your timeline directly inside Premiere Pro. Transcribe, style, and burn-in captions without leaving your NLE.",
		version: "1.0.0",
		size: "4.2 MB",
		os: "Win & Mac"
	},
	{
		name: "After Effects",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "32",
			height: "32",
			viewBox: "0 0 24 24",
			fill: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2",
				y: "2",
				width: "20",
				height: "20",
				rx: "4",
				fill: "var(--primary)",
				fillOpacity: "0.2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "12",
				y: "16",
				textAnchor: "middle",
				fill: "var(--primary)",
				fontSize: "12",
				fontWeight: "bold",
				fontFamily: "sans-serif",
				children: "Ae"
			})]
		}),
		color: "var(--primary)",
		desc: "Create dynamic caption templates in After Effects with SubAI-generated text layers and markers.",
		version: "1.0.0",
		size: "3.8 MB",
		os: "Win & Mac"
	},
	{
		name: "DaVinci Resolve",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "32",
			height: "32",
			viewBox: "0 0 24 24",
			fill: "none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2",
				y: "2",
				width: "20",
				height: "20",
				rx: "4",
				fill: "var(--tertiary)",
				fillOpacity: "0.2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "12",
				y: "16",
				textAnchor: "middle",
				fill: "var(--tertiary)",
				fontSize: "10",
				fontWeight: "bold",
				fontFamily: "sans-serif",
				children: "DR"
			})]
		}),
		color: "var(--tertiary)",
		desc: "Import SRT files straight into your Resolve timeline or burn captions in directly from the SubAI panel.",
		version: "1.0.0",
		size: "3.5 MB",
		os: "Win & Mac"
	}
];
var PLUGIN_FILES = {
	"Premiere Pro": "/plugins/subai-premiere-pro.zip",
	"After Effects": "/plugins/subai-after-effects.zip",
	"DaVinci Resolve": "/plugins/subai-davinci-resolve.zip"
};
var handleDownload = (pluginName) => {
	const fileUrl = PLUGIN_FILES[pluginName];
	if (fileUrl) {
		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = fileUrl.split("/").pop();
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else alert(`The ${pluginName} plugin is not available yet.`);
};
function PluginDownloadPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-36 pb-24 px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto text-center mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-[clamp(2.2rem,5vw,3.8rem)] font-black tracking-tight leading-[1.06] mb-5",
						children: ["Edit captions inside your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[var(--primary)]",
							children: "NLE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] text-[16px] max-w-2xl mx-auto leading-relaxed mb-8",
						children: "Caption your timeline without leaving your editing software. The SubAI panel transcribes your sequence, styles the captions, and burns them in or drops an SRT \\u2014 all in one click."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] text-sm mb-10",
						children: "One setup file, no manual config."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-center gap-3",
						children: PLUGINS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 py-2 rounded-full border border-[var(--border-base)] bg-white/[0.03] text-sm text-[var(--text-tertiary)]",
							children: p.name
						}, p.name))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-20",
				children: PLUGINS.map((plugin) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--border-base)] bg-[var(--bg-base)]/80 backdrop-blur-2xl p-6 flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mb-4",
							children: [plugin.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white",
								children: plugin.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--text-secondary)]",
								children: [
									"v",
									plugin.version,
									" \\u00B7 ",
									plugin.os
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-6",
							children: plugin.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-[var(--text-secondary)]",
								children: plugin.size
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDownload(plugin.name),
								className: "px-4 py-2 text-[12px] font-bold text-[var(--text-primary)] bg-[var(--primary)] hover:bg-[var(--tertiary)] rounded-full transition-all duration-150 cursor-pointer",
								children: "Download"
							})]
						})
					]
				}, plugin.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl mx-auto rounded-2xl border border-[var(--border-base)] bg-[var(--bg-base)]/80 backdrop-blur-2xl p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold text-white mb-4",
					children: "Installation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-sm text-[var(--text-secondary)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-tertiary)] font-medium mb-1",
							children: "1. Download the plugin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose your NLE and download the installer package." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-tertiary)] font-medium mb-1",
							children: "2. Run the installer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The setup file detects your installed Adobe / DaVinci applications and installs the panel automatically." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-tertiary)] font-medium mb-1",
							children: "3. Open SubAI panel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "In your NLE, go to Window > Extensions > SubAI. Log in with your account and start captioning." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-tertiary)] font-medium mb-1",
							children: "4. Transcribe & export"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select the sequence, choose your language, style the captions, and export with burn-in or SRT." })] })
					]
				})]
			})
		]
	}) });
}
//#endregion
export { PluginDownloadPage as component };
