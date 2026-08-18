import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as supabase } from "./createSsrRpc-D7Qz9ddr.mjs";
import { n as useAuthStore } from "./authStore-0OVhq_th.mjs";
import { n as Button, r as Input, t as Auth_module_default } from "./Input-DXAnQpWe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CUMpF7RZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getStrength(pw) {
	let s = 0;
	if (pw.length >= 6) s++;
	if (pw.length >= 10) s++;
	if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
	if (/\d/.test(pw)) s++;
	if (/[^a-zA-Z0-9]/.test(pw)) s++;
	return s;
}
function strengthLabel(s) {
	if (s === 0) return "";
	if (s <= 2) return "Weak";
	if (s <= 3) return "Fair";
	if (s === 4) return "Good";
	return "Strong";
}
function strengthColor(s) {
	if (s <= 2) return "#f87171";
	if (s <= 3) return "#FF9A4D";
	if (s === 4) return "#4ade80";
	return "#22c55e";
}
function EyeIcon({ open }) {
	return open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "1",
			y1: "1",
			x2: "23",
			y2: "23"
		})]
	});
}
function ResetPasswordPage() {
	const navigate = useNavigate();
	const updatePassword = useAuthStore((s) => s.updatePassword);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [invalid, setInvalid] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY") setReady(true);
		});
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) setReady(true);
		});
		const timeout = setTimeout(() => {
			setReady((r) => {
				if (!r) setInvalid(true);
				return r;
			});
		}, 5e3);
		return () => {
			subscription.unsubscribe();
			clearTimeout(timeout);
		};
	}, []);
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (password.length < 6) {
			setError("Password must be at least 6 characters.");
			return;
		}
		if (password !== confirm) {
			setError("Passwords don't match.");
			return;
		}
		setLoading(true);
		try {
			const { error: authError } = await updatePassword(password);
			if (authError) {
				setError(authError.message);
				return;
			}
			setSuccess(true);
			setTimeout(() => navigate({ to: "/dashboard" }), 2e3);
		} finally {
			setLoading(false);
		}
	};
	const strengthScore = password ? getStrength(password) : -1;
	if (!ready && !invalid) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: Auth_module_default.wrap,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: Auth_module_default.card,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: Auth_module_default.cardInner,
				style: { textAlign: "center" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { color: "var(--text-secondary)" },
					children: "Verifying reset link…"
				})
			})
		})
	});
	if (invalid) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: Auth_module_default.wrap,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: Auth_module_default.card,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: Auth_module_default.cardInner,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: Auth_module_default.brand,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/subai-logo.png",
							alt: "SubAI",
							style: {
								height: 64,
								width: "auto"
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: Auth_module_default.title,
						children: "Link expired"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: Auth_module_default.desc,
						style: { marginBottom: 24 },
						children: "This reset link is invalid or has expired. Please request a new one."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: Auth_module_default.submit,
						onClick: () => navigate({ to: "/login" }),
						children: "Back to login"
					})
				]
			})
		})
	});
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: Auth_module_default.wrap,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: Auth_module_default.card,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: Auth_module_default.cardInner,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: Auth_module_default.brand,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/subai-logo.png",
						alt: "SubAI",
						style: {
							height: 64,
							width: "auto"
						}
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: Auth_module_default.success,
					role: "status",
					style: {
						textAlign: "center",
						marginTop: 16
					},
					children: "✅ Password updated! Redirecting to dashboard…"
				})]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: Auth_module_default.wrap,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: Auth_module_default.card,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: Auth_module_default.cardInner,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: Auth_module_default.brand,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/subai-logo.png",
							alt: "SubAI",
							style: {
								height: 64,
								width: "auto"
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: Auth_module_default.title,
						children: "Set new password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: Auth_module_default.desc,
						children: "Choose a strong password for your account."
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.error,
						role: "alert",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Auth_module_default.pwWrap,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "New password",
									type: showPw ? "text" : "password",
									required: true,
									minLength: 6,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "min 6 characters"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: Auth_module_default.eyeBtn,
									onClick: () => setShowPw((v) => !v),
									"aria-label": showPw ? "Hide password" : "Show password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeIcon, { open: showPw })
								})]
							}),
							strengthScore >= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Auth_module_default.strength,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Auth_module_default.strengthBar,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: Auth_module_default.strengthFill,
										style: {
											width: `${strengthScore / 5 * 100}%`,
											background: strengthColor(strengthScore)
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: Auth_module_default.strengthLabel,
									children: strengthLabel(strengthScore)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Confirm password",
								type: showPw ? "text" : "password",
								required: true,
								minLength: 6,
								value: confirm,
								onChange: (e) => setConfirm(e.target.value),
								placeholder: "repeat password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: Auth_module_default.submit,
								disabled: loading,
								children: loading ? "Updating…" : "Update password"
							})
						]
					})
				]
			})
		})
	});
}
//#endregion
export { ResetPasswordPage as component };
