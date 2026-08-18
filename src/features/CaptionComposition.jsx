import { AbsoluteFill, useCurrentFrame, useVideoConfig, Video } from "remotion";

// A Remotion composition that renders the real uploaded video + word-by-word highlighted
// subtitles in strict sequential word order with in-place kinetic typography styling.
export function CaptionComposition({ subtitles = [], preset, background = "#09090b", videoUrl }) {
  const frame = useCurrentFrame();
  const { fps, width: compW, height: compH } = useVideoConfig();
  const t = frame / fps;

  const active = subtitles.find((s) => t >= s.start && t < s.end);
  const words = active ? active.text.trim().split(/\s+/).filter(Boolean) : [];
  const activeDur = active ? Math.max(0.05, active.end - active.start) : 1;
  const progress = active ? Math.max(0, Math.min(1, (t - active.start) / activeDur)) : 0;
  const activeWordIdx = Math.min(words.length - 1, Math.floor(progress * words.length));

  const p = preset || {
    font: "Inter, system-ui, sans-serif",
    color: "#facc15",
    stroke: "#000000",
    bg: "transparent",
    weight: 800,
    shadow: "none",
    letterSpacing: "0.02em",
    case: "none",
    italic: false,
  };

  const textTransform =
    p.case === "uppercase" ? "uppercase" : p.case === "lowercase" ? "lowercase" : "none";

  const fontScale = p.fontSizeScale || 1;
  const dynamicFontSize = Math.max(22, Math.round(compH * 0.042 * fontScale));
  const dynamicGap = Math.max(6, Math.round(dynamicFontSize * 0.25));
  const pillPadX = Math.round(dynamicFontSize * 0.6);
  const pillPadY = Math.round(dynamicFontSize * 0.35);

  let justifyPosition = "flex-end";
  let padBottom = Math.max(30, Math.round(compH * 0.1));
  let padTop = 0;
  if (p.position === "top") {
    justifyPosition = "flex-start";
    padTop = Math.max(40, Math.round(compH * 0.12));
    padBottom = 0;
  } else if (p.position === "center") {
    justifyPosition = "center";
    padTop = 0;
    padBottom = 0;
  } else if (typeof p.position === "number") {
    justifyPosition = "flex-start";
    padTop = Math.round((compH * p.position) / 100);
    padBottom = 0;
  }

  // Detect Preset Category:
  const isEditorialForget =
    p.id === "forget-status" || p.styleType === "dual-tone-kinetic" || p.styleType === "editorial-duo";
  const isEditorialFocus = p.id === "focus-deeply" || p.styleType === "swiss-duo";
  const isBigRed = p.id === "the-big-red" || p.styleType === "big-red";
  const isDoodle = p.id === "the-little-things" || p.styleType === "highlighter-doodle";
  const isArchives = p.id === "archives" || p.styleType === "vintage-flourish";
  const isBlockbuster = p.id === "blockbuster" || p.styleType === "blockbuster-neon";
  const isBeast = p.id === "beast" || p.styleType === "beast-pop";

  return (
    <AbsoluteFill
      style={{
        background,
        justifyContent: justifyPosition,
        alignItems: "center",
        paddingTop: padTop,
        paddingBottom: padBottom,
      }}
    >
      {videoUrl ? (
        <AbsoluteFill>
          <Video src={videoUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </AbsoluteFill>
      ) : (
        <>
          <AbsoluteFill
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              opacity: 0.6,
            }}
          />
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 40,
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(217,119,54,0.25), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </AbsoluteFill>
        </>
      )}

      {active && words.length > 0 && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "92%",
            textAlign: "center",
            padding: p.bg && p.bg !== "transparent" ? `${pillPadY}px ${pillPadX}px` : undefined,
            background: p.bg && p.bg !== "transparent" ? p.bg : undefined,
            borderRadius: Math.min(24, Math.round(dynamicFontSize * 0.45)),
            boxShadow: p.bg && p.bg !== "transparent" ? "0 8px 32px rgba(0,0,0,0.6)" : undefined,
          }}
        >
          {/* RENDER ALL WORDS IN STRICT SEQUENTIAL IN-PLACE ORDER */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: dynamicGap,
              lineHeight: 1.25,
            }}
          >
            {words.map((w, i) => {
              const isActive = i === activeWordIdx;

              let wordFont = p.font || "inherit";
              let wordWeight = p.weight || 700;
              let wordStyle = p.italic ? "italic" : "normal";
              let wordTransform = textTransform;
              let wordColor = isActive ? (p.color || "#facc15") : "#ffffff";
              let wordBg = undefined;
              let wordPadding = undefined;
              let wordRadius = undefined;
              let transform = isActive ? "scale(1.15) translateY(-2px)" : "scale(1)";
              let wordShadow = isActive
                ? (p.shadow && p.shadow !== "none" ? `${p.shadow}, 0 2px 12px rgba(0,0,0,0.95)` : "0 0 20px rgba(250,204,21,0.6), 0 2px 10px rgba(0,0,0,0.95)")
                : "0 2px 10px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.8)";
              let wordBorder = undefined;
              let wordBoxShadow = undefined;

              // 1. Forget Status (Editorial Duo):
              // Inactive words: Italic serif white font
              // Active word IN PLACE: Bold uppercase Plus Jakarta Sans in glowing Cyan #38bdf8
              if (isEditorialForget) {
                if (isActive) {
                  wordFont = "'Plus Jakarta Sans', 'Montserrat', sans-serif";
                  wordWeight = 900;
                  wordStyle = "normal";
                  wordTransform = "uppercase";
                  wordColor = "#38bdf8";
                  transform = "scale(1.18) translateY(-2px)";
                  wordShadow = "0 0 25px rgba(56,189,248,0.95), 0 0 50px rgba(56,189,248,0.6), 0 2px 12px rgba(0,0,0,0.95)";
                } else {
                  wordFont = "'Playfair Display', 'Instrument Serif', Georgia, serif";
                  wordWeight = 400;
                  wordStyle = "italic";
                  wordTransform = "none";
                  wordColor = "#ffffff";
                  transform = "scale(1)";
                  wordShadow = "0 2px 10px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.8)";
                }
              }
              // 2. Focus Deeply (Swiss Duo):
              // Inactive: Italic serif white font
              // Active IN PLACE: Bold uppercase Plus Jakarta Sans in glowing Yellow #facc15
              else if (isEditorialFocus) {
                if (isActive) {
                  wordFont = "'Plus Jakarta Sans', 'Montserrat', sans-serif";
                  wordWeight = 900;
                  wordStyle = "normal";
                  wordTransform = "uppercase";
                  wordColor = "#facc15";
                  transform = "scale(1.18) translateY(-2px)";
                  wordShadow = "0 0 25px rgba(250,204,21,0.95), 0 2px 12px rgba(0,0,0,0.95)";
                } else {
                  wordFont = "'Playfair Display', 'Instrument Serif', Georgia, serif";
                  wordWeight = 400;
                  wordStyle = "italic";
                  wordTransform = "none";
                  wordColor = "#ffffff";
                  transform = "scale(1)";
                  wordShadow = "0 2px 10px rgba(0,0,0,0.95)";
                }
              }
              // 3. The Big Red:
              else if (isBigRed) {
                if (isActive) {
                  wordFont = "'Cinzel', serif";
                  wordWeight = 900;
                  wordStyle = "normal";
                  wordTransform = "uppercase";
                  wordColor = "#ef4444";
                  transform = "scale(1.2) translateY(-2px)";
                  wordShadow = "0 0 25px rgba(239,68,68,0.95), 0 2px 10px rgba(0,0,0,0.95)";
                } else {
                  wordFont = "'Playfair Display', serif";
                  wordWeight = 600;
                  wordStyle = "italic";
                  wordColor = "#ffffff";
                  transform = "scale(1)";
                  wordShadow = "0 2px 8px rgba(0,0,0,0.95)";
                }
              }
              // 4. The Little Things (Highlighter Doodle):
              else if (isDoodle) {
                wordFont = "'Caveat', cursive, sans-serif";
                wordWeight = 700;
                if (isActive) {
                  wordColor = "#000000";
                  wordBg = "#facc15";
                  wordPadding = `${Math.round(dynamicFontSize * 0.08)}px ${Math.round(dynamicFontSize * 0.35)}px`;
                  wordRadius = "9999px";
                  wordBoxShadow = "0 4px 16px rgba(250,204,21,0.6)";
                  transform = "scale(1.18) rotate(-2deg)";
                  wordShadow = "none";
                } else {
                  wordColor = "#ffffff";
                  transform = "scale(1)";
                  wordShadow = "0 2px 10px rgba(0,0,0,0.95)";
                }
              }
              // 5. Archives:
              else if (isArchives) {
                wordFont = "'Caveat', cursive, sans-serif";
                wordStyle = "italic";
                if (isActive) {
                  wordWeight = 700;
                  wordColor = "#ffffff";
                  transform = "scale(1.18) translateY(-2px)";
                  wordShadow = "0 0 16px rgba(253,224,71,0.8), 0 2px 10px rgba(0,0,0,0.95)";
                } else {
                  wordWeight = 500;
                  wordColor = "#fde047";
                  transform = "scale(1)";
                  wordShadow = "0 2px 8px rgba(0,0,0,0.95)";
                }
              }
              // 6. Blockbuster:
              else if (isBlockbuster) {
                wordFont = "'Anton', sans-serif";
                wordTransform = "uppercase";
                if (isActive) {
                  wordColor = "#ffffff";
                  wordShadow = "0 0 25px rgba(255,255,255,1), 0 0 14px #ef4444, 0 2px 10px rgba(0,0,0,0.95)";
                  transform = "scale(1.15) translateY(-2px)";
                } else {
                  wordColor = "#ef4444";
                  wordShadow = "0 0 18px rgba(239,68,68,0.85), 0 2px 8px rgba(0,0,0,0.95)";
                  transform = "scale(1)";
                }
              }
              // 7. MrBeast (Pop Box Highlight):
              else if (isBeast) {
                wordFont = "'Plus Jakarta Sans', 'Inter', sans-serif";
                wordWeight = 900;
                wordTransform = "uppercase";
                if (isActive) {
                  wordColor = "#000000";
                  wordBg = "#facc15";
                  wordPadding = `${Math.round(dynamicFontSize * 0.08)}px ${Math.round(dynamicFontSize * 0.35)}px`;
                  wordRadius = "8px";
                  wordBoxShadow = "0 0 20px rgba(250,204,21,0.8), 0 4px 12px rgba(0,0,0,0.5)";
                  transform = "scale(1.18) translateY(-2px)";
                  wordShadow = "none";
                } else {
                  wordColor = "#ffffff";
                  transform = "scale(1)";
                  wordShadow = "0 2px 10px rgba(0,0,0,0.95), 0 0 4px #000";
                }
              }

              return (
                <span
                  key={i}
                  style={{
                    fontFamily: wordFont,
                    fontWeight: wordWeight,
                    fontStyle: wordStyle,
                    fontSize: dynamicFontSize,
                    color: wordColor,
                    background: wordBg,
                    padding: wordPadding,
                    borderRadius: wordRadius,
                    border: wordBorder,
                    boxShadow: wordBoxShadow,
                    transform,
                    transition: "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), color 0.12s ease, background 0.12s ease",
                    textShadow: wordShadow,
                    letterSpacing: p.letterSpacing || "0.01em",
                    textTransform: wordTransform,
                    display: "inline-block",
                    lineHeight: 1.25,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>

          {/* Underline Flourish decoration for Archives preset */}
          {isArchives && (
            <svg width="120" height="10" viewBox="0 0 120 10" fill="none" style={{ marginTop: 4 }}>
              <path
                d="M2 5C25 9 60 1 118 6"
                stroke="#fde047"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 6px rgba(253,224,71,0.8))" }}
              />
            </svg>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
}
