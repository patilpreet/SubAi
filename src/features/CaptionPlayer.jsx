import { Player } from "@remotion/player";
import { CaptionComposition } from "./CaptionComposition";
import { forwardRef } from "react";

export const CaptionPlayer = forwardRef(
  (
    {
      subtitles,
      preset,
      durationInFrames = 300,
      fps = 30,
      width = 1080,
      height = 1350,
      loop = true,
      autoPlay = false,
      controls = false,
      playbackRate = 1,
      style,
      videoUrl,
    },
    ref,
  ) => {
    return (
      <Player
        ref={ref}
        component={CaptionComposition}
        inputProps={{ subtitles, preset, videoUrl }}
        durationInFrames={durationInFrames}
        fps={fps}
        compositionWidth={width}
        compositionHeight={height}
        loop={loop}
        autoPlay={autoPlay}
        controls={controls}
        playbackRate={playbackRate}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 14,
          overflow: "hidden",
          background: "#09090b",
          ...style,
        }}
      />
    );
  },
);
