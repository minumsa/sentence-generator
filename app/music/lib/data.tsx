import { usePathname } from "next/navigation";
import Router from "next/router";

export const contents = [
  "ALL",
  "POP",
  "K-POP",
  "J-POP",
  "ROCK",
  "ALTERNATIVE",
  "DISCO",
  "ELECTRONIC",
  "JAZZ",
  "R&B/SOUL",
  "FOLK",
  "COUNTRY",
  "CLASSICAL",
  "SOUNDTRACK",
];

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

export type SortType = "upload" | "release";

export const activeStyle = {
  color: "#000000",
  fontWeight: "bold",
  borderRadius: "0",
  backgroundColor: "#ffccff",
};

export async function fetchData(setData: React.Dispatch<React.SetStateAction<AlbumInfo[]>>) {
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

    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error(error);
  }
}

export const album = {
  width: 300,
  height: 300,
};

export const filteredPathName = (pathName: string) => {
  const lowercasedPathName = pathName.toLowerCase();

  // TODO: break가 있고 없고의 차이는?
  switch (lowercasedPathName) {
    case "all":
      return "";
    case "r&b/soul":
      return "r&b_soul";
    default:
      return lowercasedPathName;
  }
};
