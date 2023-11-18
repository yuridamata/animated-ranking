import { DTOPergunta } from "@/pages/quiz";
import localFont from "next/font/local";
import SelectableItem from "./SelectableItem";
import { useEffect, useState } from "react";
import Timer from "./Timer";

const pressStart2P = localFont({
  src: "../../public/pressStart2P-Regular.ttf",
});

const calculateTimeLeft = () => {
	let year = new Date().getFullYear();
	let difference = +new Date(`10/01/${year}`) - +new Date();

	let timeLeft = {};

	if (difference > 0) {
			timeLeft = {
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60)
			};
	}

	return timeLeft;
	
}

const QTD_MINUTOS = 10;

export default function Pergunta({
  pergunta,
  numPergunta,
  totalPerguntas,
  timerAtivado,
}: {
  pergunta: DTOPergunta;
  numPergunta: number;
  totalPerguntas: number;
  timerAtivado: boolean;
}) {

	
	const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
  const timer = setTimeout(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);		
});

  return (
    <div>
      <div className="flex flex-col h-screen">
        <div className="bg-ddMediumGrey h-52 pt-6 pb-7 px-10 flex flex-col overflow-scroll ">
          <div
            style={{ ...pressStart2P.style }}
            className="text-center text-ddBlue pb-2"
          >
            Questão {numPergunta + 1}/{totalPerguntas}
          </div>
          <div className="text-center text-ddLightGrey pb-2">+100 pontos</div>
          <div className="h-full flex justify-center items-center">
            <p className="text-justify leading-6">{pergunta.descricao}</p>
            <p className="text-justify leading-6">{pergunta.descricao}</p>
            <p className="text-justify leading-6">{pergunta.descricao}</p>
          </div>
        </div>
        <div className="grow pt-6 px-10 flex flex-col justify-start gap-6">
          {pergunta.opcoes.map((opcao, index) => {
            return (
              <div onClick={() => setOpcaoSelecionada(index)}>
                <SelectableItem text={opcao.descricao} selected={opcaoSelecionada === index}/>
              </div>
            );
          })}
        </div>
        <div className="bg-ddMediumGrey h-16"> 
        
          <Timer/>
        
        </div>
      </div>
    </div>
  );
}
