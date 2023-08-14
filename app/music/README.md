## 링크

https://divdivdiv.com/music

## 프로젝트 설명

좋아하는 음반을 소개하는 페이지입니다. 스포티파이에서 제공하는 API를 활용해 음반 정보, 짧은 글을 함께 업로드합니다. 관리자 페이지에서 암호를 입력하면 글을 쓰거나 수정, 삭제할 수 있습니다. 관련 데이터는 모두 MongoDB에 저장했습니다.

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

## 웹 구조

1. `Index`: 메인 레이아웃과 네비게이션을 담당하는 부모 컴포넌트입니다. 페이지 내부에서 `Main`, `About`, `Contact` 컴포넌트들을 조건부로 렌더링해 해당 컴포넌트들이 보여지도록 하고, 날씨 정보와 한영 토글 버튼, 날짜 및 시간을 포함한 상단 네비게이션 바를 포함하고 있습니다.
2. `Main`: 메인 페이지에서 사용되는 컴포넌트입니다. 더블클릭하면 해당 페이지로 이동하는 프로젝트 폴더, 각각의 프로젝트를 설명하는 메모, 오늘의 운세를 알려주는 프로그램, 사진 몇 장이 포함되어 있습니다.
3. `Clock`: 상단 네비게이션 바에 표시할 시간을 계산하는 컴포넌트입니다.
4. `About`: 소개 페이지 컴포넌트입니다. 개발자에 관한 간단한 정보를 보여줍니다.
5. `Contact`: 연결 페이지 컴포넌트입니다. 개발자의 깃허브 링크, 이메일 주소를 나타냅니다.

### Index 컴포넌트

- 현재 페이지에 해당하는 컴포넌트를 보여주도록 `showMain`, `showAbout`, `showContact` 상태 변수가 업데이트됩니다.
- 페이지의 배경색 및 글자색은 `isDarkMode` 변수에 따라 변경됩니다.
- 오늘 날짜를 가져와 `year`, `month`, `day`, `dayOfWeek`, `dayOfEngWeek`를 계산합니다. `getDayOfWeek` 함수를 정의해 날짜에 따른 요일을 한국어와 영어로 구분한 뒤, 상단 네비게이션 바에 반환합니다.
- `useEffect` 훅을 통해 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 하고, `fetchData` 함수를 호출합니다. 그리고 OpenWeatherMap API를 사용해 서울의 날씨 데이터를 가져와 `weatherData` 상태 변수에 저장합니다. 해당 날씨 데이터로 상단 네비게이션 바에 날씨 아이콘과 기온을 표시합니다.

### Main 컴포넌트

- `ImageModal`이라는 내부 컴포넌트는 이미지 모달을 표시하는 역할을 합니다. 이미지 모달은 이미지를 누르면 확대해서 표시해주고, 클릭해 모달을 닫을 수 있습니다.
- MacOS의 폴더 아이콘처럼 보이는 여러 개의 함수들이 정의되어 있습니다. 이 함수들은 사용자가 아이콘을 더블 클릭했을 때 해당 프로젝트의 링크로 이동시키거나, 프로젝트를 설명하는 메모장 이미지를 띄워주거나, 랜덤한 오늘의 운세를 보여주는 등의 동작을 수행합니다.
- CSS의 미디어 쿼리를 활용해 모바일 화면과 데스크탑 화면에서 각각 다른 스타일과 동작을 가지도록 구현되어 있습니다.

### Clock 컴포넌트

- `currentTime`이라는 상태 변수를 생성하고, 현재 시간 값을 저장하는 데 사용합니다. 이 값은 `Date` 객체로 초기화되며, `setInterval`을 사용해 1초마다 갱신됩니다.
- 부모 컴포넌트인 `Index` 컴포넌트에서 전달받은 `language` 프로퍼티에 따라 "AM(오전)" 또는 "PM(오후)"을 사용해 12시간을 기준으로 현재 시간을 표시합니다.

### About 컴포넌트, Contact 컴포넌트

- 부모 컴포넌트인 `Index` 컴포넌트에서 `language` 프로퍼티를 전달받고, 해당 값에 알맞는 형태로 문구를 표시합니다.

## 코드 스니펫

### 날씨 API를 호출하는 부분

`useEffect`를 사용해 상태를 관리합니다. 컴포넌트가 마운트되면 OpenWeatherMap API를 호출합니다. 서울의 날씨 정보를 가져와 `weatherData`라는 상태 변수에 담고, 만약 데이터를 가져오는 동안 에러가 발생하면 콘솔에 에러를 출력합니다.

```typescript
// Index.tsx

useEffect(() => {
  const fetchData = async () => {
    try {
      const apiKey = "a363f14d94f369a4d926a27d5d44fc60";
      const seoulWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&lang=kr`
      );
      if (!seoulWeatherResponse.ok) {
        throw "weather fetch failed";
      }
      const data = await seoulWeatherResponse.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  fetchData();
}, []);
```

### 상태 변경과 이벤트 처리 부분

세 가지의 상태 변수(`showMain`, `showAbout`, `showContact`)를 사용해 현재 표시되는 컨텐츠를 제어합니다. `onClick` 이벤트 핸들러를 통해 사용자가 메뉴를 클릭하면 해당 콘텐츠를 보여주고 나머지 콘텐츠는 숨깁니다.

```typescript
// Index.tsx

const [showMain, setShowMain] = useState<boolean>(true);
const [showAbout, setShowAbout] = useState<boolean>(false);
const [showContact, setShowContact] = useState<boolean>(false);

// ...

<div
  className={styles["menu-text"]}
  style={{
    marginLeft: "10px",
    fontWeight: showMain ? "600" : "400",
  }}
  onClick={() => {
    setShowMain(true);
    setShowAbout(false);
    setShowContact(false);
  }}
>
  divdivdiv
</div>;
```

### ImageModal 컴포넌트 부분

이미지를 더블 클릭하면 해당 이미지 URL과 텍스트가 상태 변수에 입력됩니다. `ImageModal` 컴포넌트는 이미지를 확대해서 보여주거나 프로젝트에 대한 설명을 적은 메모를 보여주는 역할을 합니다.

```typescript
const handleDoubleClick = (index: number) => {
  if (index === 6) {
    setImgSrc("/divdivdiv/cat.webp");
    setImgAlt("Cat");
  } else if (index === 7) {
    setImgSrc("/divdivdiv/me.webp");
    setImgAlt("Me");
  } else if (index === 8) {
    language === "en"
      ? setImgSrc("/divdivdiv/readme-nav-en.webp")
      : setImgSrc("/divdivdiv/readme-nav-ko.webp");
    setImgAlt("README.txt");
  }
  setShowImage(true);
};
```

```typescript
// Main.tsx

const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
  // ...
};
```

### handleFortuneClick 함수 부분

포춘쿠키 아이콘 클릭 시 랜덤한 포춘쿠키 문구를 알림으로 보여주는 역할을 합니다.

```typescript
// Main.tsx

const handleFortuneClick = () => {
  return language === "en"
    ? alert(fortuneEngArr[Math.floor(Math.random() * fortuneArr.length)])
    : alert(fortuneArr[Math.floor(Math.random() * fortuneArr.length)]);
};
```

### 시간을 실시간으로 업데이트하는 부분

`useEffect`를 사용해 컴포넌트가 렌더링될 때 타이머를 설정하고, 1초마다 현재 시간을 업데이트합니다. 컴포넌트가 언마운트될 때 해당 타이머를 정리해 메모리 누수를 방지합니다. 한편 시간은 12시간 형식으로 변환하고, `String()` 함수와 `padStart()` 함수를 사용해 시간과 분을 두 자리 숫자로 표시합니다. 그리고 `NoSSR` 컴포넌트로 감싸서 서버사이드 렌더링 시 시계가 중복으로 렌더링되는 현상을 방지합니다.

```typescript
// Clock.tsx

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, []);
```

```typescript
// Clock.tsx

if (language === "en") {
  period = hours >= 12 ? "PM" : "AM";

  const engClock = `${period} ${String(twelveHourFormat).padStart(2, "0")}:${minutes}`;
  return <NoSSR>{engClock}</NoSSR>;
} else {
  period = hours >= 12 ? "오후" : "오전";
  const korClock = `${period} ${String(twelveHourFormat).padStart(2, "0")}:${minutes}`;
  return <NoSSR>{korClock}</NoSSR>;
}
```

```typescript
// NoSSR.tsx

const NoSSR = ({ children, fallback = null }: Props) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return fallback;
  }

  return children;
};
```

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Gatsby]: https://img.shields.io/badge/Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white
