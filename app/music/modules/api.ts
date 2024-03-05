import { CriteriaType, SpotifyAlbumData, MethodType, UpdateInfo } from "./data";

export interface AlbumFilters {
  perPageCount: number;
  currentPage: number;
  currentMethod: MethodType;
  currentCriteria: CriteriaType;
  currentTagKey: string;
}

interface FetchData {
  pathName: string;
  albumFilters: AlbumFilters;
}

export interface SearchFilters {
  perPageCount: number;
  currentPage: number;
  currentKeyword: string;
}

interface FetchArtistData {
  perPageCount: number;
  currentPage: number;
  artistId: string;
}

export async function fetchAlbumData({ pathName, albumFilters }: FetchData) {
  const { perPageCount, currentPage, currentMethod, currentCriteria, currentTagKey } = albumFilters;

  try {
    const queryString = `?pathName=${pathName}&perPageCount=${perPageCount}&currentPage=${currentPage}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}&currentTagKey=${currentTagKey}`;
    const url = `/music/api${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch music data");
    }

    let { slicedData, genreDataLength } = await response.json();

    return { slicedData, genreDataLength };
  } catch (error) {
    console.error(error);
  }
}

export async function FetchArtistData({ artistId, perPageCount, currentPage }: FetchArtistData) {
  try {
    const queryString = `?artistId=${artistId}&perPageCount=${perPageCount}&currentPage=${currentPage}`;
    const url = `/music/api/artist${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch artist data");
    }

    const { artistData, artistDataCount } = await response.json();

    return { artistData, artistDataCount };
  } catch (error) {
    console.error(error);
  }
}

export async function SearchData(searchFilters: SearchFilters) {
  const { perPageCount, currentPage, currentKeyword } = searchFilters;

  try {
    const queryString = `?perPageCount=${perPageCount}&currentPage=${currentPage}&currentKeyword=${currentKeyword}`;
    const url = `/music/api/search${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search music data");
    }

    let { slicedData, genreDataLength } = await response.json();

    return { slicedData, genreDataLength };
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAlbumById(id: string) {
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

interface Video {
  title: string;
  url: string;
}

export interface UpdateDataParams {
  id: string;
  newSpotifyAlbumData: SpotifyAlbumData | null;
  genre: string;
  link: string;
  text: string;
  uploadDate: Date;
  score: number;
  videos: Video[];
  tagKeys: string[];
  password: string;
}

export async function uploadData({
  id,
  newSpotifyAlbumData,
  genre,
  link,
  text,
  uploadDate,
  score,
  videos,
  tagKeys,
  password,
}: UpdateDataParams) {
  if (newSpotifyAlbumData !== null) {
    try {
      const response = await fetch("/music/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          newSpotifyAlbumData,
          genre,
          link,
          text,
          uploadDate,
          score: score,
          videos: videos,
          tagKeys: tagKeys,
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

export const updateData = async ({
  id,
  newSpotifyAlbumData,
  genre,
  link,
  text,
  uploadDate,
  score,
  videos,
  tagKeys,
  password,
}: UpdateDataParams) => {
  if (newSpotifyAlbumData !== null) {
    try {
      const response = await fetch("/music/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          newSpotifyAlbumData,
          genre,
          link,
          text,
          uploadDate,
          score,
          videos,
          tagKeys,
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
      throw new Error("Failed to delete music data");
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

export const fetchSpotify = async (albumId: string) => {
  if (!albumId) {
    alert("모든 항목을 채워주세요.");
    return;
  }

  const item = {
    albumId: albumId,
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
    const duration = Math.floor(
      albumData.tracks.items
        .map((data: any) => data.duration_ms)
        .reduce((a: number, b: number) => a + b) / 1000
    );

    const fetchedData: SpotifyAlbumData = {
      id: albumData.id,
      artistId: albumData.artists[0].id,
      imgUrl: albumData.images[0].url,
      artistImgUrl: artistData.images[0].url,
      artist: albumData.artists[0].name,
      album: albumData.name,
      label: albumData.label,
      releaseDate: albumData.release_date,
      // text: item.text,
      // genre: item.genre,
      // link: item.link,
      // uploadDate: item.uploadDate,
      tracks: albumData.tracks.items.length,
      duration: duration,
    };

    return fetchedData;
  } catch (error) {
    console.error(error);
  }
};

export const searchSpotify = async (searchKeyword: string) => {
  try {
    const accessToken = await fetchSpotifyAccessToken();
    if (!accessToken) {
      console.error("Error: Access token is not available");
    }

    const searchUrl = `https://api.spotify.com/v1/search?q=${searchKeyword}&type=album`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const searchDataResponse = await fetch(searchUrl, { headers });

    if (!searchDataResponse.ok) {
      console.error("Error: albumData fetch failed");
    }

    const searchData = await searchDataResponse.json();
    // 전체 검색 데이터에서 상위 5개만 가져오기
    const data = searchData.albums.items.slice(0, 5);

    return data;
  } catch (error) {
    console.error(error);
  }
};
