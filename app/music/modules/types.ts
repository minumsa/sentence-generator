export interface ContentsType {
  pop: string;
  "k-pop": string;
  "j-pop": string;
  rock: string;
  alternative: string;
  disco: string;
  electronic: string;
  jazz: string;
  soul: string;
  folk: string;
  country: string;
  classic: string;
  soundtrack: string;
  // 이 인터페이스로 정의된 객체에는 어떤 문자열 키라도 사용할 수 있음
  [key: string]: string;
}

export const contents: ContentsType = {
  pop: "팝",
  "k-pop": "케이팝",
  "j-pop": "제이팝",
  rock: "록",
  alternative: "얼터너티브",
  disco: "디스코",
  electronic: "일렉트로닉",
  jazz: "재즈",
  soul: "알앤비/소울",
  hiphop: "힙합/랩",
  folk: "포크",
  country: "컨트리",
  classic: "클래식",
  soundtrack: "사운드트랙",
};

interface Video {
  title: string;
  url: string;
}
export interface SpotifyAlbumData {
  id: string;
  artistId: string;
  imgUrl: string;
  artistImgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  duration: number;
  tracks: number;
}

export interface AlbumInfo {
  id: string;
  artistId: string;
  imgUrl: string;
  artistImgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: Date;
  duration: number;
  tracks: number;
  score: number;
  videos: Video[];
  tagKeys: string[];
  blurHash: string;
}

export interface PageProps {
  params: {
    id: string;
    keyword: string;
    page: number;
    genre: string;
    tagName: string;
  };
}

export interface UpdateInfo {
  albumId: string;
  musicVideoTitle?: string;
  musicVideoUrl?: string;
}

export type MethodType = "작성일" | "발매일" | "아티스트" | "앨범" | "별점";
export type CriteriaType = "오름차순" | "내림차순";
export type OrderType = "method" | "criteria";
