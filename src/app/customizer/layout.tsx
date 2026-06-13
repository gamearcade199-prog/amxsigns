// Segment layout for /customizer route only.
// Loads the physically-achievable neon strip fonts — deferred from root layout
// to prevent render-blocking LCP on product and collection pages.

import {
  Sacramento,
  Caveat,
  Comfortaa,
  Montserrat,
  Orbitron,
  Ms_Madi,
} from "next/font/google";

const sacramento   = Sacramento({ weight: "400", subsets: ["latin"], variable: "--nf-dreamy", display: "swap" });
const caveat       = Caveat({ subsets: ["latin"], variable: "--nf-funky", display: "swap" });
const comfortaa    = Comfortaa({ subsets: ["latin"], variable: "--nf-modern", display: "swap" });
const montserrat   = Montserrat({ subsets: ["latin"], variable: "--nf-montserrat", display: "swap" });
const orbitron     = Orbitron({ subsets: ["latin"], variable: "--nf-orbitron", display: "swap" });
const msmadi       = Ms_Madi({ weight: "400", subsets: ["latin"], variable: "--nf-msmadi", display: "swap" });

export default function CustomizerLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    sacramento.variable,
    caveat.variable,
    comfortaa.variable,
    montserrat.variable,
    orbitron.variable,
    msmadi.variable,
  ].join(" ");

  return (
    <div className={fontVars}>
      {children}
    </div>
  );
}
