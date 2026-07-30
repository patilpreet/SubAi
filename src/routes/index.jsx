import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Layout } from "../components/Layout";
import { CaptionPlayer } from "../features/CaptionPlayer";
import { MOCK_SUBTITLES } from "../features/mockData";
import { PRESETS } from "../features/presets";

export const Route = createFileRoute("/")({
  ssr: false,
  component: HomePage,
});

const HERO_SUBS = MOCK_SUBTITLES["job-hinglish-reel"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 12; 
    const angleY = (x - xc) / 12;
    card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.025)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-[var(--bg-surface)] border border-[var(--border-base)] rounded-[24px] p-6 shadow-sm transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

function StatCard({ value, label, icon, delay }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div
      ref={ref}
      className={`bg-[var(--bg-surface)] border border-[var(--border-base)] rounded-[20px] p-6 text-center shadow-sm transition-all duration-700 hover:border-[var(--primary)]/20 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10 mb-4 text-[var(--primary)]">
        {icon}
      </div>
      <p className="text-3xl font-bold text-[var(--text-primary)] mb-1 tracking-tight font-serif italic">{value}</p>
      <p className="text-[11px] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">{label}</p>
    </div>
  );
}

function FeatureCard({ colSpan, title, desc, icon, children }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      className={`${colSpan} p-8 relative rounded-[24px] border border-[var(--border-base)] bg-[var(--bg-surface)] shadow-sm overflow-hidden transition-all duration-500 hover:border-[var(--primary)]/20 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10 flex items-center justify-center mb-6 text-[var(--primary)]">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{title}</h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{desc}</p>
        {children}
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--primary)]/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
      >
        <span className="text-[15px] font-bold text-[var(--text-primary)] pr-4">{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-3.5 h-3.5 shrink-0 text-[var(--text-secondary)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-base)]/40 pt-4">{answer}</p>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [preset, setPreset] = useState(PRESETS[0]);
  const [mounted, setMounted] = useState(false);
  const [heroRef] = useInView(0.1);
  const [sandboxRef, sandboxInView] = useInView(0.1);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Title & Editorial CTA */}
          <div className="lg:col-span-7 flex flex-col text-left items-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--primary)]/10 bg-[var(--primary)]/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-[10px] font-bold text-[var(--primary)] tracking-wider uppercase">
                Now in Public Beta
              </span>
            </div>

            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-[var(--text-primary)] mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Captions that get <br />
              <span className="font-serif italic text-[var(--primary)] font-normal">Hinglish</span> right.
            </h1>

            <p className="text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Most caption tools mangle code-mixed speech. SubAI transcribes Hindi, Hinglish and 20 other Indian languages with frame-accurate styling.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/signup" className="btn-primary px-8 py-3.5 text-[14px]">
                Try SubAI free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a href="#styles" className="btn-secondary px-6 py-3.5 text-[14px]">
                Explore styles
              </a>
            </div>

            <p className="mt-4 text-[11px] text-[var(--text-tertiary)] font-medium">Free to use · Powered by Groq Whisper & Gemini</p>
          </div>

          {/* Right Column: Pinterest Masonry Moodboard of Video presets */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="columns-2 gap-3 sm:gap-4 w-full max-w-[420px]">
              
              <TiltCard className="mb-4 aspect-[9/16] bg-amber-50 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />
                <div className="relative z-20 text-[10px] uppercase tracking-wider font-bold text-amber-800">preset</div>
                <div className="relative z-20 my-auto text-center px-2">
                  <span className="font-black text-amber-500 text-lg uppercase stroke-black py-1 px-2 bg-black rounded-lg">BOOM!</span>
                  <p className="text-white text-xs font-bold mt-2">Hype Amber Style</p>
                </div>
                <div className="relative z-20 flex justify-between items-center text-[10px] text-white/80 mt-auto">
                  <span>9:16 Shorts</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">▶</span>
                </div>
              </TiltCard>

              <TiltCard className="mb-4 aspect-[1/1] bg-teal-50 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                <div className="relative z-20 text-[10px] uppercase tracking-wider font-bold text-teal-800">preset</div>
                <div className="relative z-20 my-auto text-center">
                  <span className="font-serif italic font-bold text-teal-900 text-lg">“Aesthetic”</span>
                </div>
                <div className="relative z-20 flex justify-between items-center text-[10px] text-white/80 mt-auto">
                  <span>1:1 Square</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[8px]">▶</span>
                </div>
              </TiltCard>

              <TiltCard className="mb-4 aspect-[9/16] bg-rose-50 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 z-10" />
                <div className="relative z-20 text-[10px] uppercase tracking-wider font-bold text-rose-800 font-mono">viral</div>
                <div className="relative z-20 my-auto text-center">
                  <span className="bg-rose-500 text-white font-extrabold text-sm px-2 py-0.5 rounded shadow">HORMOZI</span>
                </div>
                <div className="relative z-20 flex justify-between items-center text-[10px] text-white/80 mt-auto">
                  <span>Caption Track</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">▶</span>
                </div>
              </TiltCard>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[var(--bg-surface)] border-y border-[var(--border-base)] px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            value="99%"
            label="Accuracy"
            delay={0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M20 6 9 17l-5-5"/></svg>
            }
          />
          <StatCard
            value="30+"
            label="Style presets"
            delay={100}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 22a7 7 0 0 0 5-2c2-2 2-7-4-8-5-1-6-6-4-8a7 7 0 0 0-5 2c-2 2-2 7 4 8 5 1 6 6 4 8z"/></svg>
            }
          />
          <StatCard
            value="22"
            label="Indian languages"
            delay={200}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            }
          />
          <StatCard
            value="10x"
            label="Faster edits"
            delay={300}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            }
          />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <p className="section-label">Built Different</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] mb-4 text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              Everything a creator <span className="font-serif italic font-normal text-[var(--primary)]">actually needs</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm">
              From first upload to exported reel, SubAI handles every step so you can focus on making great content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-auto gap-5">
            <FeatureCard
              colSpan="md:col-span-4"
              title="Built for Hinglish"
              desc="Our transcription model understands Hindi-English code-switching out of the box. It handles slang, regional accents, and mixed-script words."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
              }
            >
              <div className="mt-4 rounded-2xl bg-[var(--bg-base)] border border-[var(--border-base)] p-4 space-y-2 shadow-inner">
                <p className="text-[13px] text-[var(--text-primary)] font-medium">
                  <span className="text-[var(--text-tertiary)] mr-1.5">“</span>Basically technically speaking yaar, content is king!<span className="text-[var(--text-tertiary)] ml-0.5">”</span>
                </p>
                <p className="text-[13px] text-[var(--text-primary)] font-medium">
                  <span className="text-[var(--text-tertiary)] mr-1.5">“</span>Aaj ka video dekh bhai, full life-changing hai.<span className="text-[var(--text-tertiary)] ml-0.5">”</span>
                </p>
              </div>
            </FeatureCard>

            <FeatureCard
              colSpan="md:col-span-2"
              title="22 Indian Languages"
              desc="Native script, Romanized script, or English translation. Switch instantly."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
              }
            >
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["हिन्दी", "தமிழ்", "తెలుగు", "मराठी", "বাংলা", "English"].map(
                  (label, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 rounded-full bg-[var(--bg-base)] border border-[var(--border-base)] text-xs text-[var(--text-secondary)] font-medium"
                    >
                      {label}
                    </div>
                  ),
                )}
              </div>
            </FeatureCard>

            <FeatureCard
              colSpan="md:col-span-3"
              title="30+ Caption Presets"
              desc="Hormozi, Karaoke, Deep Glow, Cyberpunk. Every word is customizable with live styles."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 20h.01"/><path d="M8.5 16.5H8a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4h.5"/><path d="M12 4h.01"/><path d="M15.5 8H16a4 4 0 0 1 4 4v.5a4 4 0 0 1-4 4h-.5"/><path d="M12 12h.01"/></svg>
              }
            />

            <FeatureCard
              colSpan="md:col-span-3"
              title="Browser-Native Workflow"
              desc="Powered by Remotion. Render and export right inside the browser. No server rendering queues."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="15" x="2" y="3" rx="2"/><path d="M6 21h12"/><path d="M12 18v3"/></svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Comparisons Section */}
      <section className="py-24 px-6 bg-[var(--bg-surface)] border-y border-[var(--border-base)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <p className="section-label">Editorial Excellence</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] mb-4 text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              Raw audio vs <span className="font-serif italic font-normal text-[var(--primary)]">SubAI translation</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm">
              Most tools deliver generic text. SubAI cleans conversational filler words and outputs polished multi-lingual script paths.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-[24px] border border-[var(--border-base)] bg-[var(--bg-base)] p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-[10px] font-bold text-red-600 tracking-wider uppercase">
                  Standard transcription
                </span>
              </div>
              <div className="space-y-4">
                {[
                  "So basically what happens is that... uh... you know... the thing is...",
                  "Main kal market gaya tha *unintelligible noise* phir uske baad",
                  "Actually what I'm trying to say is that this product is very... umm...",
                  "Aap logon ko pata hai ki yeh... like... it's very important for us",
                ].map((line, i) => (
                  <p
                    key={i}
                    className="text-[13px] text-[var(--text-secondary)] italic leading-relaxed border-l-2 border-[var(--border-base)] pl-4"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-[var(--primary)]/10 bg-amber-50/20 p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
                <span className="text-[10px] font-bold text-[var(--primary)] tracking-wider uppercase">
                  SubAI Studio Output
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    roman: "So basically, the thing is…",
                    native: "तो बात यूँ है…",
                  },
                  {
                    roman: "Main kal market gaya tha, phir uske baad…",
                    native: "मैं कल मार्केट गया था, फिर उसके बाद…",
                  },
                  {
                    roman: "What I'm trying to say is, this product is very…",
                    native: "मैं यह कहने की कोशिश कर रहा हूँ कि यह प्रोडक्ट बहुत…",
                  },
                  {
                    roman: "Yeh humare liye bahut important hai",
                    native: "यह हमारे लिए बहुत महत्वपूर्ण है",
                  },
                ].map((line, i) => (
                  <div
                    key={i}
                    className="text-[13px] text-[var(--text-primary)] leading-relaxed border-l-2 border-[var(--primary)]/30 pl-4 space-y-1"
                  >
                    <p className="font-semibold">{line.roman}</p>
                    <p className="text-[var(--text-secondary)] font-serif italic text-xs">{line.native}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles Sandbox */}
      <section
        id="styles"
        ref={sandboxRef}
        className="py-24 px-6 bg-[var(--bg-base)]"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-500 ${sandboxInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="section-label">Live Sandbox</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] mb-4 text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              Preset styles, <span className="font-serif italic font-normal text-[var(--primary)]">ready to ship</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm">
              Tap a preset below to preview it live in the phone mockup.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {PRESETS.slice(0, 10).map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p)}
                className={`px-5 py-2 rounded-full border text-[13px] font-semibold transition-all duration-200 ${
                  preset.id === p.id
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
                    : "bg-[var(--bg-surface)] border-[var(--border-base)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary)]/5"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="relative rounded-[32px] overflow-hidden border border-[var(--border-base)] bg-[var(--bg-surface)] p-6 shadow-md max-w-sm mx-auto transition-all duration-300 hover:shadow-lg">
            <div className="w-full flex justify-center">
              <div style={{ transform: "scale(0.9)", transformOrigin: "top center" }} className="w-full">
                <CaptionPlayer subtitles={HERO_SUBS} preset={preset} durationInFrames={330} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-[var(--bg-surface)] border-t border-[var(--border-base)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <p className="section-label">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] mb-4 text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              Questions? <span className="font-serif italic font-normal text-[var(--primary)]">Answered.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is SubAI really free?",
                a: "Yes. Our beta tier includes unlimited captions with a small export watermark. Upgrading unlocks watermark-free HD/4K downloads.",
              },
              {
                q: "What makes it Hinglish friendly?",
                a: "Traditional models translate either to pure Hindi script or strict English. SubAI keeps the code-mixed romanized words (e.g. 'yaar', 'bhai', 'speaking') intact so it matches social video styles.",
              },
              {
                q: "Do I need to install any heavy editor?",
                a: "No. SubAI is browser-native. The timeline, audio waveform extraction, and canvas preview run directly in your browser tab without lags.",
              },
              {
                q: "Can I customize the caption animations?",
                a: "Yes, you can edit text sizes, strokes, shadow glows, capitalization modes, and select popup animations directly in the workspace presets panel.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
