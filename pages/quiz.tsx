/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import IniciarQuiz from "@/components/quiz/IniciarQuiz";
import Pergunta from "@/components/quiz/Pergunta";
import Timer from "@/components/quiz/Timer";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";

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
  idParticipacao?: number;
  dados: null | DTORespondenteFunci | DTORespondenteExterno;
}

export interface DTOOpcao {
  id: number;
  descricao: string;
}

export interface DTOPergunta {
  id: number;
  descricao: string;
  acertou: boolean | null;
  opcaoSelecionada?: number | null;
  opcoes: DTOOpcao[];
}

export interface DTOQuiz {
  id: number;
  nome: string;
  perguntas: DTOPergunta[];
}

export interface DTOQuizRespondido {
  participacaoId: number;
  perguntaId: number;
  opcaoId: number;
  correta: boolean;
}

export default function Quiz() {
  const { globalLoading, setGlobalLoading } = useContext(AppContext);
  const router = useRouter();
  const [dadosRespondente, setDadosRespondente] =
    useState<DTODadosRespondente | null>(null);

  const [passoAtual, setPassoAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [quiz, setQuiz] = useState<DTOQuiz | null>(null);
  const [respondendoQuiz, setRespondendoQuiz] = useState(false);
  const [finalizouQuiz, setFinalizouQuiz] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const { data }: { data: DTOQuiz } = await axios.get(
        "http://localhost:8080/quiz/1",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      setQuiz({
        ...data,
        perguntas: data.perguntas.map((pergunta: DTOPergunta) => {
          return { ...pergunta, acertou: null, opcaoSelecionada: null };
        }),
      });
    };

    fetchQuiz();
  }, []);

  const onSelecionarOpcao = (opcao: number) => {
    if (quiz === null) {
      return null;
    }
    setQuiz((prevQuiz) => {
      if (prevQuiz === null) {
        return null;
      }
      const novaPergunta = prevQuiz.perguntas[passoAtual];
      novaPergunta.opcaoSelecionada = opcao;
      prevQuiz.perguntas[passoAtual] = novaPergunta;
      return prevQuiz;
    });
  };

  const onProximoPasso = () => {
    if (quiz === null) {
      return null;
    }
    if (passoAtual + 1 < quiz.perguntas.length) {
      setGlobalLoading(true);
      setPassoAtual(passoAtual + 1);
      setTimeout(() => {
        setGlobalLoading(false);
      }, 1000);
    }

    if (passoAtual + 1 === quiz.perguntas.length) {
      console.log("Finalizou o quiz");
      setRespondendoQuiz(false);
      setFinalizouQuiz(true);
      router.push(`/finalizarQuiz?idParticipacao=${dadosRespondente?.idParticipacao}`);
    }
  };

  const onIniciarQuiz = (dadosRespondente: DTODadosRespondente) => {
    setDadosRespondente(dadosRespondente);
    setRespondendoQuiz(true);
  };

  const onResponder = async () => {
    if (dadosRespondente === null) {
      return null;
    }
    const idOpcao = quiz?.perguntas[passoAtual].opcaoSelecionada;
    if (idOpcao === null || idOpcao === undefined) {
      return null;
    }
    setGlobalLoading(true);
    const url = `http://localhost:8080/participacao/${dadosRespondente.idParticipacao}/responder/${quiz?.perguntas[passoAtual].id}/opcao/${idOpcao}`;
    const { data }: { data: DTOQuizRespondido } = await axios.post(url);

    setQuiz((prevQuiz) => {
      if (prevQuiz === null) {
        return null;
      }
      const novaPergunta = prevQuiz.perguntas[passoAtual];
      novaPergunta.acertou = data.correta;
      prevQuiz.perguntas[passoAtual] = novaPergunta;
      return prevQuiz;
    });
    if (data.correta) {
      setPontuacao(pontuacao + 100);
    }
    setTimeout(() => {
      setGlobalLoading(false);
    }, 1000);
  };

  if (quiz === null) {
    return null;
  }

  const mostrarQuiz = respondendoQuiz === true && finalizouQuiz === false;
  const mostrarIniciarQuiz =
    respondendoQuiz === false && finalizouQuiz === false;
  const mostrarFinalizarQuiz =
    respondendoQuiz === false && finalizouQuiz === true;

  console.log(mostrarQuiz, mostrarIniciarQuiz, mostrarFinalizarQuiz);

  return (
    <div
      style={{ ...BBFont.style }}
      className="flex justify-center items-center w-screen h-screen relative text-white bg-repeat bg-[url('/bg_form_quiz.png')]"
    >
      {/* Overlay para escurecer a imagem de fundo */}
      <div className="absolute bg-black w-screen h-full opacity-75 cursor-not-allowed"></div>
      {/* Loading Global da aplicação */}
      {globalLoading && (
        <div className="absolute top-0 left-0 flex bg-ddBlue opacity-80 justify-center items-center w-screen h-screen z-[9999]">
          <div className="bg-ddDarkGrey p-4 rounded-lg animate-bounce ">
            <img
              src="/dd_titulo_icone.png"
              alt="Loading"
              className="w-24 h-24"
              title="Loading"
            />
          </div>
        </div>
      )}
      {/* Quiz */}
      {mostrarQuiz === true && (
        <div className="self-start h-screen w-screen z-30">
          {quiz.perguntas.map((pergunta, index) => {
            return (
              index === passoAtual && (
                <div className="h-[85%] w-screen overflow-scroll relative">
                  <Pergunta
                    key={`pergunta-${index}`}
                    timerAtivado={respondendoQuiz}
                    numPergunta={index}
                    totalPerguntas={quiz.perguntas.length}
                    pergunta={pergunta}
                    onSelecionarOpcao={onSelecionarOpcao}
                  />
                </div>
              )
            );
          })}
          <div
            className="bg-ddMediumGrey flex justify-between items-center h-[15%] px-6  relative"
            style={{ ...pressStart2P.style }}
          >
            <div className="flex gap-3">
              <Timer />
              <div className="bg-ddBlue w-36 h-16 flex flex-col gap-1 justify-center items-center rounded-lg">
                <div>{pontuacao}</div>
                <div>Pontos</div>
              </div>
            </div>

            {quiz.perguntas[passoAtual].acertou === null ? (
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
                className={`flex justify-center cursor-pointer  p-4 items-center bg-white text-black relative`}
                onClick={onResponder}
              >
                <div>Responder</div>
              </div>
            ) : (
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
                className="flex justify-center p-4 items-center bg-white text-black  cursor-pointer relative"
                onClick={onProximoPasso}
              >
                <div>Continuar</div>
              </div>
            )}
          </div>
        </div>
      )}{" "}
      {mostrarIniciarQuiz === true && (
        <div className="flex justify-center items-center z-50">
          <IniciarQuiz iniciarQuiz={onIniciarQuiz} />
        </div>
      )}
      {mostrarFinalizarQuiz === true && <div>Tela de finalização</div>}
    </div>
  );
}
