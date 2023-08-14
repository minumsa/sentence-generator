<img width="1791" alt="image" src="https://github.com/minumsa/divdivdiv/assets/83910706/57b94be0-91a7-4291-b0b9-60c659f8fee4">

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

### 몽고DB의 데이터를 가져오(GET)는 부분

`pathName`에 따라 서버로부터 음악 데이터를 가져오는 역할을 합니다. API를 호출해 응답을 받아 데이터를 필터링한 후 반환합니다.

```typescript
// api.ts

export async function fetchData(pathName: string) {
  try {
    const response = await fetch("/api/music", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload music data");
    }

    let data = await response.json();

    if (pathName === "admin") pathName = "";
    if (pathName.includes("admin")) pathName = pathName.split("admin/").join("");
    if (pathName.length > 20) {
      data = data.filter((item: { id: string }) => item.id === pathName)[0];
    } else if (pathName !== "") {
      data = data.filter((item: { genre: string }) => item.genre === pathName);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### 몽고DB에 데이터를 업로드(POST)하는 부분

앨범 정보와 관리자 비밀번호를 받아와 서버로 데이터를 업로드하는 역할을 합니다. API를 호출해 업로드 결과에 따라 알림을 출력합니다.

```typescript
// api.ts

export async function uploadData(albumData: AlbumInfo, password: string) {
  if (albumData !== null) {
    try {
      const response = await fetch("/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: albumData,
          password: password,
        }),
      });

      if (response.status === 401) {
        alert("관리자 비밀번호가 틀렸습니다.");
      } else if (response.status === 409) {
        alert("이미 존재하는 데이터입니다.");
      } else if (!response.ok) {
        throw new Error("데이터 업로드에 실패했습니다.");
      } else {
        alert("데이터가 성공적으로 저장되었습니다.");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
```

### 몽고DB의 데이터를 수정(PUT)하는 부분

앨범 정보와 관리자 비밀번호를 받아와 서버로 데이터를 업로드하는 역할을 합니다. API를 호출해 업로드 결과에 따라 알림을 출력합니다.

```typescript
// api.ts

export const updateData = async (id: string, data: Partial<AlbumInfo>, password: string) => {
  if (data !== null) {
    try {
      const response = await fetch("/api/music", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumId: id, data: data, password: password }),
      });

      if (response.status === 401) {
        alert("관리자 비밀번호가 틀렸습니다.");
      } else if (response.status === 404) {
        alert("존재하지 않는 앨범입니다.");
      } else if (!response.ok) {
        throw new Error("데이터 수정에 실패했습니다.");
      } else {
        alert("데이터가 성공적으로 수정되었습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }
};
```

### 몽고DB의 데이터를 삭제(DELETE)하는 부분

앨범 ID를 받아서 서버로부터 데이터를 삭제하는 역할을 합니다. API를 호출해 삭제 결과에 따라 알림을 출력합니다.

```typescript
// api.ts

export const deleteData = async (id: string) => {
  const userPassword = prompt("관리자 비밀번호를 입력해주세요.");

  try {
    const response = await fetch("/api/music", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, password: userPassword }),
    });

    if (response.status === 401) {
      alert("관리자 비밀번호가 틀렸습니다.");
    } else if (response.status === 404) {
      alert("존재하지 않는 앨범입니다.");
    } else if (!response.ok) {
      throw new Error("Failed to upload music data");
    } else {
      alert("데이터가 성공적으로 삭제되었습니다.");
    }
  } catch (error) {
    console.error(error);
  }
};
```

### Spotify에서 음악 데이터를 가져오는 부분

앨범 ID, 장르, 링크, 텍스트 정보를 받아서 Spotify에서 앨범 데이터를 가져오는 역할을 합니다. Spotify API를 이용해 데이터를 요청하고, 가져온 데이터를 형식에 맞게 가공해 반환합니다.

```typescript
// api.ts

export const fetchSpotify = async ({ albumId, genre, link, text }: UpdateInfo) => {
  if (!albumId || !genre || !link || !text) {
    alert("모든 항목을 채워주세요.");
    return;
  }

  const item = {
    albumId: albumId,
    genre: genre,
    link: link,
    text: text,
    uploadDate: Date(),
  };

  try {
    const accessToken = await fetchSpotifyAccessToken();
    if (!accessToken) {
      console.error("Error: Access token is not available");
    }

    const url = `https://api.spotify.com/v1/albums/${item.albumId}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const dataResponse = await fetch(url, { headers });

    if (!dataResponse.ok) {
      console.error("Error: music fetch failed");
    }

    const data = await dataResponse.json();

    const fetchedData: AlbumInfo = {
      id: data.id,
      imgUrl: data.images[0].url,
      artist: data.artists[0].name,
      album: data.name,
      label: data.label,
      releaseDate: data.release_date,
      text: item.text,
      genre: item.genre,
      link: item.link,
      uploadDate: item.uploadDate,
      tracks: data.tracks.items.length,
      duration: Math.floor(
        data.tracks.items
          .map((data: any) => data.duration_ms)
          .reduce((a: number, b: number) => a + b) / 1000
      ),
    };

    return fetchedData;
  } catch (error) {
    console.error(error);
  }
};
```

### 사용자 정의 메모이제이션된 정렬 로직 부분

`useMemo` 훅을 사용하여 현재 정렬 방법과 기준에 따라 정렬된 데이터를 계산하고 메모이제이션합니다. 메모이제이션된 함수 내에 정렬 로직이 구현되어 있습니다. 이 함수는 `data`, `currentMethod`, `currentCriteria`를 의존성으로 가지며, 이 값들이 변경될 때만 정렬 로직이 다시 계산됩니다.

```typescript
// Content.tsx

const sortedData = useMemo(() => {
  // 현재 정렬 방법과 기준에 따른 정렬 로직
  // ...
  return newData;
}, [data, currentMethod, currentCriteria]);
```

### 개별 앨범 정보를 렌더링하는 부분

map 함수 내에서 정렬된 데이터를 기반으로 개별 앨범 정보를 렌더링합니다. 이에는 앨범 아트워크, 아티스트, 앨범 제목, 발매일, 트랙 수 및 기타 정보가 포함됩니다. 추가로, 관리자 사용자를 위해 삭제와 수정 버튼이 렌더링되며, 앨범 텍스트도 단락으로 나누어 렌더링됩니다.

```typescript
// Content.tsx

sortedData.map((data, index) => {
  // ...
  return <div key={index}>{/* ... */}</div>;
});
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

### 버튼 클릭 및 비밀번호 처리 부분

"제출하기" 버튼을 렌더링하고, 버튼 클릭 시 `handleUpload` 또는 `handleEdit`을 호출합니다. 이를 통해 업로드와 수정 작업을 처리합니다. 또한, 비밀번호 입력 폼에서 `Enter` 키 입력 시 비밀번호 확인 로직을 처리하는 부분도 `handlePasswordEnter`와 `onKeyDown` 이벤트로 구현되어 있습니다.

```typescript
// Upload.tsx

<div style={{ display: "flex", justifyContent: "center" }}>
  <div
    className={`${styles["button"]} ${styles["submit"]}`}
    onClick={() => {
      title === "업로드" ? handleUpload() : handleEdit();
    }}
  >
    제출하기
  </div>
</div>
```

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Gatsby]: https://img.shields.io/badge/Gatsby-663399?style=for-the-badge&logo=gatsby&logoColor=white
