/**
 * Video Exporter Engine for SubAI
 * Supports universal MP4 (H.264/AAC) and WebM with EBML duration metadata injection.
 * Renders video frames with preset-accurate styled captions, word highlighting, and audio synchronization.
 */

/**
 * Determine the optimal supported MIME type for video recording.
 * Prioritizes MP4 (H.264) for out-of-the-box Windows Media Player and mobile playback.
 */
export function getOptimalExportFormat() {
  if (typeof window === "undefined" || !window.MediaRecorder) {
    return { mimeType: "video/webm", extension: "webm", isMp4: false, label: "WebM" };
  }

  const mp4Types = [
    { mime: "video/mp4;codecs=avc1.42E01E,mp4a.40.2", label: "MP4 (H.264 / AAC)" },
    { mime: "video/mp4;codecs=avc1,mp4a.40.2", label: "MP4 (H.264 / AAC)" },
    { mime: "video/mp4;codecs=avc1", label: "MP4 (H.264)" },
    { mime: "video/mp4;codecs=h264", label: "MP4 (H.264)" },
    { mime: "video/mp4", label: "MP4" },
  ];

  for (const t of mp4Types) {
    if (MediaRecorder.isTypeSupported(t.mime)) {
      return { mimeType: t.mime, extension: "mp4", isMp4: true, label: t.label };
    }
  }

  const webmTypes = [
    { mime: "video/webm;codecs=h264,opus", label: "WebM (H.264 / Opus)" },
    { mime: "video/webm;codecs=vp9,opus", label: "WebM (VP9 / Opus)" },
    { mime: "video/webm;codecs=vp8,opus", label: "WebM (VP8 / Opus)" },
    { mime: "video/webm;codecs=vp9", label: "WebM (VP9)" },
    { mime: "video/webm;codecs=vp8", label: "WebM (VP8)" },
    { mime: "video/webm", label: "WebM" },
  ];

  for (const t of webmTypes) {
    if (MediaRecorder.isTypeSupported(t.mime)) {
      return { mimeType: t.mime, extension: "webm", isMp4: false, label: t.label };
    }
  }

  return { mimeType: "video/webm", extension: "webm", isMp4: false, label: "WebM" };
}

/**
 * Patch WebM binary header to inject duration metadata.
 * Chromium MediaRecorder writes WebM files without segment duration,
 * which causes Windows Media Player and other players to show 0:00:00 or fail seeking.
 */
export async function fixWebmDuration(blob, durationMs) {
  try {
    const buffer = await blob.arrayBuffer();
    const uint8 = new Uint8Array(buffer);

    // Look for EBML Segment info header [0x15, 0x49, 0xA9, 0x66]
    let infoPos = -1;
    for (let i = 0; i < Math.min(uint8.length - 4, 65536); i++) {
      if (
        uint8[i] === 0x15 &&
        uint8[i + 1] === 0x49 &&
        uint8[i + 2] === 0xa9 &&
        uint8[i + 3] === 0x66
      ) {
        infoPos = i;
        break;
      }
    }

    if (infoPos === -1) {
      return blob; // Could not find Info element, return original blob
    }

    // Check if Duration element [0x44, 0x89] exists inside Info element
    let durationPos = -1;
    for (let i = infoPos; i < Math.min(infoPos + 1024, uint8.length - 2); i++) {
      if (uint8[i] === 0x44 && uint8[i + 1] === 0x89) {
        durationPos = i;
        break;
      }
    }

    const durationFloat = durationMs; // in milliseconds (default TimecodeScale is 1ms)

    if (durationPos !== -1) {
      // Overwrite existing 4-byte or 8-byte duration float
      const view = new DataView(buffer);
      const dataSize = uint8[durationPos + 2] & 0x7f;
      if (dataSize === 4) {
        view.setFloat32(durationPos + 3, durationFloat, false);
      } else if (dataSize === 8) {
        view.setFloat64(durationPos + 3, durationFloat, false);
      }
      return new Blob([buffer], { type: blob.type });
    }

    // If Duration element does not exist, insert Duration element [0x44, 0x89, 0x88, 8 bytes float64]
    const durationElement = new Uint8Array(11);
    durationElement[0] = 0x44;
    durationElement[1] = 0x89;
    durationElement[2] = 0x88; // 8 bytes float
    const view = new DataView(durationElement.buffer);
    view.setFloat64(3, durationFloat, false);

    // Insert right after Segment Info header & size
    // Read Info header size
    let offset = infoPos + 4;
    const firstByte = uint8[offset];
    let sizeLength = 1;
    if (firstByte & 0x80) sizeLength = 1;
    else if (firstByte & 0x40) sizeLength = 2;
    else if (firstByte & 0x20) sizeLength = 3;
    else if (firstByte & 0x10) sizeLength = 4;

    const insertPos = offset + sizeLength;

    const newBuffer = new Uint8Array(buffer.byteLength + durationElement.length);
    newBuffer.set(uint8.subarray(0, insertPos), 0);
    newBuffer.set(durationElement, insertPos);
    newBuffer.set(uint8.subarray(insertPos), insertPos + durationElement.length);

    return new Blob([newBuffer.buffer], { type: blob.type });
  } catch (err) {
    console.warn("Could not patch WebM duration:", err);
    return blob;
  }
}

/**
 * Draw rounded rectangle for subtitle background pill.
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Render styled subtitle with word highlighting and preset styling onto 2D canvas context.
 */
export function renderSubtitleFrame(ctx, canvas, activeSub, currentTime, preset, isFreeTier) {
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

  if (activeSub && activeSub.text) {
    let rawText = activeSub.text.trim();
    if (p.case === "uppercase") rawText = rawText.toUpperCase();
    if (p.case === "lowercase") rawText = rawText.toLowerCase();

    const words = rawText.split(/\s+/).filter(Boolean);
    const subDuration = Math.max(0.1, activeSub.end - activeSub.start);
    const progress = Math.max(0, Math.min(1, (currentTime - activeSub.start) / subDuration));
    const activeWordIdx = Math.min(words.length - 1, Math.floor(progress * words.length));

    const fontSize = Math.round(canvas.height * 0.042);
    const fontWeight = p.weight || 800;
    const fontStyle = p.italic ? "italic" : "normal";
    const fontFamily = p.font || "Inter, system-ui, sans-serif";

    ctx.save();
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const spaceWidth = ctx.measureText(" ").width;
    const wordMetrics = words.map((w) => ({
      word: w,
      width: ctx.measureText(w).width,
    }));

    const maxLineWidth = canvas.width * 0.85;

    // Wrap words into lines
    const lines = [];
    let currentLine = [];
    let currentLineWidth = 0;

    for (let i = 0; i < wordMetrics.length; i++) {
      const item = { ...wordMetrics[i], index: i };
      const itemTotalWidth = currentLine.length === 0 ? item.width : item.width + spaceWidth;

      if (currentLineWidth + itemTotalWidth > maxLineWidth && currentLine.length > 0) {
        lines.push({ words: currentLine, width: currentLineWidth });
        currentLine = [item];
        currentLineWidth = item.width;
      } else {
        currentLine.push(item);
        currentLineWidth += itemTotalWidth;
      }
    }
    if (currentLine.length > 0) {
      lines.push({ words: currentLine, width: currentLineWidth });
    }

    const lineHeight = fontSize * 1.35;
    const totalTextHeight = lines.length * lineHeight;
    const centerY = canvas.height * 0.8;
    const startY = centerY - (totalTextHeight / 2) + (lineHeight / 2);

    // Draw background pill if preset has bg
    if (p.bg && p.bg !== "transparent" && p.bg !== "none") {
      const maxW = Math.max(...lines.map((l) => l.width));
      const padX = Math.round(fontSize * 0.7);
      const padY = Math.round(fontSize * 0.4);
      const bgX = (canvas.width - maxW) / 2 - padX;
      const bgY = centerY - (totalTextHeight / 2) - padY;
      const bgW = maxW + padX * 2;
      const bgH = totalTextHeight + padY * 2;
      const radius = Math.min(16, Math.round(fontSize * 0.4));

      ctx.fillStyle = p.bg;
      drawRoundedRect(ctx, bgX, bgY, bgW, bgH, radius);
      ctx.fill();
    }

    // Render each line and word
    lines.forEach((line, lineIdx) => {
      const lineY = startY + lineIdx * lineHeight;
      let curX = (canvas.width - line.width) / 2;

      line.words.forEach((item) => {
        const isCurrent = item.index === activeWordIdx;
        const wordX = curX + item.width / 2;

        ctx.save();

        let wordColor = isCurrent ? (p.color || "#facc15") : "#ffffff";
        let wordFamily = fontFamily;
        let wordWeight = fontWeight;
        let wordStyle = fontStyle;
        let wordText = item.word;
        let scaleAmount = isCurrent ? 1.15 : 1;

        if (p.id === "forget-status" || p.styleType === "dual-tone-kinetic" || p.styleType === "editorial-duo") {
          if (isCurrent) {
            wordFamily = "'Plus Jakarta Sans', 'Montserrat', sans-serif";
            wordWeight = "900";
            wordStyle = "normal";
            wordColor = "#38bdf8";
            wordText = item.word.toUpperCase();
            scaleAmount = 1.22;
          } else {
            wordFamily = "'Instrument Serif', 'Playfair Display', Georgia, serif";
            wordWeight = "400";
            wordStyle = "italic";
            wordColor = "#ffffff";
            wordText = item.word.toLowerCase();
            scaleAmount = 1;
          }
        } else if (p.id === "focus-deeply" || p.styleType === "swiss-duo") {
          if (isCurrent) {
            wordFamily = "'Plus Jakarta Sans', 'Inter', sans-serif";
            wordWeight = "900";
            wordStyle = "normal";
            wordColor = "#facc15";
            wordText = item.word.toUpperCase();
            scaleAmount = 1.2;
          } else {
            wordFamily = "'Instrument Serif', 'Playfair Display', Georgia, serif";
            wordWeight = "400";
            wordStyle = "italic";
            wordColor = "#ffffff";
            wordText = item.word;
            scaleAmount = 1;
          }
        } else if (p.styleType === "highlighter-doodle") {
          if (isCurrent) {
            wordColor = "#000000";
            const pillW = item.width + fontSize * 0.6;
            const pillH = fontSize * 1.25;
            const pillX = wordX - pillW / 2;
            const pillY = lineY - pillH / 2;
            ctx.fillStyle = p.bg || "#facc15";
            drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
            ctx.fill();
          } else {
            wordColor = "#ffffff";
          }
        } else if (p.styleType === "blockbuster-neon") {
          if (isCurrent) {
            wordColor = "#ffffff";
          } else {
            wordColor = "#ef4444";
          }
        }

        ctx.font = `${wordStyle} ${wordWeight} ${fontSize}px ${wordFamily}`;

        if (isCurrent) {
          ctx.translate(wordX, lineY);
          ctx.scale(scaleAmount, scaleAmount);
          ctx.translate(-wordX, -lineY);
        }

        // Apply clean text shadow
        if (isCurrent && (p.id === "forget-status" || p.styleType === "dual-tone-kinetic" || p.styleType === "editorial-duo")) {
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = Math.round(fontSize * 0.7);
        } else {
          ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
          ctx.shadowBlur = Math.round(fontSize * 0.35);
        }
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = Math.round(fontSize * 0.08);

        // Draw fill text (100% solid opacity)
        ctx.fillStyle = wordColor;
        ctx.fillText(wordText, wordX, lineY);

        ctx.restore();
        curX += item.width + spaceWidth;
      });
    });

    ctx.restore();
  }

  // Draw Watermark if free tier
  if (isFreeTier) {
    ctx.save();
    const wmFontSize = Math.max(13, Math.round(canvas.height * 0.018));
    ctx.font = `600 ${wmFontSize}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.textAlign = "right";
    ctx.textBaseline = "bottom";
    ctx.fillText("SubAI", canvas.width - 24, canvas.height - 20);
    ctx.restore();
  }
}

/**
 * Export the video with subtitles rendered into canvas and encoded into MP4 / WebM.
 *
 * @param {Object} options
 * @param {string} options.videoUrl URL of the video file
 * @param {HTMLVideoElement} [options.existingVideoEl] Existing video element from DOM
 * @param {Array} options.subtitles Subtitle segments [{ start, end, text }]
 * @param {Object} options.preset Subtitle styling preset
 * @param {boolean} [options.isFreeTier=true] Whether to apply SubAI watermark
 * @param {string} [options.aspect='original'] Target aspect ratio ('original', '916', '169', '11', '45')
 * @param {string} [options.filename='captioned-video'] Output filename without extension
 * @param {Function} [options.onProgress] Callback with { percent, currentTime, duration, stage, format }
 * @param {Object} [options.signal] AbortController signal
 * @returns {Promise<{ blob: Blob, url: string, filename: string, format: Object }>}
 */
export async function exportVideo({
  videoUrl,
  existingVideoEl = null,
  subtitles = [],
  preset = null,
  isFreeTier = true,
  aspect = "original",
  filename = "captioned-video",
  onProgress = () => {},
  signal = null,
}) {
  const format = getOptimalExportFormat();
  onProgress({ percent: 0, currentTime: 0, duration: 0, stage: "Initializing video...", format });

  let video = null;
  let createdVideo = false;

  try {
    // Create dedicated offscreen video element for clean, isolated export
    video = document.createElement("video");
    createdVideo = true;
    video.crossOrigin = "anonymous";
    video.playsInline = true;
    video.muted = false;
    video.src = videoUrl || (existingVideoEl ? existingVideoEl.src : "");

    await new Promise((resolve, reject) => {
      const onLoaded = () => {
        cleanup();
        resolve();
      };
      const onError = () => {
        cleanup();
        reject(new Error("Failed to load video for export. Check network or video source."));
      };
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("Video load timed out."));
      }, 15000);

      function cleanup() {
        clearTimeout(timeout);
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("canplay", onLoaded);
        video.removeEventListener("error", onError);
      }

      if (video.readyState >= 2) {
        resolve();
      } else {
        video.addEventListener("loadedmetadata", onLoaded);
        video.addEventListener("canplay", onLoaded);
        video.addEventListener("error", onError);
      }
    });

    if (signal?.aborted) throw new Error("Export cancelled.");

    const duration = video.duration || (subtitles.length ? subtitles[subtitles.length - 1].end + 1 : 10);
    const videoWidth = video.videoWidth || 1080;
    const videoHeight = video.videoHeight || 1920;

    // Calculate canvas target dimensions based on selected aspect ratio
    let canvasWidth = videoWidth;
    let canvasHeight = videoHeight;

    if (aspect === "916") {
      canvasWidth = 1080;
      canvasHeight = 1920;
    } else if (aspect === "169") {
      canvasWidth = 1920;
      canvasHeight = 1080;
    } else if (aspect === "11") {
      canvasWidth = 1080;
      canvasHeight = 1080;
    } else if (aspect === "45") {
      canvasWidth = 1080;
      canvasHeight = 1350;
    } else {
      // original
      canvasWidth = videoWidth;
      canvasHeight = videoHeight;
    }

    // Create 2D render canvas
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d", { alpha: false });

    // Set up canvas capture stream at 30 FPS
    const canvasStream = canvas.captureStream ? canvas.captureStream(30) : canvas.mozCaptureStream(30);

    // Audio capture via AudioContext or captureStream
    let audioStreamTracks = [];
    let audioCtx = null;
    try {
      if (video.captureStream) {
        const stream = video.captureStream();
        audioStreamTracks = stream.getAudioTracks();
      } else if (video.mozCaptureStream) {
        const stream = video.mozCaptureStream();
        audioStreamTracks = stream.getAudioTracks();
      }

      if (audioStreamTracks.length === 0) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          audioCtx = new AudioCtxClass();
          if (audioCtx.state === "suspended") {
            await audioCtx.resume();
          }
          const source = audioCtx.createMediaElementSource(video);
          const dest = audioCtx.createMediaStreamDestination();
          source.connect(dest);
          source.connect(audioCtx.destination);
          audioStreamTracks = dest.stream.getAudioTracks();
        }
      }
    } catch (audioErr) {
      console.warn("Audio extraction fallback to video-only:", audioErr.message);
      audioStreamTracks = [];
    }

    const combinedTracks = [
      ...canvasStream.getVideoTracks(),
      ...audioStreamTracks,
    ];
    const recordingStream = new MediaStream(combinedTracks);

    const recorder = new MediaRecorder(recordingStream, {
      mimeType: format.mimeType,
      videoBitsPerSecond: 8000000,
    });

    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    const completionPromise = new Promise((resolve, reject) => {
      recorder.onstop = async () => {
        try {
          onProgress({ percent: 99, currentTime: duration, duration, stage: "Finalizing file...", format });
          let rawBlob = new Blob(chunks, { type: format.mimeType });

          if (!format.isMp4) {
            // Apply EBML duration fix for WebM files
            rawBlob = await fixWebmDuration(rawBlob, duration * 1000);
          }

          const cleanName = `${filename.replace(/[^a-zA-Z0-9_-]/g, "_")}-captioned.${format.extension}`;
          const downloadUrl = URL.createObjectURL(rawBlob);

          onProgress({ percent: 100, currentTime: duration, duration, stage: "Export completed!", format });
          resolve({
            blob: rawBlob,
            url: downloadUrl,
            filename: cleanName,
            format,
          });
        } catch (err) {
          reject(err);
        }
      };

      recorder.onerror = (e) => {
        reject(new Error(`Recording error: ${e.error?.message || "Unknown error"}`));
      };
    });

    // Reset video to start
    video.currentTime = 0;
    await new Promise((r) => {
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        r();
      };
      if (video.currentTime === 0) r();
      else video.addEventListener("seeked", onSeeked);
    });

    if (signal?.aborted) throw new Error("Export cancelled.");

    // Start recording
    recorder.start(500); // chunk every 500ms
    onProgress({ percent: 1, currentTime: 0, duration, stage: "Rendering frames...", format });

    // Begin video playback
    await video.play();

    // Render animation loop
    let isRunning = true;
    let animFrameId = null;

    const renderLoop = () => {
      if (!isRunning) return;

      if (signal?.aborted) {
        isRunning = false;
        video.pause();
        recorder.stop();
        return;
      }

      const curTime = video.currentTime;
      const progressPct = Math.min(98, Math.round((curTime / Math.max(1, duration)) * 100));

      onProgress({
        percent: progressPct,
        currentTime: curTime,
        duration,
        stage: `Rendering (${Math.floor(curTime)}s / ${Math.floor(duration)}s)`,
        format,
      });

      // Draw current video frame to canvas with centered cover crop mode
      const srcW = video.videoWidth || canvas.width;
      const srcH = video.videoHeight || canvas.height;
      const srcRatio = srcW / srcH;
      const targetRatio = canvas.width / canvas.height;

      let sx = 0, sy = 0, sw = srcW, sh = srcH;
      if (srcRatio > targetRatio) {
        sw = srcH * targetRatio;
        sx = (srcW - sw) / 2;
      } else {
        sh = srcW / targetRatio;
        sy = (srcH - sh) / 2;
      }

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

      // Find active subtitle
      const activeSub = subtitles.find((s) => curTime >= s.start && curTime <= s.end);

      // Render preset styled subtitle on top
      renderSubtitleFrame(ctx, canvas, activeSub, curTime, preset, isFreeTier);

      // Check if finished
      if (video.ended || curTime >= duration - 0.05) {
        isRunning = false;
        video.pause();
        if (recorder.state === "recording") {
          recorder.stop();
        }
        return;
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    video.onended = () => {
      if (isRunning) {
        isRunning = false;
        if (recorder.state === "recording") {
          recorder.stop();
        }
      }
    };

    // Kick off render loop
    renderLoop();

    const result = await completionPromise;

    // Cleanup resources
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (audioCtx && audioCtx.state !== "closed") {
      audioCtx.close().catch(() => {});
    }
    if (createdVideo && video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }

    return result;
  } catch (error) {
    if (createdVideo && video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    throw error;
  }
}

/**
 * Trigger file download directly in browser.
 */
export function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
