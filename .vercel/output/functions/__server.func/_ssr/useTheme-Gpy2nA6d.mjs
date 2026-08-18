import { i as __toESM } from "../_runtime.mjs";
import { c as require_react } from "../_libs/@remotion/player+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useTheme-Gpy2nA6d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)(() => {
		try {
			return localStorage.getItem("subai-theme") || "light";
		} catch {
			return "light";
		}
	});
	(0, import_react.useEffect)(() => {
		document.documentElement.setAttribute("data-theme", theme);
		try {
			localStorage.setItem("subai-theme", theme);
		} catch {}
	}, [theme]);
	return {
		theme,
		toggle: (0, import_react.useCallback)(() => {
			setTheme((t) => t === "light" ? "dark" : "light");
		}, []),
		isDark: theme === "dark"
	};
}
//#endregion
export { useTheme as t };
