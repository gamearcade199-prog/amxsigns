// Segment layout for /customizer route only.
// Loads the physically-achievable neon strip fonts — deferred from root layout
// to prevent render-blocking LCP on product and collection pages.

import {
  Sacramento,
  Caveat,
  Comfortaa,
} from "next/font/google";

const sacramento   = Sacramento({ weight: "400", subsets: ["latin"], variable: "--nf-dreamy", display: "swap" });
const caveat       = Caveat({ subsets: ["latin"], variable: "--nf-funky", display: "swap" });
const comfortaa    = Comfortaa({ subsets: ["latin"], variable: "--nf-modern", display: "swap" });

export default function CustomizerLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    sacramento.variable,
    caveat.variable,
    comfortaa.variable,
  ].join(" ");

  return (
    <div className={fontVars}>
      {children}
    </div>
  );
}
