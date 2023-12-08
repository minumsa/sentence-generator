"use client";

import styles from "./divdivdiv/divdivdiv.module.css";
import {
  Language,
  initialImgAlt,
  initialImgSrc,
  initialIsMobile,
  initialLanguage,
  initialShowImage,
  languageAtom,
} from "./divdivdiv/modules/data";
import Main from "./divdivdiv/components/Main";
import { ImageModal } from "./divdivdiv/components/Modal";
import { useAtom } from "jotai";
import NoSSR from "./divdivdiv/modules/NoSSR";
import { Nav } from "./divdivdiv/components/Nav";
import { useEffect } from "react";

export default function Page() {
  const [showImage, setShowImage] = useAtom(initialShowImage);
  const [isMobile, setIsMobile] = useAtom(initialIsMobile);
  const [imgSrc, setImgSrc] = useAtom(initialImgSrc);
  const [imgAlt, setImgAlt] = useAtom(initialImgAlt);

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  const currentUrl = window.location.href;
  const currentLanguage: any = currentUrl.split("contact?language=")[1];
  const [language, setLanguage] = useAtom(languageAtom);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, []);

  return (
    <>
      {showImage && (
        <ImageModal isMobile={isMobile} src={imgSrc} alt={imgAlt} onClick={handleModalClick} />
      )}
      <div className={styles["container-background"]}>
        <div className={styles["container-fade"]} style={{ opacity: showImage ? 0.5 : undefined }}>
          <div className={styles["container"]}>
            <div className={styles["nav-container"]}>
              <Nav />
            </div>
            <div className={styles["content"]}>
              {/* FIXME: 이미지 모달 사진 크기 때문에 window.innerWidth 사용해서 NoSSR 넣음. 추후에 미디어 쿼리 등 다른 방향으로 수정할 수 있으면 하고 NoSSR 제거하기.*/}
              <NoSSR>
                <Main />
              </NoSSR>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
