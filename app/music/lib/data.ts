export interface ContentsType {
  "": string;
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
  [key: string]: string;
}

export const contents: ContentsType = {
  "": "divdivdiv",
  pop: "팝",
  "k-pop": "케이팝",
  "j-pop": "제이팝",
  rock: "락",
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
  imgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: string;
  duration: number;
  tracks: number;
}

export interface PageProps {
  params: {
    genre: string;
  };
}

export interface UpdateInfo {
  albumId: string;
  genre: string;
  link: string;
  text: string;
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

export const sortItems = {
  method: ["작성일", "발매일", "아티스트", "앨범"],
  criteria: ["오름차순", "내림차순"],
};
