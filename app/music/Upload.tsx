import { useEffect, useState } from "react";
import styles from "./music.module.css";
import { AlbumInfo, uploadData } from "./lib/data";

export default function Upload() {
  const [albumId, setAlbumId] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [albumData, setAlbumData] = useState<AlbumInfo>({
    id: "",
    imgUrl: "",
    artist: "",
    album: "",
    label: "",
    releaseDate: "",
    genre: "",
    link: "",
    text: "",
    uploadDate: "",
    duration: 0,
    tracks: 0,
  });
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
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

    const fetchAccessToken = async () => {
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

    try {
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        // throw new Error("Access token is not available");
        console.error("Error: Access token is not available");
      }

      const url = `https://api.spotify.com/v1/albums/${item.albumId}`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const dataResponse = await fetch(url, { headers });

      if (!dataResponse.ok) {
        // throw new Error("music fetch failed");
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

      setAlbumData(fetchedData);
    } catch (error) {
      console.error(error);
    }

    await uploadData(albumData, password);

    setAlbumId("");
    setGenre("");
    setText("");
    setLink("");
    setPassword("");
  };

  return (
    <div className={styles["album-container"]}>
      <div style={{ textAlign: "center" }}>｟ 업로드 페이지 ｠</div>
      <div style={{ marginTop: "100px" }}>앨범 ID(Spotify)</div>
      <input
        className={styles["input"]}
        value={albumId}
        onChange={e => {
          setAlbumId(e.target.value);
        }}
      />
      <div>장르</div>
      <input
        className={styles["input"]}
        value={genre}
        onChange={e => {
          setGenre(e.target.value);
        }}
      />
      <div>링크(Apple Music)</div>
      <input
        className={styles["input"]}
        value={link}
        onChange={e => {
          setLink(e.target.value);
        }}
      />
      <div>글</div>
      <textarea
        className={`${styles["input"]} ${styles["input-text"]}`}
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      />
      <div>관리자 비밀번호</div>
      <input
        className={styles["input"]}
        value={"*".repeat(password.length)}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={`${styles["button"]} ${styles["submit"]}`} onClick={handleSubmit}>
          제출하기
        </div>
      </div>
      <div className={styles["divider"]} style={{ marginBottom: "50px" }}></div>
    </div>
  );
}
