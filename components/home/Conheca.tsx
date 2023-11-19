import localFont from "next/font/local";

const BBFont = localFont({
  src: "../../fonts/bbFont/BancoDoBrasilTextos-Regular.ttf",
});

export default function Conheca() {
  return (
    <section className="bg-ddMediumGrey pt-10  pb-11 px-20 mt-[-2px] relative">

      <img className="absolute right-0 -top-20 z-50" src="dadosBgComposition.png" />
      <img className="absolute right-0 top-1/2 z-50" src="pergaminhoComposition.png" />
      <img className="absolute -left-4 top-1/2 z-50" src="grimorioComposition.png" />

      <div className="flex flex-wrap justify-center items-center mb-16">
        <img
          title="Logo Dungeons & Data"
          className="relative  h-20 w-20"
          src="dd_titulo_icone.png"
        />
      </div>

      <div className="text-center mb-16 text-2xl">
        <h1>Conheça o Dungeons & Data!</h1>
      </div>

      <div style={{...BBFont.style}}>
        <p className="text-left mb-16 leading-6 px-4">
          Dungeons & Data é um programa de aceleração digital para capacitar
          nossos funcionários nos conhecimentos de Big Data além de fomentar a
          cultura Data Driven.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center z-50">
        <div className="w-1/3" style={{ ...BBFont.style }}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-8 h-8 p-4 bg-ddDarkGrey rounded-full">
              <img src="/bookmark.png" />
            </div>
            <div>Aprendizado</div>
          </div>
        </div>

				<div className="w-1/3" style={{ ...BBFont.style }}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-8 h-8 p-4 bg-ddDarkGrey rounded-full">
              <img src="/terminal.png" />
            </div>
            <div>Capacitação</div>
          </div>
        </div>

				<div className="w-1/3" style={{ ...BBFont.style }}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-8 h-8 p-4 bg-ddDarkGrey rounded-full">
              <img src="/brain.png" />
            </div>
            <div>Inovação</div>
          </div>
        </div>        
      </div>

			<div className="flex flex-wrap justify-center items-center mt-16" >
        <div className="h-1 bg-ddBlue w-24 "></div>
      </div>
    </section>
  );
}
