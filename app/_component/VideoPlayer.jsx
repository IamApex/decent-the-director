"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const totalLines = 70;

  useEffect(function () {
    const video = videoRef.current;

    function videoProgress() {
      setCurrentTime(video.currentTime);
    }

    if (video) {
      setDuration(video.duration);
      video.addEventListener("timeupdate", videoProgress);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", videoProgress);
      }
    };
  }, []);

  function handleSeek(seek) {
    const time = (seek / totalLines) * duration;
    videoRef.current.currentTime = time;
  }

  function togglePlayPause() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  function handleFullScreen() {
    const video = videoRef.current;

    if (video) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function toggleSound() {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
  }

  return (
    <div className="w-full h-full relative">
      <video
        ref={videoRef}
        onClick={togglePlayPause}
        src="/decents/vid/2.mp4"
        className="w-full h-full object-cover"
      ></video>

      <div
        role="button"
        onClick={togglePlayPause}
        className={`w-full h-full justify-center items-center flex bg-black/30 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none ${
          isPlaying && "hidden"
        }`}
      >
        <h1 className="font-bold text-5xl z-10 text-white">PLAY</h1>
      </div>

      <div className="absolute right-0 flex gap-5">
        <div>
          {currentTime.toFixed(2)}/{duration.toFixed(2)}
        </div>
        <div role="button " onClick={handleFullScreen}>
          FullScreen
        </div>

        <div role="button" onClick={toggleSound}>
          Sound
        </div>
      </div>

      <div
        onClick={() => handleSeek(10)}
        className="absolute left-0 flex gap-5"
      >
        Seek
      </div>

      <div className="absolute bottom-0 w-full md:w-[50%] h-10 p-5 flex gap-1 justify-between">
        {Array.from({ length: totalLines }).map((_, i) => (
          <motion.div
            initial={{ color: "#79716b" }}
            animate={{ color: "black", scaleY: 0.6 }}
            exit={{ color: "#79716b", scaleY: 0 }}
            key={i}
            className="w-[1px] h-5 bg-stone-500"
            onClick={() => handleSeek(i)}
          />
        ))}
      </div>
    </div>
  );
}
