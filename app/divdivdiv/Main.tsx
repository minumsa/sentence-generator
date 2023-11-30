"use client";

import React, { memo, useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./divdivdiv.module.css";
import {
  Language,
  LanguageContext,
  fortune,
  iconSize,
  iconTitle,
  initialImgAlt,
  initialImgSrc,
  initialIsMobile,
  initialShowImage,
} from "./data";
import { useAtom } from "jotai";
import { PostIt } from "./components/PostIt";

export default function Main() {
  const language = useContext<Language>(LanguageContext);
  // FIXME: 포스트잇 닫을 때 아이콘 초기화되는 문제 해결
  const [showImage, setShowImage] = useAtom(initialShowImage);
  const [imgSrc, setImgSrc] = useAtom<string>(initialImgSrc);
  const [imgAlt, setImgAlt] = useAtom<string>(initialImgAlt);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  // FIXME: 가능하면 isMobile 없애기
  const [isMobile, setIsMobile] = useAtom(initialIsMobile);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(windowWidth < 620);

    if (typeof window === "undefined") {
      return;
    }
  }, [windowWidth]);

  return (
    // TODO: 코드 정리하고 관련 개념 기록해두기
    // 문제 해결 경험 중심으로 블로그에 작성하기 (모든 걸 다 x)
    <>
      <MemoizedIcons
        setImgSrc={setImgSrc}
        setImgAlt={setImgAlt}
        setShowImage={setShowImage}
        language={language}
        isMobile={isMobile}
      />
    </>
  );
}

interface IconsProps {
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
  setImgAlt: React.Dispatch<React.SetStateAction<string>>;
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>;
  language: Language;
  isMobile: boolean;
}

function Icons({ setImgSrc, setImgAlt, setShowImage, language, isMobile }: IconsProps) {
  const handleImageClick = (path: string) => {
    if (path === "readme") {
      setImgSrc(`/divdivdiv/readme-${language}.webp`);
    } else {
      setImgSrc(`/divdivdiv/${path}.webp`);
    }
    setImgAlt(path);
    setShowImage(true);
  };

  const handleFortuneClick = () => {
    alert(fortune[language][Math.floor(Math.random() * fortune[language].length)]);
  };

  interface TitleProps {
    en: string;
    ko: string;
  }

  // TODO: 별개 컴포넌트 파일로 빼기
  // TODO: 인터페이스, 타입 리팩토링
  function DraggableComponent(props: {
    className: string;
    path: string;
    type: string;
    title: TitleProps | null;
    width: number;
    height: number;
  }) {
    const { className, path, type, title, width, height } = props;

    const handleIconClick = (type: string) => {
      if (type === "fortune") {
        handleFortuneClick();
      } else if (type === "folder") {
        window.open(path, "_blank");
      } else if (type === "image") {
        handleImageClick(path);
      }
    };

    const draggableContent = (
      <div
        className={`${styles["icon"]} ${styles[className]}`}
        onDoubleClick={() => {
          isMobile ? undefined : handleIconClick(type);
        }}
        onClick={() => {
          isMobile ? handleIconClick(type) : undefined;
        }}
      >
        <div
          className={styles["icon-image"]}
          style={{
            width: width,
            height: height,
            backgroundImage:
              type === "image" ? `url(/divdivdiv/${path}.webp)` : `url(/divdivdiv/${type}.webp)`,
            boxShadow: type === "image" ? "1px 2px 5px gray" : undefined,
            border: type === "image" && path !== "readme" ? "4px solid white" : 0,
          }}
        ></div>
        {title && (
          <div
            className={styles["icon-title"]}
            style={{
              marginTop: type === "folder" || type === "fortune" ? "5px" : "10px",
            }}
          >
            <div>{title[language]}</div>
          </div>
        )}
      </div>
    );

    return isMobile ? (
      <React.Fragment>{draggableContent}</React.Fragment>
    ) : (
      <Draggable>{draggableContent}</Draggable>
    );
  }

  return (
    <div className={isMobile ? styles["mobile-icon-container"] : styles["icons-container"]}>
      <DraggableComponent
        className="icon-blog"
        path="https://blog.divdivdiv.com"
        type="folder"
        title={iconTitle.blog}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableComponent
        className="icon-music"
        path="/music"
        type="folder"
        title={iconTitle.music}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableComponent
        className="icon-barbershop"
        path="https://barbershop.divdivdiv.com"
        type="folder"
        title={iconTitle.barbershop}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableComponent
        className="icon-cinephile"
        path="/cinephile"
        type="folder"
        title={iconTitle.cinephile}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableComponent
        className="icon-fruits"
        path="/fruits"
        type="folder"
        title={iconTitle.fruits}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableComponent
        className="icon-words"
        path="/words"
        type="folder"
        title={iconTitle.words}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableComponent
        className="icon-cat"
        path="cat"
        type="image"
        title={iconTitle.cat}
        width={iconSize.image.width}
        height={iconSize.image.height}
      />
      <DraggableComponent
        className="icon-me"
        path="me"
        type="image"
        title={iconTitle.me}
        width={iconSize.image.width}
        height={iconSize.image.height}
      />
      <DraggableComponent
        className="icon-fortune"
        path="fortune"
        type="fortune"
        title={iconTitle.fortune}
        width={iconSize.fortune.width}
        height={iconSize.fortune.height}
      />
      <DraggableComponent
        className="icon-readme"
        path="readme"
        type="image"
        title={iconTitle.readme}
        width={iconSize.image.width}
        height={iconSize.image.height}
      />
      {/* FIXME: 컴포넌트화 */}
      {/* <Draggable>
        <PostIt language={language} />
      </Draggable> */}
    </div>
  );
}

// useMemo와 memo의 차이점
// useMemo는 훅. 컴포넌트 내에서 useMemo를 해서 특정 값을 저장해두었다가 반복되면 다시 계산하지 않는다.
// memo는 훅이 아님. memo는 컴포넌트를 컴포넌트로 바꿔준다(감싸준다). props의 값이 바뀌지 않으면 렌더링을 발생시키지 않는다.
const MemoizedIcons = memo(Icons);
