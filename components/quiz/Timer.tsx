import localFont from "next/font/local";
import React, { useState, useEffect } from "react";

const QTD_MINUTOS = 10;
const pressStart2P = localFont({
  src: "../../public/pressStart2P-Regular.ttf",
});
function Timer() {
  const [tempoRestante, setTempoRestante] = useState(QTD_MINUTOS * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTempoRestante((prevTempoRestante) => {
        const novoTempo = prevTempoRestante - 1;
        if (novoTempo < 0) {
          return prevTempoRestante;
        }

        return novoTempo;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(tempoRestante / 60);
  const seconds = tempoRestante % 60;

  return (
    <div className="bg-ddBlue w-36 h-16 flex justify-around items-center rounded-lg">
      <div>
        <img src="/iconTempo.png" alt="Ícone de tempo" className="w-8 h-8" />
      </div>
      <div style={{ ...pressStart2P.style }}>
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>
    </div>
  );
}

export default Timer;
