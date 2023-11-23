/* eslint-disable @next/next/no-img-element */
import classes from "./ranking.module.scss";
import localFont from "next/font/local";

import Introducao from "@/components/home/introducao";
import Conheca from "@/components/home/Conheca";
import RealizesMissoes from "@/components/home/RealizeMissoes";
import DisputeLivelo from "@/components/home/DisputeLivelo";
const pressStart2P = localFont({ src: "../public/pressStart2P-Regular.ttf" });

export default function Home() {
  return (
    <main className={`${pressStart2P.className} text-white `}>
     <Introducao />
     <Conheca />
     <RealizesMissoes />
     <DisputeLivelo />
    </main>
  );
}
