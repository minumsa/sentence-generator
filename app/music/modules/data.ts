import { atom } from "jotai";

// FIXME: 현재 타입, 모듈이 모두 data.ts에 뭉쳐 있는데 생산적으로 관리하는 법 구글링

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
  [key: string]: string; // 이 인터페이스로 정의된 객체에는 어떤 문자열 키라도 사용할 수 있음
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
  genre: string;
  link: string;
  text: string;
  uploadDate: Date;
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
  genre: string;
  link: string;
  text: string;
  musicVideoTitle?: string;
  musicVideoUrl?: string;
  uploadDate: Date;
}

export const album = {
  width: 300,
  height: 300,
  mobile: {
    width: 250,
    height: 250,
  },
};

export const activeStyle = {
  // color: "#949494",
  backgroundColor: "#333",
};

export type MethodType = "작성일" | "발매일" | "아티스트" | "앨범" | "별점";
export type CriteriaType = "오름차순" | "내림차순";

export const sortItems: {
  method: MethodType[];
  criteria: CriteriaType[];
} = {
  method: ["작성일", "발매일", "아티스트", "앨범", "별점"],
  criteria: ["오름차순", "내림차순"],
};

export type OrderType = "method" | "criteria";

export const methodAtom = atom<MethodType>("발매일");
export const criteriaAtom = atom<CriteriaType>("내림차순");

export const isUploadPage = (pathName: string) => {
  return pathName.includes("upload");
};

export const isPostPage = (pathName: string) => {
  return pathName.includes("post");
};

export const isMainPage = (pathName: string) => {
  return Number(pathName) > 0;
};

export const isAdminPage = (pathName: string) => {
  return pathName?.includes("admin");
};

export interface Tags {
  [key: string]: string;
}

export const defaultTags: Tags = {
  workout: "#운동 🏋🏻‍♂️",
  dancing: "#춤 🕺",
  clining: "#청소 🧹",
  walking: "#산책 🚶",
  writing: "#글쓰기 ✍🏻",
  reading: "#독서 📚",
  coding: "#코딩 👨‍💻",
  citypop: "#시티팝 🌃",
  instrumental: "#가사 없음 🎻",
  shower: "#샤워 🛀",
  sleeping: "#잠들기 전 😴",
  // traveling: "#여행 ✈️",
  christmas: "#크리스마스 🎅",
  diva: "#디바 🫅",
  love: "#사랑 ❤️",
  happy: "#행복 😄",
  relaxing: "#휴식 😌",
  morning: "#아침 🌞",
  drink: "#술 🥃",
  laborSongs: "#노동요 👷",
  grammyAwards: "#그래미 수상 🏆",
  koreanTop100Albums: "#한국대중음악 100대 명반 💿",
  rollingStonesTop500Albums: "#롤링스톤 500대 명반 👅",
  rollingStonesTop100AlbumsJapan: "#롤링스톤 재팬 100대 명반 👅",
  decade2020s: "#2020년대",
  decade2010s: "#2010년대",
  decade2000s: "#2000년대",
  decade1990s: "#1990년대",
  decade1980s: "#1980년대",
  decade1970s: "#1970년대",
  decade1960s: "#1960년대",
  decade1950s: "#1950년대",
  decade1940s: "#1940년대",
  "": "모두 보기",
};
