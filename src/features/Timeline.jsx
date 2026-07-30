import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import { WaveformCanvas } from "./WaveformCanvas";
import { useAudioWaveform } from "./useAudioWaveform";
import {
  Scissors,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

const PX_PER_SEC = 120;
const MIN_SEGMENT_PX = 20;
const SNAP_INTERVAL = 0.25;
const MIN_SEGMENT_DUR = 0.2;

function fmt(t) {
  if (t == null || isNaN(t)) return "0:00.0";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const ms = Math.floor((t % 1) * 10);
  return `${m}:${String(s).padStart(2, "0")}.${ms}`;
}

function fmtShort(t) {
  if (t == null || isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function Timeline({
  subtitles,
  currentTime,
  totalDuration,
  videoSrc,
  zoom,
  onZoomChange,
  onSeek,
  onUpdateSegment,
  onSplit,
  onDelete,
  selectedId,
  onSelectSegment,
  playing,
}) {
  const rulerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [scrubbing, setScrubbing] = useState(false);

  const totalPx = totalDuration * PX_PER_SEC * zoom;
  const playheadPx = (currentTime / totalDuration) * totalPx;

  const { peaks, isReady } = useAudioWaveform(videoSrc, totalDuration);

  const snap = useCallback((val) => Math.round(val / SNAP_INTERVAL) * SNAP_INTERVAL, []);

  const calcTimeFromX = useCallback(
    (clientX) => {
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const x = clientX - rect.left + scrollLeft;
      return Math.max(0, Math.min((x / totalPx) * totalDuration, totalDuration));
    },
    [totalPx, totalDuration]
  );

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

  const handleSegmentMouseDown = useCallback(
    (e, sub, edge) => {
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
    [onSelectSegment]
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

      onUpdateSegment(dragging.id, Math.max(0, newStart), Math.min(totalDuration, newEnd));
    };
    const handleMouseUp = () => setDragging(null);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, totalPx, totalDuration, onUpdateSegment, snap]);

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        onZoomChange?.(Math.max(0.25, Math.min(8, zoom + delta)));
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [zoom, onZoomChange]);

  const getSubLeft = useCallback((sub) => (sub.start / totalDuration) * totalPx, [totalDuration, totalPx]);
  const getSubWidth = useCallback((sub) => Math.max(((sub.end - sub.start) / totalDuration) * totalPx, MIN_SEGMENT_PX), [totalDuration, totalPx]);

  const rulerTicks = useMemo(() => {
    const ticks = [];
    const pixelsPerSec = PX_PER_SEC * zoom;
    let tickInterval = 1;
    if (pixelsPerSec < 30) tickInterval = 10;
    else if (pixelsPerSec < 60) tickInterval = 5;
    else if (pixelsPerSec < 120) tickInterval = 2;
    else if (pixelsPerSec > 400) tickInterval = 0.5;
    else if (pixelsPerSec > 800) tickInterval = 0.25;

    for (let t = 0; t <= totalDuration; t += tickInterval) {
      const isMajor = tickInterval >= 1 ? t % (tickInterval * 5) === 0 : t % 1 === 0;
      ticks.push({ time: t, isMajor });
    }
    return ticks;
  }, [totalDuration, zoom]);

  const zoomIn = () => onZoomChange?.(Math.min(8, zoom + 0.5));
  const zoomOut = () => onZoomChange?.(Math.max(0.25, zoom - 0.5));
  const zoomFit = () => {
    if (scrollContainerRef.current) {
      const viewWidth = scrollContainerRef.current.clientWidth;
      const fitZoom = Math.max(0.25, viewWidth / (totalDuration * PX_PER_SEC));
      onZoomChange?.(Math.min(8, fitZoom));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", userSelect: "none" }}>
      {/* Transport bar */}
      <div style={styles.transportBar}>
        <div style={styles.transportLeft}>
          <span style={styles.timecodeDisplay}>{fmt(currentTime)}</span>
          <span style={styles.timecodeSep}>/</span>
          <span style={styles.timecodeTotal}>{fmt(totalDuration)}</span>
        </div>

        <div style={styles.transportCenter}>
          {onSplit && (
            <button
              style={styles.toolBtn}
              onClick={() => selectedId && onSplit(selectedId, currentTime)}
              title="Split at playhead (Ctrl+B)"
            >
              <Scissors size={12} />
            </button>
          )}
          {onDelete && (
            <button
              style={{ ...styles.toolBtn, ...(selectedId ? styles.toolBtnDanger : {}) }}
              onClick={() => selectedId && onDelete(selectedId)}
              title="Delete selected (Delete)"
              disabled={!selectedId}
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>

        <div style={styles.transportRight}>
          <button style={styles.zoomBtn} onClick={zoomOut} title="Zoom out">
            <ZoomOut size={12} />
          </button>
          <span style={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button style={styles.zoomBtn} onClick={zoomIn} title="Zoom in">
            <ZoomIn size={12} />
          </button>
          <button style={{ ...styles.zoomBtn, marginLeft: 4 }} onClick={zoomFit} title="Fit to view">
            <Maximize2 size={11} />
          </button>
        </div>
      </div>

      {/* Scrollable timeline area */}
      <div style={styles.timelineBody}>
        {/* Track labels */}
        <div style={styles.trackLabels}>
          <div style={styles.trackLabelRow}>
            <span style={styles.trackLabelText}>WAVEFORM</span>
          </div>
          <div style={{ ...styles.trackLabelRow, ...styles.trackLabelRowBottom }}>
            <span style={styles.trackLabelText}>CAPTIONS</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollContainerRef}
          style={styles.scrollContainer}
        >
          <div style={{ position: "relative", width: totalPx, minHeight: "100%" }}>
            {/* Ruler */}
            <div
              ref={rulerRef}
              style={styles.ruler}
              onMouseDown={handleRulerMouseDown}
            >
              {rulerTicks.map(({ time: t, isMajor }, i) => {
                const left = (t / totalDuration) * totalPx;
                return (
                  <div key={i} style={{ position: "absolute", left, top: 0, bottom: 0, pointerEvents: "none" }}>
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 1,
                        height: isMajor ? 16 : 7,
                        background: isMajor ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                      }}
                    />
                    {isMajor && (
                      <span style={styles.rulerLabel}>{fmtShort(t)}</span>
                    )}
                  </div>
                );
              })}

              {/* Ruler playhead indicator */}
              <div
                style={{
                  position: "absolute",
                  left: playheadPx,
                  top: 0,
                  width: 1,
                  height: "100%",
                  background: "#D97736",
                  zIndex: 5,
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Waveform track */}
            <div style={styles.waveformTrack}>
              {isReady && peaks ? (
                <WaveformCanvas
                  peaks={peaks}
                  duration={totalDuration}
                  zoom={zoom}
                  currentTime={currentTime}
                />
              ) : (
                <div style={styles.waveformPlaceholder}>
                  <span style={{ fontSize: 9, color: "#3f3f46" }}>Loading waveform...</span>
                </div>
              )}

              {/* Waveform playhead */}
              <div
                style={{
                  position: "absolute",
                  left: playheadPx,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "#D97736",
                  zIndex: 5,
                  pointerEvents: "none",
                  boxShadow: "0 0 6px rgba(217,119,6,0.4)",
                  transition: dragging || scrubbing ? "none" : "left 0.06s linear",
                }}
              />
            </div>

            {/* Divider */}
            <div style={styles.trackDivider} />

            {/* Subtitle track */}
            <div
              ref={trackRef}
              style={styles.subtitleTrack}
              onClick={handleTrackClick}
            >
              {/* Background grid */}
              {Array.from({ length: Math.ceil(totalPx / (60 * zoom)) + 1 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: i * 60 * zoom,
                    top: 0,
                    bottom: 0,
                    width: 1,
                    background: "rgba(255,255,255,0.02)",
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* Subtitle segments */}
              {subtitles.map((sub) => {
                const left = getSubLeft(sub);
                const width = getSubWidth(sub);
                const isActive = currentTime >= sub.start && currentTime <= sub.end;
                const isSelected = selectedId === sub.id;

                return (
                  <div
                    key={sub.id}
                    data-segment
                    style={{
                      position: "absolute",
                      left,
                      top: 8,
                      width,
                      height: 36,
                      borderRadius: 6,
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(217,119,54,0.15), rgba(217,119,54,0.05))"
                        : isActive
                          ? "linear-gradient(135deg, rgba(217,119,54,0.1), rgba(217,119,54,0.02))"
                          : "rgba(0,0,0,0.03)",
                      border: `1px solid ${
                        isSelected
                          ? "rgba(217,119,54,0.4)"
                          : isActive
                            ? "rgba(217,119,54,0.2)"
                            : "rgba(0,0,0,0.06)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: dragging?.id === sub.id ? "grabbing" : "grab",
                      transition: dragging?.id === sub.id ? "none" : "box-shadow 0.15s, border-color 0.15s",
                      boxShadow: isSelected
                        ? "0 0 16px rgba(217,119,54,0.15)"
                        : isActive
                          ? "0 0 12px rgba(250,204,21,0.06)"
                          : "none",
                      overflow: "hidden",
                      zIndex: isSelected ? 4 : isActive ? 3 : 1,
                    }}
                    onMouseDown={(e) => handleSegmentMouseDown(e, sub, "move")}
                  >
                    {/* Text preview */}
                    <span
                      style={{
                        fontSize: 9,
                        color: isSelected ? "#D97736" : isActive ? "#D97736" : "#737373",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: "0 14px",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        pointerEvents: "none",
                      }}
                    >
                      {sub.text}
                    </span>

                    {/* Left resize handle */}
                    <div
                      style={styles.resizeHandleLeft}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleSegmentMouseDown(e, sub, "start");
                      }}
                    >
                      <div style={styles.resizeGrip} />
                    </div>

                    {/* Right resize handle */}
                    <div
                      style={styles.resizeHandleRight}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleSegmentMouseDown(e, sub, "end");
                      }}
                    >
                      <div style={styles.resizeGrip} />
                    </div>
                  </div>
                );
              })}

              {/* Subtitle track playhead */}
              <div
                style={{
                  position: "absolute",
                  left: playheadPx,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: "#D97736",
                  zIndex: 10,
                  pointerEvents: "none",
                  boxShadow: "0 0 8px rgba(217,119,6,0.4)",
                  transition: dragging || scrubbing ? "none" : "left 0.06s linear",
                }}
              >
                {/* Playhead top handle */}
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
                    boxShadow: "0 0 8px rgba(217,119,6,0.3)",
                    border: "2px solid #FBF9F5",
                  }}
                />
              </div>
            </div>

            {/* Segment time labels */}
            <div style={styles.segmentLabels}>
              {subtitles.map((sub) => {
                const left = getSubLeft(sub);
                const width = getSubWidth(sub);
                return (
                  <div
                    key={sub.id}
                    style={{
                      position: "absolute",
                      left,
                      top: 2,
                      width,
                      fontSize: 7,
                      color: selectedId === sub.id ? "#D97736" : "#3f3f46",
                      fontFamily: "ui-monospace, monospace",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      paddingLeft: 4,
                    }}
                  >
                    {fmt(sub.start)} – {fmt(sub.end)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  transportBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 16px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    flexShrink: 0,
    gap: 8,
    height: 36,
    background: "rgba(255,255,255,0.8)",
  },
  transportLeft: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  timecodeDisplay: {
    fontSize: 12,
    color: "#D97736",
    fontFamily: "ui-monospace, monospace",
    fontWeight: 700,
    minWidth: 48,
  },
  timecodeSep: {
    fontSize: 11,
    color: "#a3a3a3",
    margin: "0 2px",
  },
  timecodeTotal: {
    fontSize: 11,
    color: "#737373",
    fontFamily: "ui-monospace, monospace",
  },
  transportCenter: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  transportRight: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  toolBtn: {
    background: "rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.05)",
    color: "#737373",
    borderRadius: 6,
    width: 28,
    height: 26,
    fontSize: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all var(--transition-fast)",
    fontFamily: "inherit",
  },
  toolBtnDanger: {
    borderColor: "rgba(239,68,68,0.2)",
    color: "#ef4444",
    background: "rgba(239,68,68,0.04)",
  },
  zoomBtn: {
    background: "rgba(0,0,0,0.03)",
    border: "none",
    color: "#737373",
    borderRadius: 6,
    width: 24,
    height: 24,
    fontSize: 12,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all var(--transition-fast)",
    padding: 0,
  },
  zoomLabel: {
    fontSize: 10,
    color: "#737373",
    minWidth: 32,
    textAlign: "center",
    fontFamily: "ui-monospace, monospace",
  },
  timelineBody: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    minHeight: 0,
  },
  trackLabels: {
    width: 56,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(0,0,0,0.05)",
    background: "rgba(0,0,0,0.01)",
  },
  trackLabelRow: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },
  trackLabelRowBottom: {
    borderBottom: "none",
  },
  trackLabelText: {
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: "0.14em",
    color: "#a3a3a3",
    textTransform: "uppercase",
    transform: "rotate(-90deg)",
    whiteSpace: "nowrap",
  },
  scrollContainer: {
    flex: 1,
    overflowX: "auto",
    overflowY: "hidden",
    cursor: "default",
  },
  ruler: {
    height: 22,
    position: "relative",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    flexShrink: 0,
    overflow: "hidden",
    cursor: "col-resize",
    background: "rgba(0,0,0,0.02)",
  },
  rulerLabel: {
    position: "absolute",
    left: 3,
    top: 2,
    fontSize: 8,
    color: "#737373",
    fontFamily: "ui-monospace, monospace",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  waveformTrack: {
    height: 40,
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
    background: "rgba(0,0,0,0.01)",
  },
  waveformPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  trackDivider: {
    height: 1,
    background: "rgba(0,0,0,0.05)",
    flexShrink: 0,
  },
  subtitleTrack: {
    height: 52,
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    flexShrink: 0,
  },
  resizeHandleLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    cursor: "col-resize",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resizeHandleRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 8,
    cursor: "col-resize",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resizeGrip: {
    width: 3,
    height: 16,
    borderRadius: 2,
    background: "rgba(0,0,0,0.12)",
  },
  segmentLabels: {
    height: 20,
    position: "relative",
    borderTop: "1px solid rgba(0,0,0,0.05)",
    flexShrink: 0,
  },
};
