/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import localFont from "next/font/local";
import SelectableItem from "@/components/quiz/SelectableItem";
import { DTODadosRespondente } from "@/pages/quiz";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";

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
  src: "../../fonts/bbFont/BancoDoBrasilTextos-Regular.ttf",
});
const pressStart2P = localFont({
  src: "../../public/pressStart2P-Regular.ttf",
});

const TIPO_RESPONDENTE_FUNCI = "FUNCI";
const TIPO_RESPONDENTE_EXTERNO = "EXTERNO";

const DadosFunci = ({ matricula, setMatricula }: any) => {
  return (
    <div className="flex flex-col text-white px-6">
      <div className="block 700 text-sm font-bold mb-2">
        Digite a sua matrícula
      </div>
      <input
        className="bg-[#292929] w-/12 shadow appearance-none border border-ddBlack rounded text-white p-4 text-lg leading-tight focus:outline-none focus:shadow-outline placeholder-ddLightGrey"
        onChange={(e) => setMatricula(e.target.value)}
        value={matricula}
      />
    </div>
  );
};

const DadosExterno = ({ nome, setNome, email, setEmail }: any) => {
  return (
    <>
      <div className="flex flex-col text-white px-6 pb-6">
        <div className="block 700 text-sm font-bold mb-2">Digite seu nome</div>
        <input
          className="bg-[#292929] w-/12 shadow appearance-none border border-ddBlack rounded text-white p-4 text-lg leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
        />
        <div className="text-xs text-ddLightGrey mt-2">
          Seu nome aparecerá assim no ranking
        </div>
      </div>
      <div className="flex flex-col text-white px-6">
        <div className="block 700 text-sm font-bold mb-2">Digite seu email</div>
        <input
          className="bg-[#292929] w-/12 shadow appearance-none border border-ddBlack rounded text-white p-4 text-lg leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
    </>
  );
};

export default function IniciarQuiz({
  iniciarQuiz,
}: {
  iniciarQuiz: (dadosRespondente: DTODadosRespondente) => void;
}) {
  const [tipoRespondente, setTipoRespondente] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { globalLoading, setGlobalLoading } = useContext(AppContext);
  const onIniciarQuiz = async () => {
    setGlobalLoading(true);
    if (!validarDadosRespondente()) {
      return;
    }
    const dadosRespondente: DTODadosRespondente = {
      tipoRespondente,
      dados: {
        matricula,
        nome,
        email,
      },
    };
    try {
      const response = await axios.post("http://localhost:8080/participacao/quiz/1", {
        email: email ? email : null,
        nome: nome ? nome : null,
        matricula: matricula ? matricula : null,
      });

      const { id }: { id: number } = response.data;

      setTimeout(() => {
        setGlobalLoading(false);
        iniciarQuiz({ ...dadosRespondente, idParticipacao: id });
      }, 2000);
    } catch (error) {
      setGlobalLoading(false);
      console.log(error);
    }
  };

  const validarDadosRespondente = () => {
    if (
      !tipoRespondente ||
      (tipoRespondente !== TIPO_RESPONDENTE_FUNCI &&
        tipoRespondente !== TIPO_RESPONDENTE_EXTERNO)
    ) {
      return false;
    }

    if (tipoRespondente === TIPO_RESPONDENTE_FUNCI && !matricula) {
      return false;
    }

    if (tipoRespondente === TIPO_RESPONDENTE_EXTERNO && (!nome || !email)) {
      return false;
    }


    const regexMatricula = /^(F|C)\d{7}$/;
    if(matricula && !regexMatricula.test(matricula)){
      return false
    }

    const regexEmail = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(email && !regexEmail.test(email)){
      return false;
    }

    return true;
  };

  useEffect(() => {
    setMatricula("");
    setNome("");
    setEmail("");
  }, [tipoRespondente]);

  return (
    <main
      style={{ ...BBFont.style }}
      className="bg-ddMediumGrey text-white w-4/6 p-4"
    >
      <div className="flex justify-center items-center w-full py-4">
        <img src="/dd_titulo_icone.png" className="w-14 h-14" />
      </div>
      <div className={`${pressStart2P.className} text-ddBlue text-center pb-4`}>
        Iniciar quiz
      </div>
      <div className="p-6 text-justify">
        <p className="py-4">Olá aventureiros!</p>
        <p>
          Responda corretamento às 10 perguntas deste quiz, quanto mais questões
          você acertar, maior será sua pontuação de Rank e você poderá brindes
          especiais!
        </p>
      </div>
      <div className="p-4 text-justify">
        <p className="text-ddGrey">
          Antes de começar, preencha as seguintes informações
        </p>
      </div>
      <div className="p-6 flex flex-col gap-2">
        <div onClick={() => setTipoRespondente(TIPO_RESPONDENTE_FUNCI)}>
          <SelectableItem
            text={"Sou funcionário BB"}
            selected={tipoRespondente === TIPO_RESPONDENTE_FUNCI}
          />
        </div>
        <div onClick={() => setTipoRespondente(TIPO_RESPONDENTE_EXTERNO)}>
          <SelectableItem
            text={"Não sou funcionário BB"}
            selected={tipoRespondente === TIPO_RESPONDENTE_EXTERNO}
          />
        </div>
      </div>
      {tipoRespondente === TIPO_RESPONDENTE_FUNCI && (
        <DadosFunci matricula={matricula} setMatricula={setMatricula} />
      )}
      {tipoRespondente === TIPO_RESPONDENTE_EXTERNO && (
        <DadosExterno
          nome={nome}
          setNome={setNome}
          email={email}
          setEmail={setEmail}
        />
      )}
      <div className="flex justify-center items-center relative">
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
          className="flex justify-center p-4 items-center mt-14 w-28 h-8 bg-white text-black  cursor-pointer relative"
          onClick={onIniciarQuiz}
        >
          {!validarDadosRespondente() && (
            <div className="absolute bg-black w-[calc(100%+4px)] h-[calc(100%+4px)] top-0 left-0 opacity-75 cursor-not-allowed"></div>
          )}
          Iniciar
        </div>
      </div>
    </main>
  );
}
