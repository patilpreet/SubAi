import { createFileRoute, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Dashboard.module.css";
import { useAuthStore } from "../lib/authStore";
import {
  fetchJobs,
  createJob,
  completeJob,
  uploadVideo,
  saveSubtitles,
  getVideoUrl,
  deleteJob,
} from "../lib/jobsService";
import { extractVideoFrame } from "../lib/grok";
import { analyzeWithGrokServer, transcribeFromStorage } from "../lib/grokServer";
import { transcribeWithSarvam } from "../lib/sarvamServer";
import { transcribeWithGemini } from "../lib/geminiServer";
import { useTheme } from "../hooks/useTheme";
import {
  Home,
  Search,
  Settings,
  LayoutTemplate,
  Puzzle,
  CreditCard,
  Star,
  Upload,
  Film,
  Languages,
  Zap,
  CheckCircle,
  Plus,
  LogOut,
  Trash2,
  Clock,
  X,
  Loader2,
  Shield,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  component: DashboardPage,
});

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Search, label: "Search" },
  { icon: Settings, label: "Settings" },
];

const NAV_ITEMS2 = [
  { icon: LayoutTemplate, label: "Templates", href: "/templates" },
  { icon: Puzzle, label: "Editor plugin", href: "/plugin/download" },
  { icon: CreditCard, label: "Manage subscription", href: "/pricing" },
];

function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const navigate = useNavigate();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [modalFile, setModalFile] = useState(null);
  const [modalVideoUrl, setModalVideoUrl] = useState(null);
  const [language, setLanguage] = useState("auto");
  const [writingSystem, setWritingSystem] = useState("roman");
  const [transcribing, setTranscribing] = useState(false);
  const [provider, setProvider] = useState("groq");

  const fileInputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggle: toggleTheme } = useTheme();

  const push = useCallback((msg) => {
    toast(msg, { duration: 4000 });
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const loadJobs = useCallback(async () => {
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

  useEffect(() => {
    if (user) loadJobs();
  }, [user, loadJobs]);

  const handleFileSelect = (files) => {
    if (!files || !files.length) return;
    const file = files[0];
    setModalFile(file);
    setModalVideoUrl(URL.createObjectURL(file));
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

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
          setTimeout(r, 3000);
        });
        const frame = await extractVideoFrame(videoEl, 1);
        const result = await analyzeWithGrokServer({ data: { imageBase64: frame } });
        if (result.ok && result.description) {
          aiDescription = result.description;
          push(`AI description generated: "${aiDescription}"`);
        }
        URL.revokeObjectURL(videoEl.src);
      } catch (e) {
        console.warn("Grok Vision skipped:", e.message);
      }

      let extractedSubtitles = [];
      let transRes;
      try {
        const fileUrl = await getVideoUrl(storageKey);

        if (provider === "sarvam") {
          push("Transcribing with SarvamAI...");
          transRes = await transcribeWithSarvam({
            data: {
              fileUrl,
              fileName: file.name,
              mimeType: file.type || "video/mp4",
              language: language === "auto" ? "hinglish" : language,
            },
          });
        } else if (provider === "gemini") {
          push("Transcribing with Google Gemini...");
          transRes = await transcribeWithGemini({
            data: {
              fileUrl,
              fileName: file.name,
              mimeType: file.type || "video/mp4",
              language: language === "auto" ? "hinglish" : language,
            },
          });
        } else {
          push("Transcribing with Groq Whisper...");
          transRes = await transcribeFromStorage({
            data: {
              fileUrl,
              fileName: file.name,
              mimeType: file.type || "video/mp4",
            },
          });
        }

        if (transRes.ok && transRes.subtitles.length > 0) {
          extractedSubtitles = transRes.subtitles;
          push(`${extractedSubtitles.length} segments transcribed`);
        } else if (transRes.error) {
          push("Transcription issue: " + transRes.error);
        }
      } catch (e) {
        console.error("Transcription error:", e);
        push("Transcription failed: " + e.message);
      }

      if (extractedSubtitles.length === 0) {
        const detail = transRes?.error ? ` ${transRes.error}` : "";
        const keyName =
          provider === "sarvam"
            ? "SARVAM_API_KEY"
            : provider === "gemini"
              ? "GEMINI_API_KEY"
              : "GROQ_API_KEY";
        throw new Error(
          `Transcription returned no captions.${detail}`,
        );
      }

      const title = file.name.replace(/\.[^.]+$/, "");
      const job = await createJob({ title, language, writingSystem, storageKey, aiDescription });

      localStorage.setItem(`subtitles_${job.id}`, JSON.stringify(extractedSubtitles));
      saveSubtitles(job.id, extractedSubtitles).catch(console.warn);

      setJobs((prev) => [
        { ...job, thumbColor: job.thumb_color, createdAt: "Just now", duration: "—" },
        ...prev,
      ]);

      await completeJob(job.id);
      setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status: "completed" } : j)));
      push("Transcription complete.");
      navigate({ to: "/editor/$jobId", params: { jobId: job.id } });

      setModalFile(null);
      setModalVideoUrl(null);
    } catch (err) {
      push(`Upload failed: ${err.message}`);
    } finally {
      setTranscribing(false);
      setUploading(false);
    }
  };

  const handleDelete = async (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      push("Project deleted.");
    } catch (err) {
      push(`Failed to delete: ${err.message}`);
    }
  };

  const userInitial = user?.email?.[0]?.toUpperCase() || "U";
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const currentPath = location.pathname;

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    if (dateStr === "Just now" || dateStr === "Yesterday") return dateStr;
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className={styles.shell}>
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--primary)" }} />
          <span style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 500 }}>Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <style>{`
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
      `}</style>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />}

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarBrand}>
          <div className={styles.sidebarLogo}>
            <img
              src="/subai-logo.png"
              alt="SubAI"
              style={{ height: 32, width: "auto", objectFit: "contain" }}
            />
          </div>
        </div>

        <div className={styles.workspaceTag}>
          <div className={styles.workspaceAvatar}>{userInitial}</div>
          My Workspace
        </div>

        <nav className={styles.navGroup}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.href && currentPath === item.href;
            if (item.href) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                >
                  <Icon size={14} className={styles.navIcon} />
                  {item.label}
                </Link>
              );
            }
            return (
              <button key={item.label} className={styles.navItem}>
                <Icon size={14} className={styles.navIcon} />
                {item.label}
              </button>
            );
          })}

          <div className={styles.navSep} />

          {NAV_ITEMS2.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                <Icon size={14} className={styles.navIcon} />
                {item.label}
              </Link>
            );
          })}

          <div className={styles.navSep} />

          {user?.email === "patilpreetviia@gmail.com" && (
            <Link
              to="/admin"
              className={styles.navItem}
              style={{ color: "var(--primary)", fontWeight: 600 }}
            >
              <Shield size={14} className={styles.navIcon} style={{ color: "var(--primary)" }} />
              Admin Panel
            </Link>
          )}

          <Link to="/pricing" className={styles.upgradeBtn}>
            <Star size={14} />
            Upgrade to Pro
          </Link>
        </nav>

        <div className={styles.usageMeter}>
          <div className={styles.usageTop}>
            <span className={styles.usagePlan}>FREE</span>
            <span className={styles.usageBadge}>FREE</span>
          </div>
          <div className={styles.usageRow}>
            <span className={styles.usageLabel}>Transcription</span>
            <span className={styles.usageVal}>2 mins left</span>
          </div>
          <div
            style={{
              height: 4,
              background: "rgba(0,0,0,0.06)",
              borderRadius: 4,
              marginBottom: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "0%",
                height: "100%",
                background: "var(--primary)",
                borderRadius: 4,
                transition: "width 150ms ease",
              }}
            />
          </div>
          <div className={styles.usageReset}>Allowance resets in 25 days</div>
          <button className={styles.upgradeNowBtn} onClick={() => navigate({ to: "/pricing" })}>Upgrade Now</button>
        </div>

        <div className={styles.userCard}>
          <div className={styles.userAvatar}>{userInitial}</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.userEmail}>{user?.email || "—"}</div>
          </div>
          <button
            className={styles.logoutBtn}
            onClick={() => navigate({ to: "/login" })}
            title="Sign out"
          >
            <LogOut size={13} />
          </button>
        </div>
      </aside>

      <main className={`${styles.main} main-scroll`}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button className={styles.mobileMenuBtn} onClick={() => setSidebarOpen(true)}>
              <Menu size={18} />
            </button>
            <div>
              <h1 className={styles.greeting}>Good to see you, {userName}</h1>
              <p className={styles.greetingSub}>Create, manage and export your captioned videos</p>
            </div>
          </div>
          <div className={styles.topBarRight}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button className={styles.newProjectBtn} onClick={() => fileInputRef.current?.click()}>
              <Plus size={14} />
              <span className="hide-mobile">New Project</span>
            </button>
          </div>
        </div>

        <div className={styles.sectionLabel}>Upload a Video</div>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={(e) => handleFileSelect(e.target.files)}
        />
        <div
          className={`${styles.dropzone} ${dragging ? styles.dropzoneHover : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFileSelect(e.dataTransfer.files);
          }}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {uploading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(4px)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
              >
                <Loader2 size={28} className="animate-spin" style={{ color: "var(--primary)" }} />
                <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700 }}>
                  Processing your video...
                </span>
              </div>
            </div>
          )}
          <div
            className={styles.dropzoneIcon}
            style={{ position: "relative", zIndex: 0, opacity: uploading ? 0.3 : 1 }}
          >
            <Upload size={20} />
          </div>
          <p
            className={styles.dropzoneTitle}
            style={{ position: "relative", zIndex: 0, opacity: uploading ? 0.3 : 1 }}
          >
            {dragging ? "Release to upload" : "Drop your video here"}
          </p>
          <p
            className={styles.dropzoneSub}
            style={{ position: "relative", zIndex: 0, opacity: uploading ? 0.3 : 1 }}
          >
            or click to browse. Any format up to 2GB. 4K included.
          </p>
          <div
            style={{
              display: "flex",
              gap: 6,
              justifyContent: "center",
              marginTop: 10,
              position: "relative",
              zIndex: 0,
              opacity: uploading ? 0.3 : 1,
            }}
          >
            {["MP4", "MOV", "AVI", "WebM"].map((fmt) => (
              <span
                key={fmt}
                style={{
                  fontSize: 10,
                  color: "var(--text-secondary)",
                  background: "rgba(0,0,0,0.03)",
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {fmt}
              </span>
            ))}
          </div>
          <div className={styles.dropzoneMeta}>
            <Zap size={11} />
            Transcription in 30s
          </div>
          <button
            className={styles.dropzoneBtn}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            disabled={uploading}
            style={{ position: "relative", zIndex: 0 }}
          >
            Choose file
          </button>
        </div>

        <div className={styles.sectionLabel}>Recent Projects</div>

        {jobsLoading ? (
          <div className={styles.projectsGrid}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={styles.projectCard} style={{ pointerEvents: "none" }}>
                <div
                  className={styles.projectThumb}
                  style={{
                    height: "150px",
                    background: "rgba(0,0,0,0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader2 size={20} className="animate-spin" style={{ color: "var(--text-tertiary)" }} />
                </div>
                <div className={styles.projectInfo}>
                  <div
                    style={{
                      height: 14,
                      width: "60%",
                      background: "rgba(0,0,0,0.03)",
                      borderRadius: 4,
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{ height: 10, width: "40%", background: "rgba(0,0,0,0.03)", borderRadius: 4 }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className={styles.projectsEmpty}>
            <div className={styles.projectsEmptyIcon}>
              <Film size={20} />
            </div>
            <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14, color: "var(--text-secondary)" }}>
              No projects yet
            </div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}>Upload a video to get started</div>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {jobs.map((job, idx) => {
              const thumbHeight = (idx % 3 === 0) ? "170px" : (idx % 3 === 1) ? "130px" : "210px";
              return (
                <div
                  key={job.id}
                  className={`${styles.projectCard} project-card-enter`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <Link
                    to="/editor/$jobId"
                    params={{ jobId: job.id }}
                    style={{ display: "block", textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className={styles.projectThumb}
                      style={{
                        height: thumbHeight,
                        background: `linear-gradient(135deg, ${job.thumbColor || job.thumb_color || "#D97736"}12, var(--bg-overlay))`,
                      }}
                    >
                      <div className="absolute top-3 left-3 bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-base)] rounded-full px-2.5 py-0.5 text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                        Hinglish • 9:16
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)]/90 shadow flex items-center justify-center text-[var(--primary)] hover:scale-105 transition-transform">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-0.5"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.projectInfo}>
                      <p className={styles.projectTitle}>{job.title}</p>
                      <div className={styles.projectMeta}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className="font-semibold text-xs capitalize text-[var(--text-secondary)]">
                            {job.language === "auto" ? "Hinglish" : job.language}
                          </span>
                          {job.duration && job.duration !== "—" && (
                            <>
                              <span style={{ color: "var(--border-strong)" }}>·</span>
                              <Clock size={10} style={{ opacity: 0.8 }} />
                              <span className="text-[10px] font-medium">{job.duration}</span>
                            </>
                          )}
                        </div>
                        <span
                          className={`${styles.statusBadge} ${job.status === "completed" ? styles.statusCompleted : styles.statusProcessing}`}
                        >
                          {job.status === "completed" ? "Ready" : "In Progress"}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    className={`${styles.deleteProjectBtn} delete-project-btn`}
                    onClick={(e) => handleDelete(e, job.id)}
                    title="Delete project"
                    style={{
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
                      zIndex: 2,
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ height: 40 }} />
      </main>

      {modalFile && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setModalFile(null);
            setModalVideoUrl(null);
          }}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative" }}
          >
            <button
              className={styles.modalClose}
              onClick={() => {
                setModalFile(null);
                setModalVideoUrl(null);
              }}
              style={{
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
                transition: "all var(--transition-fast)",
              }}
            >
              <X size={14} />
            </button>
            <h2 className={styles.modalTitle}>Prepare Your Media</h2>
            <p className={styles.modalSub}>Select a language to transcribe your media.</p>

            <div className={styles.modalVideoPreview}>
              {modalVideoUrl && (
                <video
                  src={modalVideoUrl}
                  controls
                  muted
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              )}
            </div>

            <div className={styles.readyBadge}>
              {transcribing ? (
                <>
                  <Loader2 size={13} className="animate-spin mr-1.5" />
                  Transcribing with model...
                </>
              ) : (
                <>
                  <CheckCircle size={13} className="mr-1.5" />
                  Ready for transcription
                </>
              )}
            </div>

            <div className={styles.langSettings}>
              <div className={styles.langSettingsHead}>
                <div className={styles.langSettingsIcon}>
                  <Languages size={16} />
                </div>
                <div>
                  <p className={styles.langSettingsTitle}>Language Settings</p>
                  <p className={styles.langSettingsSub}>
                    Configure the source language and writing system
                  </p>
                </div>
              </div>
              <div className={styles.langGrid}>
                <div className={styles.langField}>
                  <div className={styles.langFieldLabel}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                    What language is spoken?
                  </div>
                  <select
                    className={styles.langSelect}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    disabled={transcribing}
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="hinglish">Hinglish</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="tamil">Tamil</option>
                    <option value="bengali">Bengali</option>
                    <option value="marathi">Marathi</option>
                    <option value="telugu">Telugu</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="kannada">Kannada</option>
                  </select>
                </div>
                <div className={styles.langField}>
                  <div className={styles.langFieldLabel}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Writing system used?
                  </div>
                  <select
                    className={styles.langSelect}
                    value={writingSystem}
                    onChange={(e) => setWritingSystem(e.target.value)}
                    disabled={transcribing}
                  >
                    <option value="roman">Romanised (Latin)</option>
                    <option value="devanagari">Devanagari</option>
                    <option value="english">English</option>
                    <option value="native">Native Script</option>
                  </select>
                  <div className={styles.langSelectHint}>Transliterated into Latin characters</div>
                </div>
              </div>
            </div>

            <div className={styles.langSettings}>
              <div className={styles.langSettingsHead}>
                <div className={styles.langSettingsIcon}>
                  <Zap size={16} />
                </div>
                <div>
                  <p className={styles.langSettingsTitle}>Transcription Provider</p>
                  <p className={styles.langSettingsSub}>
                    Choose between Groq (Whisper), SarvamAI, or Google Gemini
                  </p>
                </div>
              </div>
              <div className={styles.langGrid}>
                <div className={styles.langField}>
                  <select
                    className={styles.langSelect}
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    disabled={transcribing}
                  >
                    <option value="groq">Groq (Whisper) — Fast, global</option>
                    <option value="sarvam">SarvamAI — Best for Indian languages</option>
                    <option value="gemini">Google Gemini — Multilingual AI</option>
                  </select>
                  <div className={styles.langSelectHint}>
                    {provider === "sarvam"
                      ? "Native Hinglish support with codemix mode"
                      : provider === "gemini"
                        ? "Gemini understands Hinglish & code-mixed speech natively"
                        : "General-purpose transcription, requires API key"}
                  </div>
                </div>
              </div>
            </div>

            <button
              className={styles.generateBtn}
              onClick={handleGenerate}
              disabled={transcribing || uploading}
              style={{
                opacity: transcribing || uploading ? 0.6 : 1,
                cursor: transcribing || uploading ? "not-allowed" : "pointer",
              }}
            >
              {transcribing || uploading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Generating captions...
                </>
              ) : (
                <>
                  Generate Transcription
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
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
