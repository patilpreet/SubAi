import { useRef, useEffect, useCallback } from "react";

const PX_PER_SEC = 120;
const BAR_WIDTH = 2;
const BAR_GAP = 1;
const PLAYED_COLOR = "#2dd4bf"; // Vibrant teal/cyan for played
const UNPLAYED_COLOR = "#10b981"; // Emerald green for unplayed
const BG_COLOR = "transparent";

export function WaveformCanvas({ peaks, duration, zoom, currentTime, width }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !peaks || !duration) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const totalPx = duration * PX_PER_SEC * zoom;
    const displayWidth = width || totalPx;
    const displayHeight = 44;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const barTotal = BAR_WIDTH + BAR_GAP;
    const totalBars = Math.floor(displayWidth / barTotal);
    const peakStep = peaks.length / totalBars;
    const midY = displayHeight / 2;
    const maxBarH = displayHeight / 2 - 2;

    const playheadX = (currentTime / duration) * displayWidth;

    for (let i = 0; i < totalBars; i++) {
      const peakIdx = Math.min(Math.floor(i * peakStep), peaks.length - 1);
      const val = peaks[peakIdx];
      const barH = Math.max(1.5, val * maxBarH);
      const x = i * barTotal;
      const isPlayed = x < playheadX;

      ctx.fillStyle = isPlayed ? PLAYED_COLOR : UNPLAYED_COLOR;
      ctx.globalAlpha = isPlayed ? 0.95 : 0.65;

      ctx.fillRect(x, midY - barH, BAR_WIDTH, barH * 2);
    }

    ctx.globalAlpha = 1;
  }, [peaks, duration, zoom, currentTime, width]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: width || (duration * PX_PER_SEC * zoom),
        height: 40,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
