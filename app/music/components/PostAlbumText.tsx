import { renderToString } from "react-dom/server";
import { AlbumInfo } from "../modules/data";
import { formatDate } from "../modules/utils";
import styles from "../music.module.css";
import { usePathname } from "next/navigation";
import { useRef } from "react";
// import DOMPurify from "isomorphic-dompurify";

interface PostAlbumTextProps {
  albumData: AlbumInfo;
}

export const PostAlbumText = ({ albumData }: PostAlbumTextProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  // const sanitizer = DOMPurify.sanitize;

  // HTML을 string 형태로 바꾸기 위한 부분
  const HTMLToString = (htmlData: any) => {
    return (
      // <div>
      //   <p className={styles["paragraph"]}>
      //     악뮤 이찬혁의 독창적이고 감각적인 음악 세계를 담은 첫 솔로 앨범. 지금 공간 음향으로
      //     만나세요.
      //   </p>
      //   <div style={{ width: "100%", marginTop: "2rem" }}>
      //     <img
      //       src="https://www.jeonmae.co.kr/news/photo/202210/917522_608251_352.jpg"
      //       alt="akmu"
      //       loading="lazy"
      //       style={{ width: "100%" }}
      //     />
      //   </div>
      // </div>
      renderToString(htmlData)
    );
  };

  return (
    <div style={{ display: "flex", width: "100%", alignItems: undefined }}>
      <div className={styles["album-metadata-container"]}>
        {/* FIXME: 안전하게 바꾸기 */}
        {albumData.text.includes("div") && (
          <div
            style={{ width: "100%" }}
            // dangerouslySetInnerHTML={{
            //   __html: sanitizer(data.text),
            // }}
          />
        )}
        {albumData.text.split("\n").map((text, index) => {
          const isLineBreak = text === "";
          const isParagraphTitle = text.length < 50;
          const isHTMLText = text.includes("<div>");
          return isLineBreak ? (
            <p key={index}></p>
          ) : isHTMLText ? undefined : (
            <p
              key={index}
              className={styles["paragraph"]}
              style={isParagraphTitle ? { fontWeight: 600, marginBottom: "10px" } : undefined}
            >
              {text}
            </p>
          );
        })}
        <div className={styles["paragraph-division-line"]}></div>
        <div className={styles["post-date"]} style={{ marginBottom: "10px" }}>
          작성일
        </div>
        <div>{formatDate(albumData.uploadDate.toString())}</div>
      </div>
    </div>
  );
};
