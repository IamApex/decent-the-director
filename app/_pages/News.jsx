"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const newsData = [
  {
    href: "https://trybecoterie.com/music-video-directors-leading-the-nigerian-music-scene/",
    title: "Music Video Directors Leading The Nigerian Music Scene",
    publisher: "TryBE",
    image: "/news/1.jpeg",
  },
  {
    href: "https://nairametrics.com/2024/11/17/meet-15-video-directors-shaping-nigerias-1-8-billion-music-industry/",
    title:
      "Meet 15 Video Directors shaping Nigeria’s $1.8 billion music industry ",
    publisher: "Nairametrics",
    image: "/news/2.jpeg",
  },
  {
    href: "https://www.vanguardngr.com/2024/09/the-young-maestro-behind-top-nigerian-music-videos-director-peacock/",
    title:
      "The young Maestro behind top Nigerian music videos: Director Peacock",
    publisher: "Vanguard",
    image: "/news/3.jpeg",
  },
  {
    href: "https://www.instagram.com/p/CsjFsefoNNi/",
    title: "Top 10 music video directors in Nigeria",
    publisher: "NiajaGossip",
    image: "/news/4.jpeg",
  },
];

export default function News() {
  const [curSection, setCurSection] = useState(0);
  return (
    <section className="p-10 w-dvw h-dvh relative overflow-hidden">
      <Article article={newsData[curSection]} />
    </section>
  );
}

function Article({ article }) {
  return (
    <>
      <div className="w-full h-full flex flex-col md:flex-row justify-center md:items-center gap-4">
        <div className="flex flex-col justify-between md:w-[40%] md:h-[40%] ">
          <span>{article.publisher}</span>
        </div>
        <div className=" text-4xl font-bold md:w-[40%] md:h-[40%]">
          <h1>{article.title}</h1>
          <Link className="font-normal mt-10 text-sm" href={article.href}>
            View Publication{" "}
          </Link>
        </div>
      </div>
      <hr className="border-stone-200" />
    </>
  );
}

// function Article({ article }) {
//   return (
//     <>
//       <div className="grid grid-cols-3 grid-rows-1 mt-2 relative p-10">
//         <div className="flex flex-col justify-between">
//           <span>{article.publisher}</span>
//         </div>
//         <div className=" text-4xl font-bold">
//           <h1>{article.title}</h1>
//           <Link className="font-normal mt-10 text-sm" href={article.href}>
//             View Publication{" "}
//           </Link>
//         </div>
//       </div>
//       <hr className="border-stone-200" />
//     </>
//   );
// }
