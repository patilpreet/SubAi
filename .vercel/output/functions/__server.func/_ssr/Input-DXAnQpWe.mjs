import { s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Input-DXAnQpWe.js
var import_jsx_runtime = require_jsx_runtime();
var Auth_module_default = {
	brand: "fC5rdG_brand",
	card: "fC5rdG_card",
	cardInner: "fC5rdG_cardInner",
	desc: "fC5rdG_desc",
	divider: "fC5rdG_divider",
	dot: "fC5rdG_dot",
	error: "fC5rdG_error",
	eyeBtn: "fC5rdG_eyeBtn",
	foot: "fC5rdG_foot",
	forgotRow: "fC5rdG_forgotRow",
	notice: "fC5rdG_notice",
	oauthBtn: "fC5rdG_oauthBtn",
	oauthRow: "fC5rdG_oauthRow",
	pwWrap: "fC5rdG_pwWrap",
	strength: "fC5rdG_strength",
	strengthBar: "fC5rdG_strengthBar",
	strengthFill: "fC5rdG_strengthFill",
	strengthLabel: "fC5rdG_strengthLabel",
	submit: "fC5rdG_submit",
	success: "fC5rdG_success",
	textBtn: "fC5rdG_textBtn",
	title: "fC5rdG_title",
	wrap: "fC5rdG_wrap"
};
var Button_module_default = {
	btn: "uAzpnG_btn",
	ghost: "uAzpnG_ghost",
	lg: "uAzpnG_lg",
	outline: "uAzpnG_outline",
	sm: "uAzpnG_sm",
	solid: "uAzpnG_solid"
};
function Button({ variant = "solid", size = "md", className = "", children, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: [
			Button_module_default.btn,
			Button_module_default[variant],
			size !== "md" && Button_module_default[size],
			className
		].filter(Boolean).join(" "),
		...rest,
		children
	});
}
var Input_module_default = {
	input: "DVO6GG_input",
	label: "DVO6GG_label",
	wrap: "DVO6GG_wrap"
};
function Input({ label, id, className = "", ...rest }) {
	const inputEl = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		id,
		className: `${Input_module_default.input} ${className}`,
		...rest
	});
	if (!label) return inputEl;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: Input_module_default.wrap,
		htmlFor: id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: Input_module_default.label,
			children: label
		}), inputEl]
	});
}
//#endregion
export { Button as n, Input as r, Auth_module_default as t };
