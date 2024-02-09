import { forwardRef, useEffect, useState } from "react";
import styles from "../music.module.css";
import React from "react";
import { fetchSpotify, searchSpotify, uploadData } from "../modules/api";
import { contents } from "../modules/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// FIXME: 타입 any 없애기
interface SearchData {
  albums: any;
  items: any;
  artists: any;
  name: string;
  release_date: string;
  images: any[];
  id: string;
}

export default function Upload() {
  const [albumKeyword, setAlbumKeyword] = useState<string>("");
  // FIXME: albumKeyword로 가져온 정보에서 albumId 넘겨줘야 함
  const [albumId, setAlbumId] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchData[]>();

  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const scoreArray: number[] = [0.5, 1, 1.5, 2, 2.5, 3.0, 3.5, 4, 4.5, 5];
  const [password, setPassword] = useState<string>("");
  const spotifyLink = `https://open.spotify.com/search/${link.length > 1 && link.split("/")[5]}`;
  const [uploadDate, setUploadDate] = useState(new Date());

  const handleSearch = async () => {
    const result = await searchSpotify(albumKeyword);
    setSearchData(result);
  };

  useEffect(() => {
    if (albumKeyword.length > 0) {
      handleSearch();
    }
  }, [albumKeyword]);

  console.log(searchData);

  const handleUpload = async () => {
    const newAlbumData = await fetchSpotify({
      albumId,
      genre,
      link,
      text,
      uploadDate,
    });

    if (newAlbumData) {
      await uploadData(newAlbumData, score, password);
    }
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpload();
    }
  };

  const handleModal = (data: SearchData) => {
    setAlbumId(data.id);
    setSearchData(undefined);
  };

  console.log("albumId", albumId);

  return (
    <>
      <div
        className={`${styles["album-container"]} ${styles["upload-container"]}`}
        style={{ flexDirection: "column", paddingTop: "50px" }}
      >
        <div className={styles["title"]}>업로드 페이지</div>
        <div className={styles["upload-item-title"]}>장르</div>
        <div className={styles["select-container"]}>
          <select
            className={styles["select"]}
            value={genre}
            onChange={e => {
              setGenre(e.target.value);
            }}
          >
            <option value="">--장르를 선택해주세요--</option>
            {Object.entries(contents).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles["upload-item-title"]}>앨범 제목</div>
        <div>
          <textarea
            className={styles["input"]}
            value={albumKeyword}
            onChange={e => {
              setAlbumKeyword(e.target.value);
            }}
          />
          <div
            className={styles["search-album-modal-container"]}
            style={{ display: albumKeyword && searchData ? "flex" : "none" }}
          >
            {searchData?.map((data, index) => {
              const artist = data.artists[0].name;
              const album = data.name;
              const releaseYear = data.release_date.slice(0, 4);
              const imageUrl = data.images[2].url;
              return (
                <div
                  className={styles["search-album-modal"]}
                  key={index}
                  onClick={() => {
                    handleModal(data);
                  }}
                >
                  <div className={styles["search-album-image-container"]}>
                    <img
                      className={styles["search-album-image"]}
                      src={imageUrl}
                      alt="search-album-image"
                    />
                  </div>
                  <div className={styles["search-album-text"]}>
                    <div>
                      <span>{album}</span>
                      <span style={{ paddingLeft: "5px", color: "#757A84" }}>({releaseYear})</span>
                    </div>
                    <div style={{ fontWeight: 400 }}>{artist}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["upload-item-title"]}>링크(Apple Music)</div>
        <textarea
          className={`${styles["input"]} ${styles["input-link"]}`}
          value={link}
          onChange={e => {
            setLink(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>평점</div>
        <div className={styles["select-container"]}>
          <select
            className={styles["select"]}
            value={score}
            onChange={e => {
              setScore(Number(e.target.value));
            }}
          >
            <option value="">--스코어를 선택해주세요--</option>
            {scoreArray.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>
        <div className={styles["upload-item-title"]}>글</div>
        <textarea
          className={`${styles["input"]} ${styles["input-text"]}`}
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>작성일</div>
        <DatePicker
          selected={uploadDate}
          onChange={date => date && setUploadDate(date)}
          dateFormat={"yyyy/MM/dd"}
          className={styles["date-input"]}
        />
        <div className={styles["upload-item-title"]} style={{ marginTop: "50px" }}>
          관리자 비밀번호
        </div>
        <input
          className={styles["input"]}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          onKeyDown={handlePasswordEnter}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className={`${styles["button"]} ${styles["submit"]}`}
            onClick={() => {
              handleUpload();
            }}
            // style={{ boxShadow: "0 0 0 1px #242424 inset" }}
          >
            제출하기
          </div>
        </div>
      </div>
    </>
  );
}
