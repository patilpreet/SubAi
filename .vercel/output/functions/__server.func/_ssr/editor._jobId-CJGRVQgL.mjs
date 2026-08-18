import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { _ as useNavigate, g as Link, v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as supabase, t as createSsrRpc } from "./createSsrRpc-D7Qz9ddr.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as getVideoUrl, o as loadSubtitles } from "./jobsService-CypgwO7n.mjs";
import { D as PanelRight, E as Pause, F as Lock, G as EyeOff, I as LockOpen, K as Download, L as LoaderCircle, M as Maximize2, N as Magnet, O as PanelLeft, S as Redo2, T as Play, U as FileText, V as Flame, W as Eye, X as BookmarkPlus, Y as Check, Z as ArrowLeft, a as WandSparkles, b as RotateCw, c as Video, d as Type, f as Trash2, g as SkipBack, h as SkipForward, i as X, k as Palette, m as Sparkles, n as ZoomIn, o as VolumeX, r as Zap, s as Volume2, t as ZoomOut, u as Undo2, w as Plus, x as RotateCcw, y as Search, z as Languages } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as devanagariToHinglish, t as convertSubtitles } from "./scriptConverter-j65-djWY.mjs";
import { n as MOCK_SUBTITLES, t as CaptionPlayer } from "./mockData-BLDPZTBy.mjs";
import { t as PRESETS } from "./presets-BgX5hiZr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/editor._jobId-CJGRVQgL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Editor_module_default = {
	aspectBtn: "uHyc-W_aspectBtn",
	aspectBtnActive: "uHyc-W_aspectBtnActive",
	aspectBtns: "uHyc-W_aspectBtns",
	backBtn: "uHyc-W_backBtn",
	body: "uHyc-W_body",
	brand: "uHyc-W_brand",
	brandDot: "uHyc-W_brandDot",
	canvas: "uHyc-W_canvas",
	captionInput: "uHyc-W_captionInput",
	captionList: "uHyc-W_captionList",
	captionRow: "uHyc-W_captionRow",
	captionRowHeader: "uHyc-W_captionRowHeader",
	captionRowNum: "uHyc-W_captionRowNum",
	captionTimes: "uHyc-W_captionTimes",
	captionWordChip: "uHyc-W_captionWordChip",
	captionWords: "uHyc-W_captionWords",
	centerPanel: "uHyc-W_centerPanel",
	dynamicLabel: "uHyc-W_dynamicLabel",
	editorialBadge: "uHyc-W_editorialBadge",
	exportBtn: "uHyc-W_exportBtn",
	hotBadge: "uHyc-W_hotBadge",
	iconBtn: "uHyc-W_iconBtn",
	leftPanel: "uHyc-W_leftPanel",
	lineBtn: "uHyc-W_lineBtn",
	lineBtnActive: "uHyc-W_lineBtnActive",
	lineToggle: "uHyc-W_lineToggle",
	newBadge: "uHyc-W_newBadge",
	panelHeader: "uHyc-W_panelHeader",
	panelTab: "uHyc-W_panelTab",
	panelTabActive: "uHyc-W_panelTabActive",
	panelTabs: "uHyc-W_panelTabs",
	panelTitle: "uHyc-W_panelTitle",
	previewTopBar: "uHyc-W_previewTopBar",
	projectNameEdit: "uHyc-W_projectNameEdit",
	rightPanel: "uHyc-W_rightPanel",
	savePresetBtn: "uHyc-W_savePresetBtn",
	scriptToggleBtn: "uHyc-W_scriptToggleBtn",
	scriptToggleBtnActive: "uHyc-W_scriptToggleBtnActive",
	scriptToggleGroup: "uHyc-W_scriptToggleGroup",
	searchIcon: "uHyc-W_searchIcon",
	searchInput: "uHyc-W_searchInput",
	searchRow: "uHyc-W_searchRow",
	shell: "uHyc-W_shell",
	srtBtn: "uHyc-W_srtBtn",
	subTab: "uHyc-W_subTab",
	subTabActive: "uHyc-W_subTabActive",
	subTabRow: "uHyc-W_subTabRow",
	templateCard: "uHyc-W_templateCard",
	templateCardActive: "uHyc-W_templateCardActive",
	templateCardName: "uHyc-W_templateCardName",
	templateCards: "uHyc-W_templateCards",
	templatePreview: "uHyc-W_templatePreview",
	templatesBody: "uHyc-W_templatesBody",
	timeline: "uHyc-W_timeline",
	topbar: "uHyc-W_topbar",
	topCenter: "uHyc-W_topCenter",
	topLeft: "uHyc-W_topLeft",
	topRight: "uHyc-W_topRight",
	zoomBtn: "uHyc-W_zoomBtn",
	zoomControls: "uHyc-W_zoomControls"
};
var clone = (arr) => arr.map((s) => ({ ...s }));
var useEditorStore = create((set, get) => ({
	subtitles: [],
	past: [],
	future: [],
	zoom: 1,
	load: (subtitles) => set({
		subtitles: clone(subtitles),
		past: [],
		future: []
	}),
	updateText: (id, text) => {
		const { subtitles, past } = get();
		set({
			subtitles: subtitles.map((s) => s.id === id ? {
				...s,
				text
			} : s),
			past: [...past, subtitles],
			future: []
		});
	},
	runCleanup: () => {
		const { subtitles, past } = get();
		set({
			subtitles: subtitles.map((s) => {
				let cleaned = s.text;
				if (/[\u0900-\u097F]/.test(cleaned)) cleaned = devanagariToHinglish(cleaned);
				cleaned = cleaned.replace(/\s+/g, " ").replace(/\bu\b/gi, "you").replace(/\br\b/gi, "are").replace(/^\s*[,.!?]+/, "").trim().replace(/^./, (c) => c.toUpperCase());
				return {
					...s,
					text: cleaned
				};
			}),
			past: [...past, subtitles],
			future: []
		});
	},
	updateSegmentTime: (id, field, value) => {
		const { subtitles, past } = get();
		set({
			subtitles: subtitles.map((s) => s.id === id ? {
				...s,
				[field]: value
			} : s),
			past: [...past, subtitles],
			future: []
		});
	},
	updateSegment: (id, start, end) => {
		const { subtitles, past } = get();
		set({
			subtitles: subtitles.map((s) => s.id === id ? {
				...s,
				start,
				end
			} : s),
			past: [...past, subtitles],
			future: []
		});
	},
	splitSegment: (id, splitTime) => {
		const { subtitles, past } = get();
		const idx = subtitles.findIndex((s) => s.id === id);
		if (idx === -1) return;
		const seg = subtitles[idx];
		if (splitTime <= seg.start || splitTime >= seg.end) return;
		const words = seg.text.split(" ");
		const durationRatio = (splitTime - seg.start) / (seg.end - seg.start);
		const splitWordIdx = Math.max(1, Math.min(words.length - 1, Math.round(words.length * durationRatio)));
		const leftText = words.slice(0, splitWordIdx).join(" ");
		const rightText = words.slice(splitWordIdx).join(" ");
		const leftSeg = {
			id: `split-${crypto.randomUUID().slice(0, 8)}`,
			start: seg.start,
			end: splitTime,
			text: leftText
		};
		const rightSeg = {
			id: `split-${crypto.randomUUID().slice(0, 8)}`,
			start: splitTime,
			end: seg.end,
			text: rightText
		};
		set({
			subtitles: [
				...subtitles.slice(0, idx),
				leftSeg,
				rightSeg,
				...subtitles.slice(idx + 1)
			],
			past: [...past, subtitles],
			future: []
		});
	},
	deleteSegment: (id) => {
		const { subtitles, past } = get();
		set({
			subtitles: subtitles.filter((s) => s.id !== id),
			past: [...past, subtitles],
			future: []
		});
	},
	addSegment: (start, end, text = "New caption") => {
		const { subtitles, past } = get();
		const newSeg = {
			id: `seg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			start: Math.max(0, start),
			end: Math.max(start + .5, end),
			text
		};
		set({
			subtitles: [...subtitles, newSeg].sort((a, b) => a.start - b.start),
			past: [...past, subtitles],
			future: []
		});
	},
	setZoom: (zoom) => set({ zoom: Math.max(.25, Math.min(8, zoom)) }),
	setSubtitles: (subtitles) => {
		set({ subtitles });
	},
	undo: () => {
		const { past, subtitles, future } = get();
		if (past.length === 0) return;
		const prev = past[past.length - 1];
		set({
			subtitles: prev,
			past: past.slice(0, -1),
			future: [subtitles, ...future]
		});
	},
	redo: () => {
		const { future, subtitles, past } = get();
		if (future.length === 0) return;
		const [next, ...rest] = future;
		set({
			subtitles: next,
			past: [...past, subtitles],
			future: rest
		});
	}
}));
var PX_PER_SEC$1 = 120;
var BAR_WIDTH = 2;
var PLAYED_COLOR = "#2dd4bf";
var UNPLAYED_COLOR = "#10b981";
function WaveformCanvas({ peaks, duration, zoom, currentTime, width }) {
	const canvasRef = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const draw = (0, import_react.useCallback)(() => {
		const canvas = canvasRef.current;
		if (!canvas || !peaks || !duration) return;
		const ctx = canvas.getContext("2d");
		const dpr = window.devicePixelRatio || 1;
		const totalPx = duration * PX_PER_SEC$1 * zoom;
		const displayWidth = width || totalPx;
		const displayHeight = 44;
		canvas.width = displayWidth * dpr;
		canvas.height = displayHeight * dpr;
		canvas.style.width = displayWidth + "px";
		canvas.style.height = "44px";
		ctx.scale(dpr, dpr);
		ctx.clearRect(0, 0, displayWidth, displayHeight);
		const barTotal = 3;
		const totalBars = Math.floor(displayWidth / barTotal);
		const peakStep = peaks.length / totalBars;
		const midY = displayHeight / 2;
		const maxBarH = displayHeight / 2 - 2;
		const playheadX = currentTime / duration * displayWidth;
		for (let i = 0; i < totalBars; i++) {
			const val = peaks[Math.min(Math.floor(i * peakStep), peaks.length - 1)];
			const barH = Math.max(1.5, val * maxBarH);
			const x = i * barTotal;
			const isPlayed = x < playheadX;
			ctx.fillStyle = isPlayed ? PLAYED_COLOR : UNPLAYED_COLOR;
			ctx.globalAlpha = isPlayed ? .95 : .65;
			ctx.fillRect(x, midY - barH, BAR_WIDTH, barH * 2);
		}
		ctx.globalAlpha = 1;
	}, [
		peaks,
		duration,
		zoom,
		currentTime,
		width
	]);
	(0, import_react.useEffect)(() => {
		draw();
	}, [draw]);
	(0, import_react.useEffect)(() => {
		const container = containerRef.current;
		if (!container) return;
		const handleWheel = (e) => {
			if (e.ctrlKey || e.metaKey) e.preventDefault();
		};
		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => container.removeEventListener("wheel", handleWheel);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		style: {
			width: width || duration * PX_PER_SEC$1 * zoom,
			height: 40,
			position: "relative",
			flexShrink: 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			style: {
				display: "block",
				width: "100%",
				height: "100%"
			}
		})
	});
}
var PEAK_COUNT = 2e3;
function downsamplePeaks(channelData, targetCount) {
	const peaks = new Float32Array(targetCount);
	const blockSize = Math.floor(channelData.length / targetCount);
	for (let i = 0; i < targetCount; i++) {
		let sum = 0;
		const start = i * blockSize;
		for (let j = 0; j < blockSize; j++) {
			const val = channelData[start + j];
			sum += val * val;
		}
		peaks[i] = Math.sqrt(sum / blockSize);
	}
	let max = 0;
	for (let i = 0; i < peaks.length; i++) if (peaks[i] > max) max = peaks[i];
	if (max > 0) for (let i = 0; i < peaks.length; i++) peaks[i] = peaks[i] / max;
	return peaks;
}
function useAudioWaveform(videoSrc, duration) {
	const [peaks, setPeaks] = (0, import_react.useState)(null);
	const [isReady, setIsReady] = (0, import_react.useState)(false);
	const cacheRef = (0, import_react.useRef)({});
	(0, import_react.useEffect)(() => {
		if (!videoSrc || !duration || duration <= 0) {
			setPeaks(null);
			setIsReady(false);
			return;
		}
		const cacheKey = videoSrc;
		if (cacheRef.current[cacheKey]) {
			setPeaks(cacheRef.current[cacheKey]);
			setIsReady(true);
			return;
		}
		let cancelled = false;
		const ctx = new OfflineAudioContext(1, 1, 44100);
		async function extract() {
			try {
				const response = await fetch(videoSrc);
				if (!response.ok) throw new Error("Failed to fetch audio");
				const arrayBuf = await response.arrayBuffer();
				if (cancelled) return;
				const audioBuf = await ctx.decodeAudioData(arrayBuf);
				if (cancelled) return;
				const extracted = downsamplePeaks(audioBuf.getChannelData(0), PEAK_COUNT);
				cacheRef.current[cacheKey] = extracted;
				setPeaks(extracted);
				setIsReady(true);
			} catch (err) {
				console.warn("Waveform extraction failed:", err.message);
				if (!cancelled) {
					const fallback = new Float32Array(PEAK_COUNT);
					for (let i = 0; i < PEAK_COUNT; i++) fallback[i] = .15 + Math.abs(Math.sin(i * .3) * .35 + Math.sin(i * .7) * .2 + Math.sin(i * 1.3) * .1);
					setPeaks(fallback);
					setIsReady(true);
				}
			}
		}
		extract();
		return () => {
			cancelled = true;
		};
	}, [videoSrc, duration]);
	return {
		peaks,
		isReady
	};
}
var PX_PER_SEC = 120;
var MIN_SEGMENT_PX = 24;
var SNAP_INTERVAL = .1;
var MIN_SEGMENT_DUR = .2;
function fmtShort(t) {
	if (t == null || isNaN(t)) return "00:00";
	const m = Math.floor(t / 60);
	const s = Math.floor(t % 60);
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function Timeline({ subtitles = [], currentTime = 0, totalDuration = 30, videoSrc, zoom = 1, onZoomChange, onSeek, onUpdateSegment, onSplit, onDelete, onAddSegment, selectedId, onSelectSegment, playing = false, onTogglePlay, onUndo, onRedo, canUndo = false, canRedo = false }) {
	const rulerRef = (0, import_react.useRef)(null);
	const scrollContainerRef = (0, import_react.useRef)(null);
	const trackRef = (0, import_react.useRef)(null);
	const [viewMode, setViewMode] = (0, import_react.useState)("line");
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [snapping, setSnapping] = (0, import_react.useState)(true);
	const [dragging, setDragging] = (0, import_react.useState)(null);
	const [scrubbing, setScrubbing] = (0, import_react.useState)(false);
	const [textVisible, setTextVisible] = (0, import_react.useState)(true);
	const [textLocked, setTextLocked] = (0, import_react.useState)(false);
	const [audioMuted, setAudioMuted] = (0, import_react.useState)(false);
	const [videoVisible, setVideoVisible] = (0, import_react.useState)(true);
	const [vuLevel, setVuLevel] = (0, import_react.useState)({
		left: .6,
		right: .5
	});
	(0, import_react.useEffect)(() => {
		if (!playing) {
			setVuLevel({
				left: .05,
				right: .05
			});
			return;
		}
		const interval = setInterval(() => {
			setVuLevel({
				left: Math.min(1, Math.max(.15, .4 + Math.random() * .55)),
				right: Math.min(1, Math.max(.15, .35 + Math.random() * .6))
			});
		}, 80);
		return () => clearInterval(interval);
	}, [playing]);
	const totalPx = Math.max(900, totalDuration * PX_PER_SEC * zoom);
	const playheadPx = currentTime / Math.max(.1, totalDuration) * totalPx;
	const { peaks, isReady } = useAudioWaveform(videoSrc, totalDuration);
	const snap = (0, import_react.useCallback)((val) => {
		if (!snapping) return val;
		return Math.round(val / SNAP_INTERVAL) * SNAP_INTERVAL;
	}, [snapping]);
	const calcTimeFromX = (0, import_react.useCallback)((clientX) => {
		if (!scrollContainerRef.current) return 0;
		const rect = scrollContainerRef.current.getBoundingClientRect();
		const scrollLeft = scrollContainerRef.current.scrollLeft;
		const x = clientX - rect.left + scrollLeft;
		return Math.max(0, Math.min(x / totalPx * totalDuration, totalDuration));
	}, [totalPx, totalDuration]);
	const handleRulerMouseDown = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		onSeek(calcTimeFromX(e.clientX));
		setScrubbing(true);
	}, [calcTimeFromX, onSeek]);
	(0, import_react.useEffect)(() => {
		if (!scrubbing) return;
		const handleMove = (e) => {
			onSeek(calcTimeFromX(e.clientX));
		};
		const handleUp = () => setScrubbing(false);
		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseup", handleUp);
		return () => {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseup", handleUp);
		};
	}, [
		scrubbing,
		calcTimeFromX,
		onSeek
	]);
	const handleTrackClick = (0, import_react.useCallback)((e) => {
		if (dragging || scrubbing) return;
		if (e.target.closest("[data-segment]")) return;
		onSeek(calcTimeFromX(e.clientX));
		onSelectSegment?.(null);
	}, [
		dragging,
		scrubbing,
		calcTimeFromX,
		onSeek,
		onSelectSegment
	]);
	const handleSegmentMouseDown = (0, import_react.useCallback)((e, sub, edge) => {
		if (textLocked) return;
		e.preventDefault();
		e.stopPropagation();
		onSelectSegment?.(sub.id);
		setDragging({
			id: sub.id,
			edge,
			startX: e.clientX,
			origStart: sub.start,
			origEnd: sub.end
		});
	}, [onSelectSegment, textLocked]);
	(0, import_react.useEffect)(() => {
		if (!dragging) return;
		const handleMouseMove = (e) => {
			const dt = (e.clientX - dragging.startX) / totalPx * totalDuration;
			let newStart = dragging.origStart;
			let newEnd = dragging.origEnd;
			if (dragging.edge === "start") {
				newStart = snap(Math.max(0, dragging.origStart + dt));
				if (newEnd - newStart < MIN_SEGMENT_DUR) newStart = newEnd - MIN_SEGMENT_DUR;
			} else if (dragging.edge === "end") {
				newEnd = snap(Math.min(totalDuration, dragging.origEnd + dt));
				if (newEnd - newStart < MIN_SEGMENT_DUR) newEnd = newStart + MIN_SEGMENT_DUR;
			} else {
				const dur = dragging.origEnd - dragging.origStart;
				newStart = snap(Math.max(0, dragging.origStart + dt));
				newEnd = newStart + dur;
				if (newEnd > totalDuration) {
					newEnd = totalDuration;
					newStart = newEnd - dur;
				}
				if (newStart < 0) newStart = 0;
			}
			onUpdateSegment?.(dragging.id, Math.max(0, newStart), Math.min(totalDuration, newEnd));
		};
		const handleMouseUp = () => setDragging(null);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [
		dragging,
		totalPx,
		totalDuration,
		onUpdateSegment,
		snap
	]);
	(0, import_react.useEffect)(() => {
		if (!playing || !scrollContainerRef.current) return;
		const container = scrollContainerRef.current;
		const viewWidth = container.clientWidth;
		const px = currentTime / totalDuration * totalPx;
		const scrollLeft = container.scrollLeft;
		if (px < scrollLeft + 80 || px > scrollLeft + viewWidth - 80) container.scrollLeft = px - viewWidth / 2;
	}, [
		playing,
		currentTime,
		totalDuration,
		totalPx
	]);
	(0, import_react.useEffect)(() => {
		const container = scrollContainerRef.current;
		if (!container) return;
		const handleWheel = (e) => {
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault();
				const delta = e.deltaY > 0 ? -.15 : .15;
				onZoomChange?.(Math.max(.3, Math.min(5, zoom + delta)));
			}
		};
		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => container.removeEventListener("wheel", handleWheel);
	}, [zoom, onZoomChange]);
	const getSubLeft = (0, import_react.useCallback)((sub) => sub.start / Math.max(.1, totalDuration) * totalPx, [totalDuration, totalPx]);
	const getSubWidth = (0, import_react.useCallback)((sub) => Math.max((sub.end - sub.start) / Math.max(.1, totalDuration) * totalPx, MIN_SEGMENT_PX), [totalDuration, totalPx]);
	const rulerTicks = (0, import_react.useMemo)(() => {
		const ticks = [];
		const pixelsPerSec = PX_PER_SEC * zoom;
		let tickInterval = 1;
		if (pixelsPerSec < 30) tickInterval = 10;
		else if (pixelsPerSec < 60) tickInterval = 5;
		else if (pixelsPerSec < 120) tickInterval = 2;
		else if (pixelsPerSec > 350) tickInterval = .5;
		for (let t = 0; t <= totalDuration + tickInterval; t += tickInterval) {
			const isMajor = tickInterval >= 1 ? t % (tickInterval * 5) === 0 || t === 0 : t % 1 === 0;
			ticks.push({
				time: t,
				isMajor
			});
		}
		return ticks;
	}, [totalDuration, zoom]);
	const zoomIn = () => onZoomChange?.(Math.min(5, zoom + .25));
	const zoomOut = () => onZoomChange?.(Math.max(.3, zoom - .25));
	const zoomFit = () => {
		if (scrollContainerRef.current) {
			const viewWidth = scrollContainerRef.current.clientWidth;
			const fitZoom = Math.max(.3, viewWidth / (totalDuration * PX_PER_SEC));
			onZoomChange?.(Math.min(5, fitZoom));
		}
	};
	const skipPrev = () => {
		const prev = [...subtitles].reverse().find((s) => s.start < currentTime - .1);
		if (prev) onSeek(prev.start);
		else onSeek(0);
	};
	const skipNext = () => {
		const next = subtitles.find((s) => s.start > currentTime + .1);
		if (next) onSeek(next.start);
		else onSeek(totalDuration);
	};
	const displayedItems = (0, import_react.useMemo)(() => {
		if (viewMode === "line") return subtitles.map((s) => ({
			id: s.id,
			parentId: s.id,
			start: s.start,
			end: s.end,
			text: s.text,
			isWord: false
		}));
		const items = [];
		subtitles.forEach((s) => {
			const words = (s.text || "").trim().split(/\s+/).filter(Boolean);
			if (words.length === 0) return;
			const dur = (s.end - s.start) / words.length;
			words.forEach((w, idx) => {
				items.push({
					id: `${s.id}-w${idx}`,
					parentId: s.id,
					start: s.start + idx * dur,
					end: s.start + (idx + 1) * dur,
					text: w,
					isWord: true
				});
			});
		});
		return items;
	}, [subtitles, viewMode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			userSelect: "none",
			background: "#0a0a0c",
			borderTop: "1px solid rgba(255,255,255,0.08)",
			color: "#ffffff",
			fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "6px 14px",
				background: "#121215",
				borderBottom: "1px solid rgba(255,255,255,0.08)",
				height: 44,
				gap: 12,
				flexShrink: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 6
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: skipPrev,
							style: styles.iconBtn,
							title: "Previous Segment (Home)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { size: 13 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onTogglePlay,
							style: {
								width: 32,
								height: 32,
								borderRadius: "50%",
								background: "linear-gradient(135deg, #D97736, #B2501F)",
								border: "none",
								color: "#FFFFFF",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								boxShadow: "0 2px 12px rgba(217,119,54,0.45)",
								transition: "transform 0.15s ease"
							},
							title: "Play / Pause (Spacebar)",
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
								size: 14,
								fill: "#FFFFFF"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
								size: 14,
								fill: "#FFFFFF",
								style: { marginLeft: 2 }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: skipNext,
							style: styles.iconBtn,
							title: "Next Segment (End)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { size: 13 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							width: 1,
							height: 16,
							background: "rgba(255,255,255,0.12)",
							margin: "0 4px"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onUndo,
							disabled: !canUndo,
							style: {
								...styles.iconBtn,
								opacity: canUndo ? 1 : .35
							},
							title: "Undo (Ctrl+Z)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 13 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onRedo,
							disabled: !canRedo,
							style: {
								...styles.iconBtn,
								opacity: canRedo ? 1 : .35
							},
							title: "Redo (Ctrl+Y)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { size: 13 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => selectedId && onDelete?.(selectedId),
							disabled: !selectedId,
							style: {
								...styles.iconBtn,
								color: selectedId ? "#ef4444" : "rgba(255,255,255,0.3)",
								opacity: selectedId ? 1 : .35
							},
							title: "Delete Selected Segment (Del)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								background: "#0E0E10",
								borderRadius: 9999,
								padding: 3,
								border: "1px solid rgba(255,255,255,0.08)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setViewMode("word"),
								style: {
									background: viewMode === "word" ? "#D97736" : "transparent",
									color: viewMode === "word" ? "#FFFFFF" : "#A1A1AA",
									fontWeight: 700,
									fontSize: 10,
									padding: "3px 12px",
									borderRadius: 9999,
									border: "none",
									cursor: "pointer",
									transition: "all 0.2s ease"
								},
								children: "WORD"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setViewMode("line"),
								style: {
									background: viewMode === "line" ? "#D97736" : "transparent",
									color: viewMode === "line" ? "#FFFFFF" : "#A1A1AA",
									fontWeight: 700,
									fontSize: 10,
									padding: "3px 12px",
									borderRadius: 9999,
									border: "none",
									cursor: "pointer",
									transition: "all 0.2s ease"
								},
								children: "LINE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onAddSegment?.(currentTime),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 4,
								background: "rgba(255,255,255,0.06)",
								border: "1px solid rgba(255,255,255,0.12)",
								borderRadius: 9999,
								color: "#ffffff",
								fontSize: 11,
								fontWeight: 700,
								padding: "4px 12px",
								cursor: "pointer"
							},
							title: "Add New Caption at Playhead",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Line" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => selectedId && onSplit?.(selectedId, currentTime),
							disabled: !selectedId,
							style: {
								display: "flex",
								alignItems: "center",
								gap: 4,
								background: selectedId ? "rgba(217,119,54,0.15)" : "rgba(255,255,255,0.04)",
								border: `1px solid ${selectedId ? "rgba(217,119,54,0.5)" : "rgba(255,255,255,0.08)"}`,
								borderRadius: 9999,
								color: selectedId ? "#D97736" : "rgba(255,255,255,0.35)",
								fontSize: 11,
								fontWeight: 700,
								padding: "4px 12px",
								cursor: selectedId ? "pointer" : "default"
							},
							title: "Split at Playhead (S)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
								size: 11,
								fill: selectedId ? "#D97736" : "none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Split" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSnapping(!snapping),
							style: {
								...styles.iconBtn,
								color: snapping ? "#38bdf8" : "rgba(255,255,255,0.3)",
								background: snapping ? "rgba(56,189,248,0.1)" : "transparent"
							},
							title: snapping ? "Magnetic Snapping ON (N)" : "Magnetic Snapping OFF",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnet, { size: 13 })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 12
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: 2,
								padding: "2px 6px",
								background: "#08080a",
								borderRadius: 4,
								border: "1px solid rgba(255,255,255,0.08)"
							},
							title: "Master Audio VU Meter (dB)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 3
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 7,
										color: "#71717a",
										width: 6
									},
									children: "L"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 36,
										height: 4,
										background: "rgba(255,255,255,0.1)",
										borderRadius: 2,
										overflow: "hidden"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										width: `${Math.round(vuLevel.left * 100)}%`,
										height: "100%",
										background: vuLevel.left > .85 ? "#ef4444" : vuLevel.left > .65 ? "#facc15" : "#10b981",
										transition: "width 0.08s linear"
									} })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 3
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 7,
										color: "#71717a",
										width: 6
									},
									children: "R"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 36,
										height: 4,
										background: "rgba(255,255,255,0.1)",
										borderRadius: 2,
										overflow: "hidden"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										width: `${Math.round(vuLevel.right * 100)}%`,
										height: "100%",
										background: vuLevel.right > .85 ? "#ef4444" : vuLevel.right > .65 ? "#facc15" : "#10b981",
										transition: "width 0.08s linear"
									} })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 11,
										fontWeight: 800,
										fontFamily: "ui-monospace, monospace",
										color: "#facc15"
									},
									children: fmtShort(currentTime)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										color: "#71717a"
									},
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 11,
										fontFamily: "ui-monospace, monospace",
										color: "#a1a1aa"
									},
									children: fmtShort(totalDuration)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							width: 1,
							height: 16,
							background: "rgba(255,255,255,0.12)"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 4
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: zoomOut,
									style: styles.iconBtn,
									title: "Zoom Out (Ctrl+Scroll)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { size: 12 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "0.3",
									max: "5",
									step: "0.1",
									value: zoom,
									onChange: (e) => onZoomChange?.(parseFloat(e.target.value)),
									style: {
										width: 60,
										accentColor: "#f59e0b",
										cursor: "pointer",
										height: 4
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: 10,
										fontFamily: "ui-monospace, monospace",
										color: "#a1a1aa",
										minWidth: 32,
										textAlign: "center"
									},
									children: [Math.round(zoom * 100), "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: zoomIn,
									style: styles.iconBtn,
									title: "Zoom In (Ctrl+Scroll)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { size: 12 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: zoomFit,
									style: {
										...styles.iconBtn,
										marginLeft: 2
									},
									title: "Fit to Screen",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { size: 11 })
								})
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				flex: 1,
				display: "flex",
				overflow: "hidden",
				minHeight: 0
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					width: 100,
					background: "#111114",
					borderRight: "1px solid rgba(255,255,255,0.08)",
					display: "flex",
					flexDirection: "column",
					flexShrink: 0,
					zIndex: 15
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							height: 24,
							borderBottom: "1px solid rgba(255,255,255,0.08)",
							background: "#0c0c0f",
							display: "flex",
							alignItems: "center",
							padding: "0 8px"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: {
								fontSize: 8,
								fontWeight: 700,
								letterSpacing: "0.08em",
								color: "#52525b"
							},
							children: "TRACKS"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							height: 56,
							borderBottom: "1px solid rgba(255,255,255,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0 8px",
							background: textLocked ? "rgba(239,68,68,0.05)" : "transparent"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 10,
									fontWeight: 800,
									color: "#facc15"
								},
								children: "T1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 9,
									fontWeight: 600,
									color: "#d4d4d8"
								},
								children: "Text"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 2
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setTextVisible(!textVisible),
								style: styles.trackControlBtn,
								title: textVisible ? "Hide Track" : "Show Track",
								children: textVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
									size: 10,
									color: "#a1a1aa"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
									size: 10,
									color: "#ef4444"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setTextLocked(!textLocked),
								style: styles.trackControlBtn,
								title: textLocked ? "Unlock Track" : "Lock Track",
								children: textLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
									size: 10,
									color: "#f59e0b"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, {
									size: 10,
									color: "#71717a"
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							height: 48,
							borderBottom: "1px solid rgba(255,255,255,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0 8px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 10,
									fontWeight: 800,
									color: "#2dd4bf"
								},
								children: "A1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 9,
									fontWeight: 600,
									color: "#d4d4d8"
								},
								children: "Audio"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAudioMuted(!audioMuted),
								style: styles.trackControlBtn,
								title: audioMuted ? "Unmute Track" : "Mute Track",
								children: audioMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
									size: 10,
									color: "#ef4444"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
									size: 10,
									color: "#10b981"
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							height: 42,
							borderBottom: "1px solid rgba(255,255,255,0.06)",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "0 8px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 5
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 10,
									fontWeight: 800,
									color: "#38bdf8"
								},
								children: "V1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 9,
									fontWeight: 600,
									color: "#d4d4d8"
								},
								children: "Video"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 2
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setVideoVisible(!videoVisible),
								style: styles.trackControlBtn,
								title: videoVisible ? "Hide Video Track" : "Show Video Track",
								children: videoVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
									size: 10,
									color: "#a1a1aa"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {
									size: 10,
									color: "#ef4444"
								})
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollContainerRef,
				style: {
					flex: 1,
					overflowX: "auto",
					overflowY: "hidden",
					position: "relative",
					background: "#0a0a0c"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						position: "relative",
						width: totalPx,
						minHeight: "100%"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: rulerRef,
							onMouseDown: handleRulerMouseDown,
							style: {
								height: 24,
								position: "relative",
								borderBottom: "1px solid rgba(255,255,255,0.08)",
								background: "#0c0c0f",
								cursor: "col-resize"
							},
							children: rulerTicks.map(({ time: t, isMajor }, i) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "absolute",
										left: t / Math.max(.1, totalDuration) * totalPx,
										top: 0,
										bottom: 0,
										pointerEvents: "none"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										position: "absolute",
										left: 0,
										top: 0,
										width: 1,
										height: isMajor ? 14 : 6,
										background: isMajor ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"
									} }), isMajor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: {
											position: "absolute",
											left: 4,
											top: 2,
											fontSize: 9,
											color: "#71717a",
											fontFamily: "ui-monospace, monospace",
											whiteSpace: "nowrap"
										},
										children: fmtShort(t)
									})]
								}, i);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: trackRef,
							onClick: handleTrackClick,
							style: {
								height: 56,
								position: "relative",
								background: textLocked ? "rgba(239,68,68,0.02)" : "#101014",
								borderBottom: "1px solid rgba(255,255,255,0.06)",
								padding: "6px 0",
								opacity: textVisible ? 1 : .2
							},
							children: displayedItems.map((item) => {
								const left = getSubLeft(item);
								const width = getSubWidth(item);
								const isSelected = selectedId === item.parentId || selectedId === item.id;
								const isActive = currentTime >= item.start && currentTime <= item.end;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-segment": true,
									onMouseDown: (e) => {
										if (viewMode === "line") {
											const orig = subtitles.find((s) => s.id === item.id);
											if (orig) handleSegmentMouseDown(e, orig, "move");
										} else onSelectSegment?.(item.parentId);
									},
									style: {
										position: "absolute",
										left,
										top: 6,
										width,
										height: 42,
										borderRadius: 8,
										background: isSelected ? "linear-gradient(135deg, #D97736, #B2501F)" : isActive ? "rgba(217, 119, 54, 0.35)" : "rgba(217, 119, 54, 0.18)",
										border: isSelected ? "2px solid #FFFFFF" : isActive ? "1px solid #D97736" : "1px solid rgba(217, 119, 54, 0.35)",
										boxShadow: isSelected ? "0 0 16px rgba(217,119,54,0.6), 0 2px 8px rgba(0,0,0,0.5)" : isActive ? "0 0 10px rgba(217,119,54,0.3)" : "0 2px 6px rgba(0,0,0,0.2)",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										padding: "0 10px",
										cursor: textLocked ? "default" : dragging?.id === item.id ? "grabbing" : "grab",
										zIndex: isSelected ? 8 : isActive ? 6 : 4,
										overflow: "hidden",
										transition: dragging?.id === item.id ? "none" : "all 0.12s ease"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: 10,
												fontWeight: 700,
												color: isSelected ? "#FFFFFF" : "#F5F5F0",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "ellipsis",
												lineHeight: 1.2,
												letterSpacing: "-0.01em",
												pointerEvents: "none"
											},
											children: item.text
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												gap: 3,
												marginTop: 1,
												pointerEvents: "none"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, {
												size: 8,
												color: isSelected ? "rgba(255,255,255,0.8)" : "rgba(217,119,54,0.9)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													fontSize: 8,
													fontStyle: "italic",
													fontWeight: 600,
													color: isSelected ? "rgba(255,255,255,0.8)" : "rgba(217,119,54,0.9)"
												},
												children: item.isWord ? "Word" : "Text"
											})]
										}),
										viewMode === "line" && !textLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											onMouseDown: (e) => {
												e.stopPropagation();
												const orig = subtitles.find((s) => s.id === item.id);
												if (orig) handleSegmentMouseDown(e, orig, "start");
											},
											style: {
												position: "absolute",
												left: 0,
												top: 0,
												bottom: 0,
												width: 7,
												cursor: "ew-resize",
												background: "rgba(0,0,0,0.2)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
												width: 1.5,
												height: 14,
												background: "#D97736",
												borderRadius: 1
											} })
										}),
										viewMode === "line" && !textLocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											onMouseDown: (e) => {
												e.stopPropagation();
												const orig = subtitles.find((s) => s.id === item.id);
												if (orig) handleSegmentMouseDown(e, orig, "end");
											},
											style: {
												position: "absolute",
												right: 0,
												top: 0,
												bottom: 0,
												width: 7,
												cursor: "ew-resize",
												background: "rgba(0,0,0,0.2)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
												width: 1.5,
												height: 14,
												background: "#D97736",
												borderRadius: 1
											} })
										})
									]
								}, item.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								height: 48,
								position: "relative",
								background: "#0c0c0f",
								borderBottom: "1px solid rgba(255,255,255,0.06)",
								display: "flex",
								alignItems: "center"
							},
							children: isReady && peaks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveformCanvas, {
								peaks,
								duration: totalDuration,
								zoom,
								currentTime,
								width: totalPx
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 6,
									paddingLeft: 16
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: 10,
										color: "#52525b"
									},
									children: "Extracting audio waveform..."
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								height: 42,
								position: "relative",
								background: "#09090b",
								borderBottom: "1px solid rgba(255,255,255,0.06)",
								display: "flex",
								alignItems: "center",
								overflow: "hidden"
							},
							children: Array.from({ length: Math.ceil(totalPx / 72) + 1 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: 70,
									height: 34,
									marginRight: 2,
									background: "rgba(255,255,255,0.04)",
									borderRadius: 4,
									border: "1px solid rgba(255,255,255,0.06)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, {
									size: 13,
									color: "rgba(255,255,255,0.15)"
								})
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								position: "absolute",
								left: playheadPx,
								top: 0,
								bottom: 0,
								width: 2,
								background: "#D97736",
								zIndex: 30,
								pointerEvents: "none",
								boxShadow: "0 0 10px rgba(217,119,54,0.8)",
								transition: dragging || scrubbing ? "none" : "left 0.04s linear"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
								position: "absolute",
								top: 0,
								left: "50%",
								transform: "translateX(-50%)",
								width: 12,
								height: 12,
								borderRadius: "50%",
								background: "#D97736",
								boxShadow: "0 0 8px rgba(217,119,54,0.9)",
								border: "2px solid #FFFFFF"
							} })
						})
					]
				})
			})]
		})]
	});
}
var styles = {
	iconBtn: {
		background: "transparent",
		border: "none",
		color: "#d4d4d8",
		width: 26,
		height: 26,
		borderRadius: 4,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		transition: "background 0.12s ease"
	},
	trackControlBtn: {
		background: "transparent",
		border: "none",
		padding: "2px 4px",
		borderRadius: 3,
		cursor: "pointer",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	}
};
var generateHook = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.transcript !== "string") throw new Error("transcript is required");
	return {
		transcript: payload.transcript,
		style: payload.style || "engaging"
	};
}).handler(createSsrRpc("cf288efb0876832b1b0763ad95f241d1d3cb444ea93ed9287efe2cb4b7fb2110"));
/**
* Video Exporter Engine for SubAI
* Supports universal MP4 (H.264/AAC) and WebM with EBML duration metadata injection.
* Renders video frames with preset-accurate styled captions, word highlighting, and audio synchronization.
*/
/**
* Determine the optimal supported MIME type for video recording.
* Prioritizes MP4 (H.264) for out-of-the-box Windows Media Player and mobile playback.
*/
function getOptimalExportFormat() {
	if (typeof window === "undefined" || !window.MediaRecorder) return {
		mimeType: "video/webm",
		extension: "webm",
		isMp4: false,
		label: "WebM"
	};
	for (const t of [
		{
			mime: "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
			label: "MP4 (H.264 / AAC)"
		},
		{
			mime: "video/mp4;codecs=avc1,mp4a.40.2",
			label: "MP4 (H.264 / AAC)"
		},
		{
			mime: "video/mp4;codecs=avc1",
			label: "MP4 (H.264)"
		},
		{
			mime: "video/mp4;codecs=h264",
			label: "MP4 (H.264)"
		},
		{
			mime: "video/mp4",
			label: "MP4"
		}
	]) if (MediaRecorder.isTypeSupported(t.mime)) return {
		mimeType: t.mime,
		extension: "mp4",
		isMp4: true,
		label: t.label
	};
	for (const t of [
		{
			mime: "video/webm;codecs=h264,opus",
			label: "WebM (H.264 / Opus)"
		},
		{
			mime: "video/webm;codecs=vp9,opus",
			label: "WebM (VP9 / Opus)"
		},
		{
			mime: "video/webm;codecs=vp8,opus",
			label: "WebM (VP8 / Opus)"
		},
		{
			mime: "video/webm;codecs=vp9",
			label: "WebM (VP9)"
		},
		{
			mime: "video/webm;codecs=vp8",
			label: "WebM (VP8)"
		},
		{
			mime: "video/webm",
			label: "WebM"
		}
	]) if (MediaRecorder.isTypeSupported(t.mime)) return {
		mimeType: t.mime,
		extension: "webm",
		isMp4: false,
		label: t.label
	};
	return {
		mimeType: "video/webm",
		extension: "webm",
		isMp4: false,
		label: "WebM"
	};
}
/**
* Patch WebM binary header to inject duration metadata.
* Chromium MediaRecorder writes WebM files without segment duration,
* which causes Windows Media Player and other players to show 0:00:00 or fail seeking.
*/
async function fixWebmDuration(blob, durationMs) {
	try {
		const buffer = await blob.arrayBuffer();
		const uint8 = new Uint8Array(buffer);
		let infoPos = -1;
		for (let i = 0; i < Math.min(uint8.length - 4, 65536); i++) if (uint8[i] === 21 && uint8[i + 1] === 73 && uint8[i + 2] === 169 && uint8[i + 3] === 102) {
			infoPos = i;
			break;
		}
		if (infoPos === -1) return blob;
		let durationPos = -1;
		for (let i = infoPos; i < Math.min(infoPos + 1024, uint8.length - 2); i++) if (uint8[i] === 68 && uint8[i + 1] === 137) {
			durationPos = i;
			break;
		}
		const durationFloat = durationMs;
		if (durationPos !== -1) {
			const view = new DataView(buffer);
			const dataSize = uint8[durationPos + 2] & 127;
			if (dataSize === 4) view.setFloat32(durationPos + 3, durationFloat, false);
			else if (dataSize === 8) view.setFloat64(durationPos + 3, durationFloat, false);
			return new Blob([buffer], { type: blob.type });
		}
		const durationElement = /* @__PURE__ */ new Uint8Array(11);
		durationElement[0] = 68;
		durationElement[1] = 137;
		durationElement[2] = 136;
		new DataView(durationElement.buffer).setFloat64(3, durationFloat, false);
		let offset = infoPos + 4;
		const firstByte = uint8[offset];
		let sizeLength = 1;
		if (firstByte & 128) sizeLength = 1;
		else if (firstByte & 64) sizeLength = 2;
		else if (firstByte & 32) sizeLength = 3;
		else if (firstByte & 16) sizeLength = 4;
		const insertPos = offset + sizeLength;
		const newBuffer = new Uint8Array(buffer.byteLength + durationElement.length);
		newBuffer.set(uint8.subarray(0, insertPos), 0);
		newBuffer.set(durationElement, insertPos);
		newBuffer.set(uint8.subarray(insertPos), insertPos + durationElement.length);
		return new Blob([newBuffer.buffer], { type: blob.type });
	} catch (err) {
		console.warn("Could not patch WebM duration:", err);
		return blob;
	}
}
/**
* Draw rounded rectangle for subtitle background pill.
*/
function drawRoundedRect(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
	ctx.lineTo(x + width, y + height - radius);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	ctx.lineTo(x + radius, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}
/**
* Render styled subtitle with word highlighting and preset styling onto 2D canvas context.
*/
function renderSubtitleFrame(ctx, canvas, activeSub, currentTime, preset, isFreeTier) {
	const p = preset || {
		font: "Inter, system-ui, sans-serif",
		color: "#facc15",
		stroke: "#000000",
		bg: "transparent",
		weight: 800,
		shadow: "none",
		letterSpacing: "0.02em",
		case: "none",
		italic: false
	};
	if (activeSub && activeSub.text) {
		let rawText = activeSub.text.trim();
		if (p.case === "uppercase") rawText = rawText.toUpperCase();
		if (p.case === "lowercase") rawText = rawText.toLowerCase();
		const words = rawText.split(/\s+/).filter(Boolean);
		const subDuration = Math.max(.1, activeSub.end - activeSub.start);
		const progress = Math.max(0, Math.min(1, (currentTime - activeSub.start) / subDuration));
		const activeWordIdx = Math.min(words.length - 1, Math.floor(progress * words.length));
		const fontSize = Math.round(canvas.height * .042);
		const fontWeight = p.weight || 800;
		const fontStyle = p.italic ? "italic" : "normal";
		const fontFamily = p.font || "Inter, system-ui, sans-serif";
		ctx.save();
		ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		const spaceWidth = ctx.measureText(" ").width;
		const wordMetrics = words.map((w) => ({
			word: w,
			width: ctx.measureText(w).width
		}));
		const maxLineWidth = canvas.width * .85;
		const lines = [];
		let currentLine = [];
		let currentLineWidth = 0;
		for (let i = 0; i < wordMetrics.length; i++) {
			const item = {
				...wordMetrics[i],
				index: i
			};
			const itemTotalWidth = currentLine.length === 0 ? item.width : item.width + spaceWidth;
			if (currentLineWidth + itemTotalWidth > maxLineWidth && currentLine.length > 0) {
				lines.push({
					words: currentLine,
					width: currentLineWidth
				});
				currentLine = [item];
				currentLineWidth = item.width;
			} else {
				currentLine.push(item);
				currentLineWidth += itemTotalWidth;
			}
		}
		if (currentLine.length > 0) lines.push({
			words: currentLine,
			width: currentLineWidth
		});
		const lineHeight = fontSize * 1.35;
		const totalTextHeight = lines.length * lineHeight;
		const centerY = canvas.height * .8;
		const startY = centerY - totalTextHeight / 2 + lineHeight / 2;
		if (p.bg && p.bg !== "transparent" && p.bg !== "none") {
			const maxW = Math.max(...lines.map((l) => l.width));
			const padX = Math.round(fontSize * .7);
			const padY = Math.round(fontSize * .4);
			const bgX = (canvas.width - maxW) / 2 - padX;
			const bgY = centerY - totalTextHeight / 2 - padY;
			const bgW = maxW + padX * 2;
			const bgH = totalTextHeight + padY * 2;
			const radius = Math.min(16, Math.round(fontSize * .4));
			ctx.fillStyle = p.bg;
			drawRoundedRect(ctx, bgX, bgY, bgW, bgH, radius);
			ctx.fill();
		}
		lines.forEach((line, lineIdx) => {
			const lineY = startY + lineIdx * lineHeight;
			let curX = (canvas.width - line.width) / 2;
			line.words.forEach((item) => {
				const isCurrent = item.index === activeWordIdx;
				const wordX = curX + item.width / 2;
				ctx.save();
				let wordColor = isCurrent ? p.color || "#facc15" : "#ffffff";
				let wordFamily = fontFamily;
				let wordWeight = fontWeight;
				let wordStyle = fontStyle;
				let wordText = item.word;
				let scaleAmount = isCurrent ? 1.15 : 1;
				if (p.id === "forget-status" || p.styleType === "dual-tone-kinetic" || p.styleType === "editorial-duo") if (isCurrent) {
					wordFamily = "'Plus Jakarta Sans', 'Montserrat', sans-serif";
					wordWeight = "900";
					wordStyle = "normal";
					wordColor = "#38bdf8";
					wordText = item.word.toUpperCase();
					scaleAmount = 1.22;
				} else {
					wordFamily = "'Instrument Serif', 'Playfair Display', Georgia, serif";
					wordWeight = "400";
					wordStyle = "italic";
					wordColor = "#ffffff";
					wordText = item.word.toLowerCase();
					scaleAmount = 1;
				}
				else if (p.id === "focus-deeply" || p.styleType === "swiss-duo") if (isCurrent) {
					wordFamily = "'Plus Jakarta Sans', 'Inter', sans-serif";
					wordWeight = "900";
					wordStyle = "normal";
					wordColor = "#facc15";
					wordText = item.word.toUpperCase();
					scaleAmount = 1.2;
				} else {
					wordFamily = "'Instrument Serif', 'Playfair Display', Georgia, serif";
					wordWeight = "400";
					wordStyle = "italic";
					wordColor = "#ffffff";
					wordText = item.word;
					scaleAmount = 1;
				}
				else if (p.styleType === "highlighter-doodle") if (isCurrent) {
					wordColor = "#000000";
					const pillW = item.width + fontSize * .6;
					const pillH = fontSize * 1.25;
					const pillX = wordX - pillW / 2;
					const pillY = lineY - pillH / 2;
					ctx.fillStyle = p.bg || "#facc15";
					drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
					ctx.fill();
				} else wordColor = "#ffffff";
				else if (p.styleType === "blockbuster-neon") if (isCurrent) wordColor = "#ffffff";
				else wordColor = "#ef4444";
				ctx.font = `${wordStyle} ${wordWeight} ${fontSize}px ${wordFamily}`;
				if (isCurrent) {
					ctx.translate(wordX, lineY);
					ctx.scale(scaleAmount, scaleAmount);
					ctx.translate(-wordX, -lineY);
				}
				if (isCurrent && (p.id === "forget-status" || p.styleType === "dual-tone-kinetic" || p.styleType === "editorial-duo")) {
					ctx.shadowColor = "#38bdf8";
					ctx.shadowBlur = Math.round(fontSize * .7);
				} else {
					ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
					ctx.shadowBlur = Math.round(fontSize * .35);
				}
				ctx.shadowOffsetX = 0;
				ctx.shadowOffsetY = Math.round(fontSize * .08);
				ctx.fillStyle = wordColor;
				ctx.fillText(wordText, wordX, lineY);
				ctx.restore();
				curX += item.width + spaceWidth;
			});
		});
		ctx.restore();
	}
	if (isFreeTier) {
		ctx.save();
		ctx.font = `600 ${Math.max(13, Math.round(canvas.height * .018))}px Inter, sans-serif`;
		ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
		ctx.shadowColor = "rgba(0,0,0,0.5)";
		ctx.shadowBlur = 4;
		ctx.textAlign = "right";
		ctx.textBaseline = "bottom";
		ctx.fillText("SubAI", canvas.width - 24, canvas.height - 20);
		ctx.restore();
	}
}
/**
* Export the video with subtitles rendered into canvas and encoded into MP4 / WebM.
*
* @param {Object} options
* @param {string} options.videoUrl URL of the video file
* @param {HTMLVideoElement} [options.existingVideoEl] Existing video element from DOM
* @param {Array} options.subtitles Subtitle segments [{ start, end, text }]
* @param {Object} options.preset Subtitle styling preset
* @param {boolean} [options.isFreeTier=true] Whether to apply SubAI watermark
* @param {string} [options.aspect='original'] Target aspect ratio ('original', '916', '169', '11', '45')
* @param {string} [options.filename='captioned-video'] Output filename without extension
* @param {Function} [options.onProgress] Callback with { percent, currentTime, duration, stage, format }
* @param {Object} [options.signal] AbortController signal
* @returns {Promise<{ blob: Blob, url: string, filename: string, format: Object }>}
*/
async function exportVideo({ videoUrl, existingVideoEl = null, subtitles = [], preset = null, isFreeTier = true, aspect = "original", filename = "captioned-video", onProgress = () => {}, signal = null }) {
	const format = getOptimalExportFormat();
	onProgress({
		percent: 0,
		currentTime: 0,
		duration: 0,
		stage: "Initializing video...",
		format
	});
	let video = null;
	let createdVideo = false;
	try {
		video = document.createElement("video");
		createdVideo = true;
		video.crossOrigin = "anonymous";
		video.playsInline = true;
		video.muted = false;
		video.src = videoUrl || (existingVideoEl ? existingVideoEl.src : "");
		await new Promise((resolve, reject) => {
			const onLoaded = () => {
				cleanup();
				resolve();
			};
			const onError = () => {
				cleanup();
				reject(/* @__PURE__ */ new Error("Failed to load video for export. Check network or video source."));
			};
			const timeout = setTimeout(() => {
				cleanup();
				reject(/* @__PURE__ */ new Error("Video load timed out."));
			}, 15e3);
			function cleanup() {
				clearTimeout(timeout);
				video.removeEventListener("loadedmetadata", onLoaded);
				video.removeEventListener("canplay", onLoaded);
				video.removeEventListener("error", onError);
			}
			if (video.readyState >= 2) resolve();
			else {
				video.addEventListener("loadedmetadata", onLoaded);
				video.addEventListener("canplay", onLoaded);
				video.addEventListener("error", onError);
			}
		});
		if (signal?.aborted) throw new Error("Export cancelled.");
		const duration = video.duration || (subtitles.length ? subtitles[subtitles.length - 1].end + 1 : 10);
		const videoWidth = video.videoWidth || 1080;
		const videoHeight = video.videoHeight || 1920;
		let canvasWidth = videoWidth;
		let canvasHeight = videoHeight;
		if (aspect === "916") {
			canvasWidth = 1080;
			canvasHeight = 1920;
		} else if (aspect === "169") {
			canvasWidth = 1920;
			canvasHeight = 1080;
		} else if (aspect === "11") {
			canvasWidth = 1080;
			canvasHeight = 1080;
		} else if (aspect === "45") {
			canvasWidth = 1080;
			canvasHeight = 1350;
		} else {
			canvasWidth = videoWidth;
			canvasHeight = videoHeight;
		}
		const canvas = document.createElement("canvas");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		const ctx = canvas.getContext("2d", { alpha: false });
		const canvasStream = canvas.captureStream ? canvas.captureStream(30) : canvas.mozCaptureStream(30);
		let audioStreamTracks = [];
		let audioCtx = null;
		try {
			if (video.captureStream) audioStreamTracks = video.captureStream().getAudioTracks();
			else if (video.mozCaptureStream) audioStreamTracks = video.mozCaptureStream().getAudioTracks();
			if (audioStreamTracks.length === 0) {
				const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
				if (AudioCtxClass) {
					audioCtx = new AudioCtxClass();
					if (audioCtx.state === "suspended") await audioCtx.resume();
					const source = audioCtx.createMediaElementSource(video);
					const dest = audioCtx.createMediaStreamDestination();
					source.connect(dest);
					source.connect(audioCtx.destination);
					audioStreamTracks = dest.stream.getAudioTracks();
				}
			}
		} catch (audioErr) {
			console.warn("Audio extraction fallback to video-only:", audioErr.message);
			audioStreamTracks = [];
		}
		const combinedTracks = [...canvasStream.getVideoTracks(), ...audioStreamTracks];
		const recordingStream = new MediaStream(combinedTracks);
		const recorder = new MediaRecorder(recordingStream, {
			mimeType: format.mimeType,
			videoBitsPerSecond: 8e6
		});
		const chunks = [];
		recorder.ondataavailable = (e) => {
			if (e.data && e.data.size > 0) chunks.push(e.data);
		};
		const completionPromise = new Promise((resolve, reject) => {
			recorder.onstop = async () => {
				try {
					onProgress({
						percent: 99,
						currentTime: duration,
						duration,
						stage: "Finalizing file...",
						format
					});
					let rawBlob = new Blob(chunks, { type: format.mimeType });
					if (!format.isMp4) rawBlob = await fixWebmDuration(rawBlob, duration * 1e3);
					const cleanName = `${filename.replace(/[^a-zA-Z0-9_-]/g, "_")}-captioned.${format.extension}`;
					const downloadUrl = URL.createObjectURL(rawBlob);
					onProgress({
						percent: 100,
						currentTime: duration,
						duration,
						stage: "Export completed!",
						format
					});
					resolve({
						blob: rawBlob,
						url: downloadUrl,
						filename: cleanName,
						format
					});
				} catch (err) {
					reject(err);
				}
			};
			recorder.onerror = (e) => {
				reject(/* @__PURE__ */ new Error(`Recording error: ${e.error?.message || "Unknown error"}`));
			};
		});
		video.currentTime = 0;
		await new Promise((r) => {
			const onSeeked = () => {
				video.removeEventListener("seeked", onSeeked);
				r();
			};
			if (video.currentTime === 0) r();
			else video.addEventListener("seeked", onSeeked);
		});
		if (signal?.aborted) throw new Error("Export cancelled.");
		recorder.start(500);
		onProgress({
			percent: 1,
			currentTime: 0,
			duration,
			stage: "Rendering frames...",
			format
		});
		await video.play();
		let isRunning = true;
		let animFrameId = null;
		const renderLoop = () => {
			if (!isRunning) return;
			if (signal?.aborted) {
				isRunning = false;
				video.pause();
				recorder.stop();
				return;
			}
			const curTime = video.currentTime;
			onProgress({
				percent: Math.min(98, Math.round(curTime / Math.max(1, duration) * 100)),
				currentTime: curTime,
				duration,
				stage: `Rendering (${Math.floor(curTime)}s / ${Math.floor(duration)}s)`,
				format
			});
			const srcW = video.videoWidth || canvas.width;
			const srcH = video.videoHeight || canvas.height;
			const srcRatio = srcW / srcH;
			const targetRatio = canvas.width / canvas.height;
			let sx = 0, sy = 0, sw = srcW, sh = srcH;
			if (srcRatio > targetRatio) {
				sw = srcH * targetRatio;
				sx = (srcW - sw) / 2;
			} else {
				sh = srcW / targetRatio;
				sy = (srcH - sh) / 2;
			}
			ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
			const activeSub = subtitles.find((s) => curTime >= s.start && curTime <= s.end);
			renderSubtitleFrame(ctx, canvas, activeSub, curTime, preset, isFreeTier);
			if (video.ended || curTime >= duration - .05) {
				isRunning = false;
				video.pause();
				if (recorder.state === "recording") recorder.stop();
				return;
			}
			animFrameId = requestAnimationFrame(renderLoop);
		};
		video.onended = () => {
			if (isRunning) {
				isRunning = false;
				if (recorder.state === "recording") recorder.stop();
			}
		};
		renderLoop();
		const result = await completionPromise;
		if (animFrameId) cancelAnimationFrame(animFrameId);
		if (audioCtx && audioCtx.state !== "closed") audioCtx.close().catch(() => {});
		if (createdVideo && video) {
			video.pause();
			video.removeAttribute("src");
			video.load();
		}
		return result;
	} catch (error) {
		if (createdVideo && video) {
			video.pause();
			video.removeAttribute("src");
			video.load();
		}
		throw error;
	}
}
/**
* Trigger file download directly in browser.
*/
function triggerDownload(url, filename) {
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => URL.revokeObjectURL(url), 2e3);
}
var fmt = (s) => {
	return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};
var INDIAN_LANGUAGES = [
	{
		code: "hi",
		name: "Hindi",
		native: "हिन्दी"
	},
	{
		code: "ta",
		name: "Tamil",
		native: "தமிழ்"
	},
	{
		code: "te",
		name: "Telugu",
		native: "తెలుగు"
	},
	{
		code: "bn",
		name: "Bengali",
		native: "বাংলা"
	},
	{
		code: "mr",
		name: "Marathi",
		native: "मराठी"
	},
	{
		code: "gu",
		name: "Gujarati",
		native: "ગુજરાती"
	},
	{
		code: "kn",
		name: "Kannada",
		native: "ಕನ್ನಡ"
	},
	{
		code: "ml",
		name: "Malayalam",
		native: "മലയാളம்"
	},
	{
		code: "pa",
		name: "Punjabi",
		native: "ਪੰਜਾਬੀ"
	},
	{
		code: "or",
		name: "Odia",
		native: "ଓଡ଼ିଆ"
	},
	{
		code: "as",
		name: "Assamese",
		native: "অसमीया"
	},
	{
		code: "ur",
		name: "Urdu",
		native: "اردو"
	},
	{
		code: "sa",
		name: "Sanskrit",
		native: "संस्कृतम्"
	},
	{
		code: "mai",
		name: "Maithili",
		native: "मैथिली"
	},
	{
		code: "sat",
		name: "Santali",
		native: "ᱥᱟᱱᱛᱟᱲᱤ"
	},
	{
		code: "ks",
		name: "Kashmiri",
		native: "कॉशुर"
	},
	{
		code: "ne",
		name: "Nepali",
		native: "नेपाली"
	},
	{
		code: "sd",
		name: "Sindhi",
		native: "سنڌي"
	},
	{
		code: "doi",
		name: "Dogri",
		native: "डोगरी"
	},
	{
		code: "kok",
		name: "Konkani",
		native: "कोंकणी"
	},
	{
		code: "brx",
		name: "Bodo",
		native: "बरʼ"
	},
	{
		code: "mni",
		name: "Manipuri",
		native: "মৈতैलोन्"
	}
];
var overlayBase = {
	position: "fixed",
	inset: 0,
	zIndex: 300,
	background: "rgba(0, 0, 0, 0.75)",
	backdropFilter: "blur(12px)",
	WebkitBackdropFilter: "blur(12px)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: 20
};
var modalBase = {
	background: "var(--bg-surface, #18181B)",
	border: "1px solid var(--border-base, rgba(255, 255, 255, 0.08))",
	borderRadius: 20,
	padding: 24,
	maxWidth: 520,
	width: "100%",
	maxHeight: "85vh",
	overflow: "auto",
	boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
	color: "var(--text-primary, #F5F5F0)"
};
function Tooltip({ text, children }) {
	const [show, setShow] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			position: "relative",
			display: "inline-flex"
		},
		onMouseEnter: () => setShow(true),
		onMouseLeave: () => setShow(false),
		children: [children, show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				position: "absolute",
				bottom: "calc(100% + 8px)",
				left: "50%",
				transform: "translateX(-50%)",
				background: "var(--bg-surface)",
				color: "var(--text-primary)",
				padding: "5px 10px",
				borderRadius: 20,
				fontSize: 11,
				fontWeight: 600,
				whiteSpace: "nowrap",
				pointerEvents: "none",
				zIndex: 500,
				border: "1px solid rgba(255,255,255,0.08)",
				boxShadow: "var(--shadow-card)"
			},
			children: text
		})]
	});
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: "32px 20px",
			textAlign: "center",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: 16
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "80",
				height: "80",
				viewBox: "0 0 80 80",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				style: { opacity: .4 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "8",
						y: "16",
						width: "64",
						height: "48",
						rx: "8",
						stroke: "var(--text-secondary)",
						strokeWidth: "2",
						fill: "none"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "14",
						y: "26",
						width: "52",
						height: "8",
						rx: "2",
						fill: "var(--bg-base)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "14",
						y: "38",
						width: "36",
						height: "6",
						rx: "2",
						fill: "var(--bg-base)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "14",
						y: "48",
						width: "44",
						height: "6",
						rx: "2",
						fill: "var(--bg-base)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "64",
						cy: "56",
						r: "8",
						fill: "var(--bg-base)",
						stroke: "var(--text-secondary)",
						strokeWidth: "1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M61 56l2 2 4-4",
						stroke: "var(--primary)",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: 13,
					fontWeight: 700,
					color: "var(--text-secondary)"
				},
				children: "No captions yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: 11,
					color: "var(--text-tertiary)",
					lineHeight: 1.6,
					margin: 0,
					maxWidth: 200
				},
				children: [
					"Transcription may have failed. Check your",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						style: {
							color: "var(--primary)",
							background: "rgba(0,0,0,0.03)",
							padding: "1px 4px",
							borderRadius: 4,
							fontWeight: 600
						},
						children: "GROQ_API_KEY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"in",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						style: {
							color: "var(--primary)",
							background: "rgba(0,0,0,0.03)",
							padding: "1px 4px",
							borderRadius: 4,
							fontWeight: 600
						},
						children: ".env"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"or upload a new video."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "inline-flex",
					alignItems: "center",
					gap: 6,
					fontSize: 11,
					color: "var(--text-tertiary)",
					marginTop: 4,
					fontWeight: 500
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 11 }), "Captions appear here after transcription"]
			})
		]
	});
}
function EditorPage() {
	const { jobId } = useParams({ from: "/editor/$jobId" });
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [notFound, setNotFound] = (0, import_react.useState)(false);
	const playerRef = (0, import_react.useRef)(null);
	const [job, setJob] = (0, import_react.useState)(null);
	const [videoUrl, setVideoUrl] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
	const [resolution, setResolution] = (0, import_react.useState)("1080p");
	const [aspect, setAspect] = (0, import_react.useState)("916");
	const [previewZoom, setPreviewZoom] = (0, import_react.useState)(100);
	const [videoNaturalSize, setVideoNaturalSize] = (0, import_react.useState)({
		width: 1080,
		height: 1920
	});
	const [panelTab, setPanelTab] = (0, import_react.useState)("templates");
	const [subTab, setSubTab] = (0, import_react.useState)("builtin");
	const [lineMode, setLineMode] = (0, import_react.useState)("1");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [exporting, setExporting] = (0, import_react.useState)(false);
	const [hookModal, setHookModal] = (0, import_react.useState)(false);
	const [generatingHook, setGeneratingHook] = (0, import_react.useState)(false);
	const [generatedHook, setGeneratedHook] = (0, import_react.useState)(null);
	const [scriptMode, setScriptMode] = (0, import_react.useState)("roman");
	const [translateModal, setTranslateModal] = (0, import_react.useState)(false);
	const [translateLang, setTranslateLang] = (0, import_react.useState)(null);
	const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [leftPanelOpen, setLeftPanelOpen] = (0, import_react.useState)(false);
	const [rightPanelOpen, setRightPanelOpen] = (0, import_react.useState)(false);
	const [brandKits, setBrandKits] = (0, import_react.useState)(() => {
		try {
			const stored = localStorage.getItem("brandKits");
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	});
	const subtitles = useEditorStore((s) => s.subtitles);
	const load = useEditorStore((s) => s.load);
	const updateText = useEditorStore((s) => s.updateText);
	const updateSegment = useEditorStore((s) => s.updateSegment);
	const splitSegment = useEditorStore((s) => s.splitSegment);
	const deleteSegment = useEditorStore((s) => s.deleteSegment);
	const addSegment = useEditorStore((s) => s.addSegment);
	const zoom = useEditorStore((s) => s.zoom);
	const setZoom = useEditorStore((s) => s.setZoom);
	const undo = useEditorStore((s) => s.undo);
	const redo = useEditorStore((s) => s.redo);
	const runCleanup = useEditorStore((s) => s.runCleanup);
	const canUndo = useEditorStore((s) => s.past.length > 0);
	const canRedo = useEditorStore((s) => s.future.length > 0);
	const [selectedSegId, setSelectedSegId] = (0, import_react.useState)(null);
	const [presetId, setPresetId] = (0, import_react.useState)(PRESETS[0].id);
	const preset = PRESETS.find((p) => p.id === presetId);
	const push = (0, import_react.useCallback)((msg) => {
		toast(msg, { duration: 4e3 });
	}, []);
	(0, import_react.useEffect)(() => {
		let animId = null;
		if (playing) {
			const checkFrame = () => {
				const player = playerRef.current;
				if (player) try {
					const frame = player.getCurrentFrame();
					if (typeof frame === "number" && !isNaN(frame)) setCurrentTime(frame / 30);
				} catch {}
				animId = requestAnimationFrame(checkFrame);
			};
			animId = requestAnimationFrame(checkFrame);
		}
		return () => {
			if (animId) cancelAnimationFrame(animId);
		};
	}, [playing]);
	(0, import_react.useEffect)(() => {
		const player = playerRef.current;
		if (!player) return;
		const onPlay = () => setPlaying(true);
		const onPause = () => setPlaying(false);
		const onEnded = () => {
			setPlaying(false);
			setCurrentTime(0);
		};
		const onSeeked = (e) => {
			if (e?.detail?.frame != null) setCurrentTime(e.detail.frame / 30);
		};
		player.addEventListener("play", onPlay);
		player.addEventListener("pause", onPause);
		player.addEventListener("ended", onEnded);
		player.addEventListener("seeked", onSeeked);
		return () => {
			player.removeEventListener("play", onPlay);
			player.removeEventListener("pause", onPause);
			player.removeEventListener("ended", onEnded);
			player.removeEventListener("seeked", onSeeked);
		};
	}, [playerRef.current]);
	const togglePlay = (0, import_react.useCallback)(() => {
		const player = playerRef.current;
		if (!player) return;
		if (player.isPlaying()) {
			player.pause();
			setPlaying(false);
		} else {
			player.play().catch(() => {});
			setPlaying(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!videoUrl) return;
		const v = document.createElement("video");
		v.src = videoUrl;
		v.onloadedmetadata = () => {
			if (v.videoWidth && v.videoHeight) setVideoNaturalSize({
				width: v.videoWidth,
				height: v.videoHeight
			});
		};
	}, [videoUrl]);
	const previewDimensions = (0, import_react.useMemo)(() => {
		let ratio = "9 / 16";
		let compW = 1080;
		let compH = 1920;
		let isLandscape = false;
		if (aspect === "169") {
			ratio = "16 / 9";
			compW = 1920;
			compH = 1080;
			isLandscape = true;
		} else if (aspect === "11") {
			ratio = "1 / 1";
			compW = 1080;
			compH = 1080;
			isLandscape = false;
		} else if (aspect === "45") {
			ratio = "4 / 5";
			compW = 1080;
			compH = 1350;
			isLandscape = false;
		} else if (aspect === "original") if (videoNaturalSize.width && videoNaturalSize.height) {
			compW = videoNaturalSize.width;
			compH = videoNaturalSize.height;
			ratio = `${compW} / ${compH}`;
			isLandscape = compW > compH;
		} else {
			ratio = "9 / 16";
			compW = 1080;
			compH = 1920;
			isLandscape = false;
		}
		else {
			ratio = "9 / 16";
			compW = 1080;
			compH = 1920;
			isLandscape = false;
		}
		return {
			ratio,
			compW,
			compH,
			isLandscape
		};
	}, [aspect, videoNaturalSize]);
	const totalDuration = (0, import_react.useMemo)(() => {
		if (!subtitles.length) return 12;
		return subtitles[subtitles.length - 1].end + 1;
	}, [subtitles]);
	const fullTranscript = (0, import_react.useMemo)(() => {
		return subtitles.map((s) => s.text).join(" ");
	}, [subtitles]);
	const handleTimelineSeek = (0, import_react.useCallback)((t) => {
		setCurrentTime(t);
		const player = playerRef.current;
		if (player) try {
			player.seekTo(Math.round(t * 30));
		} catch {}
	}, []);
	const handleSplitSegment = (0, import_react.useCallback)((id, splitTime) => {
		splitSegment(id, splitTime);
		push("Segment split");
	}, [splitSegment, push]);
	const handleDeleteSegment = (0, import_react.useCallback)((id) => {
		deleteSegment(id);
		setSelectedSegId(null);
		push("Segment deleted");
	}, [deleteSegment, push]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
			if (e.key === "Escape") {
				setLeftPanelOpen(false);
				setRightPanelOpen(false);
				return;
			}
			if ((e.ctrlKey || e.metaKey) && e.key === "b") {
				e.preventDefault();
				if (selectedSegId) handleSplitSegment(selectedSegId, currentTime);
			}
			if (e.key === "Delete" || e.key === "Backspace") {
				if (selectedSegId && e.target.tagName !== "INPUT") {
					e.preventDefault();
					handleDeleteSegment(selectedSegId);
				}
			}
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				handleTimelineSeek(Math.max(0, currentTime - 1 / 30));
			}
			if (e.key === "ArrowRight") {
				e.preventDefault();
				handleTimelineSeek(Math.min(totalDuration, currentTime + 1 / 30));
			}
			if (e.key === " " && !e.ctrlKey && !e.metaKey) {
				e.preventDefault();
				togglePlay();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		selectedSegId,
		currentTime,
		handleSplitSegment,
		handleDeleteSegment,
		handleTimelineSeek,
		totalDuration,
		togglePlay,
		setLeftPanelOpen,
		setRightPanelOpen
	]);
	(0, import_react.useEffect)(() => {
		async function loadJobData() {
			setLoading(true);
			try {
				const cachedUrl = sessionStorage.getItem(`video_${jobId}`) || localStorage.getItem(`video_${jobId}`);
				if (cachedUrl) setVideoUrl(cachedUrl);
				const { data } = await supabase.from("jobs").select("*").eq("id", jobId).single();
				if (data) {
					setJob(data);
					if (data.storage_key) try {
						setVideoUrl(await getVideoUrl(data.storage_key));
					} catch (e) {
						console.warn(e.message);
					}
				} else if (!jobId.startsWith("job-")) {
					setNotFound(true);
					setLoading(false);
					return;
				}
			} catch (e) {
				console.warn(e.message);
			}
			const isMockJob = jobId.startsWith("job-");
			const storedSubs = localStorage.getItem(`subtitles_${jobId}`);
			if (storedSubs) load(JSON.parse(storedSubs));
			else if (isMockJob) load(MOCK_SUBTITLES[jobId] || MOCK_SUBTITLES["job-hinglish-reel"]);
			else try {
				const dbSubs = await loadSubtitles(jobId);
				if (dbSubs.length > 0) {
					load(dbSubs);
					localStorage.setItem(`subtitles_${jobId}`, JSON.stringify(dbSubs));
				}
			} catch (e) {
				console.warn("No subtitles found for job", jobId, e.message);
			}
			setLoading(false);
		}
		loadJobData();
	}, [jobId]);
	const handleScriptChange = (mode) => {
		setScriptMode(mode);
		const original = localStorage.getItem(`subtitles_${jobId}_original`);
		const source = original ? JSON.parse(original) : subtitles;
		if (!original) localStorage.setItem(`subtitles_${jobId}_original`, JSON.stringify(subtitles));
		const converted = convertSubtitles(source, mode);
		load(converted);
		push(`Script updated`);
	};
	const handleGenerateHook = async () => {
		if (!fullTranscript.trim()) {
			push("No transcript available to generate a hook");
			return;
		}
		setGeneratingHook(true);
		try {
			const result = await generateHook({ data: { transcript: fullTranscript } });
			if (result.ok && result.hook) setGeneratedHook(result.hook);
			else push("Hook generation failed: " + (result.error || "Unknown error"));
		} catch (e) {
			push("Hook generation error: " + e.message);
		} finally {
			setGeneratingHook(false);
		}
	};
	const applyHook = () => {
		if (!generatedHook || !subtitles.length) return;
		const hookSub = {
			...subtitles[0],
			text: generatedHook
		};
		const past = useEditorStore.getState().subtitles;
		useEditorStore.setState({
			subtitles: [hookSub, ...subtitles.slice(1)],
			past: [...useEditorStore.getState().past, past],
			future: []
		});
		setHookModal(false);
		setGeneratedHook(null);
		push("Hook applied");
	};
	const handleExport = async () => {
		if (!videoUrl) {
			push("No video source available for export.");
			return;
		}
		setExporting(true);
		try {
			const result = await exportVideo({
				videoUrl,
				subtitles: useEditorStore.getState().subtitles,
				preset,
				isFreeTier: false,
				aspect,
				filename: job?.title || "subai-captioned",
				onProgress: (p) => {
					if (p.stage) toast(p.stage, {
						id: "export-progress",
						duration: 3e3
					});
				}
			});
			triggerDownload(result.url, result.filename);
			toast.success("Export completed! Video ready to play.", { id: "export-progress" });
		} catch (err) {
			console.error("Export error:", err);
			toast.error(`Export failed: ${err.message}`, { id: "export-progress" });
		} finally {
			setExporting(false);
		}
	};
	const handleSRTExport = () => {
		const lines = subtitles.map((s, i) => {
			const start = (/* @__PURE__ */ new Date(s.start * 1e3)).toISOString().substring(11, 23).replace(".", ",");
			const end = (/* @__PURE__ */ new Date(s.end * 1e3)).toISOString().substring(11, 23).replace(".", ",");
			return `${i + 1}\n${start} --> ${end}\n${s.text}\n`;
		});
		const blob = new Blob([lines.join("\n")], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${(job?.title || "subtitles").replace(/[^a-zA-Z0-9_-]/g, "_")}.srt`;
		a.click();
		URL.revokeObjectURL(url);
		push("SRT downloaded!");
	};
	const handleSEOExport = (0, import_react.useCallback)(() => {
		const title = job.title || "Untitled Video";
		const transcriptLines = subtitles.map((s) => {
			return `[${fmt(s.start)} - ${fmt(s.end)}] ${s.text}`;
		});
		const lang = job.language || "hinglish";
		const content = [
			title,
			"",
			"Full Transcript with Timestamps:",
			...transcriptLines,
			"",
			"Tags",
			`#${lang} #subtitles #captions #video #content #SubAI`,
			"",
			"Generated with SubAI — AI-powered captioning"
		].join("\n");
		const sanitized = title.replace(/[^a-zA-Z0-9]/g, "_");
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${sanitized}_SEO_description.txt`;
		a.click();
		URL.revokeObjectURL(url);
		push("SEO description downloaded!");
	}, [
		job,
		subtitles,
		push
	]);
	const handleSaveBrandKit = (0, import_react.useCallback)(() => {
		const kit = {
			id: crypto.randomUUID(),
			name: preset.name,
			presetId: preset.id,
			font: preset.font,
			color: preset.color,
			bg: preset.bg,
			stroke: preset.stroke
		};
		const updated = [...brandKits, kit];
		setBrandKits(updated);
		localStorage.setItem("brandKits", JSON.stringify(updated));
		push(`"${kit.name}" saved to Brand Kit`);
	}, [
		preset,
		brandKits,
		push
	]);
	const handleApplyBrandKit = (0, import_react.useCallback)((kit) => {
		const match = PRESETS.find((p) => p.id === kit.presetId);
		if (match) {
			setPresetId(match.id);
			push(`Applied "${kit.name}" brand kit`);
		} else push(`Preset not found`);
	}, [push]);
	const handleDeleteBrandKit = (0, import_react.useCallback)((id) => {
		const updated = brandKits.filter((k) => k.id !== id);
		setBrandKits(updated);
		localStorage.setItem("brandKits", JSON.stringify(updated));
		push("Brand kit deleted");
	}, [brandKits, push]);
	const handleTranslate = (0, import_react.useCallback)(() => {
		if (!translateLang) {
			push("Select a language first");
			return;
		}
		const lang = INDIAN_LANGUAGES.find((l) => l.code === translateLang);
		push(`Translate to ${lang.name} — coming soon`);
		setTranslateModal(false);
		setTranslateLang(null);
	}, [translateLang, push]);
	if (notFound) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh",
			gap: 16,
			background: "var(--bg-base)",
			color: "var(--text-primary)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Project not found" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/dashboard",
			style: {
				color: "var(--primary)",
				fontWeight: 600
			},
			children: "Back to Dashboard"
		})]
	});
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh",
			gap: 12,
			background: "var(--bg-base)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			size: 28,
			className: "animate-spin",
			style: { color: "var(--primary)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontSize: 13,
				color: "var(--text-secondary)",
				fontWeight: 600
			},
			children: "Loading workspace..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: Editor_module_default.shell,
		"data-theme": "dark",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: Editor_module_default.topbar,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Editor_module_default.topLeft,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: Editor_module_default.backBtn,
								onClick: () => navigate({ to: "/dashboard" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
									size: 14,
									style: { marginRight: 4 }
								}), "Back"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Editor_module_default.brand,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: Editor_module_default.brandDot }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SubAI Editor" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "var(--border-strong)" },
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: Editor_module_default.projectNameEdit,
								value: job?.title || "Untitled Job",
								onChange: (e) => setJob((prev) => ({
									...prev,
									title: e.target.value
								}))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Editor_module_default.topCenter,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: Editor_module_default.iconBtn,
								onClick: undo,
								disabled: !canUndo,
								title: "Undo (Ctrl+Z)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { size: 13 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: Editor_module_default.iconBtn,
								onClick: redo,
								disabled: !canRedo,
								title: "Redo (Ctrl+Y)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { size: 13 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: Editor_module_default.iconBtn,
								onClick: runCleanup,
								title: "Clean text formatting",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									size: 13,
									style: { color: "var(--primary)" }
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Editor_module_default.topRight,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: Editor_module_default.iconBtn,
								onClick: () => setHookModal(true),
								title: "Generate Viral Hook with AI",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, {
									size: 13,
									style: { color: "var(--primary, #D97736)" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI Hook" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Editor_module_default.scriptToggleGroup,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleScriptChange("roman"),
									className: `${Editor_module_default.scriptToggleBtn} ${scriptMode === "roman" ? Editor_module_default.scriptToggleBtnActive : ""}`,
									children: "Romanized"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleScriptChange("native"),
									className: `${Editor_module_default.scriptToggleBtn} ${scriptMode === "native" ? Editor_module_default.scriptToggleBtnActive : ""}`,
									children: "Native Script"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: Editor_module_default.srtBtn,
								onClick: handleSRTExport,
								title: "Download SRT Subtitle file",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SRT" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: Editor_module_default.srtBtn,
								onClick: handleSEOExport,
								title: "Download SEO Description",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SEO Text" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: Editor_module_default.exportBtn,
								onClick: handleExport,
								disabled: exporting,
								title: "Export final captioned video",
								children: exporting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									size: 13,
									className: "animate-spin mr-1"
								}), "Exporting..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									size: 13,
									className: "mr-1"
								}), "Export Video"] })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: Editor_module_default.body,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${Editor_module_default.leftPanel} ${leftPanelOpen ? Editor_module_default.leftPanelOpen : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Editor_module_default.panelHeader,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Editor_module_default.panelTitle,
								children: "Captions list"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Editor_module_default.lineToggle,
								children: [
									"1",
									"2",
									"3"
								].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `${Editor_module_default.lineBtn} ${lineMode === mode ? Editor_module_default.lineBtnActive : ""}`,
									onClick: () => setLineMode(mode),
									children: [
										mode,
										" Line",
										mode !== "1" ? "s" : ""
									]
								}, mode))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Editor_module_default.captionList,
							children: subtitles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}) : subtitles.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Editor_module_default.captionRow,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Editor_module_default.captionRowHeader,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: Editor_module_default.captionRowNum,
										children: i + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: Editor_module_default.captionTimes,
										children: [
											fmt(s.start),
											" → ",
											fmt(s.end)
										]
									})]
								}), editingId === s.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: Editor_module_default.captionInput,
									value: s.text,
									autoFocus: true,
									onChange: (e) => updateText(s.id, e.target.value),
									onBlur: () => setEditingId(null),
									onKeyDown: (e) => {
										if (e.key === "Enter") setEditingId(null);
									}
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Editor_module_default.captionWords,
									children: s.text.split(" ").map((word, wi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: Editor_module_default.captionWordChip,
										onClick: () => setEditingId(s.id),
										children: word
									}, wi))
								})]
							}, s.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Editor_module_default.centerPanel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Editor_module_default.previewTopBar,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: Editor_module_default.aspectBtns,
								children: [
									{
										label: "Original",
										key: "original"
									},
									{
										label: "9:16",
										key: "916"
									},
									{
										label: "16:9",
										key: "169"
									},
									{
										label: "1:1",
										key: "11"
									},
									{
										label: "4:5",
										key: "45"
									}
								].map(({ label, key }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `${Editor_module_default.aspectBtn} ${aspect === key ? Editor_module_default.aspectBtnActive : ""}`,
									onClick: () => setAspect(key),
									children: label
								}, key))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: Editor_module_default.zoomControls,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPreviewZoom((z) => Math.max(50, z - 25)),
										className: Editor_module_default.zoomBtn,
										title: "Zoom Out",
										disabled: previewZoom <= 50,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { size: 12 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										style: {
											minWidth: 36,
											textAlign: "center",
											userSelect: "none"
										},
										children: [previewZoom, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPreviewZoom((z) => Math.min(150, z + 25)),
										className: Editor_module_default.zoomBtn,
										title: "Zoom In",
										disabled: previewZoom >= 150,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { size: 12 })
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Editor_module_default.canvas,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									height: previewDimensions.isLandscape ? `min(${Math.round(280 * (previewZoom / 100))}px, calc(100vh - 380px))` : `min(${Math.round(460 * (previewZoom / 100))}px, calc(100vh - 340px))`,
									aspectRatio: previewDimensions.ratio,
									maxHeight: "calc(100vh - 320px)",
									maxWidth: "92vw",
									background: "#09090b",
									borderRadius: previewDimensions.isLandscape ? "14px" : "28px",
									padding: "6px",
									border: "6px solid #1c1c20",
									boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
									position: "relative",
									overflow: "hidden",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionPlayer, {
									ref: playerRef,
									subtitles,
									preset,
									videoUrl,
									width: previewDimensions.compW,
									height: previewDimensions.compH,
									durationInFrames: Math.max(60, Math.ceil(totalDuration * 30)),
									controls: false,
									autoPlay: false,
									loop: false,
									playbackRate
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${Editor_module_default.rightPanel} ${rightPanelOpen ? Editor_module_default.rightPanelOpen : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: Editor_module_default.panelTabs,
							children: [
								"text",
								"templates",
								"brand"
							].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `${Editor_module_default.panelTab} ${panelTab === tab ? Editor_module_default.panelTabActive : ""}`,
								onClick: () => setPanelTab(tab),
								children: tab === "brand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										display: "inline-flex",
										alignItems: "center",
										gap: 4
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { size: 12 }), " Brand"]
								}) : tab.charAt(0).toUpperCase() + tab.slice(1)
							}, tab))
						}), panelTab === "brand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Editor_module_default.templatesBody,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: Editor_module_default.savePresetBtn,
									onClick: handleSaveBrandKit,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPlus, { size: 13 }), "Save Current as Kit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Editor_module_default.dynamicLabel,
									children: "My Kits"
								}),
								brandKits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										textAlign: "center",
										padding: "16px 0",
										fontSize: 11,
										color: "var(--text-secondary)",
										lineHeight: 1.6
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
											size: 28,
											style: {
												color: "var(--text-tertiary)",
												marginBottom: 8
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "No saved brand kits yet" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Save your current preset as a kit" })
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										gap: 6
									},
									children: brandKits.map((kit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											background: "var(--bg-base)",
											border: "1px solid var(--border-subtle)",
											borderRadius: 16,
											padding: "12px",
											boxShadow: "var(--shadow-card)"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													marginBottom: 8
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontSize: 12,
														fontWeight: 700,
														color: "var(--text-primary)"
													},
													children: kit.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
													text: "Delete kit",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleDeleteBrandKit(kit.id),
														style: {
															background: "none",
															border: "none",
															color: "var(--text-secondary)",
															cursor: "pointer",
															padding: 2,
															borderRadius: 4,
															display: "flex",
															transition: "color 150ms ease"
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													gap: 6,
													alignItems: "center"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
													width: 20,
													height: 20,
													borderRadius: 6,
													background: kit.color,
													border: "1px solid var(--border-base)",
													flexShrink: 0
												} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														flex: 1,
														fontSize: 11,
														color: "var(--text-secondary)",
														overflow: "hidden",
														textOverflow: "ellipsis",
														whiteSpace: "nowrap",
														fontWeight: 600
													},
													children: kit.font
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleApplyBrandKit(kit),
												style: {
													width: "100%",
													marginTop: 8,
													padding: "6px 0",
													borderRadius: 20,
													background: "var(--accent-dim)",
													border: "1px solid var(--primary)",
													color: "var(--primary)",
													fontSize: 11,
													fontWeight: 700,
													cursor: "pointer",
													fontFamily: "inherit",
													transition: "all var(--transition-fast)"
												},
												children: "Apply Kit"
											})
										]
									}, kit.id))
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: Editor_module_default.templatesBody,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Editor_module_default.subTabRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `${Editor_module_default.subTab} ${subTab === "builtin" ? Editor_module_default.subTabActive : ""}`,
										onClick: () => setSubTab("builtin"),
										children: "Built-in Templates"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `${Editor_module_default.subTab} ${subTab === "presets" ? Editor_module_default.subTabActive : ""}`,
										onClick: () => setSubTab("presets"),
										children: "My Presets"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Editor_module_default.searchRow,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 12,
										className: Editor_module_default.searchIcon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: Editor_module_default.searchInput,
										placeholder: "Find a template",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: Editor_module_default.savePresetBtn,
									onClick: handleSaveBrandKit,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPlus, { size: 13 }), "Save Preset"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Editor_module_default.dynamicLabel,
									children: "Dynamic Captions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: Editor_module_default.templateCards,
									children: PRESETS.filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `${Editor_module_default.templateCard} ${presetId === p.id ? Editor_module_default.templateCardActive : ""}`,
										onClick: () => setPresetId(p.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: Editor_module_default.templateCardName,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.name }),
												p.id === "forget-status" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: Editor_module_default.editorialBadge,
													children: "Editorial"
												}),
												p.id === "focus-deeply" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: Editor_module_default.editorialBadge,
													children: "Editorial"
												}),
												p.id === "the-big-red" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: Editor_module_default.newBadge,
													children: "New"
												}),
												p.id === "beast" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: Editor_module_default.hotBadge,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { size: 9 }), " Popular"]
												}),
												p.id === "karaoke" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: Editor_module_default.newBadge,
													children: "New"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: Editor_module_default.templatePreview,
											children: p.id === "forget-status" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													gap: 1
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontFamily: "'Playfair Display', Georgia, serif",
														fontStyle: "italic",
														fontSize: 17,
														color: "#ffffff",
														lineHeight: 1.1
													},
													children: "forget"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontFamily: "'Plus Jakarta Sans', sans-serif",
														fontWeight: 900,
														fontSize: 20,
														color: "#38bdf8",
														textTransform: "uppercase",
														letterSpacing: "0.03em",
														textShadow: "0 0 16px rgba(56,189,248,0.85)"
													},
													children: "STATUS"
												})]
											}) : p.id === "focus-deeply" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													gap: 1
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontFamily: "'Playfair Display', serif",
														fontStyle: "italic",
														fontSize: 17,
														color: "#ffffff",
														lineHeight: 1.1
													},
													children: "focus"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontFamily: "'Plus Jakarta Sans', sans-serif",
														fontWeight: 900,
														fontSize: 20,
														color: "#facc15",
														textTransform: "uppercase",
														letterSpacing: "0.03em",
														textShadow: "0 0 16px rgba(250,204,21,0.8)"
													},
													children: "DEEPLY"
												})]
											}) : p.id === "the-big-red" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													position: "relative",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													minHeight: 46
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontFamily: "'Cinzel', serif",
														fontWeight: 900,
														fontSize: 26,
														color: "#ef4444",
														textTransform: "uppercase",
														opacity: .85,
														letterSpacing: "0.08em",
														textShadow: "0 0 20px rgba(239,68,68,0.8)"
													},
													children: "SECOND"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														position: "absolute",
														fontFamily: "'Playfair Display', Georgia, serif",
														fontStyle: "italic",
														fontSize: 13,
														color: "#ffffff",
														textShadow: "0 2px 6px rgba(0,0,0,0.95)"
													},
													children: "every single"
												})]
											}) : p.id === "the-little-things" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 6,
													fontFamily: "'Caveat', cursive",
													fontSize: 18
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { color: "#ffffff" },
														children: "the"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: {
															background: "#facc15",
															color: "#000000",
															padding: "1px 8px",
															borderRadius: 9999,
															fontWeight: 700,
															transform: "rotate(-2deg)"
														},
														children: "little"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { color: "#ffffff" },
														children: "things"
													})
												]
											}) : p.id === "archives" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													flexDirection: "column",
													alignItems: "center"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: {
														fontFamily: "'Caveat', cursive",
														fontStyle: "italic",
														fontSize: 18,
														color: "#ffedd5"
													},
													children: [
														"Your ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															style: {
																color: "#ffffff",
																fontWeight: 700
															},
															children: "Style"
														}),
														" is it"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "60",
													height: "6",
													viewBox: "0 0 60 6",
													fill: "none",
													style: { marginTop: 2 },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "M1 3C10 5 20 1 30 3C40 5 50 1 59 3",
														stroke: "#fde047",
														strokeWidth: "1.5",
														strokeLinecap: "round"
													})
												})]
											}) : p.id === "blockbuster" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontFamily: "'Anton', sans-serif",
														fontSize: 18,
														color: "#ef4444",
														textTransform: "uppercase",
														letterSpacing: "0.06em",
														textShadow: "0 0 16px rgba(239,68,68,0.9)"
													},
													children: "THIS IS THE"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontFamily: "'Caveat', cursive",
														fontStyle: "italic",
														fontSize: 16,
														color: "#ffffff",
														marginTop: -4
													},
													children: "next big thing"
												})]
											}) : p.id === "beast" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 5,
													fontFamily: "'Plus Jakarta Sans', sans-serif",
													fontWeight: 900,
													fontSize: 16,
													textTransform: "uppercase"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														color: "#ffffff",
														textShadow: "0 2px 4px #000"
													},
													children: "DON'T"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														background: "#facc15",
														color: "#000000",
														padding: "2px 8px",
														borderRadius: 6,
														boxShadow: "0 0 12px rgba(250,204,21,0.6)",
														transform: "scale(1.05)"
													},
													children: "PANIC"
												})]
											}) : p.id === "ali-abdaal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 5,
													fontFamily: "'Inter', sans-serif",
													fontWeight: 700,
													fontSize: 14
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: { color: "#ffffff" },
													children: "Simple"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														color: "#facc15",
														borderBottom: "2px solid #facc15",
														paddingBottom: 1
													},
													children: "Productivity"
												})]
											}) : p.id === "neon-glow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontFamily: "'Plus Jakarta Sans', sans-serif",
													fontWeight: 900,
													fontSize: 17,
													color: "#22d3ee",
													textTransform: "uppercase",
													textShadow: "0 0 16px rgba(34,211,238,0.95), 0 0 30px rgba(34,211,238,0.6)"
												},
												children: "CYBER PULSE"
											}) : p.id === "karaoke" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 4,
													fontFamily: "'Plus Jakarta Sans', sans-serif",
													fontWeight: 800,
													fontSize: 15
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { color: "#a1a1aa" },
														children: "Sing"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: {
															color: "#ec4899",
															textShadow: "0 0 12px rgba(236,72,153,0.8)",
															transform: "scale(1.1)"
														},
														children: "ALONG"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { color: "#a1a1aa" },
														children: "now"
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 4,
													fontFamily: p.font || "inherit",
													fontWeight: p.weight || 800
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: {
															color: "#ffffff",
															fontSize: 13
														},
														children: "the"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: {
															color: p.color || "#facc15",
															fontSize: 16,
															textTransform: p.case === "uppercase" ? "uppercase" : "none",
															textShadow: p.shadow && p.shadow !== "none" ? p.shadow : "none"
														},
														children: p.name.split(" ")[0]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: {
															color: "#ffffff",
															fontSize: 13
														},
														children: "story"
													})
												]
											})
										})]
									}, p.id))
								})
							]
						})]
					})
				]
			}),
			leftPanelOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: Editor_module_default.panelOverlay,
				onClick: () => setLeftPanelOpen(false)
			}),
			rightPanelOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: Editor_module_default.panelOverlay,
				onClick: () => setRightPanelOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: Editor_module_default.panelToggleLeft,
				onClick: () => {
					setLeftPanelOpen((v) => !v);
					setRightPanelOpen(false);
				},
				title: leftPanelOpen ? "Close captions panel" : "Open captions panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { size: 14 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: Editor_module_default.panelToggleRight,
				onClick: () => {
					setRightPanelOpen((v) => !v);
					setLeftPanelOpen(false);
				},
				title: rightPanelOpen ? "Close presets panel" : "Open presets panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { size: 14 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: Editor_module_default.timeline,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						flex: 1,
						display: "flex",
						flexDirection: "column",
						minHeight: 0
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, {
						subtitles,
						currentTime,
						totalDuration: totalDuration || 30,
						videoSrc: videoUrl,
						zoom,
						onZoomChange: setZoom,
						onSeek: handleTimelineSeek,
						onUpdateSegment: (id, start, end) => {
							updateSegment(id, start, end);
						},
						onSplit: handleSplitSegment,
						onDelete: handleDeleteSegment,
						onAddSegment: (time) => {
							addSegment(time, time + 2, "New caption");
							push("New caption added");
						},
						selectedId: selectedSegId,
						onSelectSegment: setSelectedSegId,
						playing,
						onTogglePlay: togglePlay,
						onUndo: undo,
						onRedo: redo,
						canUndo,
						canRedo
					})
				})
			}),
			hookModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: overlayBase,
				onClick: () => {
					setHookModal(false);
					setGeneratedHook(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: modalBase,
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10,
								marginBottom: 16
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 32,
										height: 32,
										borderRadius: 16,
										background: "var(--accent-dim)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, {
										size: 16,
										style: { color: "var(--primary)" }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { flex: 1 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										style: {
											margin: 0,
											fontSize: 16,
											fontWeight: 700,
											color: "var(--text-primary)",
											fontFamily: "var(--font-serif)",
											italic: "true"
										},
										children: "AI Hook Generator"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: 0,
											fontSize: 12,
											color: "var(--text-secondary)",
											fontWeight: 500
										},
										children: "Rewrite your opening 30 seconds"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setHookModal(false);
										setGeneratedHook(null);
									},
									style: {
										background: "rgba(0,0,0,0.03)",
										border: "none",
										color: "var(--text-secondary)",
										cursor: "pointer",
										width: 28,
										height: 28,
										borderRadius: 9999,
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
								})
							]
						}),
						!generatedHook ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									fontSize: 13,
									color: "var(--text-secondary)",
									marginBottom: 16,
									lineHeight: 1.5
								},
								children: "Your opening hook decides everything. AI analyzes your transcript and rewrites the first line to maximize retention."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "var(--bg-base)",
									borderRadius: 12,
									padding: 14,
									marginBottom: 16,
									fontSize: 12,
									color: "var(--text-secondary)",
									maxHeight: 120,
									overflow: "auto",
									lineHeight: 1.6,
									border: "1px solid var(--border-subtle)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											color: "var(--primary)",
											fontSize: 10,
											fontWeight: 700,
											marginBottom: 6,
											textTransform: "uppercase",
											letterSpacing: "0.05em"
										},
										children: "Current Transcript"
									}),
									fullTranscript.slice(0, 300),
									fullTranscript.length > 300 ? "…" : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleGenerateHook,
								disabled: generatingHook,
								style: {
									width: "100%",
									padding: "12px 0",
									borderRadius: 24,
									background: generatingHook ? "var(--border-strong)" : "var(--primary)",
									color: "#ffffff",
									fontSize: 13,
									fontWeight: 700,
									border: "none",
									cursor: generatingHook ? "not-allowed" : "pointer",
									transition: "all var(--transition-fast)"
								},
								children: generatingHook ? "Generating..." : "Generate Hook"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: "var(--accent-dim)",
								border: "1px solid var(--primary)",
								borderRadius: 16,
								padding: 16,
								marginBottom: 16
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									color: "var(--primary)",
									fontSize: 10,
									fontWeight: 700,
									marginBottom: 6,
									textTransform: "uppercase",
									letterSpacing: "0.05em"
								},
								children: "AI Generated Hook"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: {
									fontSize: 15,
									color: "var(--text-primary)",
									fontWeight: 700,
									margin: 0,
									lineHeight: 1.5
								},
								children: [
									"\"",
									generatedHook,
									"\""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: applyHook,
								style: {
									flex: 1,
									padding: "12px 0",
									borderRadius: 24,
									background: "var(--primary)",
									color: "#ffffff",
									fontSize: 13,
									fontWeight: 700,
									border: "none",
									cursor: "pointer",
									transition: "all var(--transition-fast)"
								},
								children: "Apply Hook"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleGenerateHook,
								disabled: generatingHook,
								style: {
									flex: 1,
									padding: "12px 0",
									borderRadius: 24,
									background: "var(--bg-base)",
									color: "var(--text-secondary)",
									fontSize: 13,
									fontWeight: 700,
									border: "1px solid var(--border-base)",
									cursor: "pointer",
									transition: "all var(--transition-fast)"
								},
								children: "Regenerate"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setHookModal(false);
								setGeneratedHook(null);
							},
							style: {
								width: "100%",
								marginTop: 10,
								padding: "8px 0",
								borderRadius: 24,
								background: "transparent",
								color: "var(--text-tertiary)",
								fontSize: 12,
								border: "none",
								cursor: "pointer",
								fontWeight: 600
							},
							children: "Cancel"
						})
					]
				})
			}),
			translateModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: overlayBase,
				onClick: () => {
					setTranslateModal(false);
					setTranslateLang(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: modalBase,
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10,
								marginBottom: 16
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										width: 32,
										height: 32,
										borderRadius: 16,
										background: "var(--accent-dim)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
										size: 16,
										style: { color: "var(--primary)" }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { flex: 1 },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										style: {
											margin: 0,
											fontSize: 16,
											fontWeight: 700,
											color: "var(--text-primary)",
											fontFamily: "var(--font-serif)",
											italic: "true"
										},
										children: "Auto-Translate"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										style: {
											margin: 0,
											fontSize: 12,
											color: "var(--text-secondary)"
										},
										children: "Select a target Indian language"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setTranslateModal(false);
										setTranslateLang(null);
									},
									style: {
										background: "rgba(0,0,0,0.03)",
										border: "none",
										color: "var(--text-secondary)",
										cursor: "pointer",
										width: 28,
										height: 28,
										borderRadius: 9999,
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
								gap: 8,
								marginBottom: 16
							},
							children: INDIAN_LANGUAGES.map((lang) => {
								const selected = translateLang === lang.code;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTranslateLang(lang.code),
									style: {
										padding: "10px 12px",
										borderRadius: 16,
										background: selected ? "var(--accent-dim)" : "rgba(0,0,0,0.02)",
										border: selected ? "1px solid var(--primary)" : "1px solid var(--border-base)",
										cursor: "pointer",
										textAlign: "left",
										fontFamily: "inherit",
										transition: "all var(--transition-fast)",
										position: "relative"
									},
									children: [
										selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												position: "absolute",
												top: 6,
												right: 6,
												width: 16,
												height: 16,
												borderRadius: 9999,
												background: "var(--primary)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												size: 10,
												strokeWidth: 3,
												style: { color: "#fff" }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: 13,
												fontWeight: 700,
												color: "var(--text-primary)",
												marginBottom: 2
											},
											children: lang.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: 11,
												color: "var(--text-secondary)"
											},
											children: lang.native
										})
									]
								}, lang.code);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setTranslateModal(false);
									setTranslateLang(null);
								},
								style: {
									flex: 1,
									padding: "12px 0",
									borderRadius: 24,
									background: "var(--bg-base)",
									color: "var(--text-secondary)",
									fontSize: 13,
									fontWeight: 700,
									border: "1px solid var(--border-base)",
									cursor: "pointer",
									fontFamily: "inherit",
									transition: "all var(--transition-fast)"
								},
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleTranslate,
								disabled: !translateLang,
								style: {
									flex: 1,
									padding: "12px 0",
									borderRadius: 24,
									background: translateLang ? "var(--primary)" : "var(--border-strong)",
									color: "#ffffff",
									fontSize: 13,
									fontWeight: 700,
									border: "none",
									cursor: translateLang ? "pointer" : "not-allowed",
									fontFamily: "inherit",
									transition: "all var(--transition-fast)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 6
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { size: 14 }), "Translate"]
							})]
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
export { EditorPage as component };
