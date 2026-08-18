import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import { WaveformCanvas } from "./WaveformCanvas";
import { useAudioWaveform } from "./useAudioWaveform";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Trash2,
  Plus,
  Zap,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Type,
  Video,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Magnet,
} from "lucide-react";

const PX_PER_SEC = 120;
const MIN_SEGMENT_PX = 24;
const SNAP_INTERVAL = 0.1;
const MIN_SEGMENT_DUR = 0.2;

function fmt(t) {
  if (t == null || isNaN(t)) return "00:00.0";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const ms = Math.floor((t % 1) * 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${ms}`;
}

function fmtShort(t) {
  if (t == null || isNaN(t)) return "00:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Timeline({
  subtitles = [],
  currentTime = 0,
  totalDuration = 30,
  videoSrc,
  zoom = 1,
  onZoomChange,
  onSeek,
  onUpdateSegment,
  onSplit,
  onDelete,
  onAddSegment,
  selectedId,
  onSelectSegment,
  playing = false,
  onTogglePlay,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}) {
  const rulerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const trackRef = useRef(null);

  const [viewMode, setViewMode] = useState("line"); // "word" | "line"
  const [muted, setMuted] = useState(false);
  const [snapping, setSnapping] = useState(true);
  const [dragging, setDragging] = useState(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [textLocked, setTextLocked] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoVisible, setVideoVisible] = useState(true);

  // Audio VU Meter animated levels
  const [vuLevel, setVuLevel] = useState({ left: 0.6, right: 0.5 });
  useEffect(() => {
    if (!playing) {
      setVuLevel({ left: 0.05, right: 0.05 });
      return;
    }
    const interval = setInterval(() => {
      setVuLevel({
        left: Math.min(1, Math.max(0.15, 0.4 + Math.random() * 0.55)),
        right: Math.min(1, Math.max(0.15, 0.35 + Math.random() * 0.6)),
      });
    }, 80);
    return () => clearInterval(interval);
  }, [playing]);

  const totalPx = Math.max(900, totalDuration * PX_PER_SEC * zoom);
  const playheadPx = (currentTime / Math.max(0.1, totalDuration)) * totalPx;

  const { peaks, isReady } = useAudioWaveform(videoSrc, totalDuration);

  const snap = useCallback(
    (val) => {
      if (!snapping) return val;
      return Math.round(val / SNAP_INTERVAL) * SNAP_INTERVAL;
    },
    [snapping]
  );

  const calcTimeFromX = useCallback(
    (clientX) => {
      if (!scrollContainerRef.current) return 0;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const x = clientX - rect.left + scrollLeft;
      return Math.max(0, Math.min((x / totalPx) * totalDuration, totalDuration));
    },
    [totalPx, totalDuration]
  );

  // Ruler scrub interaction
  const handleRulerMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      const time = calcTimeFromX(e.clientX);
      onSeek(time);
      setScrubbing(true);
    },
    [calcTimeFromX, onSeek]
  );

  useEffect(() => {
    if (!scrubbing) return;
    const handleMove = (e) => {
      const time = calcTimeFromX(e.clientX);
      onSeek(time);
    };
    const handleUp = () => setScrubbing(false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [scrubbing, calcTimeFromX, onSeek]);

  // Click empty track to seek
  const handleTrackClick = useCallback(
    (e) => {
      if (dragging || scrubbing) return;
      if (e.target.closest("[data-segment]")) return;
      const time = calcTimeFromX(e.clientX);
      onSeek(time);
      onSelectSegment?.(null);
    },
    [dragging, scrubbing, calcTimeFromX, onSeek, onSelectSegment]
  );

  // Drag block to move / trim
  const handleSegmentMouseDown = useCallback(
    (e, sub, edge) => {
      if (textLocked) return;
      e.preventDefault();
      e.stopPropagation();
      onSelectSegment?.(sub.id);
      setDragging({
        id: sub.id,
        edge,
        startX: e.clientX,
        origStart: sub.start,
        origEnd: sub.end,
      });
    },
    [onSelectSegment, textLocked]
  );

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e) => {
      const dx = e.clientX - dragging.startX;
      const dt = (dx / totalPx) * totalDuration;

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
  }, [dragging, totalPx, totalDuration, onUpdateSegment, snap]);

  // Keep playhead visible during playback
  useEffect(() => {
    if (!playing || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const viewWidth = container.clientWidth;
    const px = (currentTime / totalDuration) * totalPx;
    const scrollLeft = container.scrollLeft;
    if (px < scrollLeft + 80 || px > scrollLeft + viewWidth - 80) {
      container.scrollLeft = px - viewWidth / 2;
    }
  }, [playing, currentTime, totalDuration, totalPx]);

  // Zoom with Ctrl + Wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        onZoomChange?.(Math.max(0.3, Math.min(5, zoom + delta)));
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [zoom, onZoomChange]);

  const getSubLeft = useCallback(
    (sub) => (sub.start / Math.max(0.1, totalDuration)) * totalPx,
    [totalDuration, totalPx]
  );
  const getSubWidth = useCallback(
    (sub) =>
      Math.max(
        ((sub.end - sub.start) / Math.max(0.1, totalDuration)) * totalPx,
        MIN_SEGMENT_PX
      ),
    [totalDuration, totalPx]
  );

  // Ruler tick generation
  const rulerTicks = useMemo(() => {
    const ticks = [];
    const pixelsPerSec = PX_PER_SEC * zoom;
    let tickInterval = 1;
    if (pixelsPerSec < 30) tickInterval = 10;
    else if (pixelsPerSec < 60) tickInterval = 5;
    else if (pixelsPerSec < 120) tickInterval = 2;
    else if (pixelsPerSec > 350) tickInterval = 0.5;

    for (let t = 0; t <= totalDuration + tickInterval; t += tickInterval) {
      const isMajor = tickInterval >= 1 ? t % (tickInterval * 5) === 0 || t === 0 : t % 1 === 0;
      ticks.push({ time: t, isMajor });
    }
    return ticks;
  }, [totalDuration, zoom]);

  const zoomIn = () => onZoomChange?.(Math.min(5, zoom + 0.25));
  const zoomOut = () => onZoomChange?.(Math.max(0.3, zoom - 0.25));
  const zoomFit = () => {
    if (scrollContainerRef.current) {
      const viewWidth = scrollContainerRef.current.clientWidth;
      const fitZoom = Math.max(0.3, viewWidth / (totalDuration * PX_PER_SEC));
      onZoomChange?.(Math.min(5, fitZoom));
    }
  };

  const skipPrev = () => {
    const prev = [...subtitles].reverse().find((s) => s.start < currentTime - 0.1);
    if (prev) onSeek(prev.start);
    else onSeek(0);
  };

  const skipNext = () => {
    const next = subtitles.find((s) => s.start > currentTime + 0.1);
    if (next) onSeek(next.start);
    else onSeek(totalDuration);
  };

  // Convert segments to word-level pills if in "word" mode
  const displayedItems = useMemo(() => {
    if (viewMode === "line") {
      return subtitles.map((s) => ({
        id: s.id,
        parentId: s.id,
        start: s.start,
        end: s.end,
        text: s.text,
        isWord: false,
      }));
    }
    // Word mode: expand each subtitle into its individual word blocks
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
          isWord: true,
        });
      });
    });
    return items;
  }, [subtitles, viewMode]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        userSelect: "none",
        background: "#0a0a0c",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "#ffffff",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
    >
      {/* 1. TOP NLE CONTROL TOOLBAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 14px",
          background: "#121215",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          height: 44,
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Left: Transport Player Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            onClick={skipPrev}
            style={styles.iconBtn}
            title="Previous Segment (Home)"
          >
            <SkipBack size={13} />
          </button>

          {/* Large Terracotta Brand Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            style={{
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
              transition: "transform 0.15s ease",
            }}
            title="Play / Pause (Spacebar)"
          >
            {playing ? <Pause size={14} fill="#FFFFFF" /> : <Play size={14} fill="#FFFFFF" style={{ marginLeft: 2 }} />}
          </button>

          <button
            onClick={skipNext}
            style={styles.iconBtn}
            title="Next Segment (End)"
          >
            <SkipForward size={13} />
          </button>

          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", margin: "0 4px" }} />

          {/* Undo / Redo */}
          <button
            onClick={onUndo}
            disabled={!canUndo}
            style={{ ...styles.iconBtn, opacity: canUndo ? 1 : 0.35 }}
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw size={13} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            style={{ ...styles.iconBtn, opacity: canRedo ? 1 : 0.35 }}
            title="Redo (Ctrl+Y)"
          >
            <RotateCw size={13} />
          </button>

          {/* Delete */}
          <button
            onClick={() => selectedId && onDelete?.(selectedId)}
            disabled={!selectedId}
            style={{
              ...styles.iconBtn,
              color: selectedId ? "#ef4444" : "rgba(255,255,255,0.3)",
              opacity: selectedId ? 1 : 0.35,
            }}
            title="Delete Selected Segment (Del)"
          >
            <Trash2 size={13} />
          </button>
        </div>

        {/* Center: WORD | LINE Toggle & Editing Tools */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* WORD | LINE Pill Switcher */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#0E0E10",
              borderRadius: 9999,
              padding: 3,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <button
              onClick={() => setViewMode("word")}
              style={{
                background: viewMode === "word" ? "#D97736" : "transparent",
                color: viewMode === "word" ? "#FFFFFF" : "#A1A1AA",
                fontWeight: 700,
                fontSize: 10,
                padding: "3px 12px",
                borderRadius: 9999,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              WORD
            </button>
            <button
              onClick={() => setViewMode("line")}
              style={{
                background: viewMode === "line" ? "#D97736" : "transparent",
                color: viewMode === "line" ? "#FFFFFF" : "#A1A1AA",
                fontWeight: 700,
                fontSize: 10,
                padding: "3px 12px",
                borderRadius: 9999,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              LINE
            </button>
          </div>

          {/* + Line Action */}
          <button
            onClick={() => onAddSegment?.(currentTime)}
            style={{
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
              cursor: "pointer",
            }}
            title="Add New Caption at Playhead"
          >
            <Plus size={12} />
            <span>Line</span>
          </button>

          {/* ⚡ Split Razor */}
          <button
            onClick={() => selectedId && onSplit?.(selectedId, currentTime)}
            disabled={!selectedId}
            style={{
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
              cursor: selectedId ? "pointer" : "default",
            }}
            title="Split at Playhead (S)"
          >
            <Zap size={11} fill={selectedId ? "#D97736" : "none"} />
            <span>Split</span>
          </button>

          {/* Magnetic Snapping Toggle */}
          <button
            onClick={() => setSnapping(!snapping)}
            style={{
              ...styles.iconBtn,
              color: snapping ? "#38bdf8" : "rgba(255,255,255,0.3)",
              background: snapping ? "rgba(56,189,248,0.1)" : "transparent",
            }}
            title={snapping ? "Magnetic Snapping ON (N)" : "Magnetic Snapping OFF"}
          >
            <Magnet size={13} />
          </button>
        </div>

        {/* Right: Timecode, VU Meter & Zoom Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Live Audio Decibel Stereo VU Meter */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "2px 6px",
              background: "#08080a",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            title="Master Audio VU Meter (dB)"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 7, color: "#71717a", width: 6 }}>L</span>
              <div style={{ width: 36, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${Math.round(vuLevel.left * 100)}%`,
                    height: "100%",
                    background: vuLevel.left > 0.85 ? "#ef4444" : vuLevel.left > 0.65 ? "#facc15" : "#10b981",
                    transition: "width 0.08s linear",
                  }}
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 7, color: "#71717a", width: 6 }}>R</span>
              <div style={{ width: 36, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${Math.round(vuLevel.right * 100)}%`,
                    height: "100%",
                    background: vuLevel.right > 0.85 ? "#ef4444" : vuLevel.right > 0.65 ? "#facc15" : "#10b981",
                    transition: "width 0.08s linear",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Timecode with Gold Progress Indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, fontFamily: "ui-monospace, monospace", color: "#facc15" }}>
              {fmtShort(currentTime)}
            </span>
            <span style={{ fontSize: 10, color: "#71717a" }}>/</span>
            <span style={{ fontSize: 11, fontFamily: "ui-monospace, monospace", color: "#a1a1aa" }}>
              {fmtShort(totalDuration)}
            </span>
          </div>

          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} />

          {/* Zoom Slider */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={zoomOut} style={styles.iconBtn} title="Zoom Out (Ctrl+Scroll)">
              <ZoomOut size={12} />
            </button>

            <input
              type="range"
              min="0.3"
              max="5"
              step="0.1"
              value={zoom}
              onChange={(e) => onZoomChange?.(parseFloat(e.target.value))}
              style={{
                width: 60,
                accentColor: "#f59e0b",
                cursor: "pointer",
                height: 4,
              }}
            />

            <span style={{ fontSize: 10, fontFamily: "ui-monospace, monospace", color: "#a1a1aa", minWidth: 32, textAlign: "center" }}>
              {Math.round(zoom * 100)}%
            </span>

            <button onClick={zoomIn} style={styles.iconBtn} title="Zoom In (Ctrl+Scroll)">
              <ZoomIn size={12} />
            </button>

            <button onClick={zoomFit} style={{ ...styles.iconBtn, marginLeft: 2 }} title="Fit to Screen">
              <Maximize2 size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MULTI-TRACK NLE TIMELINE WITH LEFT TRACK HEADERS */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* LEFT TRACK HEADER COLUMN */}
        <div
          style={{
            width: 100,
            background: "#111114",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            zIndex: 15,
          }}
        >
          {/* Header Spacer (Ruler height) */}
          <div
            style={{
              height: 24,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "#0c0c0f",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
            }}
          >
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.08em", color: "#52525b" }}>TRACKS</span>
          </div>

          {/* T1 Track Header (Captions) */}
          <div
            style={{
              height: 56,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              background: textLocked ? "rgba(239,68,68,0.05)" : "transparent",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#facc15" }}>T1</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#d4d4d8" }}>Text</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button
                onClick={() => setTextVisible(!textVisible)}
                style={styles.trackControlBtn}
                title={textVisible ? "Hide Track" : "Show Track"}
              >
                {textVisible ? <Eye size={10} color="#a1a1aa" /> : <EyeOff size={10} color="#ef4444" />}
              </button>
              <button
                onClick={() => setTextLocked(!textLocked)}
                style={styles.trackControlBtn}
                title={textLocked ? "Unlock Track" : "Lock Track"}
              >
                {textLocked ? <Lock size={10} color="#f59e0b" /> : <Unlock size={10} color="#71717a" />}
              </button>
            </div>
          </div>

          {/* A1 Track Header (Audio) */}
          <div
            style={{
              height: 48,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#2dd4bf" }}>A1</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#d4d4d8" }}>Audio</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button
                onClick={() => setAudioMuted(!audioMuted)}
                style={styles.trackControlBtn}
                title={audioMuted ? "Unmute Track" : "Mute Track"}
              >
                {audioMuted ? <VolumeX size={10} color="#ef4444" /> : <Volume2 size={10} color="#10b981" />}
              </button>
            </div>
          </div>

          {/* V1 Track Header (Video Filmstrip) */}
          <div
            style={{
              height: 42,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#38bdf8" }}>V1</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#d4d4d8" }}>Video</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button
                onClick={() => setVideoVisible(!videoVisible)}
                style={styles.trackControlBtn}
                title={videoVisible ? "Hide Video Track" : "Show Video Track"}
              >
                {videoVisible ? <Eye size={10} color="#a1a1aa" /> : <EyeOff size={10} color="#ef4444" />}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SCROLLABLE TIMELINE TRACKS */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowX: "auto",
            overflowY: "hidden",
            position: "relative",
            background: "#0a0a0c",
          }}
        >
          <div style={{ position: "relative", width: totalPx, minHeight: "100%" }}>
            {/* A. TIME RULER */}
            <div
              ref={rulerRef}
              onMouseDown={handleRulerMouseDown}
              style={{
                height: 24,
                position: "relative",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                background: "#0c0c0f",
                cursor: "col-resize",
              }}
            >
              {rulerTicks.map(({ time: t, isMajor }, i) => {
                const left = (t / Math.max(0.1, totalDuration)) * totalPx;
                return (
                  <div key={i} style={{ position: "absolute", left, top: 0, bottom: 0, pointerEvents: "none" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 1,
                        height: isMajor ? 14 : 6,
                        background: isMajor ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                      }}
                    />
                    {isMajor && (
                      <span
                        style={{
                          position: "absolute",
                          left: 4,
                          top: 2,
                          fontSize: 9,
                          color: "#71717a",
                          fontFamily: "ui-monospace, monospace",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fmtShort(t)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* B. TRACK 1: CAPTIONS / SUBTITLE CAPSULES (YELLOW PILLS) */}
            <div
              ref={trackRef}
              onClick={handleTrackClick}
              style={{
                height: 56,
                position: "relative",
                background: textLocked ? "rgba(239,68,68,0.02)" : "#101014",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "6px 0",
                opacity: textVisible ? 1 : 0.2,
              }}
            >
              {displayedItems.map((item) => {
                const left = getSubLeft(item);
                const width = getSubWidth(item);
                const isSelected = selectedId === item.parentId || selectedId === item.id;
                const isActive = currentTime >= item.start && currentTime <= item.end;

                return (
                  <div
                    key={item.id}
                    data-segment
                    onMouseDown={(e) => {
                      if (viewMode === "line") {
                        const orig = subtitles.find((s) => s.id === item.id);
                        if (orig) handleSegmentMouseDown(e, orig, "move");
                      } else {
                        onSelectSegment?.(item.parentId);
                      }
                    }}
                    style={{
                      position: "absolute",
                      left,
                      top: 6,
                      width,
                      height: 42,
                      borderRadius: 8,
                      // Luxury Terracotta Amber Capsules matching SubAI Brand:
                      background: isSelected
                        ? "linear-gradient(135deg, #D97736, #B2501F)"
                        : isActive
                          ? "rgba(217, 119, 54, 0.35)"
                          : "rgba(217, 119, 54, 0.18)",
                      border: isSelected
                        ? "2px solid #FFFFFF"
                        : isActive
                          ? "1px solid #D97736"
                          : "1px solid rgba(217, 119, 54, 0.35)",
                      boxShadow: isSelected
                        ? "0 0 16px rgba(217,119,54,0.6), 0 2px 8px rgba(0,0,0,0.5)"
                        : isActive
                          ? "0 0 10px rgba(217,119,54,0.3)"
                          : "0 2px 6px rgba(0,0,0,0.2)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "0 10px",
                      cursor: textLocked ? "default" : dragging?.id === item.id ? "grabbing" : "grab",
                      zIndex: isSelected ? 8 : isActive ? 6 : 4,
                      overflow: "hidden",
                      transition: dragging?.id === item.id ? "none" : "all 0.12s ease",
                    }}
                  >
                    {/* Top Text Snippet */}
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: isSelected ? "#FFFFFF" : "#F5F5F0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        pointerEvents: "none",
                      }}
                    >
                      {item.text}
                    </span>

                    {/* Subtitle Badge: "I Text" */}
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 1, pointerEvents: "none" }}>
                      <Type size={8} color={isSelected ? "rgba(255,255,255,0.8)" : "rgba(217,119,54,0.9)"} />
                      <span style={{ fontSize: 8, fontStyle: "italic", fontWeight: 600, color: isSelected ? "rgba(255,255,255,0.8)" : "rgba(217,119,54,0.9)" }}>
                        {item.isWord ? "Word" : "Text"}
                      </span>
                    </div>

                    {/* Left Trim Handle */}
                    {viewMode === "line" && !textLocked && (
                      <div
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          const orig = subtitles.find((s) => s.id === item.id);
                          if (orig) handleSegmentMouseDown(e, orig, "start");
                        }}
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 7,
                          cursor: "ew-resize",
                          background: "rgba(0,0,0,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 1.5, height: 14, background: "#D97736", borderRadius: 1 }} />
                      </div>
                    )}

                    {/* Right Trim Handle */}
                    {viewMode === "line" && !textLocked && (
                      <div
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          const orig = subtitles.find((s) => s.id === item.id);
                          if (orig) handleSegmentMouseDown(e, orig, "end");
                        }}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: 7,
                          cursor: "ew-resize",
                          background: "rgba(0,0,0,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 1.5, height: 14, background: "#D97736", borderRadius: 1 }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* C. TRACK 2: REAL AUDIO WAVEFORM TRACK */}
            <div
              style={{
                height: 48,
                position: "relative",
                background: "#0c0c0f",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isReady && peaks ? (
                <WaveformCanvas
                  peaks={peaks}
                  duration={totalDuration}
                  zoom={zoom}
                  currentTime={currentTime}
                  width={totalPx}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 16 }}>
                  <span style={{ fontSize: 10, color: "#52525b" }}>Extracting audio waveform...</span>
                </div>
              )}
            </div>

            {/* D. TRACK 3: REAL VIDEO FILMSTRIP TRACK (V1) */}
            <div
              style={{
                height: 42,
                position: "relative",
                background: "#09090b",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {/* Filmstrip frame blocks */}
              {Array.from({ length: Math.ceil(totalPx / 72) + 1 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: 70,
                    height: 34,
                    marginRight: 2,
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Video size={13} color="rgba(255,255,255,0.15)" />
                </div>
              ))}
            </div>

            {/* E. MAGNETIC PLAYHEAD NEEDLE */}
            <div
              style={{
                position: "absolute",
                left: playheadPx,
                top: 0,
                bottom: 0,
                width: 2,
                background: "#D97736",
                zIndex: 30,
                pointerEvents: "none",
                boxShadow: "0 0 10px rgba(217,119,54,0.8)",
                transition: dragging || scrubbing ? "none" : "left 0.04s linear",
              }}
            >
              {/* Round Knob Needle Head */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#D97736",
                  boxShadow: "0 0 8px rgba(217,119,54,0.9)",
                  border: "2px solid #FFFFFF",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    transition: "background 0.12s ease",
  },
  trackControlBtn: {
    background: "transparent",
    border: "none",
    padding: "2px 4px",
    borderRadius: 3,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
