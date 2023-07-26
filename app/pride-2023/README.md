# README.md

![스크린샷 2023-07-26 오후 1 16 01](https://github.com/minumsa/divdivdiv/assets/83910706/fdf17f32-f82c-4023-bf2b-903ca4cdc362)

## 링크

https://divdivdiv.com/pride-2023

## 프로젝트 설명

2023 프라이드 먼스를 기념해 만든 페이지로, 미리 입력해둔 주어와 목적어, 동사가 경우의 수에 따라 랜덤하게 조합되며 다양한 문장을 만들어냅니다.

## 파일 구조

이 웹은 `Next.js`와 `React`, `TypeScript`를 사용해 개발했습니다. 코드는 크게 4개의 파일로 구성되어 있습니다.

1. layout.tsx: 메타데이터 정보를 정의하고 컴포넌트를 구성합니다.
2. page.tsx: 랜덤하게 조합되며 생성되는 문장을 보여줍니다.
3. words.ts: 주어, 문장, 동사에 해당하는 문자열의 배열을 저장합니다.
4. pride-2023.module.css: 전체 웹의 CSS를 담당합니다.

## 동작 방법

사용한 `npm` 버전은 9.2.0이며, `Node.js` 버전은 v19.4.0입니다. 프로젝트를 실행시키기 위한 명령어는 다음과 같습니다.

```shell
npm install
npm run dev
```

## 코드 스니펫

### 랜덤한 항목 선택 함수

문자열 배열에서 랜덤한 항목을 선택해 반환하는 유틸리티 함수입니다. 랜덤한 문장을 생성하는 데 사용됩니다.

```typescript
// page.tsx

const getRandomItemFromArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};
```

### 랜덤한 색상 생성 함수

랜덤한 색상 코드를 생성해 반환하는 유틸리티 함수입니다. 랜덤한 색상으로 문장의 부분들을 스타일링하는 데 사용됩니다.

```typescript
// page.tsx

const generateRandomColor = (): string => {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
};
```

### 문장 생성 및 상태 설정

이 함수형 컴포넌트는 랜덤한 문장을 생성하고, 해당 문장의 부분들에 대한 상태를 관리합니다.

```typescript
// page.tsx

export default function RandomSentenceGenerator() {
  const [randomSubject, setRandomSubject] = useState<string>("Pride");
  const [randomObject, setRandomObject] = useState<string>("Month");
  const [randomVerb, setRandomVerb] = useState<string>("2023");
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const generateRandomSentence = () => {
    setRandomSubject(getRandomItemFromArray(subjects));
    setRandomObject(getRandomItemFromArray(objects));
    setRandomVerb(getRandomItemFromArray(verbs));
  };

  useEffect(() => {
    const intervalId = setInterval(generateRandomSentence, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);
```

### 문장을 랜덤한 색상으로 스타일링해 보여주는 JSX

랜덤한 문장을 생성하고 해당 문장의 부분들을 랜덤한 색상으로 스타일링해 보여줍니다. 문장은 `styles["sentence"]` 클래스를 가진 div 요소로 표현되며, `generateRandomColor()` 함수를 사용해 랜덤한 색상으로 스타일링됩니다. 모바일 환경에서는 `.mobile-subject`와 같은 클래스를 가진 요소들도 존재하며, 이들 역시 랜덤한 색상으로 스타일링됩니다.

```typescript
// page.tsx

return (
  <div className={styles["container"]}>
    {/* ... */}
    <div className={styles["sentence-container"]}>
      <div className={styles["sentence"]} onClick={handleClick}>
        <span
          className={styles["subject"]}
          style={{
            color: generateRandomColor(),
          }}
        >
          {randomSubject}{" "}
        </span>
        <span
          className={styles["object"]}
          style={{
            color: generateRandomColor(),
          }}
        >
          {randomObject}{" "}
        </span>
        <span
          className={styles["verb"]}
          style={{
            color: generateRandomColor(),
          }}
        >
          {randomVerb}
        </span>
      </div>
      <div className={styles["mobile-container"]} onClick={handleClick}>
        {/* ... */}
        <div
          className={styles["mobile-subject"]}
          style={{
            color: generateRandomColor(),
          }}
        >
          {randomSubject}{" "}
        </div>
        {/* ... */}
      </div>
    </div>
  </div>
);
```
