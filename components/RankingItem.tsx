 
import medalhaOuro from "../public/medalhaOuro.png"

const getPositionClasses = (position :number) => {
    switch (position) {
      case 1:
        return "border-yellow-500"
      case 2:
        return "border-gray-500";
      case 3:
        return "border-ddBronze";
      default:
        return "border-white"
    }
}


const getPositionIndicator = (position:number) => {
  switch (position) {
    case 1:
      return <img src={"/medalhaOuro.png"} />;
    case 2:
      return <img src={"/medalhaPrata.png"} />;
    case 3:
      return <img src={"/medalhaBronze.png"} />;
    default:
      return <span className="">{position}º</span>
  }
}

export default function RankingItem({ name, avatar, position, points }: any) {

  return (
    <div className={`flex items-center justify-between  px-4 py-2  text-white rounded-md shadow h-12 border-[3px] border-solid ${getPositionClasses(position)}`}>
      <div className="flex items-center gap-4">
        {getPositionIndicator(position)}
        <span className="">{name}</span>
      </div>
      <span className="">{points} pts</span>
    </div>
  );
}
