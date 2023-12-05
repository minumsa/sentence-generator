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
  folk: "포크",
  country: "컨트리",
  classic: "클래식",
  soundtrack: "사운드트랙",
};

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
}

export const initialAlbumInfo: AlbumInfo = {
  id: "",
  artistId: "",
  imgUrl: "",
  artistImgUrl: "",
  artist: "",
  album: "",
  label: "",
  releaseDate: "",
  genre: "",
  link: "",
  text: "",
  uploadDate: new Date(),
  duration: 0,
  tracks: 0,
};

export interface PageProps {
  params: {
    id: string;
    keyword: string;
    page: number;
    genre: string;
  };
}

export interface UpdateInfo {
  albumId: string;
  artistId: string;
  genre: string;
  link: string;
  text: string;
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
  color: "#949494",
};

export type MethodType = "작성일" | "발매일" | "아티스트" | "앨범";
export type CriteriaType = "오름차순" | "내림차순";

export const sortItems: {
  method: MethodType[];
  criteria: CriteriaType[];
} = {
  method: ["작성일", "발매일", "아티스트", "앨범"],
  criteria: ["오름차순", "내림차순"],
};

export type OrderType = "method" | "criteria";

export const initialMethod = atom<MethodType>("발매일");
export const initialCriteria = atom<CriteriaType>("내림차순");

export const isUploadPage = (pathName: string) => {
  return pathName === "upload" || pathName.length > 20;
};
export const isMainPage = (pathName: string) => {
  return Number(pathName) > 0;
};

export const isAdminPage = (pathName: string) => {
  return pathName?.includes("admin");
};
