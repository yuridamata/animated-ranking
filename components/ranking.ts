const initialRanking = [
  {
    name: "Andrew Yuri da Silva Mata",
    position: 3,
  },

  

];

export const getSuffledRanking = () => {
  const array = [...initialRanking];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default initialRanking;
