# README.md

![스크린샷 2023-07-26 오후 12 53 58](https://github.com/minumsa/divdivdiv/assets/83910706/72f14ff0-a9ac-46a7-a983-83980dadd827)

## 링크

https://divdivdiv.com/fruits

## 프로젝트 설명

페이지 상단에서 과일이 무한하게 생성되며 하강합니다. 특정 과일을 클릭하면 해당 과일에 대한 재밌고 유용한 정보가 화면에 나타납니다.

## 기술 스텍

- ![Next][Next.js]
- ![React][React.js]
- ![TypeScript][TypeScript]

## 동작 방법

사용한 `npm` 버전은 9.2.0이며, `Node.js` 버전은 v19.4.0입니다. 프로젝트를 실행시키기 위한 명령어는 다음과 같습니다.

```shell
npm install
npm run dev
```

## 파일 구조

1. `layout.tsx`: 메타데이터 정보를 정의하고 컴포넌트를 구성합니다.
2. `page.tsx`: 떨어지는 과일 애니메이션을 보여줍니다.
3. `fruits.ts`: 과일 이모지와 특정 과일을 클릭했을 때 나타나는 문자열의 배열을 저장합니다.
4. `fruits.module.css`: 전체 웹의 CSS를 담당합니다.

## 코드 스니펫

### 뷰포트 너비에 따라 배경 크기 조정

컴포넌트가 렌더링될 때 뷰포트 너비에 따라 `checkerWidth` 상태를 설정합니다. 이는 과일이 떨어지는 배경의 크기를 조정하는 데 사용됩니다.

```typescript
// page.tsx

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
```

---

### 과일 생성과 이벤트 핸들러

일정한 간격으로 과일을 생성하고, 과일에 대한 클릭 및 터치 이벤트를 핸들링합니다. 랜덤한 과일을 생성하고, 과일에 마우스를 올리면 커서가 포인터 형태로 변경되도록 합니다. 과일을 클릭하면 해당 과일에 대한 메시지를 랜덤하게 표시하고, 과일을 화면에서 제거합니다. 뷰포트 너비가 450보다 작을 경우 터치 이벤트를, 그렇지 않은 경우 클릭 이벤트를 사용합니다.

```typescript
// page.tsx

const container = document.getElementById("container");

const interval = setInterval(() => {
  const fruit = document.createElement("div");
  const fruitsArr: string[] = Object.keys(fruitEmojiMap);
  const randomFruit = fruitsArr[Math.floor(Math.random() * fruitsArr.length)];
  fruit.innerHTML = randomFruit;
  fruit.style.left = `${Math.random() * 100}%`;
  container?.appendChild(fruit);

  fruit.style.pointerEvents = "auto";

  fruit.addEventListener("mouseover", () => {
    fruit.style.cursor = "pointer";
  });

  const clickHandler = () => {
    const fruitEmoji = fruit.innerHTML;
    const fruitArray = fruitEmojiMap[fruitEmoji];

    if (fruitArray) {
      if (window.outerWidth < 450) {
        fruit.removeEventListener("touchstart", clickHandler);
      } else {
        fruit.removeEventListener("click", clickHandler);
      }
      alert(fruitArray[Math.floor(Math.random() * fruitArray.length)]);
      fruit.remove();
    }
  };

  if (window.outerWidth < 450) {
    fruit.addEventListener("touchstart", clickHandler);
  } else {
    fruit.addEventListener("click", clickHandler);
  }

  setTimeout(() => {}, 10000);
}, 300);

return () => {
  clearInterval(interval);
};
```

---

### JSX 리턴

`styles["container"]` 클래스를 가진 div 요소를 만들고, 해당 요소의 배경 크기와 위치를 `checkerWidth`에 따라 동적으로 설정합니다. 또한 떨어지는 과일들을 담기 위한 div 요소를 생성하고 해당 요소의 id를 "container"로 설정합니다. 이를 통해 떨어지는 과일들이 이 div 요소 내부에 추가될 수 있도록 합니다.

```typescript
// page.tsx

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
```

---

### 떨어지는 과일 스타일

이 코드 스니펫은 떨어지는 과일들에 대한 스타일을 정의합니다. 과일들은 `.falling-fruits` 컨테이너 안에 있는 div 요소들로 표현됩니다. `font-size`를 통해 과일들의 크기를 설정하고, `position: absolute;` 속성을 사용해 절대적인 위치로 배치합니다. `top: -20%;` 속성을 사용해 컨테이너 위쪽으로 이동해 화면에 보이기 전까지 숨깁니다. `width`와 `height`를 설정해 과일들의 크기를 정의합니다. 떨어지는 애니메이션은 `fallingAnimation` 키프레임 애니메이션으로 구현되며, 10초 동안 선형적으로 떨어집니다.

```typescript
// fruits.module.css

.falling-fruits div {
  font-size: 10rem;
  position: absolute;
  top: -20%;
  width: 10px;
  height: 10px;
  animation: fallingAnimation 10s linear infinite;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@keyframes fallingAnimation {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, 200vh) rotate(200deg);
  }
}
```

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Gatsby]: https://img.shields.io/badge/Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white
