import { useRouter } from "next/navigation";
import { formatDate, formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { deleteData } from "../modules/api";
import { Loading } from "./Loading";
import { url } from "inspector";

interface AlbumProps {
  data: AlbumInfo;
  dataIndex: number;
  perPageCount: number;
  isAdminMainPage: boolean;
  isPostPage: boolean;
}

export const Album = ({
  data,
  dataIndex,
  perPageCount,
  isAdminMainPage,
  isPostPage,
}: AlbumProps) => {
  const router = useRouter();
  const albumDuration = formatDuration(data.duration);
  const isEmptyData = data.id === "";
  const totalParagraph = data.text.split("\n").length;

  return isEmptyData ? (
    <Loading />
  ) : (
    <div className={styles["album-container"]}>
      <div className={styles["album-information-container"]}>
        <div>
          <a className={styles["link"]} href={data.link} target="_blank">
            <img
              className={styles["album-art"]}
              src={data.imgUrl}
              alt={data.album}
              loading="lazy"
            />
          </a>
        </div>
        <div className={styles["album-metadata"]}>
          <div className={styles["post-date"]} style={{ marginBottom: 0 }}>
            아티스트
          </div>
          <div>
            <span className={styles["black-masking"]}>{data.artist}</span>
          </div>
          <div className={styles["post-date"]} style={{ marginTop: "15px" }}>
            앨범
          </div>
          <div>
            <span className={styles["black-masking"]}>{data.album}</span>
          </div>
          <div className={styles["post-date"]} style={{ marginTop: "15px" }}>
            레이블
          </div>
          <div>
            <span className={styles["black-masking"]}>{data.label}</span>
          </div>
          <div className={styles["post-date"]} style={{ marginTop: "15px" }}>
            러닝타임
          </div>
          <div>
            <span className={styles["black-masking"]}>
              {albumDuration}, {data.tracks}곡
            </span>
          </div>
          {/* {`${data.artist} / ${data.label} / ${data.album} / ${data.tracks}곡 / ${albumDuration}`} */}
        </div>
        {/* <div className={`${styles["album-information"]}`}>
          <div>
            <div className={styles["information"]}>
              <div style={{ marginRight: "5px" }}>{data.artist}</div>
            </div>
            <div className={styles["information"]}>
              <a className={styles["link"]} href={data.link} target="_blank">
                <div className={styles["album-title"]}>{data.album}</div>
              </a>
            </div>
          </div>
          <div className={styles["information"]}>
            <span>{`${data.releaseDate.slice(0, 4)}년 ${Number(data.releaseDate.slice(5, 7))}월, ${
              data.label
            }`}</span>
          </div>
          <div className={styles["information"]}>{`${data.tracks}곡, ${albumDuration}`}</div>
          {isAdminMainPage && (
            <div className={styles["admin-button-container"]}>
              <div
                className={styles["admin-button"]}
                onClick={async () => {
                  deleteData(data.id);
                }}
              >
                삭제
              </div>
              <div
                className={styles["admin-button"]}
                onClick={() => {
                  router.push(`/music/admin/${data.id}`);
                }}
              >
                수정
              </div>
            </div>
          )}
        </div> */}
      </div>
      <div className={styles["text-container"]}>
        {/* {isPostPage && (
          <div>
            <div className={styles["post-date"]}>앨범</div>
            <div>{data.album}</div>
            <div className={styles["paragraph-division-line"]}></div>
            <div className={styles["post-date"]}>레이블</div>
            <div>{`${data.artist}, ${data.label}`}</div>
            <div className={styles["paragraph-division-line"]}></div>
          </div>
        )} */}
        {/* FIXME: 텍스트의 특정 단어를 클릭하면 링크로 연결되는 기능 만들기 */}
        {data.text.split("\n").map((text, index) => {
          const hasNoText = text.length < 1;
          const longTextStandard = 100;
          const isLongText = text.length > longTextStandard;
          const isFirstParagraph = index === 0;
          const isLastParagraph = index + 1 === totalParagraph;
          const isBlankText = text === "";
          const isParagraphTitle = text.length < 40;

          // 우선 첫 번째 문단만 표시되게 조건 걸어놓음
          if (isPostPage) {
            return isBlankText ? (
              <p></p>
            ) : (
              <p
                className={styles["paragraph"]}
                style={isParagraphTitle ? { fontWeight: 600, marginBottom: "10px" } : undefined}
              >
                {text}
              </p>
            );
          } else {
            if (isFirstParagraph)
              return (
                <div className={styles["paragraph-container"]} key={index}>
                  <p
                    className={`${styles["paragraph"]} 
                    ${isLongText ? styles["blur-end"] : undefined} 
                    ${hasNoText ? styles["paragraph-blank"] : undefined}`}
                  >
                    {text}
                  </p>
                  {isLongText && (
                    <span
                      className={styles["more-button"]}
                      onClick={() => {
                        router.push(`/music/${data.id}`);
                      }}
                    >
                      더 보기
                    </span>
                  )}
                </div>
              );
          }
        })}
        <div className={styles["paragraph-division-line"]}></div>
        <div className={styles["post-date"]} style={{ marginBottom: "10px" }}>
          작성일
        </div>
        <div>{formatDate(data.uploadDate)}</div>
      </div>
    </div>
  );
};
