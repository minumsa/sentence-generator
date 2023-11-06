import { useRouter } from "next/navigation";
import { formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { deleteData } from "../modules/api";

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
  const isFirstDataPerPage = dataIndex % perPageCount === 1;

  console.log(isPostPage);

  return (
    <div
      className={styles["album-container"]}
      style={isFirstDataPerPage ? { paddingTop: "20px" } : undefined}
    >
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
        <div className={` ${styles["album-information"]}`}>
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
        </div>
      </div>
      <div className={styles["text-container"]}>
        {/* FIXME: 텍스트의 특정 단어를 클릭하면 링크로 연결되는 기능 만들기 */}
        {data.text.split("\n").map((text, index) => {
          const hasNoText = text.length < 1;
          const longTextStandard = 300;
          const isLongText = text.length > longTextStandard;

          // 우선 첫 번째 문단만 표시되게 조건 걸어놓음
          if (isPostPage) {
            return (
              <p key={index} className={styles["paragraph"]}>
                {text}
              </p>
            );
          } else {
            if (index === 0)
              return (
                <div className={styles["paragraph-container"]}>
                  <p
                    key={index}
                    className={`${styles["paragraph"]} ${
                      isLongText ? styles["blur-end"] : undefined
                    } ${hasNoText ? styles["paragraph-blank"] : undefined}`}
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
      </div>
    </div>
  );
};
