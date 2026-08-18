import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuthStore } from "./authStore-0OVhq_th.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-jaxct_RY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Razorpay payment integration for SubAI.
*
* Usage:
*   import { openRazorpay } from "../lib/razorpay";
*   openRazorpay({ plan: "starter", amount: 299, onSuccess: () => ... });
*/
var RAZORPAY_KEY_ID = "rzp_test_placeholder";
var PLAN_CONFIG = {
	"first-export": {
		amount: 9,
		name: "First Export",
		description: "First watermark-free HD export"
	},
	"week-pass": {
		amount: 59,
		name: "Week Pass",
		description: "7 days of Starter"
	},
	starter: {
		amount: 299,
		name: "Starter",
		description: "Starter plan - 60 min transcription"
	},
	editor: {
		amount: 499,
		name: "Editor",
		description: "Editor plan - 3 hours transcription"
	},
	pro: {
		amount: 999,
		name: "Pro",
		description: "Pro plan - 8 hours transcription"
	}
};
function getPlanConfig(planId) {
	return PLAN_CONFIG[planId] || null;
}
/**
* Open Razorpay checkout modal.
*
* @param {Object} options
* @param {string} options.plan - Plan identifier
* @param {number} options.amount - Amount in INR
* @param {string} options.email - User email
* @param {string} options.name - User name
* @param {Function} options.onSuccess - Callback on successful payment
* @param {Function} options.onError - Callback on payment error
*/
function openRazorpay({ plan, amount, email, name, onSuccess, onError }) {
	if (typeof window === "undefined" || !window.Razorpay) {
		const errMsg = "Razorpay SDK not loaded. Please add the script to your HTML.";
		console.error(errMsg);
		if (onError) onError(/* @__PURE__ */ new Error(errMsg));
		return;
	}
	const options = {
		key: RAZORPAY_KEY_ID,
		amount: amount * 100,
		currency: "INR",
		name: "SubAI",
		description: PLAN_CONFIG[plan]?.description || "SubAI Plan",
		prefill: {
			email: email || "",
			contact: "",
			name: name || ""
		},
		theme: { color: "#D97736" },
		handler: function(response) {
			if (onSuccess) onSuccess({
				razorpay_payment_id: response.razorpay_payment_id,
				razorpay_order_id: response.razorpay_order_id,
				razorpay_signature: response.razorpay_signature,
				plan
			});
		},
		modal: { ondismiss: function() {
			if (onError) onError(/* @__PURE__ */ new Error("Payment cancelled"));
		} }
	};
	try {
		new window.Razorpay(options).open();
	} catch (e) {
		console.error("Razorpay error:", e);
		if (onError) onError(e);
	}
}
/**
* Load Razorpay checkout script dynamically.
* @returns {Promise<void>}
*/
function loadRazorpayScript() {
	return new Promise((resolve, reject) => {
		if (window.Razorpay) {
			resolve();
			return;
		}
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () => reject(/* @__PURE__ */ new Error("Failed to load Razorpay SDK"));
		document.head.appendChild(script);
	});
}
var PLANS = [
	{
		id: "first-export",
		label: "₹9 First Export",
		price: "₹9",
		desc: "One-time · First watermark-free HD export"
	},
	{
		id: "week-pass",
		label: "₹59 Week Pass",
		price: "₹59",
		desc: "7 days of Starter · No auto-renew"
	},
	{
		id: "starter",
		label: "Starter · ₹299",
		price: "₹299",
		desc: "60 min transcription · 1080p · No watermark"
	},
	{
		id: "editor",
		label: "Editor · ₹499",
		price: "₹499",
		desc: "3 hrs transcription · 4K export · Most popular"
	},
	{
		id: "pro",
		label: "Pro · ₹999",
		price: "₹999",
		desc: "8 hrs transcription · 3 devices · Full plugin"
	}
];
function CheckoutPage() {
	const user = useAuthStore((s) => s.user);
	const navigate = useNavigate();
	const [selectedPlan, setSelectedPlan] = (0, import_react.useState)("editor");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) {
			navigate({ to: "/login" });
			return;
		}
		loadRazorpayScript().catch(() => {});
	}, [user, navigate]);
	const handlePayment = async () => {
		setLoading(true);
		setStatus(null);
		const config = getPlanConfig(selectedPlan);
		if (!config) {
			setStatus("Invalid plan selected");
			setLoading(false);
			return;
		}
		if (config.amount !== {
			"first-export": 9,
			"week-pass": 59,
			starter: 299,
			editor: 499,
			pro: 999
		}[selectedPlan]) {
			setStatus("Amount mismatch — payment rejected");
			setLoading(false);
			return;
		}
		try {
			await loadRazorpayScript();
		} catch (e) {
			setStatus("Failed to load payment gateway. Please try again.");
			setLoading(false);
			return;
		}
		openRazorpay({
			plan: selectedPlan,
			amount: config.amount,
			email: user?.email || "",
			name: user?.user_metadata?.full_name || "",
			onSuccess: (response) => {
				if (!response?.razorpay_payment_id) {
					setStatus("Payment verification failed: missing payment ID");
					setLoading(false);
					return;
				}
				setStatus("Payment successful! You now have access to your plan.");
				setLoading(false);
			},
			onError: (error) => {
				setStatus(error?.error?.description || error?.message || "Payment failed. Please try again.");
				setLoading(false);
			}
		});
	};
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "fixed top-0 left-0 right-0 z-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 md:px-6 pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)]/72 backdrop-blur-xl px-4 md:px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "flex items-center shrink-0 group",
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/subai-logo.png",
							alt: "SubAI",
							className: "h-20 w-auto object-contain"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: "px-4 py-2 text-[13px] font-bold text-[var(--text-primary)] bg-[var(--primary)] hover:bg-[var(--tertiary)] rounded-full transition-all duration-150",
						children: "Plans"
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pt-36 pb-24 px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-lg mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black tracking-tight mb-2",
						children: "Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] text-sm mb-8",
						children: "Choose a plan and pay via UPI, card, or netbanking."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 mb-8",
						children: PLANS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedPlan(p.id),
							className: `w-full flex items-center gap-3 p-3.5 rounded-[16px] border text-left transition-all duration-150 ${selectedPlan === p.id ? "border-[var(--primary)]/40 bg-[var(--accent-dim)]" : "border-[var(--border-base)] bg-[var(--bg-surface)]/20"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPlan === p.id ? "border-[var(--primary)]" : "border-[var(--border-strong)]"}`,
									children: selectedPlan === p.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-[var(--primary)]" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-sm text-[var(--text-primary)]",
										children: p.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-[var(--text-secondary)]",
										children: p.desc
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-base text-[var(--primary)]",
									children: p.price
								})
							]
						}, p.id))
					}),
					status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `p-2.5 rounded-xl mb-4 text-sm ${status.includes("successful") ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`,
						children: status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handlePayment,
						disabled: loading,
						className: `w-full py-3.5 rounded-full text-[15px] font-bold border-none transition-all duration-150 ${loading ? "bg-[var(--bg-surface)] text-[var(--text-secondary)] cursor-not-allowed" : "bg-[var(--primary)] text-[var(--text-primary)] hover:bg-[var(--tertiary)] cursor-pointer"}`,
						children: loading ? "Opening Razorpay…" : `Pay \u20B9${getPlanConfig(selectedPlan)?.amount || 0}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--text-secondary)] text-xs text-center mt-4",
						children: "Secure payments via Razorpay. UPI, cards, netbanking accepted."
					})
				]
			})
		})]
	});
}
//#endregion
export { CheckoutPage as component };
