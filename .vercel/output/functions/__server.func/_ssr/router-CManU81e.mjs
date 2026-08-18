import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRoute, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuthStore } from "./authStore-0OVhq_th.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as Color, c as Scene, i as Clock, l as ShaderMaterial, n as BufferAttribute, o as OrthographicCamera, r as BufferGeometry, s as Points, t as WebGLRenderer, u as Vector2 } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CManU81e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D-5-hB4a.css";
var VERTEX_SHADER = `
  attribute float aSize;
  attribute float aRandom;
  uniform float uTime;
  uniform float uBreathPhase;
  uniform vec2 uMouse;
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vRandom = aRandom;
    vec3 pos = position;

    float breath = sin(uTime * 0.2 + aRandom * 6.28) * 0.15;
    pos += breath;

    pos.x += uMouse.x * 0.08 * (1.0 + aRandom * 0.5);
    pos.y += uMouse.y * 0.08 * (1.0 + aRandom * 0.5);

    float dist = length(pos.xy);
    vAlpha = smoothstep(2.5, 0.2, dist) * (0.3 + sin(uTime * 0.3 + aRandom * 10.0) * 0.15);

    vec4 mvPosition = vec4(pos, 1.0);
    gl_Position = mvPosition;
    gl_PointSize = aSize * (1.0 + breath * 0.3) * 2.0;
  }
`;
var FRAGMENT_SHADER = `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorTertiary;
  varying float vAlpha;
  varying float vRandom;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float glow = exp(-d * 4.0) * 0.8;
    float core = smoothstep(0.5, 0.0, d);

    vec3 color = mix(uColorPrimary, uColorTertiary, vRandom * 0.4 + sin(uTime * 0.15 + vRandom * 6.28) * 0.2);

    float alpha = (glow + core * 0.5) * vAlpha;
    gl_FragColor = vec4(color, alpha);
  }
`;
var GRID_SIZE = 80;
var TOTAL_PARTICLES = GRID_SIZE * GRID_SIZE;
var prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function WebGLBackground() {
	const containerRef = (0, import_react.useRef)(null);
	const mouseRef = (0, import_react.useRef)({
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0
	});
	(0, import_react.useEffect)(() => {
		if (prefersReducedMotion) return;
		const container = containerRef.current;
		if (!container) return;
		const renderer = new WebGLRenderer({
			alpha: true,
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);
		const scene = new Scene();
		const aspect = window.innerWidth / window.innerHeight;
		const frustum = 3;
		const camera = new OrthographicCamera(-3 * aspect, frustum * aspect, frustum, -3, -10, 10);
		camera.position.z = 5;
		const positions = new Float32Array(TOTAL_PARTICLES * 3);
		const sizes = new Float32Array(TOTAL_PARTICLES);
		const randoms = new Float32Array(TOTAL_PARTICLES);
		const spacing = 6 / GRID_SIZE;
		const offsetX = -6 / 2;
		const offsetY = -6 / 2;
		for (let i = 0; i < GRID_SIZE; i++) for (let j = 0; j < GRID_SIZE; j++) {
			const idx = (i * GRID_SIZE + j) * 3;
			const jitterX = (Math.random() - .5) * spacing * .3;
			const jitterY = (Math.random() - .5) * spacing * .3;
			positions[idx] = offsetX + j * spacing + jitterX;
			positions[idx + 1] = offsetY + i * spacing + jitterY;
			positions[idx + 2] = 0;
			const particleIdx = i * GRID_SIZE + j;
			sizes[particleIdx] = 1.5 + Math.random() * 2.5;
			randoms[particleIdx] = Math.random();
		}
		const geometry = new BufferGeometry();
		geometry.setAttribute("position", new BufferAttribute(positions, 3));
		geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
		geometry.setAttribute("aRandom", new BufferAttribute(randoms, 1));
		const material = new ShaderMaterial({
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER,
			uniforms: {
				uTime: { value: 0 },
				uBreathPhase: { value: 0 },
				uMouse: { value: new Vector2(0, 0) },
				uColorPrimary: { value: new Color("#D97736") },
				uColorTertiary: { value: new Color("#FF9A4D") }
			},
			transparent: true,
			depthWrite: false,
			blending: 2
		});
		const particles = new Points(geometry, material);
		scene.add(particles);
		const handleMouse = (e) => {
			mouseRef.current.targetX = (e.clientX / window.innerWidth - .5) * 2;
			mouseRef.current.targetY = -(e.clientY / window.innerHeight - .5) * 2;
		};
		const handleResize = () => {
			const a = window.innerWidth / window.innerHeight;
			camera.left = -3 * a;
			camera.right = frustum * a;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener("mousemove", handleMouse);
		window.addEventListener("resize", handleResize);
		let animId;
		const clock = new Clock();
		const animate = () => {
			animId = requestAnimationFrame(animate);
			const elapsed = clock.getElapsedTime();
			mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * .03;
			mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * .03;
			material.uniforms.uTime.value = elapsed;
			material.uniforms.uBreathPhase.value = Math.sin(elapsed * .2);
			material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
			particles.rotation.z = Math.sin(elapsed * .02) * .04;
			renderer.render(scene, camera);
		};
		animate();
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("mousemove", handleMouse);
			window.removeEventListener("resize", handleResize);
			geometry.dispose();
			material.dispose();
			renderer.dispose();
			if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
		};
	}, []);
	if (prefersReducedMotion) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		style: {
			position: "fixed",
			inset: 0,
			zIndex: 0,
			pointerEvents: "none",
			background: "radial-gradient(ellipse at center, rgba(217,119,6,0.06) 0%, transparent 70%)"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		"aria-hidden": "true",
		style: {
			position: "fixed",
			inset: 0,
			zIndex: 0,
			pointerEvents: "none",
			opacity: .6
		}
	});
}
var Route$15 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SubAI — Browser-native AI captions for Indian creators" },
			{
				name: "description",
				content: "SubAI generates frame-accurate Hindi, English and Hinglish captions for your videos, right in the browser."
			},
			{
				property: "og:title",
				content: "SubAI — AI Captions for Indian Creators"
			},
			{
				property: "og:description",
				content: "Free browser-native caption studio built on Groq Whisper. Hinglish-first, timeline editor, custom style presets."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "shortcut icon",
				href: "/favicon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFound,
	errorComponent: ({ error, reset }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: 40,
			background: "var(--bg-base)",
			color: "var(--text-primary)",
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: {
					fontSize: 24,
					fontWeight: 700
				},
				children: "Something broke"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				style: {
					color: "var(--text-secondary)",
					marginTop: 8
				},
				children: error.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: reset,
				style: {
					marginTop: 16,
					padding: "8px 20px",
					borderRadius: 9999,
					background: "var(--primary)",
					color: "#030303",
					border: "none",
					fontSize: 12,
					fontWeight: 500,
					cursor: "pointer"
				},
				children: "Retry"
			})
		]
	})
});
function RootComponent() {
	const init = useAuthStore((s) => s.init);
	(0, import_react.useEffect)(() => {
		init();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLBackground, {}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: 40,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			minHeight: "100vh",
			background: "var(--bg-base)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			style: {
				fontSize: 48,
				fontWeight: 700,
				color: "var(--text-primary)"
			},
			children: "404"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/",
			style: {
				color: "var(--primary)",
				marginTop: 8,
				fontSize: 14,
				fontWeight: 500
			},
			children: "Back home"
		})]
	});
}
var $$splitComponentImporter$14 = () => import("./signup-BxH-LpKf.mjs");
var Route$14 = createFileRoute("/signup")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./login-BfFKo9kk.mjs");
var Route$13 = createFileRoute("/login")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./dashboard-DFfSwtat.mjs");
var Route$12 = createFileRoute("/dashboard")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./routes-sUbYk8jU.mjs");
var Route$11 = createFileRoute("/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./editor._jobId-CJGRVQgL.mjs");
var Route$10 = createFileRoute("/editor/$jobId")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./pricing-A88dL_My.mjs");
var Route$9 = createFileRoute("/pricing")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./about-DJHqFI3d.mjs");
var Route$8 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./changelog-wYh0YR8n.mjs");
var Route$7 = createFileRoute("/changelog")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./privacy-DlUVBKII.mjs");
var Route$6 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./terms-B9bqBXpP.mjs");
var Route$5 = createFileRoute("/terms")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./templates-BIHDkxmI.mjs");
var Route$4 = createFileRoute("/templates")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./plugin.download-Cv3WFJ7j.mjs");
var Route$3 = createFileRoute("/plugin/download")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./checkout-jaxct_RY.mjs");
var Route$2 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-D07pHSbJ.mjs");
var Route$1 = createFileRoute("/admin")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./reset-password-CUMpF7RZ.mjs");
var Route = createFileRoute("/reset-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var SignupRoute = Route$14.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$15
});
var LoginRoute = Route$13.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$15
});
var DashboardRoute = Route$12.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var EditorJobIdRoute = Route$10.update({
	id: "/editor/$jobId",
	path: "/editor/$jobId",
	getParentRoute: () => Route$15
});
var PricingRoute = Route$9.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$15
});
var AboutRoute = Route$8.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$15
});
var ChangelogRoute = Route$7.update({
	id: "/changelog",
	path: "/changelog",
	getParentRoute: () => Route$15
});
var PrivacyRoute = Route$6.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$15
});
var TermsRoute = Route$5.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$15
});
var TemplatesRoute = Route$4.update({
	id: "/templates",
	path: "/templates",
	getParentRoute: () => Route$15
});
var PluginDownloadRoute = Route$3.update({
	id: "/plugin/download",
	path: "/plugin/download",
	getParentRoute: () => Route$15
});
var CheckoutRoute = Route$2.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$15
});
var ResetPasswordRoute = Route.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$15
});
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute,
	LoginRoute,
	SignupRoute,
	EditorJobIdRoute,
	PricingRoute,
	AboutRoute,
	ChangelogRoute,
	PrivacyRoute,
	TermsRoute,
	TemplatesRoute,
	PluginDownloadRoute,
	CheckoutRoute,
	AdminRoute: Route$1.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$15
	}),
	ResetPasswordRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 300 * 1e3,
	retry: 1
} } });
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
