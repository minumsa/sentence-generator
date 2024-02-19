import { usePathname, useRouter } from "next/navigation";
import { formatDuration } from "../modules/utils";
import styles from "../music.module.css";
import { AlbumInfo } from "../modules/data";
import { isMobile } from "react-device-detect";
import { useRef, useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";
import { updateData } from "../modules/api";
import Link from "next/link";
import { TopNav } from "./TopNav";

interface AlbumProps {
  data: AlbumInfo;
}

export const Album = ({ data }: AlbumProps) => {
  const albumDuration = formatDuration(data.duration);
  const divRef = useRef<HTMLDivElement>(null);
  const fullPathName = usePathname();
  const isAdminPage = fullPathName.includes("admin");

  // FIXME: 임시 코드 - 평점 매기고 나면 삭제 예정
  const [score, setScore] = useState<number>(0);
  const scoreArray: number[] = [0.5, 1, 1.5, 2, 2.5, 3.0, 3.5, 4, 4.5, 5];
  const [password, setPassword] = useState<string>("");

  const handleUpdate = async () => {
    updateData(data.id, data, score, password);
  };

  const handlePasswordEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <>
      <TopNav isEmptyGrid={true} />
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
                  <div key={index}>
                    <div className={styles["paragraph-container"]}>
                      <Link
                        href={
                          isAdminPage ? `/music/admin/post/${data.id}` : `/music/post/${data.id}`
                        }
                        style={{ textDecoration: "none" }}
                        // onClick={() => {
                        //   isAdminPage
                        //     ? router.push(`/music/admin/post/${data.id}`)
                        //     : router.push(`/music/post/${data.id}`);
                        // }}
                      >
                        <div className={styles["category-meta-title"]}>{data.album}</div>
                      </Link>
                      <div className={styles["category-meta"]}>
                        <Link
                          className={styles["category-meta-image-container"]}
                          href={
                            isAdminPage
                              ? `/music/admin/artist/${data.artistId}/1`
                              : `/music/artist/${data.artistId}/1`
                          }
                        >
                          <img
                            src={data.artistImgUrl}
                            alt="test"
                            className={styles["category-meta-image"]}
                            loading="lazy"
                            // onClick={() => {
                            //   isAdminPage
                            //     ? router.push(`/music/admin/artist/${data.artistId}/1`)
                            //     : router.push(`/music/artist/${data.artistId}/1`);
                            // }}
                          />
                        </Link>
                        <div>
                          <Link
                            style={{ textDecoration: "none", color: "#cfcfcf" }}
                            href={
                              isAdminPage
                                ? `/music/admin/artist/${data.artistId}/1`
                                : `/music/artist/${data.artistId}/1`
                            }
                            // onClick={() => {
                            //   isAdminPage
                            //     ? router.push(`/music/admin/artist/${data.artistId}/1`)
                            //     : router.push(`/music/artist/${data.artistId}/1`);
                            // }}
                          >
                            {data.artist}
                          </Link>
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
                        <Link
                          style={{ textDecoration: "none" }}
                          href={
                            isAdminPage ? `/music/admin/post/${data.id}` : `/music/post/${data.id}`
                          }
                        >
                          <div
                            className={styles["more-button"]}
                            // onClick={() => {
                            //   isAdminPage
                            //     ? router.push(`/music/admin/post/${data.id}`)
                            //     : router.push(`/music/post/${data.id}`);
                            // }}
                          >
                            더 보기
                          </div>
                        </Link>
                      )}
                    </div>
                    {/* FIXME: 평점 다 매기면 삭제 */}
                    {isAdminPage && (
                      <div>
                        <div className={styles["upload-item-title"]}>평점 {data.score}di</div>
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
                      </div>
                    )}
                    {/* 관리자 페이지일 때만 삭제, 수정 버튼 표시 */}
                    {isAdminPage && (
                      <div className={styles["admin-button-container"]}>
                        <DeleteButton data={data} />
                        <EditButton data={data} />
                      </div>
                    )}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
