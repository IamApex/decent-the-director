"use client";

import Image from "next/image";
import BottomDeck from "../_component/BottomDeck";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

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

const vertical = {
  initial: { clipPath: "inset(0 0 0 0)" },
  exit: { clipPath: "inset(100% 0 0 0)" },
};

export default function Home() {
  const [curSection, setCurSection] = useState(0);
  const [prevSection, setPrevSection] = useState(0);
  const [scrollDir, setScrollDir] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isScrollingRef = useRef(false);

  useEffect(
    function () {
      function handleWheel(e) {
        if (isScrollingRef.current) return;
        isScrollingRef.current = true;
        setIsTransitioning(true);

        setPrevSection(curSection);

        setCurSection((prev) => {
          let next;
          if (e.deltaY > 0) {
            setScrollDir("down");
            next = (prev + 1) % homeData.length;
          } else {
            setScrollDir("up");
            next = (prev - 1 + homeData.length) % homeData.length;
          }
          return next;
        });

        setTimeout(() => {
          isScrollingRef.current = false;
          setIsTransitioning(false);
        }, 2000);
      }

      window.addEventListener("wheel", handleWheel, { passive: true });

      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    },
    [curSection, homeData.length]
  );

  // Define vertical clip-path variants based on scroll direction
  const clipPathVariants = {
    initial: (direction) => ({
      clipPath:
        direction === "down"
          ? "inset(100% 0 0 0)" // From bottom (for scrolling down)
          : "inset(0 0 100% 0)", // From top (for scrolling up)
    }),
    animate: {
      clipPath: "inset(0 0 0 0)", // Full reveal
    },
    exit: (direction) => ({
      // scale: 2,
      clipPath:
        direction === "down"
          ? "inset(0 0 100% 0)" // Exit to top (for scrolling down)
          : "inset(100% 0 0 0)", // Exit to bottom (for scrolling up)
    }),
  };

  const clipPathVariantsInverted = {
    exit: (direction) => ({
      clipPath:
        direction === "down"
          ? "inset(100% 0 0 0)" // From bottom (for scrolling down)
          : "inset(0 0 100% 0)", // From top (for scrolling up)
    }),
    animate: {
      clipPath: "inset(0 0 0 0)", // Full reveal
    },
    initial: (direction) => ({
      clipPath:
        direction === "down"
          ? "inset(0 0 100% 0)" // Exit to top (for scrolling down)
          : "inset(100% 0 0 0)", // Exit to bottom (for scrolling up)
    }),
  };

  return (
    <>
      <section className="w-screen h-screen overflow-hidden relative hidden md:block ">
        {/* Previous section image (always full-screen) */}

        <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
          <div className="w-full h-full flex justify-center items-center relative">
            <Image
              src={`/decents/${homeData[prevSection].image}`}
              alt={homeData[prevSection].title}
              fill
              className="object-cover zoomed"
            />
          </div>
        </div>

        {/* Animating current section with vertical clip-path */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            className="w-full h-full overflow-hidden absolute top-0 left-0"
            key={curSection}
            custom={scrollDir}
            variants={clipPathVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <Link href={"/projects"}>
              <div className="w-full h-full flex justify-center items-center relative">
                <Image
                  src={`/decents/${homeData[curSection].image}`}
                  alt={homeData[curSection].title}
                  fill
                  className="object-cover "
                />
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <div className="w-50 h-full flex flex-col justify-center items-start lg:w-70 absolute top-1/2 -translate-y-1/2 left-10 lg:left-50 text-left pointer-events-none">
            <div className="p-1 overflow-hidden">
              <motion.h1
                key={curSection}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-3xl font-semibold"
              >
                {homeData[curSection].title}
              </motion.h1>
            </div>

            <div className="p-1 overflow-hidden">
              <motion.h1
                key={curSection}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {homeData[curSection].artist}
              </motion.h1>
            </div>
          </div>
        </AnimatePresence>

        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={curSection}
            custom={scrollDir}
            variants={clipPathVariantsInverted}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[40vw] h-[60vh] lg:w-[20vw] lg:h-[50vh] z-10"
          >
            <Image
              src={`/decents/${homeData[curSection].image}`}
              alt={homeData[curSection].title}
              fill
              className="object-contain w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="w-screen h-full pt-100 gap-6  flex flex-col justify-center items-center md:hidden">
        {homeData.map((data, i) => (
          <Link href={"/projects"} key={i}>
            <div className="w-80 h-50 relative">
              <Image
                src={`/decents/${data.image}`}
                fill
                className="object-cover"
                alt={data.title}
              />

              <div className="absolute -bottom-4 font-semibold text-xs uppercase flex w-full justify-between">
                <span> {data.title}</span>
                <span> {data.artist}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <BottomDeck cur={curSection} max={homeData.length} />
    </>
  );
}

// export default function Home() {
//   const [curSection, setCurSection] = useState(0);
//   const [scrollDir, setScrollDir] = useState(null);
//   const isScrollingRef = useRef(false);

//   useEffect(
//     function () {
//       function handleWheel(e) {
//         if (isScrollingRef.current) return;
//         isScrollingRef.current = true;

//         setCurSection((prev) => {
//           let next;
//           if (e.deltaY > 0) {
//             setScrollDir("down");
//             next = (prev + 1) % homeData.length;
//           } else {
//             setScrollDir("up");
//             next = (prev - 1 + homeData.length) % homeData.length;
//           }
//           return next;
//         });

//         setTimeout(() => {
//           isScrollingRef.current = false;
//         }, 1000);
//       }

//       window.addEventListener("wheel", handleWheel, { passive: true });

//       return () => {
//         window.removeEventListener("wheel", handleWheel);
//       };
//     },
//     [homeData.length]
//   );

//   return (
//     <>
//       <section className="w-screen h-screen overflow-hidden relative bg-red-800">
//         <AnimatePresence mode="sync" initial={false}>
//           <motion.div
//             className="w-full h-full overflow-hidden absolute top-0 left-0 "
//             key={curSection}
//             initial={{
//               y: scrollDir === "down" ? "100%" : "-100%",
//             }}
//             animate={{
//               y: "0%",
//             }}
//             exit={{
//               y: scrollDir === "down" ? "-100%" : "100%",
//               scale: 2,
//             }}
//             transition={{ duration: 1, ease: "easeInOut" }}
//           >
//             <div className="w-full h-full flex justify-center items-center relative">
//               <Image
//                 src={`/decents/${homeData[curSection].image}`}
//                 alt={homeData[curSection].title}
//                 fill
//                 className="object-cover blur-xs"
//               />
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[20vw] h-[50vh] z-10">
//           <Image
//             src={`/decents/${homeData[curSection].image}`}
//             alt={homeData[curSection].title}
//             fill
//             className="object-contain w-full h-full"
//           />
//         </div>
//       </section>

//       <BottomDeck cur={curSection} max={homeData.length} />
//     </>
//   );
// }

// export default function Home() {
//   const [curSection, setCurSection] = useState(0);
//   const [prevSection, setPrevSection] = useState(0);
//   const [scrollDir, setScrollDir] = useState(null);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const isScrollingRef = useRef(false);

//   useEffect(
//     function () {
//       function handleWheel(e) {
//         if (isScrollingRef.current) return;
//         isScrollingRef.current = true;
//         setIsTransitioning(true);

//         setPrevSection(curSection);

//         setCurSection((prev) => {
//           let next;
//           if (e.deltaY > 0) {
//             setScrollDir("down");
//             next = (prev + 1) % homeData.length;
//           } else {
//             setScrollDir("up");
//             next = (prev - 1 + homeData.length) % homeData.length;
//           }
//           return next;
//         });

//         setTimeout(() => {
//           isScrollingRef.current = false;
//         }, 2000);
//       }

//       window.addEventListener("wheel", handleWheel, { passive: true });

//       return () => {
//         window.removeEventListener("wheel", handleWheel);
//       };
//     },
//     [curSection, homeData.length]
//   );

//   // Define vertical clip-path variants based on scroll direction
//   const clipPathVariants = {
//     initial: (direction) => ({
//       clipPath:
//         direction === "down"
//           ? "inset(100% 0 0 0)" // From bottom (for scrolling down)
//           : "inset(0 0 100% 0)", // From top (for scrolling up)
//     }),
//     animate: {
//       clipPath: "inset(0 0 0 0)", // Full reveal
//     },
//     exit: (direction) => ({
//       clipPath:
//         direction === "down"
//           ? "inset(0 0 100% 0)" // Exit to top (for scrolling down)
//           : "inset(100% 0 0 0)", // Exit to bottom (for scrolling up)
//     }),
//   };

//   const clipPathVariantsInverted = {
//     exit: (direction) => ({
//       clipPath:
//         direction === "down"
//           ? "inset(100% 0 0 0)" // From bottom (for scrolling down)
//           : "inset(0 0 100% 0)", // From top (for scrolling up)
//     }),
//     animate: {
//       clipPath: "inset(0 0 0 0)", // Full reveal
//     },
//     initial: (direction) => ({
//       clipPath:
//         direction === "down"
//           ? "inset(0 0 100% 0)" // Exit to top (for scrolling down)
//           : "inset(100% 0 0 0)", // Exit to bottom (for scrolling up)
//     }),
//   };

//   return (
//     <>
//       <section className="w-screen h-screen overflow-hidden relative ">
//         {/* Previous section image (always full-screen) */}
//         <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
//           <div className="w-full h-full flex justify-center items-center relative">
//             <Image
//               src={`/decents/${homeData[prevSection].image}`}
//               alt={homeData[prevSection].title}
//               fill
//               className="object-cover blur-xs "
//             />
//           </div>
//         </div>

//         {/* Animating current section with vertical clip-path */}
//         <AnimatePresence mode="sync" initial={false}>
//           <motion.div
//             className="w-full h-full overflow-hidden absolute top-0 left-0"
//             key={curSection}
//             custom={scrollDir}
//             variants={clipPathVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
//           >
//             <div className="w-full h-full flex justify-center items-center relative">
//               <Image
//                 src={`/decents/${homeData[curSection].image}`}
//                 alt={homeData[curSection].title}
//                 fill
//                 className="object-cover blur-xs"
//               />
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         <div className="absolute w-full h-full flex items-center pointer-events-none ">
//           <div className="border border-red-800 w-[40%] h-[50%] flex items-center justify-center">
//             <div className="border border-yellow-800 overflow-hidden w-100 h-50 font-bold ">
//               <h1 className="text-5xl mix-blend-difference text-left border w-50">{homeData[curSection].title}</h1>
//             </div>
//           </div>
//         </div>

//         <motion.div
//           key={curSection}
//           custom={scrollDir}
//           variants={clipPathVariantsInverted}
//           initial="initial"
//           animate="animate"
//           exit="exit"
//           transition={{ duration: 1.3, ease: [0.43, 0.13, 0.23, 0.96] }}
//           className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[20vw] h-[50vh] z-10"
//         >
//           <Image
//             src={`/decents/${homeData[curSection].image}`}
//             alt={homeData[curSection].title}
//             fill
//             className="object-contain w-full h-full"
//           />
//         </motion.div>
//       </section>

//       <BottomDeck cur={curSection} max={homeData.length} />
//     </>
//   );
// }
