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

export interface AlbumItem {
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

export async function fetchData(props: React.Dispatch<React.SetStateAction<AlbumItem[]>>) {
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
    data.sort(
      (a: { uploadDate: string }, b: { uploadDate: string }) =>
        Number(new Date(b.uploadDate)) - Number(new Date(a.uploadDate))
    );

    props(data);
  } catch (error) {
    console.error(error);
  }
}

export const album = {
  width: 300,
  height: 300,
};
