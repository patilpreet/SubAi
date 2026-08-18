import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Layout } from "./Layout-Ca1l4-uv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-A88dL_My.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MONTHLY_PLANS = [
	{
		name: "Free",
		price: "Free",
		period: "no card needed",
		badge: null,
		popular: false,
		features: [
			"Unlimited watermarked exports",
			"2 min transcription / month",
			"All caption styles",
			"Google Fonts",
			"SRT download"
		],
		cta: "Start free",
		href: "/signup",
		highlight: false
	},
	{
		name: "Starter",
		price: 299,
		period: "/mo",
		badge: null,
		popular: false,
		features: [
			"Unlimited watermark-free exports",
			"60 min transcription / month",
			"SRT download",
			"5 custom fonts",
			"1080p HD export",
			"Premiere/AE plugin - burn-in renders"
		],
		cta: "Get Starter",
		href: "/checkout",
		highlight: false
	},
	{
		name: "Editor",
		price: 499,
		period: "/mo",
		badge: "Most popular",
		popular: true,
		features: [
			"Unlimited watermark-free exports",
			"3 hours transcription / month",
			"Up to 4K export",
			"SRT download - 10 custom fonts",
			"Premiere/AE plugin - burn-in renders"
		],
		cta: "Get Editor",
		href: "/checkout",
		highlight: true
	},
	{
		name: "Pro",
		price: 999,
		period: "/mo",
		badge: null,
		popular: false,
		features: [
			"Unlimited watermark-free exports",
			"8 hours transcription / month",
			"Up to 4K export",
			"Full Premiere/AE plugin - SRT to sequence",
			"30 custom fonts - 3 devices"
		],
		cta: "Get Pro",
		href: "/checkout",
		highlight: false
	}
];
function PricingPage() {
	const [yearly, setYearly] = (0, import_react.useState)(false);
	const computePrice = (price, period) => {
		if (period !== "/mo") return {
			display: price,
			suffix: period
		};
		if (!yearly) return {
			display: `₹${price}`,
			suffix: "/mo"
		};
		return {
			display: `₹${Math.round(price * 10 * .88)}`,
			suffix: "/yr"
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pt-36 pb-16 px-6 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[clamp(2.2rem,5vw,3.8rem)] font-black tracking-tight leading-[1.06] mb-5",
						children: "Pay per video. Or own the pipeline."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] max-w-2xl mx-auto text-[16px] leading-relaxed",
						children: "No storage plans. No dollar pricing. Your footage is processed, rendered and deleted — nothing lives on our servers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] text-sm mt-3",
						children: "Just need a video or two? Pay per video below — no subscription. Posting regularly? Pick a monthly plan. Every paid option removes the watermark."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 pb-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-6xl mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg-surface)] p-8 text-center max-w-lg mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-[11px] font-bold uppercase tracking-wider mb-4",
							children: "First export offer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-5xl font-black text-[var(--text-primary)] mb-2",
							children: "₹9"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-secondary)] text-sm mb-1",
							children: "first export"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-secondary)] text-xs mb-6",
							children: "Your first watermark-free HD export. One per user - then ₹59 for a week of unlimited clean exports - UPI - 10 seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							className: "inline-flex items-center gap-2 px-6 py-3 text-[14px] font-bold text-white bg-[var(--primary)] hover:bg-[var(--tertiary)] rounded-full transition-all duration-150",
							children: "Claim your ₹9 export"
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-6xl mx-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)] p-6 md:p-8 text-center max-w-lg mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[var(--text-secondary)] text-xs uppercase tracking-wider font-bold",
							children: "Not ready for monthly?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-4xl font-black text-[var(--text-primary)] mt-3",
							children: "₹59"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-secondary)] font-medium",
							children: "/ 7 days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[var(--text-secondary)] text-xs mt-1 mb-6",
							children: "Week Pass — 7 days of Starter. One-time UPI - no mandate - no auto-renew."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "text-left space-y-2 mb-6 max-w-xs mx-auto",
							children: [
								"Unlimited watermark-free exports",
								"12 min transcription",
								"1080p HD export",
								"All styles & fonts"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-2 text-sm text-[var(--text-secondary)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "w-4 h-4 text-[var(--primary)] mt-0.5 shrink-0",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									strokeWidth: "2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 13l4 4L19 7" })
								}), f]
							}, f))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							className: "inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-[var(--text-primary)] rounded-full border border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-150",
							children: "Get the ₹59 Week Pass"
						})
					]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 pb-28",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-6xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-4 mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-sm font-medium cursor-pointer ${!yearly ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`,
							onClick: () => setYearly(false),
							children: "Monthly"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setYearly(!yearly),
							className: `relative w-12 h-6 rounded-full transition-colors duration-150 ${yearly ? "bg-[var(--primary)]" : "bg-white/[0.15]"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-150 ${yearly ? "translate-x-6" : "translate-x-0"}` })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-sm font-medium cursor-pointer ${yearly ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`,
								onClick: () => setYearly(true),
								children: "Yearly"
							}), yearly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-[var(--primary)] font-bold",
								children: "12% off"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
					children: MONTHLY_PLANS.map((plan) => {
						const { display, suffix } = computePrice(plan.price, plan.period);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative rounded-2xl border p-6 flex flex-col ${plan.highlight ? "border-[var(--primary)]/30 bg-[var(--bg-surface)] shadow-lg shadow-[var(--primary)]/5" : "border-[var(--border-base)] bg-[var(--bg-surface)]"}`,
							children: [
								plan.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--primary)] text-[var(--text-primary)] text-[10px] font-bold uppercase tracking-wider",
									children: plan.badge
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-[var(--text-primary)] mb-1",
										children: plan.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-3xl font-black text-[var(--text-primary)]",
										children: [display, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium text-[var(--text-secondary)]",
											children: suffix
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2.5 mb-8 flex-1",
									children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2 text-sm text-[var(--text-secondary)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											className: "w-4 h-4 text-[var(--primary)] mt-0.5 shrink-0",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											strokeWidth: "2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 13l4 4L19 7" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
									}, f))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: plan.href,
									className: `w-full text-center py-2.5 rounded-full text-[13px] font-bold transition-all duration-150 ${plan.highlight ? "bg-[var(--primary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)]" : "bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-raised)] border border-[var(--border-base)]"}`,
									children: plan.cta
								})
							]
						}, plan.name);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "px-6 pb-28 border-t border-[var(--border-base)] pt-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-5xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: "Plugin Included"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl md:text-[2.8rem] font-black tracking-tight leading-[1.06] text-[var(--text-primary)]",
								children: "Premiere Pro, After Effects & DaVinci Resolve plugin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[var(--text-secondary)] mt-3 text-sm",
								children: "watermark-free on Starter, Editor & Pro"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-[var(--border-base)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "text-left py-3 pr-4 text-[var(--text-secondary)] font-medium" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-center py-3 px-4 text-[var(--text-secondary)] font-medium",
										children: "Free"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-center py-3 px-4 text-[var(--text-secondary)] font-medium",
										children: "Starter"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-center py-3 px-4 text-[var(--primary)] font-medium",
										children: "Editor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "text-center py-3 px-4 text-[var(--text-secondary)] font-medium",
										children: "Pro"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
								[
									"Watermark-free burn-in renders",
									"Watermarked",
									"✓",
									"✓",
									"✓"
								],
								[
									"Free renders to try (clips ≤60s)",
									"2",
									"—",
									"—",
									"—"
								],
								[
									"Shared transcription",
									"2 min",
									"60 min",
									"3 hours",
									"8 hours"
								],
								[
									"Active devices",
									"—",
									"1",
									"2",
									"3"
								],
								[
									"SRT export to sequence",
									"—",
									"—",
									"—",
									"✓"
								]
							].map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-b border-[rgba(255,255,255,0.04)]",
								children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: `py-3 ${j === 0 ? "text-left text-[var(--text-secondary)] pr-4" : "text-center px-4 " + (j === 3 ? "text-[var(--primary)]" : "text-[var(--text-secondary)]")}`,
									children: cell
								}, j))
							}, i)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] text-xs text-center mt-6",
						children: "Client footage processed, burned, deleted — nothing stored"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/plugin/download",
							className: "inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-[var(--text-primary)] rounded-full border border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-150",
							children: "Download the plugin"
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { PricingPage as component };
