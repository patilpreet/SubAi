import { useState, useEffect, useRef } from "react";

const PEAK_COUNT = 2000;

function downsamplePeaks(channelData, targetCount) {
  const peaks = new Float32Array(targetCount);
  const blockSize = Math.floor(channelData.length / targetCount);
  for (let i = 0; i < targetCount; i++) {
    let sum = 0;
    const start = i * blockSize;
    for (let j = 0; j < blockSize; j++) {
      const val = channelData[start + j];
      sum += val * val;
    }
    peaks[i] = Math.sqrt(sum / blockSize);
  }
  let max = 0;
  for (let i = 0; i < peaks.length; i++) {
    if (peaks[i] > max) max = peaks[i];
  }
  if (max > 0) {
    for (let i = 0; i < peaks.length; i++) {
      peaks[i] = peaks[i] / max;
    }
  }
  return peaks;
}

export function useAudioWaveform(videoSrc, duration) {
  const [peaks, setPeaks] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const cacheRef = useRef({});

  useEffect(() => {
    if (!videoSrc || !duration || duration <= 0) {
      setPeaks(null);
      setIsReady(false);
      return;
    }

    const cacheKey = videoSrc;
    if (cacheRef.current[cacheKey]) {
      setPeaks(cacheRef.current[cacheKey]);
      setIsReady(true);
      return;
    }

    let cancelled = false;
    const ctx = new OfflineAudioContext(1, 1, 44100);

    async function extract() {
      try {
        const response = await fetch(videoSrc);
        if (!response.ok) throw new Error("Failed to fetch audio");
        const arrayBuf = await response.arrayBuffer();
        if (cancelled) return;

        const audioBuf = await ctx.decodeAudioData(arrayBuf);
        if (cancelled) return;

        const channelData = audioBuf.getChannelData(0);
        const extracted = downsamplePeaks(channelData, PEAK_COUNT);

        cacheRef.current[cacheKey] = extracted;
        setPeaks(extracted);
        setIsReady(true);
      } catch (err) {
        console.warn("Waveform extraction failed:", err.message);
        if (!cancelled) {
          const fallback = new Float32Array(PEAK_COUNT);
          for (let i = 0; i < PEAK_COUNT; i++) {
            fallback[i] =
              0.15 +
              Math.abs(
                Math.sin(i * 0.3) * 0.35 + Math.sin(i * 0.7) * 0.2 + Math.sin(i * 1.3) * 0.1,
              );
          }
          setPeaks(fallback);
          setIsReady(true);
        }
      }
    }

    extract();
    return () => {
      cancelled = true;
    };
  }, [videoSrc, duration]);

  return { peaks, isReady };
}
