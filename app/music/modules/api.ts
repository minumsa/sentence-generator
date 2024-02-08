import { AlbumInfo, CriteriaType, MethodType, UpdateInfo } from "./data";

interface FetchData {
  pathName: string;
  perPageCount: number;
  currentPage: number;
  currentMethod: MethodType;
  currentCriteria: CriteriaType;
}

interface SearchData {
  pathName: string;
  perPageCount: number;
  currentPage: number;
  currentKeyword: string;
  currentMethod: MethodType;
  currentCriteria: CriteriaType;
}

interface FetchArtistData {
  pathName: string;
  perPageCount: number;
  currentPage: number;
  artistId: string;
  currentMethod: MethodType;
  currentCriteria: CriteriaType;
}

export async function fetchData({
  pathName,
  perPageCount,
  currentPage,
  currentMethod,
  currentCriteria,
}: FetchData) {
  try {
    const queryString = `?perPageCount=${perPageCount}&currentPage=${currentPage}&pathName=${pathName}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}`;
    const url = `/music/api${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload music data");
    }

    let { slicedData, genreDataLength } = await response.json();

    return { slicedData, genreDataLength };
  } catch (error) {
    console.error(error);
  }
}

export async function FetchArtistData({
  pathName,
  perPageCount,
  currentPage,
  artistId,
  currentMethod,
  currentCriteria,
}: FetchArtistData) {
  try {
    const queryString = `?perPageCount=${perPageCount}&currentPage=${currentPage}&artistId=${artistId}&pathName=${pathName}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}`;
    const url = `/music/api/artist${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload music data");
    }

    let { slicedData, genreDataLength } = await response.json();

    return { slicedData, genreDataLength };
  } catch (error) {
    console.error(error);
  }
}

export async function SearchData({
  pathName,
  perPageCount,
  currentPage,
  currentKeyword,
  currentMethod,
  currentCriteria,
}: SearchData) {
  try {
    const queryString = `?perPageCount=${perPageCount}&currentPage=${currentPage}&currentKeyword=${currentKeyword}&pathName=${pathName}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}`;
    const url = `/music/api/search${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to upload music data");
    }

    let { slicedData, genreDataLength } = await response.json();

    return { slicedData, genreDataLength };
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDataById(id: string) {
  try {
    const url = `/music/api/update?id=${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update music data");
    }

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function uploadData(uploadData: AlbumInfo, score: number, password: string) {
  if (uploadData !== null) {
    try {
      const response = await fetch("/music/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: uploadData,
          score: score,
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

export const updateData = async (
  currentId: string,
  data: Partial<AlbumInfo>,
  score: number,
  password: string
) => {
  if (data !== null) {
    try {
      const response = await fetch("/music/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentId,
          data,
          score,
          password,
        }),
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

export const deleteData = async (id: string) => {
  const userPassword = prompt("관리자 비밀번호를 입력해주세요.");

  try {
    const response = await fetch("/music/api", {
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

const fetchSpotifyAccessToken = async () => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const clientId = "9ba8de463724427689b855dfcabca1b1";
    const clientSecret = "7cfb4b90f97a4b1a8f02f2fe6d2d42bc";
    const basicToken = btoa(`${clientId}:${clientSecret}`);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicToken}`,
    };
    const data = "grant_type=client_credentials";

    const accessTokenResponse = await fetch(url, {
      method: "POST",
      headers,
      body: data,
    });

    if (!accessTokenResponse.ok) {
      console.error("Error: Access token fetch failed");
    }

    const accessTokenData = await accessTokenResponse.json();
    return accessTokenData.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchSpotify = async ({ albumId, genre, link, text, uploadDate }: UpdateInfo) => {
  if (!albumId || !genre || !link || !text) {
    alert("모든 항목을 채워주세요.");
    return;
  }

  const item = {
    albumId: albumId,
    genre: genre,
    link: link,
    text: text,
    uploadDate: uploadDate,
  };

  try {
    const accessToken = await fetchSpotifyAccessToken();
    if (!accessToken) {
      console.error("Error: Access token is not available");
    }

    const albumUrl = `https://api.spotify.com/v1/albums/${item.albumId}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const albumDataResponse = await fetch(albumUrl, { headers });

    if (!albumDataResponse.ok) {
      console.error("Error: albumData fetch failed");
    }

    const albumData = await albumDataResponse.json();

    const artistId = albumData.artists[0].id;
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

    const artistDataResponse = await fetch(artistUrl, { headers });

    if (!artistDataResponse.ok) {
      console.error("Error: artistDataResponse fetch failed");
    }

    const artistData = await artistDataResponse.json();

    const fetchedData: AlbumInfo = {
      id: albumData.id,
      artistId: albumData.artists[0].id,
      imgUrl: albumData.images[0].url,
      artistImgUrl: artistData.images[0].url,
      artist: albumData.artists[0].name,
      album: albumData.name,
      label: albumData.label,
      releaseDate: albumData.release_date,
      text: item.text,
      genre: item.genre,
      link: item.link,
      uploadDate: item.uploadDate,
      tracks: albumData.tracks.items.length,
      duration: Math.floor(
        albumData.tracks.items
          .map((data: any) => data.duration_ms)
          .reduce((a: number, b: number) => a + b) / 1000
      ),
    };

    return fetchedData;
  } catch (error) {
    console.error(error);
  }
};

interface SearchSpotify {
  albumKeyword: string;
}

export const searchSpotify = async (albumKeyword: string) => {
  try {
    const accessToken = await fetchSpotifyAccessToken();
    if (!accessToken) {
      console.error("Error: Access token is not available");
    }

    const searchUrl = `https://api.spotify.com/v1/search?q=${albumKeyword}&type=album`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const searchDataResponse = await fetch(searchUrl, { headers });

    if (!searchDataResponse.ok) {
      console.error("Error: albumData fetch failed");
    }

    const fetchedData = await searchDataResponse.json();

    return fetchedData;
  } catch (error) {
    console.error(error);
  }
};
