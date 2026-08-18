import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuthStore, t as sendWelcomeEmail } from "./authStore-0OVhq_th.mjs";
import { n as Button, r as Input, t as Auth_module_default } from "./Input-DXAnQpWe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BfFKo9kk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ERROR_MAP = {
	"Invalid login credentials": "Incorrect email or password. Please try again.",
	"Email not confirmed": "Please confirm your email before logging in.",
	"Invalid email": "Please enter a valid email address.",
	"User not found": "No account found with this email.",
	"Password should be at least 6 characters": "Password must be at least 6 characters.",
	"Rate limit exceeded": "Too many attempts. Please wait and try again."
};
function friendlyError(raw) {
	return ERROR_MAP[raw] || raw;
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 18 18",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M17.64 9.2a10.3 10.3 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91A8.79 8.79 0 0 0 17.64 9.2Z",
				fill: "#4285F4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 18a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26A5.43 5.43 0 0 1 9 14.57a5.44 5.44 0 0 1-5.12-3.76H.87v2.33A9 9 0 0 0 9 18Z",
				fill: "#34A853"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M3.88 10.81A5.51 5.51 0 0 1 3.59 9c0-.63.11-1.25.29-1.81V4.86H.87A9.01 9.01 0 0 0 0 9c0 1.45.35 2.82.87 4.14l3.01-2.33Z",
				fill: "#FBBC05"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.65 8.65 0 0 0 9 0 9 9 0 0 0 .87 4.86L3.88 7.2A5.44 5.44 0 0 1 9 3.58Z",
				fill: "#EA4335"
			})
		]
	});
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
function LoginPage() {
	const navigate = useNavigate();
	const { signIn, signInWithGoogle, sendPasswordReset } = useAuthStore();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [oauthLoading, setOauthLoading] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const onLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const { data, error: authError } = await signIn(email, password);
			if (authError) {
				setError(friendlyError(authError.message));
				return;
			}
			if (data?.user) {
				const name = data.user.user_metadata?.full_name || email.split("@")[0];
				sendWelcomeEmail({
					email,
					name
				}).catch((err) => console.warn("Welcome email failed:", err));
			}
			navigate({ to: "/dashboard" });
		} finally {
			setLoading(false);
		}
	};
	const onOAuth = async (provider) => {
		setOauthLoading("google");
		setError(null);
		const { error: authError } = await signInWithGoogle();
		if (authError) {
			setError(friendlyError(authError.message));
			setOauthLoading(null);
		}
	};
	const onForgot = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(null);
		try {
			const { error: authError } = await sendPasswordReset(email);
			if (authError) {
				setError(friendlyError(authError.message));
				return;
			}
			setSuccess("Password reset email sent! Check your inbox.");
		} finally {
			setLoading(false);
		}
	};
	if (mode === "forgot") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						children: "Reset your password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: Auth_module_default.desc,
						children: "Enter your email and we'll send a reset link."
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.error,
						role: "alert",
						children: error
					}),
					success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.success,
						role: "status",
						children: success
					}),
					!success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onForgot,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							label: "Email",
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "you@studio.in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: Auth_module_default.submit,
							disabled: loading,
							children: loading ? "Sending…" : "Send reset link"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.foot,
						style: { marginTop: 16 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: Auth_module_default.textBtn,
							onClick: () => {
								setMode("login");
								setError(null);
								setSuccess(null);
							},
							children: "← Back to login"
						})
					})
				]
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
						children: "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: Auth_module_default.desc,
						children: "Log in to continue captioning."
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.error,
						role: "alert",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.oauthRow,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: Auth_module_default.oauthBtn,
							onClick: () => onOAuth("google"),
							disabled: !!oauthLoading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), oauthLoading === "google" ? "Redirecting…" : "Continue with Google"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.divider,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "or" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onLogin,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								label: "Email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "you@studio.in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Auth_module_default.pwWrap,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Password",
									type: showPw ? "text" : "password",
									required: true,
									minLength: 6,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "••••••••"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: Auth_module_default.eyeBtn,
									onClick: () => setShowPw((v) => !v),
									"aria-label": showPw ? "Hide password" : "Show password",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeIcon, { open: showPw })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Auth_module_default.forgotRow,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: Auth_module_default.textBtn,
									onClick: () => {
										setMode("forgot");
										setError(null);
									},
									children: "Forgot password?"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: Auth_module_default.submit,
								disabled: loading || !!oauthLoading,
								children: loading ? "Signing in…" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Auth_module_default.foot,
						children: ["New here? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							children: "Create an account"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { LoginPage as component };
