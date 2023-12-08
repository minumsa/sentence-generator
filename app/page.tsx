"use client";

import styles from "./divdivdiv/divdivdiv.module.css";
import {
  imgAltAtom,
  imgSrcAtom,
  isMobileAtom,
  showImageAtom,
  languageAtom,
} from "./divdivdiv/modules/data";
import DraggableContents from "./divdivdiv/components/DraggableContents";
import { ImageModal } from "./divdivdiv/components/Modal";
import { useAtom } from "jotai";
import NoSSR from "./divdivdiv/modules/NoSSR";
import { Nav } from "./divdivdiv/components/Nav";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [showImage, setShowImage] = useAtom(showImageAtom);
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [imgAlt, setImgAlt] = useAtom(imgAltAtom);

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  const [language, setLanguage] = useAtom(languageAtom);
  const searchParams = useSearchParams();
  const currentLanguage: any = searchParams.get("language");

  useEffect(() => {
    setLanguage(currentLanguage ? currentLanguage : "ko");
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
                <DraggableContents />
              </NoSSR>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
