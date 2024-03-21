import { useEffect, useRef, useState } from "react";
import styles from "./Update.module.css";
import React from "react";
import { UploadData, fetchSpotify, searchSpotify, uploadData } from "../../modules/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";
import { AlbumInfo } from "../../modules/types";
import { CONTENTS, DEFAULT_TAGS, GROUP_TAGS } from "../../modules/constants";

type Artist = { name: string };
type Image = { url: string };

interface SearchData {
  albums: AlbumInfo[];
  artists: Artist[];
  name: string;
  release_date: string;
  images: Image[];
  id: string;
}

interface Video {
  title: string;
  url: string;
}

export default function Upload() {
  const [albumKeyword, setAlbumKeyword] = useState<string>("");
  const [albumId, setAlbumId] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchData[]>();
  const [isTyping, setIsTyping] = useState(false);
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [artist, setArtist] = useState("");
  const [score, setScore] = useState<number>(0);
  const [password, setPassword] = useState<string>("");
  const [uploadDate, setUploadDate] = useState(new Date());
  const [videoCount, setVideoCount] = useState(1);
  const [videos, setVideos] = useState<Video[]>([{ title: "", url: "" }]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showTagListModal, setShowTagListModal] = useState(false);
  const [currentTagKeys, setCurrentTagKeys] = useState<string[]>([]);
  const [newTagKey, setNewTagKey] = useState("");
  const [blurHash, setBlurHash] = useState("");

  const handleSearch = async () => {
    const result = await searchSpotify(albumKeyword);
    setSearchData(result);
  };

  useEffect(() => {
    const isSearching = isTyping && albumKeyword.length > 0;
    if (isSearching) {
      const typingTimer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(typingTimer);
    }
  }, [albumKeyword, isTyping]);

  const handleUpload = async () => {
    const filteredText = text.replace(/\[\d+\]/g, "");
    const newSpotifyAlbumData = await fetchSpotify(albumId);

    if (newSpotifyAlbumData) {
      const newData: UploadData = {
        newSpotifyAlbumData,
        genre,
        link,
        text: filteredText,
        uploadDate,
        score,
        videos,
        tagKeys: currentTagKeys,
        blurHash,
      };

      try {
        await uploadData({ newData, password });
      } catch (error) {
        console.error("uploadData 호출에 실패했습니다:", error);
      }
    }
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpload();
    }
  };

  const handleModal = (data: SearchData) => {
    const { name, id, artists } = data;
    setAlbumKeyword(name);
    setAlbumId(id);
    setArtist(artists[0].name);
    setAlbum(name);
    setSearchData(undefined);
    setIsTyping(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickedOutsideModal =
        modalRef.current && !modalRef.current.contains(event.target as Node);
      if (isClickedOutsideModal) {
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
    <div
      className={styles["container"]}
      style={showTagListModal ? { marginBottom: "150px" } : undefined}
    >
      <div className={styles["page-title"]}>업로드 페이지</div>

      {/* 장르 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>장르</div>
        <select
          className={styles["select"]}
          value={genre}
          onChange={e => {
            setGenre(e.target.value);
          }}
        >
          <option value="">--장르를 선택해주세요--</option>
          {Object.entries(CONTENTS).map(([key, value]) => {
            return (
              <option value={key} key={key}>
                {value}
              </option>
            );
          })}
        </select>
      </div>

      {/* 앨범 제목 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>앨범 제목</div>
        <div style={{ position: "relative" }}>
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
              const { artists, name, release_date, images } = data;
              const artist = artists[0].name;
              const album = name;
              const releaseYear = release_date.slice(0, 4);
              const imageUrl = images[2].url;
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
                      <span style={{ paddingLeft: "5px" }}>({releaseYear})</span>
                    </div>
                    <div style={{ fontWeight: 400, marginTop: "3px" }}>{artist}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 앨범 ID */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>앨범 ID</div>
        <input
          className={`${styles["input"]} ${styles["input-link"]}`}
          defaultValue={albumId}
        ></input>
      </div>

      {/* 링크(Apple Music) */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>링크(Apple Music)</div>
        <input
          className={`${styles["input"]} ${styles["input-link"]}`}
          value={link}
          onChange={e => {
            setLink(e.target.value);
          }}
        />
      </div>

      {/* BlurHash String */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>BlurHash String</div>
        <input
          className={styles["input"]}
          value={blurHash}
          onChange={e => {
            setBlurHash(e.target.value);
          }}
        />
      </div>

      {/* 별점 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>별점</div>
        <Rate
          defaultValue={3}
          count={5}
          allowHalf={true}
          onChange={(value: number) => {
            setScore(value);
          }}
          className={styles["rc-rate"]}
        />
      </div>

      {/* 글 */}
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

      {/* 비디오 링크 */}
      {new Array(videoCount).fill(null).map((_, index) => {
        const tmpVideos = [...videos];
        const videoNumber = index + 1;
        const isFirstVideo = index === 0;
        return (
          <div key={index} className={styles["block-container"]}>
            <div
              className={styles["block-title"]}
              style={{ display: "flex", alignItems: "center" }}
            >
              {isFirstVideo ? (
                <>
                  <a
                    href={`https://www.youtube.com/results?search_query=${artist} ${album} MV 자막`}
                    target="_blank"
                  >
                    <div>{`영상 제목 ${videoNumber}`}</div>
                  </a>{" "}
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

      {/* 태그 */}
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
                <span>{DEFAULT_TAGS[key]}</span>
                <button className={styles["tag-item-delete-button"]}>×</button>
              </div>
            );
          })}
          {showTagListModal && (
            <div className={styles["tag-list-modal-container"]}>
              <div className={styles["tag-list-modal"]}>
                <div className={styles["tag-item-container"]}>
                  {Object.keys(GROUP_TAGS).map((tagGroup, index) => {
                    const isNormalTagGroup = tagGroup !== "모두보기";
                    return (
                      isNormalTagGroup && (
                        <React.Fragment key={index}>
                          <div className={styles["tag-list-comment"]}>{tagGroup}</div>
                          <div className={styles["tag-group-container"]} key={index}>
                            {Object.keys(GROUP_TAGS[tagGroup]).map(tagKey => {
                              const isExistingTag = currentTagKeys.includes(tagKey);
                              return (
                                !isExistingTag && (
                                  <div
                                    className={styles["tag-item"]}
                                    key={tagKey}
                                    onClick={() => {
                                      handleTagItemAdd(tagKey);
                                    }}
                                  >
                                    {GROUP_TAGS[tagGroup][tagKey]}
                                    <button className={styles["tag-item-delete-button"]}>+</button>
                                  </div>
                                )
                              );
                            })}
                          </div>
                        </React.Fragment>
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

      {/* 작성일 */}
      <div className={styles["block-container"]}>
        <div className={styles["block-title"]}>작성일</div>
        <DatePicker
          selected={uploadDate}
          onChange={date => date && setUploadDate(date)}
          dateFormat={"yyyy/MM/dd"}
          className={styles["date-input"]}
        />
      </div>

      {/* 관리자 비밀번호 */}
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

      {/* 제출 버튼 */}
      <div className={styles["submit-container"]}>
        <div
          className={`${styles["button"]} ${styles["submit"]}`}
          onClick={() => {
            handleUpload();
          }}
        >
          제출하기
        </div>
      </div>
    </div>
  );
}
