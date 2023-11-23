/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import classes from "./ranking.module.scss";
import localFont from "next/font/local";
const pressStart2P = localFont({
  src: "../../public/pressStart2P-Regular.ttf",
});

export default function Introducao() {

  const router = useRouter();


  return (
    <section
      className={`relative flex h-[80vh] w-screen flex-col items-center bg-[url('/bgHome.png')] bg-cover`}
    >
      <div className="h-full w-screen absolute z-10 bg-black opacity-40"></div>
      <div className="z-20 relative h-full text-white px-20 leading-6 text-center">
        <div className="z-20 h-[30%]  flex flex-wrap justify-center items-center gap-9 ">
          <img
            title="Logo Dungeons & Data"
            className="relative  h-20 w-20"
            src="dd_titulo_icone.png"
          />
          <img
            title="Título Dungeons & Data"
            className=" relative h-14 "
            src="/dd_titulo_texto.png"
          />
        </div>
        <div className="flex flex-col flex-wrap justify-around items-center h-[70%]">
          <p>Teste seus conhecimentos em Analytics IA e ganhe brindes!</p>
          <img src="/closedChest.png" />
          <div >
          <div
          style={{
            ...pressStart2P.style,
            borderBottomColor: "#D9D9D9",
            borderBottomWidth: 4,
            borderBottomStyle: "solid",
            borderRightColor: "#D9D9D9",
            borderRightWidth: 4,
            borderRightStyle: "solid",
          }}
          className="flex justify-center p-4 items-center mt-14 w-56 h-8 bg-white text-black  cursor-pointer relative"          
          onClick={() => router.push('/quiz')}
        >
      
          Vamos Começar
        </div>
        <div className="animate-bounce mt-8"               
        >
        <img src="/downArrow.png" />
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
