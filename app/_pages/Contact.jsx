"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Contact() {
  return (
    <>
      <section className="w-dvw h-dvh hidden md:block overflow-hidden">
        <div className="w-full absolute top-1/2 -translate-y-1/2 -z-1 text-4xl overflow-hidden">
          <MarqueeGreetings />
        </div>

        <div className="absolute bottom-0 p-10">
          <Contactinfo />
        </div>
        <div className=" w-[50%] h-[80%]  lg:w-[35%] lg:h-[80%] absolute left-1/2 -translate-x-1/2 bottom-0 lg:bottom-3">
          <div className="w-full h-full relative ">
            <Image
              src={"/decents/7.jpg"}
              fill
              objectFit="object-cover"
              alt="Image of DecentTheDirector"
            />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 p-10">
          <Locationinfo />
        </div>
      </section>
      <section className="w-dvw h-dvh overflow-hidden md:hidden">
        <div className="w-full h-full relative">
          <Image
            src={"/decents/7.jpg"}
            fill
            objectFit="object-cover"
            alt="Image of DecentTheDirector"
          />

          <div className="p-10 absolute bottom-0 left-0 w-full backdrop-blur-xs">
            <Contactinfo />
            <br />
            <Locationinfo />
          </div>
        </div>
      </section>
    </>
  );
}

const contactInfoData = [
  { href: "mailto:iamdecent@gmail.com", label: "iamdecent@gmail.com" },
  { href: "tel:812244521", label: "+234 8122 44 521" },
  { href: "https://www.instagram.com/iam_decent0/", label: "iam_decent0" },
  // { href: "ttps://www.x.com/iam_decent0/", label: "iam_decent0" },
];

function Contactinfo() {
  return (
    <div className="text-xs md:text-md">
      <ul className="gap-2 md:gap-4 flex flex-col text-left">
        {contactInfoData.map((info, i) => (
          <li key={i} className="flex gap-2 items-center font-semibold">
            <div className="size-2 border rounded-full" />
            <a href={info.href} target="_blank" rel="noopener noreferrer">
              {info.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const locationInfoData = [
  {
    href: "https://maps.app.goo.gl/XWqWyjpUjC7w3tRU9",
    label: "Victoria Island, Lagos, Nigeria.",
  },
  {
    href: "https://maps.app.goo.gl/XWqWyjpUjC7w3tRU9",
    label: "View on map",
  },
];

function Locationinfo() {
  return (
    <div className="text-xs md:text-md">
      <ul className="gap-2 md:gap-4 flex flex-col text-left">
        {locationInfoData.map((info, i) => (
          <li key={i} className="flex gap-2 items-center font-semibold">
            <div className="size-2 border rounded-full" />
            <a href={info.href} target="_blank" rel="noopener noreferrer">
              {info.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const greetings = [
  "Hello", // English
  "Hola", // Spanish
  "Bonjour", // French
  "こんにちは", // Japanese (Konnichiwa)
  "你好", // Chinese (Nǐ hǎo)
  "안녕하세요", // Korean (Annyeonghaseyo)
  "Salam", // Arabic
  "Bawo ni", // Yoruba
  "Kedu", // Igbo
  "Sannu", // Hausa
];

function MarqueeGreetings() {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        initial={{ x: "0" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        className="flex shrink-0"
      >
        {greetings.map((data, i) => (
          <span key={i} className="text-5xl font-bold">
            {data} ⭐{" "}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ x: "0" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        className="flex shrink-0"
      >
        {greetings.map((data, i) => (
          <span key={i} className="text-5xl font-bold">
            {data} ⭐{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
