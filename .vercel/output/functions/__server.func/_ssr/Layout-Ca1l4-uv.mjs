import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { t as useTheme } from "./useTheme-Gpy2nA6d.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-Ca1l4-uv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_LINKS = [
	{
		to: "/templates",
		label: "Templates"
	},
	{
		to: "/plugin/download",
		label: "Plugin"
	},
	{
		to: "/changelog",
		label: "Changelog"
	},
	{
		to: "/about",
		label: "About"
	}
];
function Layout({ children, hideNav, hideFooter }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const { isDark, toggle: toggleTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen font-sans selection:bg-[var(--primary)]/15 flex flex-col",
		children: [
			!hideNav && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "fixed top-0 left-0 right-0 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-4xl px-4 pt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)]/70 backdrop-blur-xl px-5 py-2.5 shadow-sm transition-all duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: "flex items-center gap-2 shrink-0",
								to: "/",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/favicon.png",
									alt: "SubAI",
									className: "h-8 w-auto object-contain"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hidden md:flex items-center gap-1",
								children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: link.to,
									className: "px-4 py-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--primary)]/8 transition-all font-medium",
									children: link.label
								}, link.to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: toggleTheme,
										className: "w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary)]/8 transition-all",
										title: isDark ? "Switch to light mode" : "Switch to dark mode",
										"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
										children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "12",
												cy: "12",
												r: "4"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "15",
											height: "15",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/dashboard",
										className: "hidden md:inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-[var(--primary)] hover:bg-[var(--tertiary)] rounded-full transition-all shadow-sm shadow-[var(--primary)]/20",
										children: "Dashboard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setMobileOpen(!mobileOpen),
										className: "md:hidden p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary)]/8 transition-all",
										"aria-label": mobileOpen ? "Close menu" : "Open menu",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											xmlns: "http://www.w3.org/2000/svg",
											width: "24",
											height: "24",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											className: "w-4 h-4",
											children: mobileOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 5h16" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 12h16" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 19h16" })
											] })
										})
									})
								]
							})
						]
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `fixed inset-0 z-40 transition-all duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-[var(--text-primary)]/10 backdrop-blur-sm",
					onClick: () => setMobileOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `bg-[var(--bg-surface)] border-b border-[var(--border-base)] pt-20 pb-6 px-6 transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-col gap-1 max-w-7xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "px-4 py-2.5 text-[13px] font-bold text-white bg-[var(--primary)] hover:bg-[var(--tertiary)] rounded-full text-center mb-2",
							onClick: () => setMobileOpen(false),
							children: "Dashboard"
						}), NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: "px-4 py-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--primary)]/8 transition-all font-medium",
							onClick: () => setMobileOpen(false),
							children: link.label
						}, link.to))]
					})
				})]
			})] }),
			children,
			!hideFooter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-[var(--border-base)] bg-[var(--bg-surface)] pt-16 pb-8 mt-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 mb-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-1 md:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "flex items-center gap-2 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/favicon.png",
									alt: "SubAI",
									className: "h-8 w-auto object-contain"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed",
								children: "The free, browser-native AI caption studio built for Indian creators."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[var(--text-primary)] mb-4 text-sm tracking-wide",
							children: "Product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3 text-sm text-[var(--text-secondary)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/templates",
									className: "hover:text-[var(--primary)] transition-colors duration-200",
									children: "Templates"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/changelog",
									className: "hover:text-[var(--primary)] transition-colors duration-200",
									children: "Changelog"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/templates",
									className: "hover:text-[var(--primary)] transition-colors duration-200",
									children: "Templates"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/plugin/download",
									className: "hover:text-[var(--primary)] transition-colors duration-200",
									children: "Plugin"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[var(--text-primary)] mb-4 text-sm tracking-wide",
							children: "Company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3 text-sm text-[var(--text-secondary)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "hover:text-[var(--primary)] transition-colors duration-200",
									children: "About"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "hover:text-[var(--primary)] transition-colors duration-200",
									children: "Login"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "hover:text-[var(--primary)] transition-colors duration-200",
									children: "Sign Up"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[var(--text-primary)] mb-4 text-sm tracking-wide",
							children: "Legal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3 text-sm text-[var(--text-secondary)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-[var(--primary)] transition-colors duration-200",
								children: "Privacy Policy"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-[var(--primary)] transition-colors duration-200",
								children: "Terms of Service"
							}) })]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto px-6 pt-8 border-t border-[var(--border-base)] flex flex-col md:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-tertiary)] text-xs",
						children: "© 2026 Preet Patil. All rights reserved."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-[var(--text-tertiary)] text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Powered by Groq & Whisper" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-[var(--border-base)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "v1.0.0" })
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Layout as t };
