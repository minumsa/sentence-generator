# README.md

![스크린샷 2023-07-26 오후 1 16 01](https://github.com/minumsa/divdivdiv/assets/83910706/fdf17f32-f82c-4023-bf2b-903ca4cdc362)

## 링크

https://divdivdiv.com/words

## 프로젝트 설명

데이터베이스에 있는 약 100개의 단어들이 경우의 수에 따라 랜덤하게 조합되며 화면에 다양한 직유법을 만들어냅니다.

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
2. `page.tsx`: 랜덤하게 조합되며 생성되는 문장을 보여줍니다.
3. `words.ts`: 주어, 문장, 동사에 해당하는 문자열의 배열을 저장합니다.
4. `words.module.css`: 전체 웹의 CSS를 담당합니다.

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
   const [randomWord1, setRandomWord1] = useState<string>(words[0]);
  const [randomWord2, setRandomWord2] = useState<string>(words[9]);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const generateRandomSentence = () => {
    setRandomWord1(getRandomItemFromArray(words));
    setRandomWord2(getRandomItemFromArray(words));
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

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Gatsby]: https://img.shields.io/badge/Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white
