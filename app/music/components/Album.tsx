import { useRouter } from "next/navigation";
import { formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { deleteData } from "../modules/api";
import { isMobile } from "react-device-detect";
import { useRef } from "react";

interface AlbumProps {
  data: AlbumInfo;
  isAdminPage: boolean;
}

export const Album = ({ data, isAdminPage }: AlbumProps) => {
  const router = useRouter();
  const albumDuration = formatDuration(data.duration);
  const divRef = useRef<HTMLDivElement>(null);

  return (
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
      </div>
      <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <div className={styles["album-metadata-container"]}>
          {/* FIXME: 안전하게 바꾸기 */}
          {data.text.split("\n").map((text, index) => {
            const longTextStandard = isMobile ? 100 : 180;
            const isFirstParagraph = index === 0;
            const isFirstParagraphInHTML = text.match(
              /<p class="music_paragraph__z0WKJ">(.*?)<\/p>/
            );
            const isLongText = isFirstParagraphInHTML
              ? isFirstParagraphInHTML[1].length > longTextStandard
              : data.text.length > longTextStandard;

            // 카테고리 페이지일 때 표시할 앨범 메타데이터
            // 전체 텍스트 첫 번째 문단의 3줄까지만 미리보기로 표시
            if (isFirstParagraphInHTML ? isFirstParagraphInHTML[1] : isFirstParagraph)
              return (
                <>
                  <div className={styles["paragraph-container"]} key={index}>
                    <div
                      className={styles["category-meta-title"]}
                      onClick={() => {
                        isAdminPage
                          ? router.push(`/music/admin/post/${data.id}`)
                          : router.push(`/music/post/${data.id}`);
                      }}
                    >
                      {data.album}
                    </div>
                    <div className={styles["category-meta"]}>
                      <div className={styles["category-meta-image-container"]}>
                        <img
                          src={data.artistImgUrl}
                          alt="test"
                          className={styles["category-meta-image"]}
                          loading="lazy"
                          onClick={() => {
                            isAdminPage
                              ? router.push(`/music/admin/artist/${data.artistId}/1`)
                              : router.push(`/music/artist/${data.artistId}/1`);
                          }}
                        />
                      </div>
                      <div>
                        <span
                          onClick={() => {
                            isAdminPage
                              ? router.push(`/music/admin/artist/${data.artistId}/1`)
                              : router.push(`/music/artist/${data.artistId}/1`);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {data.artist}
                        </span>
                        <span>
                          {` • ${data.releaseDate.slice(0, 4)} • ${
                            data.tracks
                          }곡, ${albumDuration}`}
                        </span>
                      </div>
                    </div>
                    <p
                      ref={divRef}
                      className={`${styles["paragraph"]} ${styles["paragraph-category"]} ${
                        isLongText ? styles["blur-end"] : undefined
                      }`}
                    >
                      {isFirstParagraphInHTML ? isFirstParagraphInHTML[1] : text}
                    </p>
                    {isLongText && (
                      <span
                        className={styles["more-button"]}
                        onClick={() => {
                          isAdminPage
                            ? router.push(`/music/admin/post/${data.id}`)
                            : router.push(`/music/post/${data.id}`);
                        }}
                      >
                        더 보기
                      </span>
                    )}
                  </div>
                  {/* 관리자 페이지일 때만 삭제, 수정 버튼 표시 */}
                  {isAdminPage && (
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
                          router.push(`/music/admin/upload/${data.id}`);
                        }}
                      >
                        수정
                      </div>
                    </div>
                  )}
                </>
              );
          })}
        </div>
      </div>
    </div>
  );
};
