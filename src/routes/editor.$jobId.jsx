import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import styles from "./Editor.module.css";
import { CaptionPlayer } from "../features/CaptionPlayer";
import { useEditorStore } from "../features/editorStore";
import { MOCK_SUBTITLES } from "../features/mockData";
import { PRESETS } from "../features/presets";
import { Timeline } from "../features/Timeline";
import { getVideoUrl, loadSubtitles } from "../lib/jobsService";
import { supabase } from "../lib/supabase";
import { generateHook } from "../lib/hooksServer";
import { convertSubtitles } from "../lib/scriptConverter";
import { exportVideo, triggerDownload } from "../lib/videoExporter";
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Sparkles,
  Save,
  Download,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Search,
  BookmarkPlus,
  Flame,
  Languages,
  Wand2,
  FileText,
  Palette,
  Trash2,
  X,
  Check,
  Loader2,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/editor/$jobId")({
  ssr: false,
  component: EditorPage,
});

const fmt = (s) => {
  const m = Math.floor(s / 60);
  const sec = String(Math.floor(s % 60)).padStart(2, "0");
  return `${m}:${sec}`;
};

const IS_FREE_TIER = true;

const INDIAN_LANGUAGES = [
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાती" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളம்" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", native: "অसमीया" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "sa", name: "Sanskrit", native: "संस्कृतम्" },
  { code: "mai", name: "Maithili", native: "मैथिली" },
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "ks", name: "Kashmiri", native: "कॉशुर" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "sd", name: "Sindhi", native: "سنڌي" },
  { code: "doi", name: "Dogri", native: "डोगरी" },
  { code: "kok", name: "Konkani", native: "कोंकणी" },
  { code: "brx", name: "Bodo", native: "बरʼ" },
  { code: "mni", name: "Manipuri", native: "মৈতैलोन्" },
];

const overlayBase = {
  position: "fixed",
  inset: 0,
  zIndex: 300,
  background: "rgba(0, 0, 0, 0.75)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
};

const modalBase = {
  background: "var(--bg-surface, #18181B)",
  border: "1px solid var(--border-base, rgba(255, 255, 255, 0.08))",
  borderRadius: 20,
  padding: 24,
  maxWidth: 520,
  width: "100%",
  maxHeight: "85vh",
  overflow: "auto",
  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
  color: "var(--text-primary, #F5F5F0)",
};

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          style={{
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
            boxShadow: "var(--shadow-card)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        padding: "32px 20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.4 }}
      >
        <rect
          x="8"
          y="16"
          width="64"
          height="48"
          rx="8"
          stroke="var(--text-secondary)"
          strokeWidth="2"
          fill="none"
        />
        <rect x="14" y="26" width="52" height="8" rx="2" fill="var(--bg-base)" />
        <rect x="14" y="38" width="36" height="6" rx="2" fill="var(--bg-base)" />
        <rect x="14" y="48" width="44" height="6" rx="2" fill="var(--bg-base)" />
        <circle cx="64" cy="56" r="8" fill="var(--bg-base)" stroke="var(--text-secondary)" strokeWidth="1.5" />
        <path
          d="M61 56l2 2 4-4"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>No captions yet</div>
      <p
        style={{
          fontSize: 11,
          color: "var(--text-tertiary)",
          lineHeight: 1.6,
          margin: 0,
          maxWidth: 200,
        }}
      >
        Transcription may have failed. Check your
        <br />
        <code
          style={{
            color: "var(--primary)",
            background: "rgba(0,0,0,0.03)",
            padding: "1px 4px",
            borderRadius: 4,
            fontWeight: 600,
          }}
        >
          GROQ_API_KEY
        </code>
        <br />
        in{" "}
        <code
          style={{
            color: "var(--primary)",
            background: "rgba(0,0,0,0.03)",
            padding: "1px 4px",
            borderRadius: 4,
            fontWeight: 600,
          }}
        >
          .env
        </code>
        <br />
        or upload a new video.
      </p>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          color: "var(--text-tertiary)",
          marginTop: 4,
          fontWeight: 500,
        }}
      >
        <Sparkles size={11} />
        Captions appear here after transcription
      </div>
    </div>
  );
}

function EditorPage() {
  const { jobId } = useParams({ from: "/editor/$jobId" });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const playerRef = useRef(null);
  const [job, setJob] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [resolution, setResolution] = useState("1080p");
  const [aspect, setAspect] = useState("916");
  const [previewZoom, setPreviewZoom] = useState(100);
  const [videoNaturalSize, setVideoNaturalSize] = useState({ width: 1080, height: 1920 });
  const [panelTab, setPanelTab] = useState("templates");
  const [subTab, setSubTab] = useState("builtin");
  const [lineMode, setLineMode] = useState("1");
  const [editingId, setEditingId] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [hookModal, setHookModal] = useState(false);
  const [generatingHook, setGeneratingHook] = useState(false);
  const [generatedHook, setGeneratedHook] = useState(null);
  const [scriptMode, setScriptMode] = useState("roman");
  const [translateModal, setTranslateModal] = useState(false);
  const [translateLang, setTranslateLang] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [brandKits, setBrandKits] = useState(() => {
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

  const [selectedSegId, setSelectedSegId] = useState(null);
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const preset = PRESETS.find((p) => p.id === presetId);

  const push = useCallback((msg) => {
    toast(msg, { duration: 4000 });
  }, []);

  // High-performance 60fps frame tracking loop while playing
  useEffect(() => {
    let animId = null;
    if (playing) {
      const checkFrame = () => {
        const player = playerRef.current;
        if (player) {
          try {
            const frame = player.getCurrentFrame();
            if (typeof frame === "number" && !isNaN(frame)) {
              setCurrentTime(frame / 30);
            }
          } catch {}
        }
        animId = requestAnimationFrame(checkFrame);
      };
      animId = requestAnimationFrame(checkFrame);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [playing]);

  // Listen to Remotion player native events once
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };
    const onSeeked = (e) => {
      if (e?.detail?.frame != null) {
        setCurrentTime(e.detail.frame / 30);
      }
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

  // Sync play/pause state with player safely
  const togglePlay = useCallback(() => {
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

  // Read video natural dimensions
  useEffect(() => {
    if (!videoUrl) return;
    const v = document.createElement("video");
    v.src = videoUrl;
    v.onloadedmetadata = () => {
      if (v.videoWidth && v.videoHeight) {
        setVideoNaturalSize({ width: v.videoWidth, height: v.videoHeight });
      }
    };
  }, [videoUrl]);

  const previewDimensions = useMemo(() => {
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
    } else if (aspect === "original") {
      if (videoNaturalSize.width && videoNaturalSize.height) {
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
    } else {
      ratio = "9 / 16";
      compW = 1080;
      compH = 1920;
      isLandscape = false;
    }

    return { ratio, compW, compH, isLandscape };
  }, [aspect, videoNaturalSize]);

  const totalDuration = useMemo(() => {
    if (!subtitles.length) return 12;
    return subtitles[subtitles.length - 1].end + 1;
  }, [subtitles]);

  const fullTranscript = useMemo(() => {
    return subtitles.map((s) => s.text).join(" ");
  }, [subtitles]);

  const handleTimelineSeek = useCallback((t) => {
    setCurrentTime(t);
    const player = playerRef.current;
    if (player) {
      try {
        player.seekTo(Math.round(t * 30));
      } catch {}
    }
  }, []);

  const handleSplitSegment = useCallback((id, splitTime) => {
    splitSegment(id, splitTime);
    push("Segment split");
  }, [splitSegment, push]);

  const handleDeleteSegment = useCallback((id) => {
    deleteSegment(id);
    setSelectedSegId(null);
    push("Segment deleted");
  }, [deleteSegment, push]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "Escape") {
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        if (selectedSegId) {
          handleSplitSegment(selectedSegId, currentTime);
        }
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
  }, [selectedSegId, currentTime, handleSplitSegment, handleDeleteSegment, handleTimelineSeek, totalDuration, togglePlay, setLeftPanelOpen, setRightPanelOpen]);

  useEffect(() => {
    async function loadJobData() {
      setLoading(true);
      try {
        const cachedUrl = sessionStorage.getItem(`video_${jobId}`) || localStorage.getItem(`video_${jobId}`);
        if (cachedUrl) setVideoUrl(cachedUrl);

        const { data } = await supabase.from("jobs").select("*").eq("id", jobId).single();
        if (data) {
          setJob(data);
          if (data.storage_key) {
            try {
              setVideoUrl(await getVideoUrl(data.storage_key));
            } catch (e) {
              console.warn(e.message);
            }
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
      if (storedSubs) {
        load(JSON.parse(storedSubs));
      } else if (isMockJob) {
        load(MOCK_SUBTITLES[jobId] || MOCK_SUBTITLES["job-hinglish-reel"]);
      } else {
        try {
          const dbSubs = await loadSubtitles(jobId);
          if (dbSubs.length > 0) {
            load(dbSubs);
            localStorage.setItem(`subtitles_${jobId}`, JSON.stringify(dbSubs));
          }
        } catch (e) {
          console.warn("No subtitles found for job", jobId, e.message);
        }
      }
      setLoading(false);
    }
    loadJobData();
  }, [jobId]);

  const handleScriptChange = (mode) => {
    setScriptMode(mode);
    const original = localStorage.getItem(`subtitles_${jobId}_original`);
    const source = original ? JSON.parse(original) : subtitles;
    if (!original) {
      localStorage.setItem(`subtitles_${jobId}_original`, JSON.stringify(subtitles));
    }
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
      if (result.ok && result.hook) {
        setGeneratedHook(result.hook);
      } else {
        push("Hook generation failed: " + (result.error || "Unknown error"));
      }
    } catch (e) {
      push("Hook generation error: " + e.message);
    } finally {
      setGeneratingHook(false);
    }
  };

  const applyHook = () => {
    if (!generatedHook || !subtitles.length) return;
    const hookSub = { ...subtitles[0], text: generatedHook };
    const past = useEditorStore.getState().subtitles;
    useEditorStore.setState({
      subtitles: [hookSub, ...subtitles.slice(1)],
      past: [...useEditorStore.getState().past, past],
      future: [],
    });
    setHookModal(false);
    setGeneratedHook(null);
    push("Hook applied");
  };

  const drawWatermark = (ctx, canvas) => {
    ctx.save();
    ctx.font = "14px Inter, sans-serif";
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.textAlign = "right";
    ctx.fillText("SubAI", canvas.width - 16, canvas.height - 12);
    ctx.restore();
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
          if (p.stage) {
            toast(p.stage, { id: "export-progress", duration: 3000 });
          }
        },
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
      const start = new Date(s.start * 1000).toISOString().substring(11, 23).replace(".", ",");
      const end = new Date(s.end * 1000).toISOString().substring(11, 23).replace(".", ",");
      return `${i + 1}\n${start} --> ${end}\n${s.text}\n`;
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const cleanTitle = (job?.title || "subtitles").replace(/[^a-zA-Z0-9_-]/g, "_");
    a.download = `${cleanTitle}.srt`;
    a.click();
    URL.revokeObjectURL(url);
    push("SRT downloaded!");
  };

  const handleSEOExport = useCallback(() => {
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
      "Generated with SubAI — AI-powered captioning",
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
  }, [job, subtitles, push]);

  const handleSaveBrandKit = useCallback(() => {
    const kit = {
      id: crypto.randomUUID(),
      name: preset.name,
      presetId: preset.id,
      font: preset.font,
      color: preset.color,
      bg: preset.bg,
      stroke: preset.stroke,
    };
    const updated = [...brandKits, kit];
    setBrandKits(updated);
    localStorage.setItem("brandKits", JSON.stringify(updated));
    push(`"${kit.name}" saved to Brand Kit`);
  }, [preset, brandKits, push]);

  const handleApplyBrandKit = useCallback(
    (kit) => {
      const match = PRESETS.find((p) => p.id === kit.presetId);
      if (match) {
        setPresetId(match.id);
        push(`Applied "${kit.name}" brand kit`);
      } else {
        push(`Preset not found`);
      }
    },
    [push],
  );

  const handleDeleteBrandKit = useCallback(
    (id) => {
      const updated = brandKits.filter((k) => k.id !== id);
      setBrandKits(updated);
      localStorage.setItem("brandKits", JSON.stringify(updated));
      push("Brand kit deleted");
    },
    [brandKits, push],
  );

  const handleTranslate = useCallback(() => {
    if (!translateLang) {
      push("Select a language first");
      return;
    }
    const lang = INDIAN_LANGUAGES.find((l) => l.code === translateLang);
    push(`Translate to ${lang.name} — coming soon`);
    setTranslateModal(false);
    setTranslateLang(null);
  }, [translateLang, push]);

  if (notFound) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 16,
          background: "var(--bg-base)",
          color: "var(--text-primary)",
        }}
      >
        <h2>Project not found</h2>
        <Link to="/dashboard" style={{ color: "var(--primary)", fontWeight: 600 }}>Back to Dashboard</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 12,
          background: "var(--bg-base)",
        }}
      >
        <Loader2 size={28} className="animate-spin" style={{ color: "var(--primary)" }} />
        <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>Loading workspace...</span>
      </div>
    );
  }

  return (
    <div className={styles.shell} data-theme="dark">
      <header className={styles.topbar}>
        <div className={styles.topLeft}>
          <button className={styles.backBtn} onClick={() => navigate({ to: "/dashboard" })}>
            <ArrowLeft size={14} style={{ marginRight: 4 }} />
            Back
          </button>
          <div className={styles.brand}>
            <div className={styles.brandDot} />
            <span>SubAI Editor</span>
          </div>
          <span style={{ color: "var(--border-strong)" }}>|</span>
          <input
            className={styles.projectNameEdit}
            value={job?.title || "Untitled Job"}
            onChange={(e) => setJob((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div className={styles.topCenter}>
          <button
            className={styles.iconBtn}
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={13} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={13} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={runCleanup}
            title="Clean text formatting"
          >
            <Sparkles size={13} style={{ color: "var(--primary)" }} />
          </button>
        </div>

        <div className={styles.topRight}>
          <button
            className={styles.iconBtn}
            onClick={() => setHookModal(true)}
            title="Generate Viral Hook with AI"
          >
            <Wand2 size={13} style={{ color: "var(--primary, #D97736)" }} />
            <span>AI Hook</span>
          </button>

          <div className={styles.scriptToggleGroup}>
            <button
              onClick={() => handleScriptChange("roman")}
              className={`${styles.scriptToggleBtn} ${scriptMode === "roman" ? styles.scriptToggleBtnActive : ""}`}
            >
              Romanized
            </button>
            <button
              onClick={() => handleScriptChange("native")}
              className={`${styles.scriptToggleBtn} ${scriptMode === "native" ? styles.scriptToggleBtnActive : ""}`}
            >
              Native Script
            </button>
          </div>

          <button className={styles.srtBtn} onClick={handleSRTExport} title="Download SRT Subtitle file">
            <FileText size={13} />
            <span>SRT</span>
          </button>
          <button className={styles.srtBtn} onClick={handleSEOExport} title="Download SEO Description">
            <FileText size={13} />
            <span>SEO Text</span>
          </button>

          <button
            className={styles.exportBtn}
            onClick={handleExport}
            disabled={exporting}
            title="Export final captioned video"
          >
            {exporting ? (
              <>
                <Loader2 size={13} className="animate-spin mr-1" />
                Exporting...
              </>
            ) : (
              <>
                <Download size={13} className="mr-1" />
                Export Video
              </>
            )}
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <div className={`${styles.leftPanel} ${leftPanelOpen ? styles.leftPanelOpen : ''}`}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>Captions list</div>
            <div className={styles.lineToggle}>
              {["1", "2", "3"].map((mode) => (
                <button
                  key={mode}
                  className={`${styles.lineBtn} ${lineMode === mode ? styles.lineBtnActive : ""}`}
                  onClick={() => setLineMode(mode)}
                >
                  {mode} Line{mode !== "1" ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.captionList}>
            {subtitles.length === 0 ? (
              <EmptyState />
            ) : (
              subtitles.map((s, i) => (
                <div key={s.id} className={styles.captionRow}>
                  <div className={styles.captionRowHeader}>
                    <span className={styles.captionRowNum}>{i + 1}</span>
                    <span className={styles.captionTimes}>
                      {fmt(s.start)} → {fmt(s.end)}
                    </span>
                  </div>
                  {editingId === s.id ? (
                    <input
                      className={styles.captionInput}
                      value={s.text}
                      autoFocus
                      onChange={(e) => updateText(s.id, e.target.value)}
                      onBlur={() => setEditingId(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setEditingId(null);
                      }}
                    />
                  ) : (
                    <div className={styles.captionWords}>
                      {s.text.split(" ").map((word, wi) => (
                        <button
                          key={wi}
                          className={styles.captionWordChip}
                          onClick={() => setEditingId(s.id)}
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.centerPanel}>
          <div className={styles.previewTopBar}>
            <div className={styles.aspectBtns}>
              {[
                { label: "Original", key: "original" },
                { label: "9:16", key: "916" },
                { label: "16:9", key: "169" },
                { label: "1:1", key: "11" },
                { label: "4:5", key: "45" },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  className={`${styles.aspectBtn} ${aspect === key ? styles.aspectBtnActive : ""}`}
                  onClick={() => setAspect(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className={styles.zoomControls}>
              <button
                type="button"
                onClick={() => setPreviewZoom((z) => Math.max(50, z - 25))}
                className={styles.zoomBtn}
                title="Zoom Out"
                disabled={previewZoom <= 50}
              >
                <ZoomOut size={12} />
              </button>
              <span style={{ minWidth: 36, textAlign: "center", userSelect: "none" }}>{previewZoom}%</span>
              <button
                type="button"
                onClick={() => setPreviewZoom((z) => Math.min(150, z + 25))}
                className={styles.zoomBtn}
                title="Zoom In"
                disabled={previewZoom >= 150}
              >
                <ZoomIn size={12} />
              </button>
            </div>
          </div>

          <div className={styles.canvas}>
            {/* Responsive Phone / Video Canvas Frame */}
            <div
              style={{
                height: previewDimensions.isLandscape
                  ? `min(${Math.round(280 * (previewZoom / 100))}px, calc(100vh - 380px))`
                  : `min(${Math.round(460 * (previewZoom / 100))}px, calc(100vh - 340px))`,
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
                flexShrink: 0,
              }}
            >
              <CaptionPlayer
                ref={playerRef}
                subtitles={subtitles}
                preset={preset}
                videoUrl={videoUrl}
                width={previewDimensions.compW}
                height={previewDimensions.compH}
                durationInFrames={Math.max(60, Math.ceil(totalDuration * 30))}
                controls={false}
                autoPlay={false}
                loop
                playbackRate={playbackRate}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.rightPanel} ${rightPanelOpen ? styles.rightPanelOpen : ''}`}>
          <div className={styles.panelTabs}>
            {["text", "templates", "brand"].map((tab) => (
              <button
                key={tab}
                className={`${styles.panelTab} ${panelTab === tab ? styles.panelTabActive : ""}`}
                onClick={() => setPanelTab(tab)}
              >
                {tab === "brand" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Palette size={12} /> Brand
                  </span>
                ) : (
                  tab.charAt(0).toUpperCase() + tab.slice(1)
                )}
              </button>
            ))}
          </div>

          {panelTab === "brand" ? (
            <div className={styles.templatesBody}>
              <button className={styles.savePresetBtn} onClick={handleSaveBrandKit}>
                <BookmarkPlus size={13} />
                Save Current as Kit
              </button>

              <div className={styles.dynamicLabel}>My Kits</div>

              {brandKits.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px 0",
                    fontSize: 11,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  <Palette size={28} style={{ color: "var(--text-tertiary)", marginBottom: 8 }} />
                  <div>No saved brand kits yet</div>
                  <div>Save your current preset as a kit</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {brandKits.map((kit) => (
                    <div
                      key={kit.id}
                      style={{
                        background: "var(--bg-base)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: 16,
                        padding: "12px",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>
                          {kit.name}
                        </span>
                        <Tooltip text="Delete kit">
                          <button
                            onClick={() => handleDeleteBrandKit(kit.id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--text-secondary)",
                              cursor: "pointer",
                              padding: 2,
                              borderRadius: 4,
                              display: "flex",
                              transition: "color 150ms ease",
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </Tooltip>
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 6,
                            background: kit.color,
                            border: "1px solid var(--border-base)",
                            flexShrink: 0,
                          }}
                        />
                        <div
                          style={{
                            flex: 1,
                            fontSize: 11,
                            color: "var(--text-secondary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: 600,
                          }}
                        >
                          {kit.font}
                        </div>
                      </div>
                      <button
                        onClick={() => handleApplyBrandKit(kit)}
                        style={{
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
                          transition: "all var(--transition-fast)",
                        }}
                      >
                        Apply Kit
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.templatesBody}>
              <div className={styles.subTabRow}>
                <button
                  className={`${styles.subTab} ${subTab === "builtin" ? styles.subTabActive : ""}`}
                  onClick={() => setSubTab("builtin")}
                >
                  Built-in Templates
                </button>
                <button
                  className={`${styles.subTab} ${subTab === "presets" ? styles.subTabActive : ""}`}
                  onClick={() => setSubTab("presets")}
                >
                  My Presets
                </button>
              </div>

              <div className={styles.searchRow}>
                <Search size={12} className={styles.searchIcon} />
                <input
                  className={styles.searchInput}
                  placeholder="Find a template"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button className={styles.savePresetBtn} onClick={handleSaveBrandKit}>
                <BookmarkPlus size={13} />
                Save Preset
              </button>

              <div className={styles.dynamicLabel}>Dynamic Captions</div>

              <div className={styles.templateCards}>
                {PRESETS.filter(
                  (p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()),
                ).map((p) => (
                  <button
                    key={p.id}
                    className={`${styles.templateCard} ${presetId === p.id ? styles.templateCardActive : ""}`}
                    onClick={() => setPresetId(p.id)}
                  >
                    <div className={styles.templateCardName}>
                      <span>{p.name}</span>
                      {p.id === "forget-status" && <span className={styles.editorialBadge}>Editorial</span>}
                      {p.id === "focus-deeply" && <span className={styles.editorialBadge}>Editorial</span>}
                      {p.id === "the-big-red" && <span className={styles.newBadge}>New</span>}
                      {p.id === "beast" && (
                        <span className={styles.hotBadge}>
                          <Flame size={9} /> Popular
                        </span>
                      )}
                      {p.id === "karaoke" && <span className={styles.newBadge}>New</span>}
                    </div>

                    <div className={styles.templatePreview}>
                      {p.id === "forget-status" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 17, color: "#ffffff", lineHeight: 1.1 }}>
                            forget
                          </span>
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 20, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.03em", textShadow: "0 0 16px rgba(56,189,248,0.85)" }}>
                            STATUS
                          </span>
                        </div>
                      ) : p.id === "focus-deeply" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 17, color: "#ffffff", lineHeight: 1.1 }}>
                            focus
                          </span>
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 20, color: "#facc15", textTransform: "uppercase", letterSpacing: "0.03em", textShadow: "0 0 16px rgba(250,204,21,0.8)" }}>
                            DEEPLY
                          </span>
                        </div>
                      ) : p.id === "the-big-red" ? (
                        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 46 }}>
                          <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 26, color: "#ef4444", textTransform: "uppercase", opacity: 0.85, letterSpacing: "0.08em", textShadow: "0 0 20px rgba(239,68,68,0.8)" }}>
                            SECOND
                          </span>
                          <span style={{ position: "absolute", fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 13, color: "#ffffff", textShadow: "0 2px 6px rgba(0,0,0,0.95)" }}>
                            every single
                          </span>
                        </div>
                      ) : p.id === "the-little-things" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 18 }}>
                          <span style={{ color: "#ffffff" }}>the</span>
                          <span style={{ background: "#facc15", color: "#000000", padding: "1px 8px", borderRadius: 9999, fontWeight: 700, transform: "rotate(-2deg)" }}>
                            little
                          </span>
                          <span style={{ color: "#ffffff" }}>things</span>
                        </div>
                      ) : p.id === "archives" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <span style={{ fontFamily: "'Caveat', cursive", fontStyle: "italic", fontSize: 18, color: "#ffedd5" }}>
                            Your <strong style={{ color: "#ffffff", fontWeight: 700 }}>Style</strong> is it
                          </span>
                          <svg width="60" height="6" viewBox="0 0 60 6" fill="none" style={{ marginTop: 2 }}>
                            <path d="M1 3C10 5 20 1 30 3C40 5 50 1 59 3" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      ) : p.id === "blockbuster" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 18, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.06em", textShadow: "0 0 16px rgba(239,68,68,0.9)" }}>
                            THIS IS THE
                          </span>
                          <span style={{ fontFamily: "'Caveat', cursive", fontStyle: "italic", fontSize: 16, color: "#ffffff", marginTop: -4 }}>
                            next big thing
                          </span>
                        </div>
                      ) : p.id === "beast" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 16, textTransform: "uppercase" }}>
                          <span style={{ color: "#ffffff", textShadow: "0 2px 4px #000" }}>DON'T</span>
                          <span style={{ background: "#facc15", color: "#000000", padding: "2px 8px", borderRadius: 6, boxShadow: "0 0 12px rgba(250,204,21,0.6)", transform: "scale(1.05)" }}>
                            PANIC
                          </span>
                        </div>
                      ) : p.id === "ali-abdaal" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14 }}>
                          <span style={{ color: "#ffffff" }}>Simple</span>
                          <span style={{ color: "#facc15", borderBottom: "2px solid #facc15", paddingBottom: 1 }}>Productivity</span>
                        </div>
                      ) : p.id === "neon-glow" ? (
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 17, color: "#22d3ee", textTransform: "uppercase", textShadow: "0 0 16px rgba(34,211,238,0.95), 0 0 30px rgba(34,211,238,0.6)" }}>
                          CYBER PULSE
                        </div>
                      ) : p.id === "karaoke" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 15 }}>
                          <span style={{ color: "#a1a1aa" }}>Sing</span>
                          <span style={{ color: "#ec4899", textShadow: "0 0 12px rgba(236,72,153,0.8)", transform: "scale(1.1)" }}>ALONG</span>
                          <span style={{ color: "#a1a1aa" }}>now</span>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: p.font || "inherit", fontWeight: p.weight || 800 }}>
                          <span style={{ color: "#ffffff", fontSize: 13 }}>the</span>
                          <span style={{ color: p.color || "#facc15", fontSize: 16, textTransform: p.case === "uppercase" ? "uppercase" : "none", textShadow: p.shadow && p.shadow !== "none" ? p.shadow : "none" }}>
                            {p.name.split(" ")[0]}
                          </span>
                          <span style={{ color: "#ffffff", fontSize: 13 }}>story</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile panel overlays */}
      {leftPanelOpen && (
        <div className={styles.panelOverlay} onClick={() => setLeftPanelOpen(false)} />
      )}
      {rightPanelOpen && (
        <div className={styles.panelOverlay} onClick={() => setRightPanelOpen(false)} />
      )}

      {/* Mobile panel toggle buttons */}
      <button
        className={styles.panelToggleLeft}
        onClick={() => { setLeftPanelOpen((v) => !v); setRightPanelOpen(false); }}
        title={leftPanelOpen ? 'Close captions panel' : 'Open captions panel'}
      >
        <PanelLeft size={14} />
      </button>
      <button
        className={styles.panelToggleRight}
        onClick={() => { setRightPanelOpen((v) => !v); setLeftPanelOpen(false); }}
        title={rightPanelOpen ? 'Close presets panel' : 'Open presets panel'}
      >
        <PanelRight size={14} />
      </button>

      <div className={styles.timeline}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <Timeline
            subtitles={subtitles}
            currentTime={currentTime}
            totalDuration={totalDuration || 30}
            videoSrc={videoUrl}
            zoom={zoom}
            onZoomChange={setZoom}
            onSeek={handleTimelineSeek}
            onUpdateSegment={(id, start, end) => {
              updateSegment(id, start, end);
            }}
            onSplit={handleSplitSegment}
            onDelete={handleDeleteSegment}
            onAddSegment={(time) => {
              addSegment(time, time + 2, "New caption");
              push("New caption added");
            }}
            selectedId={selectedSegId}
            onSelectSegment={setSelectedSegId}
            playing={playing}
            onTogglePlay={togglePlay}
            onUndo={undo}
            onRedo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
        </div>
      </div>

      {hookModal && (
        <div
          style={overlayBase}
          onClick={() => {
            setHookModal(false);
            setGeneratedHook(null);
          }}
        >
          <div style={modalBase} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: "var(--accent-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Wand2 size={16} style={{ color: "var(--primary)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-serif)", italic: "true" }}>
                  AI Hook Generator
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
                  Rewrite your opening 30 seconds
                </p>
              </div>
              <button
                onClick={() => {
                  setHookModal(false);
                  setGeneratedHook(null);
                }}
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  width: 28,
                  height: 28,
                  borderRadius: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={14} />
              </button>
            </div>

            {!generatedHook ? (
              <div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>
                  Your opening hook decides everything. AI analyzes your transcript and rewrites the first line to maximize retention.
                </p>
                <div
                  style={{
                    background: "var(--bg-base)",
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 16,
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    maxHeight: 120,
                    overflow: "auto",
                    lineHeight: 1.6,
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary)",
                      fontSize: 10,
                      fontWeight: 700,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Current Transcript
                  </div>
                  {fullTranscript.slice(0, 300)}
                  {fullTranscript.length > 300 ? "…" : ""}
                </div>
                <button
                  onClick={handleGenerateHook}
                  disabled={generatingHook}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    borderRadius: 24,
                    background: generatingHook ? "var(--border-strong)" : "var(--primary)",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 700,
                    border: "none",
                    cursor: generatingHook ? "not-allowed" : "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  {generatingHook ? "Generating..." : "Generate Hook"}
                </button>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    background: "var(--accent-dim)",
                    border: "1px solid var(--primary)",
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      color: "var(--primary)",
                      fontSize: 10,
                      fontWeight: 700,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    AI Generated Hook
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    &quot;{generatedHook}&quot;
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={applyHook}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      borderRadius: 24,
                      background: "var(--primary)",
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    Apply Hook
                  </button>
                  <button
                    onClick={handleGenerateHook}
                    disabled={generatingHook}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      borderRadius: 24,
                      background: "var(--bg-base)",
                      color: "var(--text-secondary)",
                      fontSize: 13,
                      fontWeight: 700,
                      border: "1px solid var(--border-base)",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setHookModal(false);
                setGeneratedHook(null);
              }}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "8px 0",
                borderRadius: 24,
                background: "transparent",
                color: "var(--text-tertiary)",
                fontSize: 12,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {translateModal && (
        <div
          style={overlayBase}
          onClick={() => {
            setTranslateModal(false);
            setTranslateLang(null);
          }}
        >
          <div style={modalBase} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: "var(--accent-dim)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Languages size={16} style={{ color: "var(--primary)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-serif)", italic: "true" }}>
                  Auto-Translate
                </h3>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)" }}>
                  Select a target Indian language
                </p>
              </div>
              <button
                onClick={() => {
                  setTranslateModal(false);
                  setTranslateLang(null);
                }}
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  width: 28,
                  height: 28,
                  borderRadius: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={14} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 8,
                marginBottom: 16,
              }}
            >
              {INDIAN_LANGUAGES.map((lang) => {
                const selected = translateLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setTranslateLang(lang.code)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: 16,
                      background: selected ? "var(--accent-dim)" : "rgba(0,0,0,0.02)",
                      border: selected
                        ? "1px solid var(--primary)"
                        : "1px solid var(--border-base)",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      transition: "all var(--transition-fast)",
                      position: "relative",
                    }}
                  >
                    {selected && (
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          width: 16,
                          height: 16,
                          borderRadius: 9999,
                          background: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={10} strokeWidth={3} style={{ color: "#fff" }} />
                      </div>
                    )}
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>
                      {lang.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{lang.native}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  setTranslateModal(false);
                  setTranslateLang(null);
                }}
                style={{
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
                  transition: "all var(--transition-fast)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleTranslate}
                disabled={!translateLang}
                style={{
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
                  gap: 6,
                }}
              >
                <Languages size={14} />
                Translate
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-surface)",
            border: "1px solid var(--border-base)",
            borderRadius: 20,
            padding: "12px 20px",
            fontSize: 13,
            color: "var(--text-primary)",
            boxShadow: "var(--shadow-elevated)",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </div>
  );
}
