import localFont from "next/font/local";

const BBFont = localFont({
  src: "../../fonts/bbFont/BancoDoBrasilTextos-Regular.ttf",
});

export default function DisputeLivelo() {
  return (
    <section className="bg-ddMediumGrey pt-10 px-20 mt-[-2px]  bg-[url('/bgFinal.png')] bg-cover ">
      <div className="text-center mb-16 text-2xl">
        <h1>Dispute pelo rank e ganhe pontos Livelo!</h1>
      </div>
      <div style={{ ...BBFont.style }}>
        <p className="text-left mb-16 leading-6 px-4">
          Que tal ser recompensado pela sua jornada de aprendizado? Ganhe
          cristais para acumular pontos de rank e conquiste seu lugar no nosso
          pódio. Os melhores colocados ganharão pontos Livello!
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center mt-16 relative min-h-[350px]">
        <img className="absolute left-16" src="cristalComposition.png" />
        <img className="absolute" src="chestComposition.png" />
        <img className="absolute left-2/4 top-0" src="livelo.png" />
      </div>
      
    </section>
  );
}
