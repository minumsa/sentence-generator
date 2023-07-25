"use client";

import { useEffect, useState } from "react";
import styles from "./fruits.module.css";
import {
  apple,
  banana,
  blueberry,
  cherry,
  fruitsArr,
  grape,
  kiwi,
  lemon,
  mango,
  melon,
  orange,
  peach,
  pear,
  pineapple,
  strawberry,
  tomato,
  watermelon,
} from "./fruits";

export default function Page() {
  useEffect(() => {
    const container = document.getElementById("container");

    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      const randomFruit =
        fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
      fruit.innerHTML = randomFruit;
      fruit.style.left = `${Math.random() * 100}%`;
      container?.appendChild(fruit);

      fruit.style.pointerEvents = "auto";

      fruit.addEventListener("mouseover", () => {
        fruit.style.cursor = "pointer";
      });

      if (window.outerWidth < 450) {
        const clickHandler = () => {
          if (fruit.innerHTML === "🍎" || fruit.innerHTML === "🍏") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(apple[Math.floor(Math.random() * apple.length)]);
          } else if (fruit.innerHTML === "🍇") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(grape[Math.floor(Math.random() * grape.length)]);
          } else if (fruit.innerHTML === "🍓") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(strawberry[Math.floor(Math.random() * strawberry.length)]);
          } else if (fruit.innerHTML === "🍌") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(banana[Math.floor(Math.random() * banana.length)]);
          } else if (fruit.innerHTML === "🍋") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(lemon[Math.floor(Math.random() * lemon.length)]);
          } else if (fruit.innerHTML === "🍒") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(cherry[Math.floor(Math.random() * cherry.length)]);
          } else if (fruit.innerHTML === "🍈") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(melon[Math.floor(Math.random() * melon.length)]);
          } else if (fruit.innerHTML === "🍉") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(watermelon[Math.floor(Math.random() * watermelon.length)]);
          } else if (fruit.innerHTML === "🍍") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(pineapple[Math.floor(Math.random() * pineapple.length)]);
          } else if (fruit.innerHTML === "🫐") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(blueberry[Math.floor(Math.random() * blueberry.length)]);
          } else if (fruit.innerHTML === "🍊") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(orange[Math.floor(Math.random() * orange.length)]);
          } else if (fruit.innerHTML === "🥝") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(kiwi[Math.floor(Math.random() * kiwi.length)]);
          } else if (fruit.innerHTML === "🥭") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(mango[Math.floor(Math.random() * mango.length)]);
          } else if (fruit.innerHTML === "🍐") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(pear[Math.floor(Math.random() * pear.length)]);
          } else if (fruit.innerHTML === "🍑") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(peach[Math.floor(Math.random() * peach.length)]);
          } else if (fruit.innerHTML === "🍅") {
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(tomato[Math.floor(Math.random() * tomato.length)]);
          }
        };

        fruit.addEventListener("touchstart", clickHandler);
      } else {
        const clickHandler = () => {
          if (fruit.innerHTML === "🍎" || fruit.innerHTML === "🍏") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(apple[Math.floor(Math.random() * apple.length)]);
          } else if (fruit.innerHTML === "🍇") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(grape[Math.floor(Math.random() * grape.length)]);
          } else if (fruit.innerHTML === "🍓") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(strawberry[Math.floor(Math.random() * strawberry.length)]);
          } else if (fruit.innerHTML === "🍌") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(banana[Math.floor(Math.random() * banana.length)]);
          } else if (fruit.innerHTML === "🍋") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(lemon[Math.floor(Math.random() * lemon.length)]);
          } else if (fruit.innerHTML === "🍒") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(cherry[Math.floor(Math.random() * cherry.length)]);
          } else if (fruit.innerHTML === "🍈") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(melon[Math.floor(Math.random() * melon.length)]);
          } else if (fruit.innerHTML === "🍉") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(watermelon[Math.floor(Math.random() * watermelon.length)]);
          } else if (fruit.innerHTML === "🍍") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(pineapple[Math.floor(Math.random() * pineapple.length)]);
          } else if (fruit.innerHTML === "🫐") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(blueberry[Math.floor(Math.random() * blueberry.length)]);
          } else if (fruit.innerHTML === "🍊") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(orange[Math.floor(Math.random() * orange.length)]);
          } else if (fruit.innerHTML === "🥝") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(kiwi[Math.floor(Math.random() * kiwi.length)]);
          } else if (fruit.innerHTML === "🥭") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(mango[Math.floor(Math.random() * mango.length)]);
          } else if (fruit.innerHTML === "🍐") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(pear[Math.floor(Math.random() * pear.length)]);
          } else if (fruit.innerHTML === "🍑") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(peach[Math.floor(Math.random() * peach.length)]);
          } else if (fruit.innerHTML === "🍅") {
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(tomato[Math.floor(Math.random() * tomato.length)]);
          }
        };

        fruit.addEventListener("click", clickHandler);
      }

      setTimeout(() => {
        fruit.remove();
      }, 10000);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [checkerWidth, setCheckerWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.outerWidth < 450) {
      setCheckerWidth(window.outerWidth / 7);
    } else {
      setCheckerWidth(window.outerWidth / 14);
    }
  }, []);

  return (
    <>
      <div
        className={styles["container"]}
        style={{
          backgroundSize: `${checkerWidth * 2}px ${checkerWidth * 2}px`,
          backgroundPosition: `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`,
        }}
      >
        <div id="container" className={styles["falling-fruits"]}></div>
      </div>
    </>
  );
}
