import { useEffect, useState } from "react";
import localFont from "next/font/local";
import SelectableItem from "@/components/quiz/SelectableItem";
import IniciarQuiz from "@/components/quiz/IniciarQuiz";
import Pergunta from "@/components/quiz/Pergunta";

const questions = [
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget metus id orci consequat commodo vel eu velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum pretium egestas dui et suscipit. Ut egestas elit eget metus dapibus, nec convallis lorem dictum. Donec feugiat sem ut euismod imperdiet.",
    options: [
      "Morbi ac feugiat sapien.",
      "Etiam sapien dui, imperdiet sit amet mauris et, bibendum iaculis velit.",
      "Suspendisse mattis felis ut tempor vulputate. Maecenas interdum elementum dolor, vitae consequat orci ultricies in.",
      ,
      " Quisque at convallis eros. In hac habitasse platea dictumst. In sed varius urna.",
    ],
  },
];

const BBFont = localFont({
  src: "../fonts/bbFont/BancoDoBrasilTextos-Regular.ttf",
});
const pressStart2P = localFont({ src: "../public/pressStart2P-Regular.ttf" });

export interface DTORespondenteFunci {
  matricula: string;
}

export interface DTORespondenteExterno {
  nome: string;
  email: string;
}

export interface DTODadosRespondente {
  tipoRespondente: string;
  dados: null | DTORespondenteFunci | DTORespondenteExterno;
}

export interface DTOOpcao {
  id: number;
  descricao: string;
}

export interface DTOPergunta {
  id: number;
  descricao: string;
  opcoes: DTOOpcao[];
}

export interface DTOQuiz {
  id: number;
  nome: string;
  perguntas: DTOPergunta[];
}

export default function Quiz() {
  const [dadosRespondente, setDadosRespondente] =
    useState<DTODadosRespondente | null>(null);
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [passoAtual, setPassoAtual] = useState(0);
  const [respondendoQuiz, setRespondendoQuiz] = useState(false);

  const quiz = {
    id: 1,
    nome: "Quiz BB Week Dungeons & Data",
    perguntas: [
      {
        id: 1,
        descricao:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        opcoes: [
          {
            id: 1,
            descricao: "Opção 1",
          },
          {
            id: 2,
            descricao: "Opção 2",
          },
          {
            id: 3,
            descricao: "Opção 3",
          },
          {
            id: 4,
            descricao: "Opção 4",
          },
        ],
      },
      {
        id: 2,
        descricao:
          "Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        opcoes: [
          {
            id: 1,
            descricao: "Opção 1",
          },
          {
            id: 2,
            descricao: "Opção 2",
          },
          {
            id: 3,
            descricao: "Opção 3",
          },
          {
            id: 4,
            descricao: "Opção 4",
          },
        ],
      },
    ],
  };

  const onProximoPasso = () => {
    if (passoAtual + 1 < quiz.perguntas.length) {
      setPassoAtual(passoAtual + 1);
    }
  };

  const onIniciarQuiz = () => {
    console.log("Iniciar Quiz")
    setRespondendoQuiz(true);
  };

  useEffect(() => {
    console.log("Effect respondendoquiz")
    console.log(respondendoQuiz)
  },[respondendoQuiz])

  return (
    <div
      style={{ ...BBFont.style }}
      className="flex justify-center items-center w-screen h-screen relative text-white bg-repeat bg-[url('/bg_form_quiz.png')]"
    >
      <div className="absolute bg-black w-full h-full opacity-75 cursor-not-allowed"></div>
      {respondendoQuiz === true ? (
        <div className="w-full h-full self-center z-50">
          {quiz.perguntas.map((pergunta, index) => {
            return (
              index === passoAtual && (
                <Pergunta
                  timerAtivado={respondendoQuiz}
                  numPergunta={index}
                  totalPerguntas={quiz.perguntas.length}
                  pergunta={pergunta}
                />
              )
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center z-50">
          <IniciarQuiz
            iniciarQuiz={onIniciarQuiz}
            setDadosRespondente={setDadosRespondente}
            setRespondendoQuiz={setRespondendoQuiz}
          />
        </div>
      )}
    </div>
  );
}
