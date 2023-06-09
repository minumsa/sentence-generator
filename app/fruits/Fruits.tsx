"use client";

import { useEffect, useState } from "react";

const Fruits = () => {
  const fruitsArr: string[] = [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🫐",
    "🥝",
    "🍅",
  ];

  const apple: string[] = [
    "대부분 사과 껍질을 칼로 깎고 잘라서 먹는 한국과는 달리, 미국에서는 껍질을 깎지 않고 통째로 베어 먹는 사람들이 많다. 특히 학교나 회사에서 점심을 도시락(주로 집에서 싸온 샌드위치나 햄버거, 파스타 등)으로 해결한 후 습관 삼아 사과 하나를 깨물어 먹는 사람들이 정말 많은데, 이는 사과를 베어 먹는 소리나 모습이 딱히 타인에게 해를 끼치지 않는다고 생각하기 때문이다. 이 때문인지 한국에서는 사과를 별로 먹지 않다가 미국에서 사과를 하루에 한 개씩 먹는 사람들도 있다고 한다.",
    "미국에 방문하여 미국 영화 등에서 곧잘 볼 수 있는 홀쭉하고 윤이 나는 예쁜 사과를 실제로 먹어 봤더니 마치 설탕 덩어리 같은 느낌이라 영 맛이 없더라는 후기를 찾아볼 수 있다. 원래부터 그런 맛의 사과를 즐기던 미국인들은 맛있게 잘 먹겠지만, 그런 맛에 익숙하지 않은 한국인에겐 곤욕스러울 수밖에 없다. 이런 이들의 취향을 극대화한 식품으로 캔디 애플이라는 탕후루와 유사한 사과 사탕이 있다.",
    "후각이 민감한 사람이면 사과 수확철의 과수원에 낀 안개에서 사과향을 맡을 수도 있다고 한다.",
    "사과나무를 태우면 예쁜 푸른 불꽃이 피어난다고 한다. 또 나무에서 나는 향이 좋아서 요리용 장작계에서는 제법 고급이라고 한다. 외향과는 별개로 태울 때 연기는 독하다.",
    "북한에서는 김일성 일가를 위해 개고기와 개구리를 거름으로 주는, 정확히 말해 개 한 마리를 죽여서 나무 밑에 묻고 개구리 한 삼태기를 잡아서 또 묻어 재배한 사과도 있었다고 한다.",
    "뻑뻑해진 사과나 맛없는 사과는 시나몬 가루와 코코넛 오일을 사다가 코코넛 오일을 넣고 중불에서 2분 30초 정도 구운 뒤 시나몬 가루를 뿌려먹으면 맛있다. 단 시나몬은 호불호가 강해 시나몬을 좋아하지 않는다면 견과류를 뿌려먹어도 좋다.",
    "스펀지 167회에 따르면 생소면으로도 사과를 관통할 수도 있다고 하며, 이는 과점 부분을 찍으면 가능하다. 당연하지만 과점마다 수십 개의 소면을 박아놓았더니 사과가 상해버렸다.",
    "사과씨를 먹으면 안된다는 말이 있다. 시안화수소계열인 청산배당체(아미그다린)가 이 독성의 주범인데, 아몬드에도 들어있는 그 성분이다. 사실 많이 과장된 이야기인데, 확실히 몸에 좋지는 않으나 그렇다고 해서 사과씨를 삼키면 안 되는 것은 아니니까 겁낼 필요는 없다. 보통 성인의 경우 사과씨 종이컵 양 정도를 섭취하면 치명적이니 한 두개 실수로 섭취하였어도 죽지는 않는다. 다만 사람에 따라서는 섭취 시 속이 쓰린 사람이 있으니 몸에 별 이상은 없다고 해도 굳이 먹지 않는 것을 추천한다. 그리고 보통 성인에게 큰 문제가 없다고 해도 유아의 경우 조심할 필요가 있으며 또한 몸집이 작은 소동물에게는 매우 치명적일 수 있으니 절대로 먹이지 말자.",
    "1999년 엘리자베스 2세가 방한하여 안동 하회마을을 방문했을 때, 안동 지역의 사과 맛에 반해 그 때부터 엘리자베스 2세의 생일 때마다 안동 사과를 선물로 보내고 있었다. 2019년에는 앤드류 왕자가 방한해 안동 도매시장에서 사과를 한 박스를 사갔었다, 그러나 엘리자베스 2세가 사망하면서 이제는 어찌될지는 미지수.",
    "사과나무 가지는 친칠라, 햄스터 등의 설치류에 속하는 반려동물들의 간식용으로도 사용된다. 특히 친칠라가 사족을 못 쓸 정도로 사과나무 가지를 정말로 좋아한다. 화가 난 친칠라에게 사과나무 가지 하나 쥐어주면 바로 성질을 풀고 순해질 정도. 하지만 늘 그런 것만은 아닌지 어떤 친칠라는 사과나무 가지마저도 던져버릴 정도로 화를 내기도 하는 모양.",
    "세상에서 가장 무거운 사과의 무게는 1.849 kg (4 lb 1 oz)이었으며 2005 년 10 월 24 일 일본 히로사키시에있는 사과 농장에서 이와사키 치사토에 의해 재배되었다.",
    "데스노트의 류크는 사과를 무척 좋아한다. 2023년 뮤지컬판 대본에 따르면, 류크에게 사과는 인간의 술-담배와 같다고 한다.",
  ];

  const grape: string[] = [
    "이솝 우화에는 어떤 사슴이 사냥꾼에게 쫓기다가 이 포도나무에 숨은 덕에 살았는데, 이후에 너무 배가 고파서 포도나무 잎을 먹어치우다 사냥꾼에게 들켜 잡히는 이야기가 있다.",
    "탈무드에선 아담이 포도나무를 심을 때 악마가 그게 뭐냐고 묻자 맛있고 기분 좋아지는 물(포도주)을 만드는 열매가 맺는 나무라 했고, 악마는 포도가 잘 자라는 데 도움을 줄 테니 자신도 마시게 해달라고 했다. 아담이 허락하자 악마는 양과 사자, 돼지, 원숭이의 피로 포도를 키웠다. 그 결과 술을 마시면 양처럼 순해지다가 사자처럼 사나워지고, 필름 끊기면 돼지처럼 아무 데서나 뒹굴고 원숭이처럼 날뛰게 되었다고 한다. 주사를 표현한 것이다.",
    "그리스 로마 신화에선 디오니소스의 동성 애인 암펠로스가 사고로 사망한 후 포도나무로 변했다고 한다.",
    "포도꽃은 꽃 중에서도 아주 이상한 구조를 갖고 있기로 유명한데, 꽃잎이 퇴화된 것 처럼 보이지만 사실은 있다. 대부분의 꽃잎이 아래에 모여있으며, 피어날 때도 아래에서 위를 향해 벌어지며 피지만 포도는 반대로 위에 모여있고 아래가 갈라지며 벌어지며, 활짝 피면 꽃잎이 떨어진다.",
    "신선한 포도는 하얀 왁스같은 가루가 묻어있는 경우가 있는데, 흔히 먼지나 농약으로 오해하지만 사실 '블룸'이라고 부르는 것으로, 과일의 수분을 보호하는 기능을 갖고 있어서 없으면 포도의 상품가치가 떨어진다. 씻을 때 밀가루에 넣은 뒤 물에 헹구면 곳곳이 잘 씻긴다고 한다.",
    "포도를 아주 좋아하는 동물은 개코원숭이로 정말 환장하면서 먹는다. 특히 와인 산지인 남아프리카공화국에서는 포도 과수원을 운영하는 사람들에게 떼지어서 포도를 쓸어가는 개코원숭이는 서리꾼이나 다름없어서 갈등을 심심찮게 빚는다.",
  ];

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const container = document.getElementById("fruit-container");
    const interval = setInterval(() => {
      const fruit = document.createElement("div");
      const randomFruit =
        fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
      fruit.innerHTML = randomFruit;
      fruit.style.left = `${Math.random() * 100}%`; // 과일이 왼쪽에서부터 어떤 위치에서 내려올지 랜덤하게 지정한다
      container?.appendChild(fruit);

      fruit.style.pointerEvents = "auto"; // 이벤트를 활성화한다

      fruit.addEventListener("mouseover", () => {
        fruit.style.cursor = "pointer";
      });

      if (window.outerWidth < 450) {
        const clickHandler = () => {
          if (fruit.innerHTML === "🍎") {
            setCount(prevCount => prevCount + 1);
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(apple[Math.floor(Math.random() * apple.length)]);
          } else if (fruit.innerHTML === "🍇") {
            setCount(prevCount => prevCount + 1);
            fruit.removeEventListener("touchstart", clickHandler);
            fruit.remove();
            alert(grape[Math.floor(Math.random() * grape.length)]);
          }
        };

        fruit.addEventListener("touchstart", clickHandler);
      } else {
        const clickHandler = () => {
          if (fruit.innerHTML === "🍎") {
            setCount(prevCount => prevCount + 1);
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(apple[Math.floor(Math.random() * apple.length)]);
          } else if (fruit.innerHTML === "🍇") {
            setCount(prevCount => prevCount + 1);
            fruit.removeEventListener("click", clickHandler);
            fruit.remove();
            alert(grape[Math.floor(Math.random() * grape.length)]);
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
        className="fruits-container"
        style={{
          backgroundSize: `${checkerWidth * 2}px ${checkerWidth * 2}px`,
          backgroundPosition: `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`,
        }}
      >
        <div className="fruit-count"></div>
        <div id="fruit-container" className="falling-fruits"></div>
      </div>
    </>
  );
};

export default Fruits;
