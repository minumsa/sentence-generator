import { forwardRef, useEffect, useState } from "react";
import styles from "../music.module.css";
import React from "react";
import { fetchDataById, fetchSpotify, searchSpotify, updateData } from "../modules/api";
import { contents } from "../modules/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";

interface UpdateProps {
  currentId: string;
}

interface Video {
  title: string;
  url: string;
}

interface SearchData {
  albums: any;
  items: any;
  artists: any;
  name: string;
  release_date: string;
  images: any[];
  id: string;
}

// FIXME: Upload 컴포넌트와 겹치는 부분 리팩토링
export default function Update({ currentId }: UpdateProps) {
  const [data, setData] = useState<any>();
  const [albumId, setAlbumId] = useState("");
  const [artist, setArtist] = useState("");
  const [artistId, setArtistId] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [uploadDate, setUploadDate] = useState(new Date());
  const [videoCount, setVideoCount] = useState(1);
  const [videos, setVideos] = useState<Video[]>([{ title: "", url: "" }]);
  const [albumKeyword, setAlbumKeyword] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchData[]>();
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  // 수정 API
  const handleUpdate = async () => {
    const newSpotifyAlbumData = await fetchSpotify({
      albumId,
      genre,
      link,
      text,
      uploadDate,
    });

    if (newSpotifyAlbumData) {
      try {
        await updateData(currentId, newSpotifyAlbumData, score, videos, password);
        router.back();
      } catch (error) {
        console.error("updateData 호출에 실패했습니다:", error);
      }
    }
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  useEffect(() => {
    async function getData() {
      const fetchData = await fetchDataById(currentId);
      setData(fetchData);
      const { id, artist, artistId, genre, link, text, uploadDate, score, videos, album } =
        fetchData;
      setAlbum(album);
      setAlbumId(id);
      setArtist(artist);
      setArtistId(artistId);
      setGenre(genre);
      setLink(link);
      setText(text);
      setScore(score);
      setUploadDate(new Date(uploadDate));
      setAlbumKeyword(album);
      if (videos.length > 0) {
        setVideos(videos);
        setVideoCount(videos.length);
      }
    }

    getData();
  }, []);

  const handleSearch = async () => {
    const result = await searchSpotify(albumKeyword);
    setSearchData(result);
  };

  useEffect(() => {
    if (isTyping && albumKeyword.length > 0) {
      const typingTimer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(typingTimer);
    }
  }, [albumKeyword, isTyping]);

  const handleModal = (data: SearchData) => {
    setArtist(data.artists[0].name);
    setAlbum(data.name);
    setAlbumId(data.id);
    setAlbumKeyword(data.name);
    setSearchData(undefined);
    setIsTyping(false);
  };

  return (
    <div
      className={styles["album-container"]}
      style={{
        minWidth: "fit-content",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px",
      }}
    >
      <div className={styles["upload-container"]}>
        <div className={styles["title"]}>수정 페이지</div>
        <div className={styles["upload-item-container"]}>
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
        </div>
        <div className={styles["upload-item-container"]}>
          <div className={styles["upload-item-title"]}>링크(Apple Music)</div>
          <input
            className={styles["input"]}
            value={link}
            onChange={e => {
              setLink(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item-container"]}>
          <div className={styles["upload-item-title"]}>앨범 제목</div>
          <div>
            <input
              className={styles["input"]}
              value={albumKeyword}
              onChange={e => {
                setAlbumKeyword(e.target.value);
                setIsTyping(true);
              }}
              placeholder="검색어를 입력해주세요"
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
                        loading="lazy"
                      />
                    </div>
                    <div className={styles["search-album-text"]}>
                      <div>
                        <span>{album}</span>
                        <span style={{ paddingLeft: "5px", color: "#757A84" }}>
                          ({releaseYear})
                        </span>
                      </div>
                      <div style={{ fontWeight: 400 }}>{artist}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles["upload-item-title"]}>앨범 ID(Spotify)</div>
          <input
            className={styles["input"]}
            value={albumId}
            onChange={e => {
              setAlbumId(e.target.value);
            }}
          />
          <div className={styles["upload-item-title"]}>아티스트 ID(Spotify)</div>
          <input
            className={styles["input"]}
            value={artistId}
            onChange={e => {
              setArtistId(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item-container"]}>
          <div className={styles["upload-item-title"]}>별점</div>
          <Rate
            defaultValue={3}
            value={score}
            count={5}
            allowHalf={true}
            onChange={(value: number) => {
              setScore(value);
            }}
            className={styles["rc-rate"]}
          />
        </div>
        <div className={styles["upload-item-container"]}>
          <div className={styles["upload-item-title"]}>글</div>
          <textarea
            className={`${styles["input"]} ${styles["input-text"]}`}
            value={text}
            onChange={e => {
              setText(e.target.value);
            }}
            style={{ textAlign: "start" }}
          />
        </div>
        {data &&
          new Array(videoCount).fill(null).map((_, index) => {
            const tmpVideos = [...videos];
            const videoNumber = index + 1;

            return (
              <div key={index}>
                <div
                  className={styles["upload-item-title"]}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {index === 0 ? (
                    <a
                      href={`https://www.youtube.com/results?search_query=${artist} ${album} MV 자막`}
                      target="_blank"
                      style={{ color: "#cfcfcf" }}
                    >
                      <div>{`영상 제목 ${videoNumber}`}</div>
                    </a>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>{`영상 제목 ${videoNumber}`}</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          backgroundColor: "#eee",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          marginLeft: "5px",
                          marginTop: "2px",
                        }}
                      >
                        <div
                          style={{
                            color: "#333",
                            fontWeight: 500,
                            fontSize: "1rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setVideoCount(prev => prev - 1);
                            const tmpVideos = [...videos];
                            tmpVideos.splice(index, 1);
                            setVideos(tmpVideos);
                            // setVideoCount(prev => prev + 1);
                            // setVideos([...videos, { title: "", url: "" }]);
                          }}
                        >
                          −
                        </div>
                      </div>
                    </div>
                  )}
                  {index === 0 && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          backgroundColor: "#eee",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          marginLeft: "5px",
                          marginTop: "2px",
                        }}
                      >
                        <div
                          style={{
                            color: "#333",
                            fontWeight: 500,
                            fontSize: "1rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setVideoCount(prev => prev + 1);
                            setVideos([...videos, { title: "", url: "" }]);
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          backgroundColor: "#eee",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          marginLeft: "5px",
                          marginTop: "2px",
                        }}
                      >
                        <div
                          style={{
                            color: "#333",
                            fontWeight: 500,
                            fontSize: "1rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setVideoCount(prev => prev - 1);
                            const tmpVideos = [...videos];
                            tmpVideos.splice(index, 1);
                            setVideos(tmpVideos);
                            // setVideoCount(prev => prev + 1);
                            // setVideos([...videos, { title: "", url: "" }]);
                          }}
                        >
                          −
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <input
                  className={`${styles["input"]} ${styles["input-link"]}`}
                  value={videos[index].title}
                  onChange={e => {
                    // setMusicVideoTitle(e.target.value);
                    tmpVideos[index] = { ...tmpVideos[index], title: e.target.value };
                    setVideos(tmpVideos);
                  }}
                />
                <div className={styles["upload-item-container"]}>
                  <div className={styles["upload-item-title"]}>{`영상 링크 ${videoNumber}`}</div>
                  <input
                    className={`${styles["input"]} ${styles["input-link"]}`}
                    value={videos[index].url}
                    onChange={e => {
                      tmpVideos[index] = { ...tmpVideos[index], url: e.target.value };
                      setVideos(tmpVideos);
                    }}
                  />
                </div>
              </div>
            );
          })}
        {/* <div className={styles["upload-item-title"]}>영상 제목</div>
        <input
          className={`${styles["input"]} ${styles["input-link"]}`}
          value={musicVideoTitle}
          onChange={e => {
            setMusicVideoTitle(e.target.value);
          }}
        />
        <div className={styles["upload-item-title"]}>영상 링크</div>
        <input
          className={`${styles["input"]} ${styles["input-link"]}`}
          value={musicVideoUrl}
          onChange={e => {
            setMusicVideoUrl(e.target.value);
          }}
        /> */}
        <div className={styles["upload-item-container"]} style={{ paddingBottom: "50px" }}>
          <div className={styles["upload-item-title"]}>작성일</div>
          <DatePicker
            selected={uploadDate}
            onChange={date => date && setUploadDate(date)}
            dateFormat={"yyyy/MM/dd"}
            className={styles["date-input"]}
          />
        </div>
        <div className={styles["upload-item-container"]}>
          <div className={styles["upload-item-title"]}>관리자 비밀번호</div>
          <input
            className={styles["input"]}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            onKeyDown={handlePasswordEnter}
            style={{ width: "245px" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}>
          <div
            className={`${styles["button"]} ${styles["submit"]}`}
            onClick={() => {
              handleUpdate();
            }}
          >
            제출하기
          </div>
        </div>
      </div>
    </div>
  );
}
