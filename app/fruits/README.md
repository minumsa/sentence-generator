# README.md

## 프로젝트 링크

https://divdivdiv.com/fruits

## 프로젝트 파일 구조

이 웹은 `Next.js`와 `React`, `TypeScript`를 사용해 개발했습니다. 코드는 크게 4개의 파일로 구성되어 있습니다.

1. layout.tsx: 메타데이터 정보를 정의하고 컴포넌트를 구성합니다.
2. page.tsx: 떨어지는 과일 애니메이션을 보여줍니다.
3. fruits.ts: 과일 이모지와 특정 과일을 클릭했을 때 나타나는 문자열의 배열을 저장합니다.
4. fruits.module.css: 전체 웹의 CSS를 담당합니다.

## 프로젝트 동작 방법

사용한 `npm` 버전은 9.2.0이며, `Node.js` 버전은 v19.4.0입니다. 프로젝트를 실행시키기 위한 명령어는 다음과 같습니다.

```shell
npm install
npm run dev
```

## 프로젝트 코드 스니펫

### 뷰포트 너비에 따라 배경 크기 조정

컴포넌트가 렌더링될 때 뷰포트 너비에 따라 `checkerWidth` 상태를 설정합니다. 이는 과일이 떨어지는 배경의 크기를 조정하는 데 사용됩니다.

```typescript
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

### 과일 생성과 이벤트 핸들러

일정한 간격으로 과일을 생성하고, 과일에 대한 클릭 및 터치 이벤트를 핸들링합니다. 랜덤한 과일을 생성하고, 과일에 마우스를 올리면 커서가 포인터 형태로 변경되도록 합니다. 과일을 클릭하면 해당 과일에 대한 메시지를 랜덤하게 표시하고, 과일을 화면에서 제거합니다. 뷰포트 너비가 450보다 작을 경우 터치 이벤트를, 그렇지 않은 경우 클릭 이벤트를 사용합니다.

```typescript
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

### JSX 리턴

`styles["container"]` 클래스를 가진 div 요소를 만들고, 해당 요소의 배경 크기와 위치를 `checkerWidth`에 따라 동적으로 설정합니다. 또한 떨어지는 과일들을 담기 위한 div 요소를 생성하고 해당 요소의 id를 "container"로 설정합니다. 이를 통해 떨어지는 과일들이 이 div 요소 내부에 추가될 수 있도록 합니다.

```typescript
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
