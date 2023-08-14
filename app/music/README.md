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

1. `api` : 다양한 기능을 수행하는 여러 API들의 집합입니다. 각 API는 음악 데이터와 관련된 API 요청과 처리를 다루며, 데이터 불러오기, 업로드, 수정, 삭제, 그리고 Spotify에서 데이터 가져오기 등의 작업을 수행합니다.
2. `Content` : 음악 정보를 표시하고 정렬합니다.
3. `page` : 음악 카테고리를 표시하고 사용자가 선택한 카테고리에 따라 음악 정보를 렌더링합니다.
4. `Upload` : 음악 정보를 업로드하거나 수정합니다.

## 코드 스니펫

### 몽고DB의 데이터를 가져오는 부분

`pathName`에 따라 서버로부터 음악 데이터를 가져오는 역할을 합니다. API를 호출해 응답을 받아 데이터를 필터링한 후 반환합니다.

```typescript
// api.ts

export async function fetchData(pathName: string) {
  try {
    // ... (fetching data from API)
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### 정렬 버튼 이벤트 핸들러 부분

마우스가 정렬 버튼에 진입하거나 벗어났을 때를 처리합니다. `handleMouseEnter`는 마우스가 버튼에 들어올 때 `sortMethod` 또는 `sortCriteria` 값을 변경해 정렬 옵션 표시 여부를 제어합니다. `handleMouseLeave`는 마우스가 버튼을 벗어났을 때 값을 초기화해 표시 여부를 다시 숨깁니다.

```typescript
// Content.tsx

const handleMouseEnter = (type: OrderType) => {
  if (type === "method") {
    setSortMethod(true);
  } else if (type === "criteria") {
    setSortCriteria(true);
  }
};

const handleMouseLeave = (type: OrderType) => {
  if (type === "method") {
    setSortMethod(false);
  } else if (type === "criteria") {
    setSortCriteria(false);
  }
};
```

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Gatsby]: https://img.shields.io/badge/Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white
