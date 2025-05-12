import { Geist_Mono } from "next/font/google";
import { ReactLenis } from "lenis/dist/lenis-react";

import "./globals.css";
import Navbar from "./_component/Navbar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Decent The Director - Music Director | Composer & Arranger",
  description:
    "decentTheDirector is a dynamic music director, composer, and arranger, creating powerful soundtracks for films, stage productions, and commercials.",
  image: "/logo.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable} antialiased relative`}>
        <ReactLenis root>
          <Navbar />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
