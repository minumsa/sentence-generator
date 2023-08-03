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

export const album = {
  width: 300,
  height: 300,
};

export const activeStyle = {
  color: "#000000",
  fontWeight: "bold",
  borderRadius: "0",
  backgroundColor: "#ffccff",
};

export async function fetchData(
  setData: React.Dispatch<React.SetStateAction<AlbumInfo[]>>,
  pathName: string
) {
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
    if (pathName === "r&b_soul") pathName = "r&b/soul";
    if (pathName !== "") {
      data = data.filter((item: { genre: string }) => item.genre === pathName);
    }

    setData(data);
  } catch (error) {
    console.error(error);
  }
}

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
        alert("이미 존재하는 앨범입니다.");
      } else if (!response.ok) {
        throw new Error("업로드에 실패했습니다.");
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

export const deleteData = async (id: string) => {
  const userPassword = prompt("관리자 비밀번호를 입력해주세요.");
  console.log(userPassword);

  try {
    const response = await fetch(`/api/music`, {
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
