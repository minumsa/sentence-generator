import { useEffect, useRef, useState } from "react";
import styles from "./update.module.css";
import React from "react";
import { fetchDataById, fetchSpotify, searchSpotify, updateData } from "../modules/api";
import { contents, defaultTags } from "../modules/data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { useRouter } from "next/navigation";

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
  const [albumData, setAlbumData] = useState<any>();
  const [albumId, setAlbumId] = useState("");
  const [artist, setArtist] = useState("");
  const [artistId, setArtistId] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [albumReleaseDate, setAlbumReleaseDate] = useState<any>();
  const [uploadDate, setUploadDate] = useState(new Date());
  const [videoCount, setVideoCount] = useState(1);
  const [videos, setVideos] = useState<Video[]>([{ title: "", url: "" }]);
  const [albumKeyword, setAlbumKeyword] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchData[]>();
  const [showAlbumListModal, setShowAlbumListModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentTagKeys, setCurrentTagKeys] = useState<string[]>([]);
  const defaultTagKeys: string[] = Object.keys(defaultTags);
  const [showTagListModal, setShowTagListModal] = useState(false);
  const [newTagKey, setNewTagKey] = useState("");
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
        await updateData(currentId, newSpotifyAlbumData, score, videos, currentTagKeys, password);
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

  // const autoFillData = () => {
  //   console.log(albumReleaseDate);

  //   const releaseYear = "decade" + albumReleaseDate?.substring(0, 4) + "s";

  //   if (currentTagKeys.length === 0) {
  //     setCurrentTagKeys(prevTagKeys => [...prevTagKeys, releaseYear]);
  //   }
  // };

  useEffect(() => {
    async function getData() {
      const fetchData = await fetchDataById(currentId);
      setAlbumData(fetchData);

      const {
        id,
        artist,
        artistId,
        genre,
        link,
        text,
        uploadDate,
        score,
        videos,
        tagKeys,
        album,
        releaseDate,
      } = fetchData;
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
      setCurrentTagKeys(tagKeys);
      setAlbumReleaseDate(new Date(releaseDate).toString());

      if (videos.length > 0) {
        setVideos(videos);
        setVideoCount(videos.length);
      }

      // FIXME: 중복으로 입력되는 문제 때문에 지워놓음. 추후에 손보기.

      // if (!currentTagKeys.includes("instrumental")) {
      //   if (genre === "classic") setCurrentTagKeys(prevTagKeys => [...prevTagKeys, "instrumental"]);
      // }
      // currentTagKeys에 releaseYear이 없으면 추가
    }

    getData();
  }, [currentId]);

  const handleSearch = async () => {
    const result = await searchSpotify(albumKeyword);
    setSearchData(result);
  };

  useEffect(() => {
    if (showAlbumListModal && albumKeyword.length > 0) {
      const typingTimer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(typingTimer);
    }
  }, [albumKeyword, showAlbumListModal]);

  const handleModal = (data: SearchData) => {
    setArtist(data.artists[0].name);
    setAlbum(data.name);
    setAlbumId(data.id);
    setAlbumKeyword(data.name);
    setSearchData(undefined);
    setShowAlbumListModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowAlbumListModal(false);
        setShowTagListModal(false);
        setNewTagKey("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleTagItemDelete = (selectedKey: string) => {
    setCurrentTagKeys(prevTagKeys => prevTagKeys.filter(prevTagKey => prevTagKey !== selectedKey));
  };

  const handleTagItemAdd = (selectedKey: string) => {
    setCurrentTagKeys(prevTagKeys => [...prevTagKeys, selectedKey]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isExisingTag = currentTagKeys.includes(newTagKey);

    if (e.key === "Enter") {
      if (!isExisingTag) setCurrentTagKeys(prevTagKeys => [...prevTagKeys, newTagKey]);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["page-title"]}>수정 페이지</div>
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>장르</div>
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
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>링크(Apple Music)</div>
        <input
          className={styles["input"]}
          value={link}
          onChange={e => {
            setLink(e.target.value);
          }}
        />
      </div>
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>앨범 제목</div>
        <div>
          <input
            className={styles["input"]}
            value={albumKeyword}
            onChange={e => {
              setAlbumKeyword(e.target.value);
              setShowAlbumListModal(true);
            }}
            placeholder="검색어를 입력해주세요"
          />
          {showAlbumListModal && (
            <div
              ref={modalRef}
              className={styles["album-search-result-modal"]}
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
          )}
        </div>
        <div className={`${styles["block-title"]} ${styles["video-link-title"]}`}>
          앨범 ID(Spotify)
        </div>
        <div className={styles["input"]}>{albumId}</div>
        <div className={`${styles["block-title"]} ${styles["video-link-title"]}`}>발매일</div>
        <div className={styles["input"]}>{albumReleaseDate}</div>
        <div className={`${styles["block-title"]} ${styles["video-link-title"]}`}>
          아티스트 ID(Spotify)
        </div>
        <input
          className={styles["input"]}
          value={artistId}
          onChange={e => {
            setArtistId(e.target.value);
          }}
        />
      </div>
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>별점</div>
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
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>글</div>
        <textarea
          className={`${styles["input"]} ${styles["input-text"]}`}
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
      </div>
      {albumData &&
        new Array(videoCount).fill(null).map((_, index) => {
          const tmpVideos = [...videos];
          const videoNumber = index + 1;

          return (
            <div key={index} className={styles["block-container"]}>
              <div
                className={styles["block-title"]}
                style={{ display: "flex", alignItems: "center" }}
              >
                {index === 0 ? (
                  <a
                    href={`https://www.youtube.com/results?search_query=${artist} ${album} MV 자막`}
                    target="_blank"
                  >
                    <div>{`영상 제목 ${videoNumber}`}</div>
                  </a>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>{`영상 제목 ${videoNumber}`}</div>
                    <div className={styles["video-block-button-container"]}>
                      <div
                        className={styles["video-block-button"]}
                        onClick={() => {
                          setVideoCount(prev => prev - 1);
                          const tmpVideos = [...videos];
                          tmpVideos.splice(index, 1);
                          setVideos(tmpVideos);
                        }}
                      >
                        −
                      </div>
                    </div>
                  </div>
                )}
                {index === 0 && (
                  <>
                    <div className={styles["video-block-button-container"]}>
                      <div
                        className={styles["video-block-button"]}
                        onClick={() => {
                          setVideoCount(prev => prev + 1);
                          setVideos([...videos, { title: "", url: "" }]);
                        }}
                      >
                        +
                      </div>
                    </div>
                    <div className={styles["video-block-button-container"]}>
                      <div
                        className={styles["video-block-button"]}
                        onClick={() => {
                          setVideoCount(prev => prev - 1);
                          const tmpVideos = [...videos];
                          tmpVideos.splice(index, 1);
                          setVideos(tmpVideos);
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
                  tmpVideos[index] = { ...tmpVideos[index], title: e.target.value };
                  setVideos(tmpVideos);
                }}
              />
              <div
                className={`${styles["block-title"]} ${styles["video-link-title"]}`}
              >{`영상 링크 ${videoNumber}`}</div>
              <input
                className={`${styles["input"]} ${styles["input-link"]}`}
                value={videos[index].url}
                onChange={e => {
                  tmpVideos[index] = { ...tmpVideos[index], url: e.target.value };
                  setVideos(tmpVideos);
                }}
              />
            </div>
          );
        })}
      <div ref={modalRef} className={styles["block-container"]}>
        <div className={styles["block-title"]}>태그</div>
        <div className={styles["tag-list-container"]}>
          {currentTagKeys.map((key, index) => {
            return (
              <div
                className={styles["tag-item"]}
                key={index}
                onClick={() => {
                  handleTagItemDelete(key);
                }}
              >
                <span>{defaultTags[key]}</span>
                <button className={styles["tag-item-delete-button"]}>×</button>
              </div>
            );
          })}
          {showTagListModal && (
            <div className={styles["tag-list-modal-container"]}>
              <div className={styles["tag-list-modal"]}>
                <div className={styles["tag-list-comment"]}>태그 선택해서 추가</div>
                <div className={styles["tag-item-container"]}>
                  {defaultTagKeys.map((defaultTagKey, index) => {
                    const isExisingTag = currentTagKeys.includes(defaultTagKey);
                    return (
                      !isExisingTag && (
                        <div
                          className={styles["tag-item"]}
                          key={index}
                          onClick={() => {
                            handleTagItemAdd(defaultTagKey);
                          }}
                        >
                          {defaultTags[defaultTagKey]}
                          <button className={styles["tag-item-delete-button"]}>+</button>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <input
            value={newTagKey}
            className={styles["tag-item-input"]}
            placeholder="태그 생성"
            onClick={() => {
              setShowTagListModal(true);
            }}
            onChange={e => {
              const tmp = e.target.value;
              if (tmp.startsWith("#")) {
                setNewTagKey(tmp);
              } else {
                setNewTagKey("#" + tmp);
              }
            }}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>작성일</div>
        <DatePicker
          selected={uploadDate}
          onChange={date => date && setUploadDate(date)}
          dateFormat={"yyyy/MM/dd"}
          className={`${styles["date-input"]} ${styles["input"]}`}
        />
      </div>
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>관리자 비밀번호</div>
        <input
          className={styles["input"]}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          onKeyDown={handlePasswordEnter}
          style={{ width: "300px" }}
        />
      </div>
      <div className={styles["submit-container"]}>
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
  );
}
