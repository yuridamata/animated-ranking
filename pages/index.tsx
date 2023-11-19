/* eslint-disable @next/next/no-img-element */
import classes from "./ranking.module.scss";
import localFont from "next/font/local";
const pressStart2P = localFont({ src: "../public/pressStart2P-Regular.ttf" });

export default function Home() {
 
  return (
    <main className={`${pressStart2P.className}`}>
      <div
        className={`w-screen bg-[url('/bgSlice.png')] bg-center bg-repeat flex flex-col  items-center`}
      >
        <div className={classes.bgColor}></div>
        <div className={classes.imgWrapper}>
          <img
            title="Logo Dungeons & Data"
            className="z-10 h-40 w-40"
            src="dd_titulo_icone.png"
          />
          <img
            title="Título Dungeons & Data"
            className="z-10"
            src="/dd_titulo_texto.png"
          />
        </div>
        
      </div>
    </main>
  );
}
