import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuthStore } from "./authStore-0OVhq_th.mjs";
import { n as Button, r as Input, t as Auth_module_default } from "./Input-DXAnQpWe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-BxH-LpKf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ERROR_MAP = {
	"Invalid login credentials": "Incorrect email or password.",
	"Email not confirmed": "Please confirm your email before logging in.",
	"Invalid email": "Please enter a valid email address.",
	"User already registered": "An account with this email already exists. Try logging in.",
	"Password should be at least 6 characters": "Password must be at least 6 characters.",
	"Rate limit exceeded": "Too many attempts. Please wait and try again."
};
function friendlyError(raw) {
	return ERROR_MAP[raw] || raw;
}
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
function SignupPage() {
	const navigate = useNavigate();
	const { signUp, signInWithGoogle } = useAuthStore();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [oauthLoading, setOauthLoading] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [confirmMsg, setConfirmMsg] = (0, import_react.useState)(null);
	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { data, error: authError } = await signUp(email, password, name);
		if (authError) {
			setError(friendlyError(authError.message));
			setLoading(false);
			return;
		}
		if (data?.user && !data.session) {
			setConfirmMsg("Check your email! We sent a confirmation link to " + email);
			setLoading(false);
			return;
		}
		navigate({ to: "/dashboard" });
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
	const strengthScore = password ? getStrength(password) : -1;
	const disabled = loading || !!confirmMsg;
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
						children: "Create your account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: Auth_module_default.desc,
						children: "Free forever — free-tier infra all the way down."
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.error,
						role: "alert",
						children: error
					}),
					confirmMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Auth_module_default.success,
						role: "status",
						children: confirmMsg
					}),
					!confirmMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Auth_module_default.oauthRow,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: Auth_module_default.oauthBtn,
								onClick: () => onOAuth("google"),
								disabled: !!oauthLoading,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), oauthLoading === "google" ? "Redirecting…" : "Sign up with Google"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Auth_module_default.divider,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "or" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Full name",
									required: true,
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Aarav Sharma",
									disabled
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									label: "Email",
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@studio.in",
									disabled
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
										placeholder: "min 6 characters",
										disabled
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: Auth_module_default.eyeBtn,
										onClick: () => setShowPw((v) => !v),
										"aria-label": showPw ? "Hide password" : "Show password",
										disabled,
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: Auth_module_default.submit,
									disabled: disabled || !!oauthLoading,
									children: loading ? "Creating…" : "Create account"
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Auth_module_default.foot,
						children: ["Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Log in"
						})]
					})
				]
			})
		})
	});
}
//#endregion
export { SignupPage as component };
