/* eslint-disable @next/next/no-img-element */
import RankingItem from "@/components/RankingItem";
import { useCallback, useEffect, useState } from "react";
import classes from "./ranking.module.scss";
import { useTransition, animated } from "@react-spring/web";

import axios from "axios";
import localFont from "next/font/local";

const pressStart2P = localFont({ src: "../public/pressStart2P-Regular.ttf" });

interface usuarioRanking {posicao: number; nome: string; pontuacao: number;}

export default function Home() {
  const [ranking, setRanking] = useState([] as any);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [tamanhoRanking, setTamanhoRanking] = useState(0);

  const onGetRanking = async () => {
    if (isSorting) {
      return;
    }


    const hoje = new Date();

    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
    const ano = hoje.getFullYear().toString();

    const { data } : {
      data: usuarioRanking[]
    }= await axios.get(
      `http://localhost:8080/quiz/1/ranking/dia/${ano}-${mes}-${dia}`                            
    );
    setRanking(
      data.map((elementoRanking: usuarioRanking) => {
        return {
          
          position: elementoRanking.posicao,
          name: elementoRanking.nome,
          points: elementoRanking.pontuacao,
        };
      })
    );
  };

  const cbOnGetRanking = useCallback(onGetRanking, []);

  useEffect(() => {
    cbOnGetRanking();
  }, [cbOnGetRanking]);

  useEffect(() => {
    setTamanhoRanking(ranking.length * 75);
  }, [ranking]);

  let height = 0;
  const transitions = useTransition(
    ranking.map((data: any) => ({ ...data, y: (height += 40) - 40 })),
    {
      key: (item: any) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, height: 48, opacity: 1 }),
      update: ({ y }) => ({ y, height: 48 }),
    }
  );

  const bubble_sort_step = () => {
    let swapped = false;

    if (!Array.isArray(ranking) || !isSorting) {
      return ranking;
    }

    const array = [...ranking];
    for (let i = 0; i < array.length - 1 - currentStep; i++) {
      if (array[i].position > array[i + 1].position) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
    if (swapped === false) {
      setIsSorting(false);
      setCurrentStep(0);
    }

    setCurrentStep(currentStep + 1);
    setRanking(array);
  };

  const getSuffledRanking = () => {
    const array = [...ranking];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffle = () => {
    const newRanking = getSuffledRanking();
    setRanking(newRanking);
    setCurrentStep(0);
    setIsSorting(true);
  };

  useEffect(() => {
    if (isSorting === true) {
      console.log("Ranking changed");
      setTimeout(() => {
        bubble_sort_step();
      }, 1000);
    }
  }, [ranking]);

  return (
    <main className={`${pressStart2P.className}`}>
      <div
        className={`relative bg-[url('/bgSlice.png')] bg-center bg-repeat flex flex-col  items-center`}
        style={{
          minHeight: tamanhoRanking + 1000,
        }}
      >
        <div className={classes.bgColor}></div>
        <div className="flex flex-wrap justify-center items-center gap-9 py-8">
          <img
            title="Logo Dungeons & Data"
            className="z-50 relative  h-[15%] w-[15%]"
            src="dd_titulo_icone.png"
          />
          <img
          
            title="Título Dungeons & Data"
            className="z-50 relative h-[70%] w-[70%]"
            src="/dd_titulo_texto.png"
          />
        </div>
        <div className="z-10 text-center bg-ddBlack  mt-10 rounded-2xl min-w-[80%]">
          <div className="text-7xl text-white z-10">
            <div className={`text-5xl mt-10`}>PONTUAÇÃO</div>
          </div>

          <div
            className={`relative p-8`}
            style={{
              height: tamanhoRanking + 145,
            }}
          >
            {transitions((style, item, t, index) => (
              <animated.div
                style={{ ...style, zIndex: 99, position: "relative" }}
              >
                <RankingItem key={index} {...item} />
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
