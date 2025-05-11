"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

const projectData = {
  title: "City Lights",
  artist: "Urban Pulse ft. Rhea",
  duration: "3:50",
  image: "/decents/9.jpg",
  src: "/decents/vid/2.mp4",
  releaseDate: "2025-04-15",
  genre: "Electronic Pop",
  director: "Lena Gomez",
  label: "Skyline Records",
  videoUrl: "https://youtu.be/xyz",
  description:
    "A neon-lit journey through the cityscape at night, capturing the energy of urban life.",
  views: 1200000,
  likes: 87000,

  credits: [
    "James Carter",
    "Olivia Quinn",
    "Noah Lee",
    "Sophia West",
    "Zara Smith",
    "Tasha Brown",
  ],

  // credits: {
  //   producer: "James Carter",
  //   cinematographer: "Olivia Quinn",
  //   editor: "Noah Lee",
  //   choreographer: "Sophia West",
  //   makeupArtist: "Zara Smith",
  //   costumeDesigner: "Tasha Brown",
  // },
};

export default function Project() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [lineCount, setLineCount] = useState(100);

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

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const approxLineSpacing = 5;
        const calculatedLines = Math.floor(width / approxLineSpacing);
        setLineCount(calculatedLines);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  function handleSeek(seek) {
    const time = (seek / lineCount) * duration;
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
    <>
      <section className="p-10 w-dvw h-dvh grid  grid-cols-3 grid-rows-6  md:grid-rows-5 md:grid-cols-5  gap-2 relative overflow-hidden">
        <div className="   col-start-2 col-span-3 md:flex justify-between hidden ">
          <div className="mt-auto">
            <h1 className="text-xl  md:text-3xl font-bold">
              {projectData.title}
            </h1>
            <h3>{projectData.artist}</h3>
          </div>

          <div className="mt-auto">
            <h3>
              {currentTime.toFixed(2)}/{duration.toFixed(2)}
            </h3>
          </div>
        </div>

        <div className=" col-start-1 col-span-3 row-start-1 row-span-2     md:col-start-2 md:col-span-3 md:row-start-2 md:row-span-3">
          <div className="w-full h-full relative">
            <video
              ref={videoRef}
              onClick={togglePlayPause}
              src={projectData.src}
              // poster={projectData.image}
              className="w-full h-full object-cover"
            ></video>

            <div
              role="button"
              onClick={togglePlayPause}
              className={`w-full h-full justify-center items-center flex bg-black/30 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none ${
                isPlaying && "hidden"
              }`}
            >
              <span className="font-bold text-5xl z-10 text-white">PLAY</span>
            </div>
          </div>
        </div>

        <div className=" col-start-3 row-start-4  grid grid-rows-2 grid-cols-2  md:row-start-2 row-span-3 md:col-start-5 ">
          <div
            onClick={handleFullScreen}
            className="w-full h-full flex justify-center items-center cursor-pointer rotate-90"
          >
            <h1>Fullscreen</h1>
          </div>

          <div
            onClick={toggleSound}
            className="w-full h-full flex justify-center items-center cursor-pointer rotate-90"
          >
            <h1>Sound</h1>
          </div>

          <div className="w-full h-full flex justify-center items-center rotate-90">
            <h1>
              <Link href={projectData.videoUrl}>{projectData.views}</Link>
            </h1>
          </div>
          <div className="w-full h-full flex justify-center items-center rotate-90">
            <h1>
              <Link href={projectData.videoUrl}>{projectData.likes}</Link>
            </h1>
          </div>
        </div>

        <div className=" col-start-1 row-start-4 md:col-start-1 md:row-start-2 md:row-span-3 md:text-right md:px-5 ">
          <h1 className="font-bold">Credits:</h1>
          <ul className=" h-full w-full text-xs  md:h-[80%] justify-between flex flex-col gap-4 mt-auto">
            {projectData.credits.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="col-start-1 col-span-3 row-start-3 md:row-start-5 md:col-start-2 md:col-span-3 ">
          <div
            className="w-full flex justify-center items-center gap-1"
            ref={containerRef}
          >
            {Array.from({ length: lineCount }).map((_, i) => (
              <div
                key={i}
                className="w-[1px] h-5 bg-stone-300"
                onClick={() => handleSeek(i)}
              />
            ))}
          </div>

          <div className="mt-2 col-start-1 col-span-3 row-start-4 md:col-start-2 md:col-span-3 flex justify-between md:hidden">
            <div className="mt-auto">
              <h1 className="text-xl  md:text-3xl font-bold">
                {projectData.title}
              </h1>
              <h3 className="text-[8px] ">{projectData.artist}</h3>
            </div>

            <div>
              <h3 className="text-xs">
                {currentTime.toFixed(2)}/{duration.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
