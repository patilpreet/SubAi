import { create } from "zustand";
import { devanagariToHinglish } from "../lib/scriptConverter";

const clone = (arr) => arr.map((s) => ({ ...s }));

export const useEditorStore = create((set, get) => ({
  subtitles: [],
  past: [],
  future: [],
  zoom: 1,

  load: (subtitles) => set({ subtitles: clone(subtitles), past: [], future: [] }),

  updateText: (id, text) => {
    const { subtitles, past } = get();
    const next = subtitles.map((s) => (s.id === id ? { ...s, text } : s));
    set({ subtitles: next, past: [...past, subtitles], future: [] });
  },

  runCleanup: () => {
    const { subtitles, past } = get();
    const next = subtitles.map((s) => {
      let cleaned = s.text;
      if (/[\u0900-\u097F]/.test(cleaned)) {
        cleaned = devanagariToHinglish(cleaned);
      }
      cleaned = cleaned
        .replace(/\s+/g, " ")
        .replace(/\bu\b/gi, "you")
        .replace(/\br\b/gi, "are")
        .replace(/^\s*[,.!?]+/, "")
        .trim()
        .replace(/^./, (c) => c.toUpperCase());
      return {
        ...s,
        text: cleaned,
      };
    });
    set({ subtitles: next, past: [...past, subtitles], future: [] });
  },

  updateSegmentTime: (id, field, value) => {
    const { subtitles, past } = get();
    const next = subtitles.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    set({ subtitles: next, past: [...past, subtitles], future: [] });
  },

  updateSegment: (id, start, end) => {
    const { subtitles, past } = get();
    const next = subtitles.map((s) => (s.id === id ? { ...s, start, end } : s));
    set({ subtitles: next, past: [...past, subtitles], future: [] });
  },

  splitSegment: (id, splitTime) => {
    const { subtitles, past } = get();
    const idx = subtitles.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const seg = subtitles[idx];
    if (splitTime <= seg.start || splitTime >= seg.end) return;

    const words = seg.text.split(" ");
    const durationRatio = (splitTime - seg.start) / (seg.end - seg.start);
    const splitWordIdx = Math.max(
      1,
      Math.min(words.length - 1, Math.round(words.length * durationRatio)),
    );

    const leftText = words.slice(0, splitWordIdx).join(" ");
    const rightText = words.slice(splitWordIdx).join(" ");

    const leftSeg = {
      id: `split-${crypto.randomUUID().slice(0, 8)}`,
      start: seg.start,
      end: splitTime,
      text: leftText,
    };
    const rightSeg = {
      id: `split-${crypto.randomUUID().slice(0, 8)}`,
      start: splitTime,
      end: seg.end,
      text: rightText,
    };

    const next = [...subtitles.slice(0, idx), leftSeg, rightSeg, ...subtitles.slice(idx + 1)];
    set({ subtitles: next, past: [...past, subtitles], future: [] });
  },

  deleteSegment: (id) => {
    const { subtitles, past } = get();
    const next = subtitles.filter((s) => s.id !== id);
    set({ subtitles: next, past: [...past, subtitles], future: [] });
  },

  addSegment: (start, end, text = "New caption") => {
    const { subtitles, past } = get();
    const newSeg = {
      id: `seg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      start: Math.max(0, start),
      end: Math.max(start + 0.5, end),
      text,
    };
    const next = [...subtitles, newSeg].sort((a, b) => a.start - b.start);
    set({ subtitles: next, past: [...past, subtitles], future: [] });
  },

  setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(8, zoom)) }),

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
      future: [subtitles, ...future],
    });
  },

  redo: () => {
    const { future, subtitles, past } = get();
    if (future.length === 0) return;
    const [next, ...rest] = future;
    set({
      subtitles: next,
      past: [...past, subtitles],
      future: rest,
    });
  },
}));
