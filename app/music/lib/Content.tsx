import { useEffect, useMemo, useState } from "react";
import styles from "../music.module.css";
import Image from "next/image";
import { AlbumInfo, SortType, activeStyle, album, deleteData, fetchData, updateData } from "./data";

export default function Content({ pathName }: any) {
  const [data, setData] = useState<AlbumInfo[]>([]);
  const [sortingOptions, setSortingOptions] = useState<{
    type: SortType;
    order: {
      [Type in SortType]: boolean;
    };
  }>({
    type: "upload",
    order: {
      upload: false,
      release: false,
    },
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newData, setNewData] = useState();

  useEffect(() => {
    fetchData(setData, pathName);
  }, []);

  function SortToggleButton({ type }: { type: SortType }) {
    return (
      <div
        className={`${styles["button"]} ${styles["sort"]}`}
        style={sortingOptions.type === type ? { ...activeStyle } : {}}
        onClick={() => {
          setSortingOptions(prevSortingOption => ({
            type: type,
            order: {
              ...prevSortingOption.order,
              [type]:
                prevSortingOption.type === type
                  ? !prevSortingOption.order[type]
                  : prevSortingOption.order[type],
            },
          }));
        }}
      >
        {type.toUpperCase()} {sortingOptions.order[type] ? "↑" : "↓"}
      </div>
    );
  }

  const sortedData = useMemo(() => {
    const order = sortingOptions.order[sortingOptions.type];
    const type = sortingOptions.type;
    const dateSelector = (item: AlbumInfo) => {
      if (type === "upload") {
        return new Date(item.uploadDate).getTime();
      } else if (type === "release") {
        return new Date(item.releaseDate).getTime();
      }
      return 0;
    };
    const newData = [...data];
    newData.sort((a, b) =>
      order ? dateSelector(a) - dateSelector(b) : dateSelector(b) - dateSelector(a)
    );
    return newData;
  }, [data, sortingOptions]);

  const UpdateModal = () => {
    return (
      showModal && (
        <div className={styles["modal-container"]}>
          <div className={styles["modal"]}>
            <div className={styles["title"]}>｟ 수정 모달 ｠</div>
            <div>앨범 ID(Spotify)</div>
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
        </div>
      )
    );
  };

  return (
    <div>
      {pathName !== "upload" && (
        <div className={styles["sort-button-container"]}>
          <SortToggleButton type="upload" />
          <SortToggleButton type="release" />
        </div>
      )}
      {sortedData.map((data, index) => {
        const minutes = Math.floor(data.duration / 60);
        const hours = Math.floor(minutes / 60);

        return (
          <div className={styles["album-container"]} key={index}>
            <div className={styles["album-information-container"]}>
              <a className={styles["link"]} href={data.link} target="_blank">
                <Image
                  src={data.imgUrl}
                  alt={data.album}
                  width={album.width}
                  height={album.height}
                />
              </a>
              <div className={`${styles["text-container"]} ${styles["album-information"]}`}>
                <div>{data.artist}</div>
                <a className={styles["link"]} href={data.link} target="_blank">
                  <div className={styles["album-title"]}>{data.album}</div>
                </a>
                <div>
                  <span>{`${data.label}, ${data.releaseDate.slice(0, 4)}`}</span>
                </div>
                <div>
                  {`${data.tracks}곡, `}
                  {minutes > 60
                    ? `${hours}시간 ${minutes % 60 > 0 ? `${minutes % 60}분` : ""}`
                    : `${minutes}분`}
                </div>
                {pathName.includes("admin") && (
                  <div className={styles["admin-button-container"]}>
                    <div
                      className={styles["admin-button"]}
                      onClick={() => {
                        deleteData(data.id);
                        fetchData(setData, pathName);
                      }}
                    >
                      삭제
                    </div>
                    <div
                      className={styles["admin-button"]}
                      onClick={() => {
                        setShowModal(true);
                        // updateData(data.id);
                      }}
                    >
                      수정
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles["text-container"]}>
              {data.text.split("<br/>").map((text, index) => {
                return index + 1 < data.text.split("<br/>").length ? (
                  <div className={styles["line-break"]} key={index}>
                    {text}
                  </div>
                ) : (
                  <div key={index}>{text}</div>
                );
              })}
            </div>
            <div className={styles["divider"]} />
          </div>
        );
      })}
      <UpdateModal />
    </div>
  );
}
