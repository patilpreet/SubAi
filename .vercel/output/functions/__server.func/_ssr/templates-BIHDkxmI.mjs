import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Layout } from "./Layout-Ca1l4-uv.mjs";
import { t as PRESETS } from "./presets-BgX5hiZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-BIHDkxmI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var animationLabels = {
	pop: "Pop",
	fade: "Fade",
	slide: "Slide"
};
function TemplateCard({ t }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)] backdrop-blur-2xl p-4 hover:border-[var(--primary)] transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md",
		onClick: () => navigate({
			to: "/dashboard",
			search: { template: t.id }
		}),
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				navigate({
					to: "/dashboard",
					search: { template: t.id }
				});
			}
		},
		tabIndex: 0,
		role: "button",
		"aria-label": `Select template: ${t.name}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-24 rounded-xl mb-3 flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[#09090b] overflow-hidden relative",
				children: t.id === "forget-status" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Playfair Display', serif",
							fontStyle: "italic",
							fontSize: 16,
							color: "#ffffff"
						},
						children: "forget"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							fontWeight: 900,
							fontSize: 18,
							color: "#38bdf8",
							textTransform: "uppercase",
							letterSpacing: "0.02em"
						},
						children: "STATUS"
					})]
				}) : t.id === "focus-deeply" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							fontWeight: 900,
							fontSize: 16,
							color: "#ffffff",
							textTransform: "uppercase"
						},
						children: "focus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							fontWeight: 900,
							fontSize: 18,
							color: "#facc15",
							textTransform: "uppercase"
						},
						children: "DEEPLY"
					})]
				}) : t.id === "the-big-red" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Cinzel', serif",
							fontWeight: 900,
							fontSize: 22,
							color: "#ef4444",
							textTransform: "uppercase",
							opacity: .8
						},
						children: "SECOND"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							position: "absolute",
							fontFamily: "'Playfair Display', serif",
							fontWeight: 700,
							fontSize: 11,
							color: "#ffffff"
						},
						children: "the quick fox"
					})]
				}) : t.id === "the-little-things" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					style: {
						fontFamily: "'Caveat', cursive",
						fontSize: 18
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#ffffff" },
							children: "the"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								background: "#facc15",
								color: "#000000",
								padding: "1px 8px",
								borderRadius: 9999,
								fontWeight: 700
							},
							children: "little"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								color: "#ffffff",
								border: "1px solid #ef4444",
								borderRadius: "50%",
								padding: "0 6px"
							},
							children: "things"
						})
					]
				}) : t.id === "archives" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Caveat', cursive",
							fontStyle: "italic",
							fontSize: 18,
							color: "#ffedd5"
						},
						children: "Your Style is it"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "50",
						height: "4",
						viewBox: "0 0 50 4",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M1 2C10 4 20 0 30 2C40 4 49 2",
							stroke: "#fde047",
							strokeWidth: "1.5",
							strokeLinecap: "round"
						})
					})]
				}) : t.id === "blockbuster" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Anton', sans-serif",
							fontSize: 15,
							color: "#ef4444",
							textTransform: "uppercase",
							letterSpacing: "0.06em",
							textShadow: "0 0 14px rgba(239,68,68,0.9)"
						},
						children: "THIS IS THE NEXT"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontFamily: "'Caveat', cursive",
							fontStyle: "italic",
							fontSize: 16,
							color: "#ffffff",
							marginTop: -4
						},
						children: "big thing"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-black tracking-tight",
					style: {
						color: t.color,
						fontFamily: t.font,
						textShadow: t.shadow && t.shadow !== "none" ? t.shadow : "none",
						WebkitTextStroke: t.stroke && t.stroke !== "transparent" ? `1px ${t.stroke}` : void 0,
						fontStyle: t.italic ? "italic" : "normal",
						textTransform: t.case === "uppercase" ? "uppercase" : t.case === "lowercase" ? "lowercase" : "none"
					},
					children: t.name
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-sm text-[var(--text-primary)]",
					children: t.name
				}), t.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#f97316] text-white",
					children: t.badge
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5 mt-2",
				children: t.tags ? t.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[9px] text-[var(--text-secondary)] font-medium",
					children: tag
				}, tag)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[9px] text-[var(--text-secondary)] font-medium",
					children: t.weight
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[9px] text-[var(--text-secondary)] font-medium",
					children: animationLabels[t.animation] || t.animation
				})] })
			})
		]
	});
}
function TemplatesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [animFilter, setAnimFilter] = (0, import_react.useState)("all");
	const filtered = PRESETS.filter((t) => {
		const matchSearch = search ? t.name.toLowerCase().includes(search.toLowerCase()) : true;
		const matchAnim = animFilter === "all" || t.animation === animFilter;
		return matchSearch && matchAnim;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pt-36 pb-24 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-[clamp(2.2rem,5vw,3.4rem)] font-black tracking-tight leading-[1.06] mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "gradient-text",
							children: PRESETS.length
						}), " Caption Styles"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] max-w-lg mx-auto",
						children: "Every style reveals word-by-word, highlights the active word, and is fully tunable. Pick one and ship."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-base)] flex-1 w-full shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "w-4 h-4 text-[var(--text-secondary)] shrink-0",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							strokeWidth: "2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 21l-5.2-5.2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "10",
								cy: "10",
								r: "8"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "bg-transparent border-none outline-none text-sm text-[var(--text-primary)] w-full placeholder-[var(--text-tertiary)] font-medium",
							placeholder: "Find a style...",
							"aria-label": "Search caption styles",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5 p-1 bg-[var(--bg-surface)] border border-[var(--border-base)] rounded-full",
						children: [
							"all",
							"pop",
							"fade",
							"slide"
						].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setAnimFilter(a),
							className: `px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-150 focus-visible:outline-none ${animFilter === a ? "bg-[var(--primary)] text-white shadow-sm" : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`,
							children: a === "all" ? "All" : animationLabels[a] || a
						}, a))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",
					children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, { t }, t.id))
				}),
				filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-16 text-[var(--text-secondary)]",
					children: [
						"No styles found matching “",
						search,
						"”"
					]
				})
			]
		})
	}) });
}
//#endregion
export { TemplatesPage as component };
