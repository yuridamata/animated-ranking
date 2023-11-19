import localFont from "next/font/local";

const BBFont = localFont({
  src: "../../fonts/bbFont/BancoDoBrasilTextos-Regular.ttf",
});

export default function RealizesMissoes() {
  return (
    <section className="bg-ddMediumGrey pt-10 px-20 mt-[-2px] relative  ">
      <img className="absolute right-0 top-1/2 z-50" src="cristalBgComposition.png" />
      <img className="absolute -left-4 top-3/4 z-50" src="bauComposition.png" />
      
      <div className="text-center mb-16 text-2xl z-50 relative">
        <h1>Realize missões e ganhe recompensas!</h1>
      </div>
      <div style={{...BBFont.style}}>
      <p className="text-left mb-16 leading-6 px-4">
          Ao acessar a plataforma Analítica inicie sua aventura em Dungeons &
          Data. Verifique seu diário de missões e conclua cada missão para
          ganhar pontos de experiência e de rank
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center">

        <div className="w-1/3" style={{ ...BBFont.style }}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-8 h-8 p-4 bg-ddDarkGrey rounded-full">
              <img src="/recompensasxpUp.png" />
            </div>
            <div>Pontos de Experiência</div>
          </div>
        </div>

        <div className="w-1/3" style={{ ...BBFont.style }}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-8 h-8 p-4 bg-ddDarkGrey rounded-full">
              <img src="/cristalRanking.png" />
            </div>
            <div>Pontos e Rank</div>
          </div>
        </div>

      </div>
      <div className="flex flex-wrap justify-center items-center mt-16">
        <img src="printDD.png" />
      </div>
      <div className="flex flex-wrap justify-center items-center" >
        <div className="h-1 bg-ddBlue w-24 mt-16"></div>
      </div>
    </section>
  );
}
