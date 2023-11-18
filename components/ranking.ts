const initialRanking = [
  {
    matricula: "F000000",
    name: "Andrew Yuri da Silva Mata",
    avatar: "https://i.pravatar.cc/300",
    position: 3,
  },

  {
    matricula: "F000001",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/301",
    position: 1,
  },
  {
    matricula: "F000002",
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/302",
    position: 2,
  },
  {
    matricula: "F000003",
    name: "Alice Smith",
    avatar: "https://i.pravatar.cc/303",
    position: 4,
  },
  {
    matricula: "F000004",
    name: "Bob Johnson",
    avatar: "https://i.pravatar.cc/304",
    position: 5,
  },
  {
    matricula: "F000005",
    name: "Charlie Brown",
    avatar: "https://i.pravatar.cc/305",
    position: 6,
  },
  {
    matricula: "F000006",
    name: "David Williams",
    avatar: "https://i.pravatar.cc/306",
    position: 7,
  },
  {
    matricula: "F000007",
    name: "Eve Davis",
    avatar: "https://i.pravatar.cc/307",
    position: 8,
  },
  {
    matricula: "F000008",
    name: "Frank Miller",
    avatar: "https://i.pravatar.cc/308",
    position: 9,
  },
  {
    matricula: "F000009",
    name: "Grace Wilson",
    avatar: "https://i.pravatar.cc/309",
    position: 10,
  },
  {
    matricula: "F000010",
    name: "Peter Seller",
    avatar: "https://i.pravatar.cc/309",
    position: 11,
  },
  {
    matricula: "F000012",
    name: "Frodo Bolseiro",
    avatar: "https://i.pravatar.cc/309",
    position: 12,
  },
  {
    matricula: "F000013",
    name: "Myke Tison",
    avatar: "https://i.pravatar.cc/309",
    position: 13,
  },
  {
    matricula: "F000014",
    name: "Bilie Jean",
    avatar: "https://i.pravatar.cc/309",
    position: 14,
  },
  {
    matricula: "F000015",
    name: "Gandalf The White",
    avatar: "https://i.pravatar.cc/309",
    position: 15,
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
