export default function RankingItem({ name, avatar, position }: any) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-md shadow h-12">
      <div className="flex items-center">
        <span className="text-gray-500">{position}</span>
        <img src={avatar} alt={name} className="w-10 h-10 mx-4 rounded-full" />
        <span className="text-gray-700">{name}</span>
      </div>
      <span className="text-gray-500">1000 pts</span>
    </div>
  );
}
