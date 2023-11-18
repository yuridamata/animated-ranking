import { DTOPergunta } from "@/pages/quiz";
import localFont from "next/font/local";
import SelectableItem from "./SelectableItem";
import { useEffect, useState } from "react";

const pressStart2P = localFont({
  src: "../../public/pressStart2P-Regular.ttf",
});

export default function Pergunta({
  pergunta,
  numPergunta,
  totalPerguntas,
  onSelecionarOpcao,
}: {
  pergunta: DTOPergunta;
  numPergunta: number;
  totalPerguntas: number;
  timerAtivado: boolean;
  onSelecionarOpcao: (opcaoId: number) => void;
}) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);

  useEffect(() => {
    if (opcaoSelecionada !== null) {
      onSelecionarOpcao(pergunta.opcoes[opcaoSelecionada].id);
    }
  }, [opcaoSelecionada]);

  const selecionarOpcao = (opcaoId: number) => {
    if (pergunta.acertou !== null) return;
    setOpcaoSelecionada(opcaoId);
    onSelecionarOpcao(opcaoId);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-ddMediumGrey pt-6 pb-7 px-6 ">
        {/* Notificações */}
        <div className="absolute bottom-0 left-0  w-full pb-4 flex justify-center items-center">
          {pergunta.acertou === true && (
            <div className="text-center bg-ddLightGreen min-w-[40%] p-5 rounded-md">
              <p className="mb-2">Sua resposta está correta!</p>
              <p>+100 pontos</p>
            </div>
          )}

          {pergunta.acertou === false && (
            <div className="text-center bg-ddRed min-w-[40%] p-5 rounded-md">
              <p className="mb-2">Sua resposta está incorreta!</p>
              <p>Não foi dessa vez</p>
            </div>
          )}
        </div>

        <div
          style={{ ...pressStart2P.style }}
          className="text-center text-ddBlue pb-2"
        >
          Questão {numPergunta + 1}/{totalPerguntas}
        </div>
        <div className="text-center text-ddLightGrey pb-2">+100 pontos</div>
        <div className="flex flex-col min-h-8 justify-center items-center overflow-x-hidden">
          <p className="text-justify leading-6 mt-10">{pergunta.descricao}</p>
        </div>
      </div>
      <div className="grow pt-6  px-10 flex flex-col justify-start gap-6">
        {pergunta.opcoes.map((opcao, index) => {
          return (
            <div
              key={`pergunta-${index}`}
              onClick={() => selecionarOpcao(index)}
            >
              <SelectableItem
                key={`${index}`}
                text={opcao.descricao}
                selected={opcaoSelecionada === index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
