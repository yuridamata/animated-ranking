import RankingItem from "@/components/RankingItem";
import { useState } from "react";
import classes from "./index.module.scss";
import { useTransition, animated } from "@react-spring/web";
import initialRanking, { getSuffledRanking } from "@/components/ranking";
export default function Home() {
  const [ranking, setRanking] = useState(initialRanking);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(true);

  let height = 0;
  const transitions = useTransition(
    ranking.map((data) => ({ ...data, y: (height += 24) - 24 })),
    {
      key: (item: any) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, height: 48, opacity: 1 }),
      update: ({ y }) => ({ y, height: 48 }),
    }
  );

  const shuffle = () => {
    const newRanking = getSuffledRanking();
    setRanking(newRanking);
    setCurrentStep(0);
    setIsSorting(true);
  };

  const bubble_sort_step = () => {
    let swapped = false;

    if (!Array.isArray(ranking) || !isSorting) {
      return ranking;
    }

    const array = [...ranking];
    console.log("Step " + (currentStep + 1));
    console.log(array);

    for (let i = 0; i < array.length - 1 - currentStep; i++) {
      console.log("Debug sorting " + i);
      console.log(array[i].position);
      console.log(array[i + 1].position);
      if (array[i].position > array[i + 1].position) {
        console.log("entrou");
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
    console.log("Swap");
    console.log(swapped);
    if (swapped === false) {
      setIsSorting(false);
      setCurrentStep(0);
    }

    setCurrentStep(currentStep + 1);
    setRanking(array);
  };

  return (
    <main>
      <button onClick={bubble_sort_step}>Order Step</button>
      <button onClick={shuffle}>Shuffle</button>

      <div className={classes.rankingWrapper}>
        {transitions((style, item, t, index) => (
          <animated.div style={{ ...style }}>
            <RankingItem key={index} {...item} />
          </animated.div>
        ))}
      </div>
    </main>
  );
}
