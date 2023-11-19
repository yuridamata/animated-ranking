import axios from "axios";
import localFont from "next/font/local";

const pressStart2P = localFont({ src: "../public/pressStart2P-Regular.ttf" });
const BBFont = localFont({
  src: "../fonts/bbFont/BancoDoBrasilTextos-Regular.ttf",
});
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DTOPontuacao {
  participacaoId: number;
  quantidadePerguntasCorretas: number;
  quantidadeTotalPerguntas: number;
  dataInicio: string;
  dataFim: string;
  pontuacaoRespostasCorretas: number;
  penalidadeRespostasIncorretas: number;
  multiplicadorTempo: number;
  pontuacaoTotalRespostas: number;
  pontuacaoTotalTempo: number;
  pontuacaoTotal: number;
}

export default function FinalizarQuiz() {
  const [loading, setLoading] = useState(false);
  
  const [pontuacao, setPontuacao] = useState<DTOPontuacao | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParticipacao = searchParams.get("idParticipacao");
  
  useEffect(() => {
    const getPontuacao = async () => {

      if(!idParticipacao){
        return;
      }

      const { data }: { data: DTOPontuacao } = await axios.get(
        `http://localhost:8080/participacao/${idParticipacao}/resultado`
      );
      setPontuacao(data);
    };

  
    if (pontuacao === null) {
      getPontuacao();
    }
  }, [idParticipacao]);

  return (
    <div
      className={`flex flex-wrap justify-center item-center px-20 text-white h-screen max-w-screen relative bg-[url('/bgFinalizacaoQuiz.png')] bg-center bg-cover`}
    >
      {/* Loading Global da aplicação */}
      {loading && (
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
      <div className="flex flex-col justify-center items-center gap-4">
        <div
          style={{ ...pressStart2P.style }}
          className="z-50 mb-6 text-white flex justify-center items-center  w-96 h-20 relative bg-center bg-no-repeat bg-[url('/bgTituloResultados.png')]"
        >
          Meus Resultados
        </div>

        <div className="mb-6" style={{ ...pressStart2P.style }}>
          <p className="text-justify mb-4">Parabéns!</p>
          <p className="leading-6 text-justify ">
            Você concluir o Quiz Analytiucs D&D! Verifique seus resultados e
            veja suas recompensas.
          </p>
        </div>

        <div
          style={{ ...pressStart2P.style }}
          className="flex flex-wrap gap-4 text-ddBrown  pl-20 pr-20 justify-start items-center bg-[url('/tabuaResultados.png')] bg-cover bg-no-repeat w-[415px] h-16"
        >
          <img src="/iconTempo.png" className="w-8 h-8" />
          <div>Tempo: {pontuacao?.pontuacaoTotalTempo} </div>
        </div>

        <div
          style={{ ...pressStart2P.style }}
          className="flex flex-wrap gap-4 text-ddBrown  pl-20 pr-20 justify-start items-center bg-[url('/tabuaResultados.png')] bg-cover bg-no-repeat w-[415px] h-16"
        >
          <img src="/check.png" className="w-8 h-8" />
          <div>Resposta: {pontuacao?.pontuacaoTotalRespostas} </div>
        </div>

        <div
          style={{ ...pressStart2P.style }}
          className="flex flex-wrap gap-4  text-ddBrown  pl-20 pr-20 justify-start items-center bg-[url('/tabuaResultados.png')] bg-cover bg-no-repeat w-[415px] h-16"
        >
          <img src="/chest.png" className="w-8 h-8" />
          <div>Final: {pontuacao?.pontuacaoTotal} </div>
        </div>

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
          className={`flex justify-center cursor-pointer mt-16 p-4 items-center bg-white text-black relative`}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              router.push("/");
            }, 2000);
          }}
        >
          <div>Finalizar</div>
        </div>
      </div>
    </div>
  );
}
