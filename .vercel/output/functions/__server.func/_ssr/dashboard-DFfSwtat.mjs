import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { t as useTheme } from "./useTheme-Gpy2nA6d.mjs";
import { _ as useNavigate, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D7Qz9ddr.mjs";
import { n as useAuthStore } from "./authStore-0OVhq_th.mjs";
import { a as getVideoUrl, c as uploadVideo, i as fetchJobs, n as createJob, r as deleteJob, s as saveSubtitles, t as completeJob } from "./jobsService-CypgwO7n.mjs";
import { A as Moon, B as House, C as Puzzle, H as Film, J as CircleCheckBig, L as LoaderCircle, P as LogOut, R as LayoutTemplate, _ as Shield, f as Trash2, i as X, j as Menu, l as Upload, p as Sun, q as Clock, r as Zap, v as Settings, w as Plus, y as Search, z as Languages } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DFfSwtat.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dashboard_module_default = {
	dropzone: "_2-ZnLq_dropzone",
	dropzoneBtn: "_2-ZnLq_dropzoneBtn",
	dropzoneHover: "_2-ZnLq_dropzoneHover",
	dropzoneIcon: "_2-ZnLq_dropzoneIcon",
	dropzoneMeta: "_2-ZnLq_dropzoneMeta",
	dropzoneSub: "_2-ZnLq_dropzoneSub",
	dropzoneTitle: "_2-ZnLq_dropzoneTitle",
	generateBtn: "_2-ZnLq_generateBtn",
	greeting: "_2-ZnLq_greeting",
	greetingSub: "_2-ZnLq_greetingSub",
	langFieldLabel: "_2-ZnLq_langFieldLabel",
	langGrid: "_2-ZnLq_langGrid",
	langSelect: "_2-ZnLq_langSelect",
	langSelectHint: "_2-ZnLq_langSelectHint",
	langSettings: "_2-ZnLq_langSettings",
	langSettingsHead: "_2-ZnLq_langSettingsHead",
	langSettingsIcon: "_2-ZnLq_langSettingsIcon",
	langSettingsSub: "_2-ZnLq_langSettingsSub",
	langSettingsTitle: "_2-ZnLq_langSettingsTitle",
	logoutBtn: "_2-ZnLq_logoutBtn",
	main: "_2-ZnLq_main",
	mobileMenuBtn: "_2-ZnLq_mobileMenuBtn",
	modal: "_2-ZnLq_modal",
	modalClose: "_2-ZnLq_modalClose",
	modalOverlay: "_2-ZnLq_modalOverlay",
	modalSub: "_2-ZnLq_modalSub",
	modalTitle: "_2-ZnLq_modalTitle",
	modalVideoPreview: "_2-ZnLq_modalVideoPreview",
	navGroup: "_2-ZnLq_navGroup",
	navIcon: "_2-ZnLq_navIcon",
	navItem: "_2-ZnLq_navItem",
	navItemActive: "_2-ZnLq_navItemActive",
	navSep: "_2-ZnLq_navSep",
	newProjectBtn: "_2-ZnLq_newProjectBtn",
	projectCard: "_2-ZnLq_projectCard",
	projectInfo: "_2-ZnLq_projectInfo",
	projectMeta: "_2-ZnLq_projectMeta",
	projectsEmpty: "_2-ZnLq_projectsEmpty",
	projectsEmptyIcon: "_2-ZnLq_projectsEmptyIcon",
	projectsGrid: "_2-ZnLq_projectsGrid",
	projectThumb: "_2-ZnLq_projectThumb",
	projectTitle: "_2-ZnLq_projectTitle",
	readyBadge: "_2-ZnLq_readyBadge",
	sectionLabel: "_2-ZnLq_sectionLabel",
	shell: "_2-ZnLq_shell",
	sidebar: "_2-ZnLq_sidebar",
	sidebarBrand: "_2-ZnLq_sidebarBrand",
	sidebarLogo: "_2-ZnLq_sidebarLogo",
	sidebarOpen: "_2-ZnLq_sidebarOpen",
	sidebarOverlay: "_2-ZnLq_sidebarOverlay",
	statusBadge: "_2-ZnLq_statusBadge",
	statusCompleted: "_2-ZnLq_statusCompleted",
	statusProcessing: "_2-ZnLq_statusProcessing",
	themeToggle: "_2-ZnLq_themeToggle",
	topBar: "_2-ZnLq_topBar",
	topBarLeft: "_2-ZnLq_topBarLeft",
	topBarRight: "_2-ZnLq_topBarRight",
	upgradeBtn: "_2-ZnLq_upgradeBtn",
	upgradeNowBtn: "_2-ZnLq_upgradeNowBtn",
	usageBadge: "_2-ZnLq_usageBadge",
	usageLabel: "_2-ZnLq_usageLabel",
	usageMeter: "_2-ZnLq_usageMeter",
	usagePlan: "_2-ZnLq_usagePlan",
	usageReset: "_2-ZnLq_usageReset",
	usageRow: "_2-ZnLq_usageRow",
	usageTop: "_2-ZnLq_usageTop",
	usageVal: "_2-ZnLq_usageVal",
	userAvatar: "_2-ZnLq_userAvatar",
	userCard: "_2-ZnLq_userCard",
	userEmail: "_2-ZnLq_userEmail",
	userInfo: "_2-ZnLq_userInfo",
	userName: "_2-ZnLq_userName",
	workspaceAvatar: "_2-ZnLq_workspaceAvatar",
	workspaceTag: "_2-ZnLq_workspaceTag"
};
/**
* Extract a frame from a <video> element as a base64 data URL.
*
* @param {HTMLVideoElement} video
* @param {number} [timeSeconds=0]  Seek position
* @returns {Promise<string>}       data:image/jpeg;base64,…
*/
function extractVideoFrame(video, timeSeconds = 0) {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		const onSeeked = () => {
			canvas.width = video.videoWidth || 640;
			canvas.height = video.videoHeight || 360;
			canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
			resolve(canvas.toDataURL("image/jpeg", .8));
			video.removeEventListener("seeked", onSeeked);
		};
		video.addEventListener("seeked", onSeeked);
		video.currentTime = timeSeconds;
		setTimeout(() => reject(/* @__PURE__ */ new Error("Frame extraction timed out")), 5e3);
	});
}
/**
* Server-side Groq Vision analysis (llama-4-scout vision model).
* Keeps the GROQ_API_KEY on the server — the client sends a base64 image.
*/
var analyzeWithGrokServer = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.imageBase64 !== "string") throw new Error("imageBase64 is required");
	return {
		imageBase64: payload.imageBase64,
		prompt: payload.prompt || void 0
	};
}).handler(createSsrRpc("8048d600a677f47bc0bbdb9e2eae9d10af0f78e46377c42d3f262ce7a800fd6e"));
/**
* Server-side Groq Whisper transcription — downloads from a provided URL (e.g. signed URL)
*/
var transcribeFromStorage = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.fileUrl !== "string") throw new Error(`fileUrl is required. Input was: ${JSON.stringify(input)}`);
	return {
		fileUrl: payload.fileUrl,
		fileName: payload.fileName || "audio.mp4",
		mimeType: payload.mimeType || "video/mp4",
		language: payload.language || "hinglish"
	};
}).handler(createSsrRpc("96e6da33d18257e08a7af7a3578ebf355aa590240497d7ce838ee1d6e63ff91d"));
createServerFn({ method: "POST" }).validator((input) => {
	if (!input || typeof input.audioBase64 !== "string") throw new Error("audioBase64 is required");
	return {
		audioBase64: input.audioBase64,
		mimeType: input.mimeType || "audio/mp4",
		fileName: input.fileName || "audio.mp4"
	};
}).handler(createSsrRpc("2bafcd55d3865cdd53ba0295e2a4ff69c4668c3bb1b504ebb049a5c37bad1744"));
createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || !Array.isArray(payload.lines)) throw new Error("lines array is required");
	return { lines: payload.lines };
}).handler(createSsrRpc("767ed70a0d33bf315cbec519b4c39f18333e1f9813e140a9c543e79df987998f"));
/**
* Server-side SarvamAI Speech-to-Text transcription.
* Downloads from a provided URL and sends to SarvamAI API.
*/
var transcribeWithSarvam = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.fileUrl !== "string") throw new Error(`fileUrl is required. Input was: ${JSON.stringify(input)}`);
	return {
		fileUrl: payload.fileUrl,
		fileName: payload.fileName || "audio.mp4",
		mimeType: payload.mimeType || "video/mp4",
		language: payload.language || "hinglish"
	};
}).handler(createSsrRpc("0516e413e92ecc8c4b7fc994fe891b423cb4074da40fe137527401987960c961"));
/**
* Server-side Google Gemini transcription.
* Uses Gemini's multimodal capabilities to transcribe audio with timestamps.
* Requires GEMINI_API_KEY in .env (from https://aistudio.google.com/apikey).
*/
var transcribeWithGemini = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.fileUrl !== "string") throw new Error("fileUrl is required");
	return {
		fileUrl: payload.fileUrl,
		fileName: payload.fileName || "audio.mp4",
		mimeType: payload.mimeType || "video/mp4",
		language: payload.language || "hinglish"
	};
}).handler(createSsrRpc("27286d7af3dc1deaa6a99a358bf8caea07d13e225c418c545a163a0e2aef4ef7"));
var NAV_ITEMS = [
	{
		icon: House,
		label: "Home",
		href: "/dashboard"
	},
	{
		icon: Search,
		label: "Search"
	},
	{
		icon: Settings,
		label: "Settings"
	}
];
var NAV_ITEMS2 = [{
	icon: LayoutTemplate,
	label: "Templates",
	href: "/templates"
}, {
	icon: Puzzle,
	label: "Editor plugin",
	href: "/plugin/download"
}];
function DashboardPage() {
	const user = useAuthStore((s) => s.user);
	const loading = useAuthStore((s) => s.loading);
	const navigate = useNavigate();
	const location = useLocation();
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const [jobsLoading, setJobsLoading] = (0, import_react.useState)(true);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [modalFile, setModalFile] = (0, import_react.useState)(null);
	const [modalVideoUrl, setModalVideoUrl] = (0, import_react.useState)(null);
	const [language, setLanguage] = (0, import_react.useState)("auto");
	const [writingSystem, setWritingSystem] = (0, import_react.useState)("roman");
	const [transcribing, setTranscribing] = (0, import_react.useState)(false);
	const [provider, setProvider] = (0, import_react.useState)("groq");
	const fileInputRef = (0, import_react.useRef)(null);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const { isDark, toggle: toggleTheme } = useTheme();
	const push = (0, import_react.useCallback)((msg) => {
		toast(msg, { duration: 4e3 });
	}, []);
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({ to: "/login" });
	}, [
		user,
		loading,
		navigate
	]);
	const loadJobs = (0, import_react.useCallback)(async () => {
		setJobsLoading(true);
		try {
			const data = await fetchJobs();
			setJobs(data || []);
		} catch {
			setJobs([]);
		} finally {
			setJobsLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (user) loadJobs();
	}, [user, loadJobs]);
	const handleFileSelect = (files) => {
		if (!files || !files.length) return;
		const file = files[0];
		setModalFile(file);
		setModalVideoUrl(URL.createObjectURL(file));
	};
	const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;
	const handleGenerate = async () => {
		if (!modalFile) return;
		if (modalFile.size > MAX_FILE_SIZE) {
			push(`File too large: ${(modalFile.size / (1024 * 1024 * 1024)).toFixed(1)}GB. Maximum is 2GB.`);
			return;
		}
		setTranscribing(true);
		setUploading(true);
		const file = modalFile;
		push(`Uploading ${file.name}...`);
		try {
			const storageKey = await uploadVideo(file);
			let aiDescription = null;
			try {
				push("Analyzing with Grok Vision AI...");
				const videoEl = document.createElement("video");
				videoEl.src = URL.createObjectURL(file);
				videoEl.muted = true;
				videoEl.preload = "auto";
				await new Promise((r) => {
					videoEl.onloadeddata = r;
					setTimeout(r, 3e3);
				});
				const result = await analyzeWithGrokServer({ data: { imageBase64: await extractVideoFrame(videoEl, 1) } });
				if (result.ok && result.description) {
					aiDescription = result.description;
					push(`AI description generated: "${aiDescription}"`);
				}
				URL.revokeObjectURL(videoEl.src);
			} catch (e) {
				console.warn("Grok Vision skipped:", e.message);
			}
			let fileUrl = null;
			let extractedSubtitles = [];
			let transRes;
			try {
				fileUrl = await getVideoUrl(storageKey);
				if (provider === "sarvam") {
					push("Transcribing with SarvamAI...");
					transRes = await transcribeWithSarvam({ data: {
						fileUrl,
						fileName: file.name,
						mimeType: file.type || "video/mp4",
						language: language === "auto" ? "hinglish" : language
					} });
					if (!transRes?.ok || !transRes?.subtitles?.length) {
						push("Sarvam limit/issue: auto-switching to Groq Whisper...");
						transRes = await transcribeFromStorage({ data: {
							fileUrl,
							fileName: file.name,
							mimeType: file.type || "video/mp4",
							language: language === "auto" ? "hinglish" : language
						} });
					}
				} else if (provider === "gemini") {
					push("Transcribing with Google Gemini...");
					transRes = await transcribeWithGemini({ data: {
						fileUrl,
						fileName: file.name,
						mimeType: file.type || "video/mp4",
						language: language === "auto" ? "hinglish" : language
					} });
					if (!transRes?.ok || !transRes?.subtitles?.length) {
						push("Gemini issue: auto-switching to Groq Whisper...");
						transRes = await transcribeFromStorage({ data: {
							fileUrl,
							fileName: file.name,
							mimeType: file.type || "video/mp4",
							language: language === "auto" ? "hinglish" : language
						} });
					}
				} else {
					push("Transcribing with Groq Whisper...");
					transRes = await transcribeFromStorage({ data: {
						fileUrl,
						fileName: file.name,
						mimeType: file.type || "video/mp4",
						language: language === "auto" ? "hinglish" : language
					} });
				}
				if (transRes.ok && transRes.subtitles.length > 0) {
					extractedSubtitles = transRes.subtitles;
					push(`${extractedSubtitles.length} segments transcribed`);
				} else if (transRes.error) push("Transcription issue: " + transRes.error);
			} catch (e) {
				console.error("Transcription error:", e);
				push("Transcription failed: " + e.message);
			}
			if (extractedSubtitles.length === 0) {
				const detail = transRes?.error ? ` ${transRes.error}` : "";
				throw new Error(`Transcription returned no captions.${detail}`);
			}
			const job = await createJob({
				title: file.name.replace(/\.[^.]+$/, ""),
				language,
				writingSystem,
				storageKey,
				aiDescription
			});
			if (fileUrl) {
				localStorage.setItem(`video_url_${job.id}`, fileUrl);
				sessionStorage.setItem(`video_url_${job.id}`, fileUrl);
			}
			localStorage.setItem(`subtitles_${job.id}`, JSON.stringify(extractedSubtitles));
			saveSubtitles(job.id, extractedSubtitles).catch(console.warn);
			setJobs((prev) => [{
				...job,
				thumbColor: job.thumb_color,
				createdAt: "Just now",
				duration: "—"
			}, ...prev]);
			await completeJob(job.id);
			setJobs((prev) => prev.map((j) => j.id === job.id ? {
				...j,
				status: "completed"
			} : j));
			push("Transcription complete.");
			navigate({
				to: "/editor/$jobId",
				params: { jobId: job.id }
			});
			setModalFile(null);
			setModalVideoUrl(null);
		} catch (err) {
			push(`Upload failed: ${err.message}`);
		} finally {
			setTranscribing(false);
			setUploading(false);
		}
	};
	const closeModal = (0, import_react.useCallback)(() => {
		if (modalVideoUrl) URL.revokeObjectURL(modalVideoUrl);
		setModalFile(null);
		setModalVideoUrl(null);
	}, [modalVideoUrl]);
	const handleDelete = async (e, jobId) => {
		e.preventDefault();
		e.stopPropagation();
		if (!confirm("Are you sure you want to delete this project?")) return;
		try {
			await deleteJob(jobId);
			if (typeof window !== "undefined") {
				localStorage.removeItem(`subtitles_${jobId}`);
				localStorage.removeItem(`subtitles_${jobId}_original`);
			}
			setJobs((prev) => prev.filter((j) => j.id !== jobId));
			push("Project deleted.");
		} catch (err) {
			push(`Failed to delete: ${err.message}`);
		}
	};
	const userInitial = user?.email?.[0]?.toUpperCase() || "U";
	const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
	const currentPath = location.pathname;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: Dashboard_module_default.shell,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				margin: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				size: 24,
				className: "animate-spin",
				style: { color: "var(--primary)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					color: "var(--text-secondary)",
					fontSize: 13,
					fontWeight: 500
				},
				children: "Loading your dashboard..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: Dashboard_module_default.shell,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .main-scroll::-webkit-scrollbar { width: 6px; }
        .main-scroll::-webkit-scrollbar-track { background: transparent; }
        .main-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 3px; }
        .main-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.12); }
        .project-card-enter { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .delete-project-btn { opacity: 1 !important; color: #ef4444 !important; }
        @media (min-width: 769px) {
          .delete-project-btn { opacity: 0; }
          .project-card:hover .delete-project-btn { opacity: 1; }
        }
      ` }),
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: Dashboard_module_default.sidebarOverlay,
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `${Dashboard_module_default.sidebar} ${sidebarOpen ? Dashboard_module_default.sidebarOpen : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Dashboard_module_default.sidebarBrand,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Dashboard_module_default.sidebarLogo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/subai-logo.png",
								alt: "SubAI",
								style: {
									height: 32,
									width: "auto",
									objectFit: "contain"
								}
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Dashboard_module_default.workspaceTag,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Dashboard_module_default.workspaceAvatar,
							children: userInitial
						}), "My Workspace"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: Dashboard_module_default.navGroup,
						children: [
							NAV_ITEMS.map((item) => {
								const Icon = item.icon;
								const isActive = item.href && currentPath === item.href;
								if (item.href) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.href,
									className: `${Dashboard_module_default.navItem} ${isActive ? Dashboard_module_default.navItemActive : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										size: 14,
										className: Dashboard_module_default.navIcon
									}), item.label]
								}, item.label);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: Dashboard_module_default.navItem,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										size: 14,
										className: Dashboard_module_default.navIcon
									}), item.label]
								}, item.label);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: Dashboard_module_default.navSep }),
							NAV_ITEMS2.map((item) => {
								const Icon = item.icon;
								const isActive = currentPath === item.href;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.href,
									className: `${Dashboard_module_default.navItem} ${isActive ? Dashboard_module_default.navItemActive : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										size: 14,
										className: Dashboard_module_default.navIcon
									}), item.label]
								}, item.label);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: Dashboard_module_default.navSep }),
							user?.email === "patilpreetviia@gmail.com" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/admin",
								className: Dashboard_module_default.navItem,
								style: {
									color: "var(--primary)",
									fontWeight: 600
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
									size: 14,
									className: Dashboard_module_default.navIcon,
									style: { color: "var(--primary)" }
								}), "Admin Panel"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Dashboard_module_default.usageMeter,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.usageTop,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: Dashboard_module_default.usagePlan,
									children: "STUDIO PRO"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: Dashboard_module_default.usageBadge,
									style: {
										background: "rgba(16,185,129,0.15)",
										color: "#10b981",
										border: "1px solid rgba(16,185,129,0.3)"
									},
									children: "ACTIVE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.usageRow,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: Dashboard_module_default.usageLabel,
									children: "AI Transcription"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: Dashboard_module_default.usageVal,
									style: { color: "var(--primary)" },
									children: "Unlimited"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									height: 4,
									background: "rgba(255,255,255,0.08)",
									borderRadius: 4,
									marginBottom: 8,
									overflow: "hidden"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: "100%",
									height: "100%",
									background: "linear-gradient(90deg, var(--primary), #10b981)",
									borderRadius: 4
								} })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Dashboard_module_default.usageReset,
								children: "All features unlocked"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Dashboard_module_default.userCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Dashboard_module_default.userAvatar,
								children: userInitial
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.userInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Dashboard_module_default.userName,
									children: userName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Dashboard_module_default.userEmail,
									children: user?.email || "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: Dashboard_module_default.logoutBtn,
								onClick: () => navigate({ to: "/login" }),
								title: "Sign out",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 13 })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: `${Dashboard_module_default.main} main-scroll`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Dashboard_module_default.topBar,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Dashboard_module_default.topBarLeft,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: Dashboard_module_default.mobileMenuBtn,
								onClick: () => setSidebarOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: Dashboard_module_default.greeting,
								children: ["Good to see you, ", userName]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: Dashboard_module_default.greetingSub,
								children: "Create, manage and export your captioned videos"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Dashboard_module_default.topBarRight,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: toggleTheme,
								className: Dashboard_module_default.themeToggle,
								title: isDark ? "Light mode" : "Dark mode",
								children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { size: 14 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: Dashboard_module_default.newProjectBtn,
								onClick: () => fileInputRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hide-mobile",
									children: "New Project"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Dashboard_module_default.sectionLabel,
						children: "Upload a Video"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						accept: "video/*",
						style: { display: "none" },
						onChange: (e) => handleFileSelect(e.target.files)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${Dashboard_module_default.dropzone} ${dragging ? Dashboard_module_default.dropzoneHover : ""}`,
						onDragOver: (e) => {
							e.preventDefault();
							setDragging(true);
						},
						onDragLeave: () => setDragging(false),
						onDrop: (e) => {
							e.preventDefault();
							setDragging(false);
							handleFileSelect(e.dataTransfer.files);
						},
						onClick: () => !uploading && fileInputRef.current?.click(),
						style: {
							position: "relative",
							overflow: "hidden"
						},
						children: [
							uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									position: "absolute",
									inset: 0,
									background: "rgba(255,255,255,0.85)",
									backdropFilter: "blur(4px)",
									zIndex: 10,
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: 10
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										size: 28,
										className: "animate-spin",
										style: { color: "var(--primary)" }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											fontSize: 13,
											color: "var(--primary)",
											fontWeight: 700
										},
										children: "Processing your video..."
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Dashboard_module_default.dropzoneIcon,
								style: {
									position: "relative",
									zIndex: 0,
									opacity: uploading ? .3 : 1
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 20 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: Dashboard_module_default.dropzoneTitle,
								style: {
									position: "relative",
									zIndex: 0,
									opacity: uploading ? .3 : 1
								},
								children: dragging ? "Release to upload" : "Drop your video here"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: Dashboard_module_default.dropzoneSub,
								style: {
									position: "relative",
									zIndex: 0,
									opacity: uploading ? .3 : 1
								},
								children: "or click to browse. Any format up to 2GB. 4K included."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									gap: 6,
									justifyContent: "center",
									marginTop: 10,
									position: "relative",
									zIndex: 0,
									opacity: uploading ? .3 : 1
								},
								children: [
									"MP4",
									"MOV",
									"AVI",
									"WebM"
								].map((fmt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										color: "var(--text-secondary)",
										background: "rgba(0,0,0,0.03)",
										padding: "3px 10px",
										borderRadius: 20,
										fontWeight: 600,
										letterSpacing: "0.04em",
										border: "1px solid var(--border-subtle)"
									},
									children: fmt
								}, fmt))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.dropzoneMeta,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 11 }), "Transcription in 30s"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: Dashboard_module_default.dropzoneBtn,
								onClick: (e) => {
									e.stopPropagation();
									fileInputRef.current?.click();
								},
								disabled: uploading,
								style: {
									position: "relative",
									zIndex: 0
								},
								children: "Choose file"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Dashboard_module_default.sectionLabel,
						children: "Recent Projects"
					}),
					jobsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Dashboard_module_default.projectsGrid,
						children: [
							1,
							2,
							3,
							4
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Dashboard_module_default.projectCard,
							style: { pointerEvents: "none" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Dashboard_module_default.projectThumb,
								style: {
									height: "150px",
									background: "rgba(0,0,0,0.02)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									size: 20,
									className: "animate-spin",
									style: { color: "var(--text-tertiary)" }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.projectInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									height: 14,
									width: "60%",
									background: "rgba(0,0,0,0.03)",
									borderRadius: 4,
									marginBottom: 8
								} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									height: 10,
									width: "40%",
									background: "rgba(0,0,0,0.03)",
									borderRadius: 4
								} })]
							})]
						}, n))
					}) : jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Dashboard_module_default.projectsEmpty,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Dashboard_module_default.projectsEmptyIcon,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { size: 20 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: 700,
									marginBottom: 4,
									fontSize: 14,
									color: "var(--text-secondary)"
								},
								children: "No projects yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 12,
									color: "var(--text-tertiary)",
									fontWeight: 500
								},
								children: "Upload a video to get started"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: Dashboard_module_default.projectsGrid,
						children: jobs.map((job, idx) => {
							const thumbHeight = idx % 3 === 0 ? "170px" : idx % 3 === 1 ? "130px" : "210px";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `${Dashboard_module_default.projectCard} project-card-enter`,
								style: { animationDelay: `${idx * 40}ms` },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/editor/$jobId",
									params: { jobId: job.id },
									style: {
										display: "block",
										textDecoration: "none",
										color: "inherit"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Dashboard_module_default.projectThumb,
										style: {
											height: thumbHeight,
											background: `linear-gradient(135deg, ${job.thumbColor || job.thumb_color || "#D97736"}12, var(--bg-overlay))`
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-3 left-3 bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-base)] rounded-full px-2.5 py-0.5 text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider",
											children: "Hinglish • 9:16"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-9 h-9 rounded-full bg-[var(--bg-surface)]/90 shadow flex items-center justify-center text-[var(--primary)] hover:scale-105 transition-transform",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "12",
												height: "12",
												viewBox: "0 0 24 24",
												fill: "currentColor",
												className: "ml-0.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "5 3 19 12 5 21 5 3" })
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Dashboard_module_default.projectInfo,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: Dashboard_module_default.projectTitle,
											children: job.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: Dashboard_module_default.projectMeta,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 8
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-xs capitalize text-[var(--text-secondary)]",
													children: job.language === "auto" ? "Hinglish" : job.language
												}), job.duration && job.duration !== "—" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { color: "var(--border-strong)" },
														children: "·"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
														size: 10,
														style: { opacity: .8 }
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-medium",
														children: job.duration
													})
												] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `${Dashboard_module_default.statusBadge} ${job.status === "completed" ? Dashboard_module_default.statusCompleted : Dashboard_module_default.statusProcessing}`,
												children: job.status === "completed" ? "Ready" : "In Progress"
											})]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `${Dashboard_module_default.deleteProjectBtn} delete-project-btn`,
									onClick: (e) => handleDelete(e, job.id),
									title: "Delete project",
									style: {
										position: "absolute",
										top: 10,
										right: 10,
										background: "rgba(255,255,255,0.9)",
										border: "1px solid var(--border-subtle)",
										borderRadius: 9999,
										width: 26,
										height: 26,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										cursor: "pointer",
										color: "var(--text-secondary)",
										transition: "all var(--transition-fast)",
										zIndex: 2
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
								})]
							}, job.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 40 } })
				]
			}),
			modalFile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: Dashboard_module_default.modalOverlay,
				onClick: () => {
					setModalFile(null);
					setModalVideoUrl(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: Dashboard_module_default.modal,
					onClick: (e) => e.stopPropagation(),
					style: { position: "relative" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: Dashboard_module_default.modalClose,
							onClick: closeModal,
							style: {
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: 28,
								height: 28,
								borderRadius: 9999,
								background: "rgba(0,0,0,0.03)",
								border: "1px solid var(--border-base)",
								color: "var(--text-secondary)",
								cursor: "pointer",
								transition: "all var(--transition-fast)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: Dashboard_module_default.modalTitle,
							children: "Prepare Your Media"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: Dashboard_module_default.modalSub,
							children: "Select a language to transcribe your media."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Dashboard_module_default.modalVideoPreview,
							children: modalVideoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								src: modalVideoUrl,
								controls: true,
								muted: true,
								style: {
									width: "100%",
									height: "100%",
									objectFit: "contain"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Dashboard_module_default.readyBadge,
							children: transcribing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								size: 13,
								className: "animate-spin mr-1.5"
							}), "Transcribing with model..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
								size: 13,
								className: "mr-1.5"
							}), "Ready for transcription"] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Dashboard_module_default.langSettings,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.langSettingsHead,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Dashboard_module_default.langSettingsIcon,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: Dashboard_module_default.langSettingsTitle,
									children: "Language Settings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: Dashboard_module_default.langSettingsSub,
									children: "Configure the source language and writing system"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.langGrid,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Dashboard_module_default.langField,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Dashboard_module_default.langFieldLabel,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "10",
											height: "10",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 18V5l12-2v13" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "6",
													cy: "18",
													r: "3"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "18",
													cy: "16",
													r: "3"
												})
											]
										}), "What language is spoken?"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: Dashboard_module_default.langSelect,
										value: language,
										onChange: (e) => setLanguage(e.target.value),
										disabled: transcribing,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "auto",
												children: "Auto-detect"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "hinglish",
												children: "Hinglish"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "hindi",
												children: "Hindi"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "english",
												children: "English"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "tamil",
												children: "Tamil"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "bengali",
												children: "Bengali"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "marathi",
												children: "Marathi"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "telugu",
												children: "Telugu"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "punjabi",
												children: "Punjabi"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "gujarati",
												children: "Gujarati"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "kannada",
												children: "Kannada"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Dashboard_module_default.langField,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: Dashboard_module_default.langFieldLabel,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "10",
												height: "10",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "14 2 14 8 20 8" })]
											}), "Writing system used?"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: Dashboard_module_default.langSelect,
											value: writingSystem,
											onChange: (e) => setWritingSystem(e.target.value),
											disabled: transcribing,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "roman",
													children: "Romanised (Latin)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "devanagari",
													children: "Devanagari"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "english",
													children: "English"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "native",
													children: "Native Script"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: Dashboard_module_default.langSelectHint,
											children: "Transliterated into Latin characters"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Dashboard_module_default.langSettings,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Dashboard_module_default.langSettingsHead,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Dashboard_module_default.langSettingsIcon,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: Dashboard_module_default.langSettingsTitle,
									children: "Transcription Provider"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: Dashboard_module_default.langSettingsSub,
									children: "Choose between Groq (Whisper), SarvamAI, or Google Gemini"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Dashboard_module_default.langGrid,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Dashboard_module_default.langField,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: Dashboard_module_default.langSelect,
										value: provider,
										onChange: (e) => setProvider(e.target.value),
										disabled: transcribing,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "groq",
												children: "⚡ Groq (Whisper) — Recommended (Any length, Roman Hinglish)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "sarvam",
												children: "🇮🇳 SarvamAI — Indian languages (Max 30s clips)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "gemini",
												children: "✨ Google Gemini — Multimodal AI"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: Dashboard_module_default.langSelectHint,
										children: provider === "groq" ? "Fastest transcription with automatic Roman Hinglish transliteration & no duration limit" : provider === "sarvam" ? "Specialized Indian language model (Note: Synchronous API limited to 30s max)" : "Multilingual transcription model"
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: Dashboard_module_default.generateBtn,
							onClick: handleGenerate,
							disabled: transcribing || uploading,
							style: {
								opacity: transcribing || uploading ? .6 : 1,
								cursor: transcribing || uploading ? "not-allowed" : "pointer"
							},
							children: transcribing || uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								size: 14,
								className: "animate-spin"
							}), "Generating captions..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Generate Transcription", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: "14",
								height: "14",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "5",
									y1: "12",
									x2: "19",
									y2: "12"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "12 5 19 12 12 19" })]
							})] })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "bottom-right",
				toastOptions: { style: {
					background: "var(--bg-surface)",
					border: "1px solid var(--border-base)",
					borderRadius: 20,
					padding: "12px 20px",
					fontSize: 13,
					color: "var(--text-primary)",
					boxShadow: "var(--shadow-elevated)",
					fontFamily: "var(--font-sans)"
				} }
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
