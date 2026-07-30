import { useState, useEffect, useRef, useCallback } from "react";
import {
  Undo2, Redo2, Scissors, Trash2, Download, FileText,
  Wand2, Languages, Sparkles, Play, Pause, SkipBack,
  ZoomIn, ZoomOut, Maximize2, BookmarkPlus, Search, X
} from "lucide-react";

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "15vh",
  },
  modal: {
    width: "100%",
    maxWidth: 580,
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 20,
    boxShadow: "0 40px 80px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    maxHeight: "60vh",
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 20px",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
    flexShrink: 0,
  },
  searchIcon: {
    color: "#a3a3a3",
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: 16,
    fontFamily: "inherit",
    color: "#1a1a1a",
    fontWeight: 500,
  },
  clearBtn: {
    background: "rgba(0,0,0,0.04)",
    border: "none",
    borderRadius: 9999,
    width: 22,
    height: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#a3a3a3",
  },
  list: {
    overflowY: "auto",
    flex: 1,
    padding: "8px",
  },
  group: {
    marginBottom: 4,
  },
  groupLabel: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#a3a3a3",
    padding: "8px 12px 4px",
  },
  item: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderRadius: 12,
    cursor: "pointer",
    background: active ? "rgba(217,119,54,0.06)" : "transparent",
    border: `1px solid ${active ? "rgba(217,119,54,0.15)" : "transparent"}`,
    transition: "all 120ms ease",
    userSelect: "none",
  }),
  itemIcon: (active) => ({
    width: 32,
    height: 32,
    borderRadius: 8,
    background: active ? "rgba(217,119,54,0.1)" : "rgba(0,0,0,0.03)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: active ? "#D97736" : "#737373",
    flexShrink: 0,
    transition: "all 120ms ease",
  }),
  itemContent: {
    flex: 1,
    minWidth: 0,
  },
  itemName: (active) => ({
    fontSize: 13,
    fontWeight: 600,
    color: active ? "#1a1a1a" : "#1a1a1a",
    marginBottom: 1,
  }),
  itemDesc: {
    fontSize: 11,
    color: "#a3a3a3",
    fontWeight: 500,
  },
  itemShortcut: {
    fontSize: 10,
    fontWeight: 700,
    color: active => active ? "#D97736" : "#a3a3a3",
    background: "rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 6,
    padding: "2px 6px",
    fontFamily: "ui-monospace, monospace",
    flexShrink: 0,
  },
  footer: {
    padding: "10px 20px",
    borderTop: "1px solid rgba(0,0,0,0.04)",
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexShrink: 0,
    background: "rgba(0,0,0,0.01)",
  },
  footerHint: {
    fontSize: 11,
    color: "#a3a3a3",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  footerKey: {
    background: "rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 4,
    padding: "1px 5px",
    fontFamily: "ui-monospace, monospace",
    fontSize: 10,
    fontWeight: 700,
    color: "#737373",
  },
};

export function CommandPalette({ open, onClose, commands }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const filtered = commands.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.desc?.toLowerCase().includes(query.toLowerCase()) ||
      c.group?.toLowerCase().includes(query.toLowerCase())
  );

  // Group items
  const grouped = filtered.reduce((acc, cmd) => {
    const g = cmd.group || "Actions";
    if (!acc[g]) acc[g] = [];
    acc[g].push(cmd);
    return acc;
  }, {});

  // Flat list for keyboard nav
  const flat = filtered;

  const run = useCallback(
    (cmd) => {
      onClose();
      setTimeout(() => cmd.action(), 80);
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, flat.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (flat[activeIdx]) run(flat[activeIdx]);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [open, flat, activeIdx, run, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!open) return null;

  let flatIdx = -1;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Search */}
        <div style={styles.searchWrap}>
          <Search size={18} style={styles.searchIcon} />
          <input
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Type a command or search…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
          />
          {query && (
            <button style={styles.clearBtn} onClick={() => setQuery("")}>
              <X size={12} />
            </button>
          )}
        </div>

        {/* Results */}
        <div style={styles.list} ref={listRef}>
          {flat.length === 0 && (
            <div style={{ padding: "24px 0", textAlign: "center", color: "#a3a3a3", fontSize: 13 }}>
              No commands found for &ldquo;{query}&rdquo;
            </div>
          )}
          {Object.entries(grouped).map(([group, cmds]) => (
            <div key={group} style={styles.group}>
              <div style={styles.groupLabel}>{group}</div>
              {cmds.map((cmd) => {
                flatIdx++;
                const idx = flatIdx;
                const active = idx === activeIdx;
                return (
                  <div
                    key={cmd.id}
                    data-idx={idx}
                    style={styles.item(active)}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => run(cmd)}
                  >
                    <div style={styles.itemIcon(active)}>
                      {cmd.icon}
                    </div>
                    <div style={styles.itemContent}>
                      <div style={styles.itemName(active)}>{cmd.name}</div>
                      {cmd.desc && <div style={styles.itemDesc}>{cmd.desc}</div>}
                    </div>
                    {cmd.shortcut && (
                      <div style={{ ...styles.itemShortcut, color: active ? "#D97736" : "#a3a3a3" }}>
                        {cmd.shortcut}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hints */}
        <div style={styles.footer}>
          <span style={styles.footerHint}>
            <span style={styles.footerKey}>↑↓</span> navigate
          </span>
          <span style={styles.footerHint}>
            <span style={styles.footerKey}>↵</span> run
          </span>
          <span style={styles.footerHint}>
            <span style={styles.footerKey}>Esc</span> close
          </span>
          <span style={{ marginLeft: "auto", ...styles.footerHint }}>
            {flat.length} command{flat.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
