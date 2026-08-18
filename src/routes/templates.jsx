import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { PRESETS } from "../features/presets";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
});

const animationLabels = { pop: "Pop", fade: "Fade", slide: "Slide" };
const caseLabels = { uppercase: "UPPER", lowercase: "lower", none: "Normal" };

function TemplateCard({ t }) {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-2xl border border-[var(--border-base)] bg-[var(--bg-surface)] backdrop-blur-2xl p-4 hover:border-[var(--primary)] transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md"
      onClick={() => navigate({ to: "/dashboard", search: { template: t.id } })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate({ to: "/dashboard", search: { template: t.id } });
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Select template: ${t.name}`}
    >
      <div
        className="w-full h-24 rounded-xl mb-3 flex items-center justify-center border border-[rgba(255,255,255,0.08)] bg-[#09090b] overflow-hidden relative"
      >
        {t.id === "forget-status" ? (
          <div className="flex flex-col items-center">
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "#ffffff" }}>
              forget
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 18, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.02em" }}>
              STATUS
            </span>
          </div>
        ) : t.id === "focus-deeply" ? (
          <div className="flex flex-col items-center">
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 16, color: "#ffffff", textTransform: "uppercase" }}>
              focus
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 18, color: "#facc15", textTransform: "uppercase" }}>
              DEEPLY
            </span>
          </div>
        ) : t.id === "the-big-red" ? (
          <div className="relative flex items-center justify-center">
            <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 22, color: "#ef4444", textTransform: "uppercase", opacity: 0.8 }}>
              SECOND
            </span>
            <span style={{ position: "absolute", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 11, color: "#ffffff" }}>
              the quick fox
            </span>
          </div>
        ) : t.id === "the-little-things" ? (
          <div className="flex items-center gap-1.5" style={{ fontFamily: "'Caveat', cursive", fontSize: 18 }}>
            <span style={{ color: "#ffffff" }}>the</span>
            <span style={{ background: "#facc15", color: "#000000", padding: "1px 8px", borderRadius: 9999, fontWeight: 700 }}>
              little
            </span>
            <span style={{ color: "#ffffff", border: "1px solid #ef4444", borderRadius: "50%", padding: "0 6px" }}>
              things
            </span>
          </div>
        ) : t.id === "archives" ? (
          <div className="flex flex-col items-center">
            <span style={{ fontFamily: "'Caveat', cursive", fontStyle: "italic", fontSize: 18, color: "#ffedd5" }}>
              Your Style is it
            </span>
            <svg width="50" height="4" viewBox="0 0 50 4" fill="none">
              <path d="M1 2C10 4 20 0 30 2C40 4 49 2" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        ) : t.id === "blockbuster" ? (
          <div className="relative flex flex-col items-center justify-center">
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: 15, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.06em", textShadow: "0 0 14px rgba(239,68,68,0.9)" }}>
              THIS IS THE NEXT
            </span>
            <span style={{ fontFamily: "'Caveat', cursive", fontStyle: "italic", fontSize: 16, color: "#ffffff", marginTop: -4 }}>
              big thing
            </span>
          </div>
        ) : (
          <span
            className="text-lg font-black tracking-tight"
            style={{
              color: t.color,
              fontFamily: t.font,
              textShadow: t.shadow && t.shadow !== "none" ? t.shadow : "none",
              WebkitTextStroke:
                t.stroke && t.stroke !== "transparent" ? `1px ${t.stroke}` : undefined,
              fontStyle: t.italic ? "italic" : "normal",
              textTransform:
                t.case === "uppercase" ? "uppercase" : t.case === "lowercase" ? "lowercase" : "none",
            }}
          >
            {t.name}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">{t.name}</h3>
        {t.badge && (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#f97316] text-white">
            {t.badge}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {t.tags ? (
          t.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[9px] text-[var(--text-secondary)] font-medium">
              {tag}
            </span>
          ))
        ) : (
          <>
            <span className="px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[9px] text-[var(--text-secondary)] font-medium">
              {t.weight}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[rgba(0,0,0,0.04)] dark:bg-[rgba(255,255,255,0.06)] text-[9px] text-[var(--text-secondary)] font-medium">
              {animationLabels[t.animation] || t.animation}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [animFilter, setAnimFilter] = useState("all");

  const filtered = PRESETS.filter((t) => {
    const matchSearch = search ? t.name.toLowerCase().includes(search.toLowerCase()) : true;
    const matchAnim = animFilter === "all" || t.animation === animFilter;
    return matchSearch && matchAnim;
  });

  return (
    <Layout>
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-black tracking-tight leading-[1.06] mb-3">
              <span className="gradient-text">{PRESETS.length}</span> Caption Styles
            </h1>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
              Every style reveals word-by-word, highlights the active word, and is fully tunable.
              Pick one and ship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto mb-10">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-base)] flex-1 w-full shadow-sm">
              <svg
                className="w-4 h-4 text-[var(--text-secondary)] shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 21l-5.2-5.2" />
                <circle cx="10" cy="10" r="8" />
              </svg>
              <input
                className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] w-full placeholder-[var(--text-tertiary)] font-medium"
                placeholder="Find a style..."
                aria-label="Search caption styles"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5 p-1 bg-[var(--bg-surface)] border border-[var(--border-base)] rounded-full">
              {["all", "pop", "fade", "slide"].map((a) => (
                <button
                  key={a}
                  onClick={() => setAnimFilter(a)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all duration-150 focus-visible:outline-none ${
                    animFilter === a
                      ? "bg-[var(--primary)] text-white shadow-sm"
                      : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {a === "all" ? "All" : animationLabels[a] || a}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((t) => (
              <TemplateCard key={t.id} t={t} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--text-secondary)]">
              No styles found matching &ldquo;{search}&rdquo;
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
