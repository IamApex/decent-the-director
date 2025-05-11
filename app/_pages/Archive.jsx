"use client";

import Link from "next/link";
import { useState } from "react";

const homeData = [
  {
    title: "Midnight Drive",
    artist: "Luna ft. Nova",
    duration: "3:45",
    image: "1.jpg",
  },
  {
    title: "Ocean Echoes",
    artist: "Blue Horizon",
    duration: "4:02",
    image: "2.jpg",
  },
  {
    title: "Neon Dreams",
    artist: "Skylark ft. Vibe",
    duration: "3:27",
    image: "3.jpg",
  },
  {
    title: "Golden Hour",
    artist: "Amber Lane",
    duration: "2:59",
    image: "4.jpg",
  },
  {
    title: "Shadow Dance",
    artist: "Echo Beats ft. Kairo",
    duration: "4:21",
    image: "5.jpg",
  },
  {
    title: "Sunset Boulevard",
    artist: "Reverie",
    duration: "3:34",
    image: "6.jpg",
  },
  {
    title: "Gravity",
    artist: "Solstice ft. Miko",
    duration: "3:12",
    image: "7.jpg",
  },
  {
    title: "Afterglow",
    artist: "Nova Rae",
    duration: "4:05",
    image: "8.jpg",
  },
  {
    title: "City Lights",
    artist: "Urban Pulse ft. Rhea",
    duration: "3:50",
    image: "9.jpg",
  },
  {
    title: "Crystal Skies",
    artist: "Eclipse",
    duration: "2:48",
    image: "10.jpg",
  },
];

export default function Index() {
  const [hoveredIndex, setHoveredindex] = useState(null);

  return (
    <section className="p-10 w-dvw h-dvh flex justify-center items-center">
      <div className="w-full h-full ">
        <IndexItem
          item={{
            title: "Title",
            artist: "Artist",
            duration: "Duration",
            year: "Year",
          }}
        />
        {homeData.map((data, i) => (
          <IndexItem
            item={data}
            key={i}
            isHoverd={hoveredIndex == i}
            onHoverStart={() => setHoveredindex(i)}
            onHoverEnd={() => setHoveredindex(null)}
            onDIm={hoveredIndex !== null && hoveredIndex !== i}
          />
        ))}
      </div>
    </section>
  );
}

function IndexItem({ item, onHoverStart, onHoverEnd, isHoverd, onDIm }) {
  return (
    <Link href={item.href || "/projects"}>
      <div
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className={` text-xs md:text-sm  grid grid-rows-1 grid-cols-4 text-left gap-2 my-2 transition-colors duration-300 ${
          onDIm ? "text-stone-400" : "text-black"
        } `}
      >
        <div>{item.title}</div>
        <div>{item.artist}</div>
        <div className="text-right">{item.duration}</div>
        <div className="text-right">{item.year || "2025"} </div>
      </div>
    </Link>
  );
}
