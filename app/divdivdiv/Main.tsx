"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./divdivdiv.module.css";
import { fortune, iconTitle, readme } from "./data";

interface PageProps {
  language: "ko" | "en";
}

interface ImageModalProps {
  src: string;
  alt: string;
  onClick: any;
}

// FIXME:  icon 객체로 통일하기
const iconSize = {
  folder: {
    width: 80,
    height: 65,
  },
  image: {
    width: 72,
    height: 96,
  },
  fortune: {
    width: 80,
    height: 83,
  },
};

export default function Main({ language }: PageProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");

  const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
    let width: number = 720;
    let height: number = 960;

    if (isMobile) {
      if (alt === "readme") {
        width /= 2;
        height /= 1.5;
      } else {
        width /= 2;
        height /= 2;
      }
    }

    //FIXME: readme 상태 변수 삭제
    // readmecomponent, imagecomponent 분리
    function ReadmeComponent(props: { path: string; icon: any }) {
      const { path, icon } = props;

      return (
        <div
          className={styles["paragraph"]}
          style={{
            paddingBottom: icon === readme.techStack ? "20px" : 0,
            margin: isMobile ? "10px 30px" : "10px 70px",
          }}
        >
          <div className={styles["paragraph-title"]} onClick={() => window.open(path, "_blank")}>
            {`${icon.title[language]} ${icon.emoji}`}
          </div>
          {icon.text[language]}
        </div>
      );
    }

    return alt === "readme" ? (
      <div className={styles["modal-container"]} onClick={onClick}>
        <div className={styles["modal"]} style={{ width: width, height: height }}>
          {/* <Image src={src} alt={alt} width={width} height={isMobile ? 0 : 50} /> */}
          <div
            className={styles["last-updated"]}
            style={{
              margin: isMobile ? "10px 0 0 0" : "0 0 30px 0",
              paddingTop: isMobile ? undefined : "10px",
            }}
          >
            {readme.lastUpdated.text[language]}
          </div>
          <ReadmeComponent path="https://blog.divdivdiv.com" icon={readme.blog} />
          <ReadmeComponent path="/cinephile" icon={readme.cinephile} />
          <ReadmeComponent path="/pomodoro" icon={readme.pomodoro} />
          <ReadmeComponent path="/fruits" icon={readme.fruits} />
          <ReadmeComponent path="/pride" icon={readme.pride} />
          <ReadmeComponent path="/music" icon={readme.music} />
          <ReadmeComponent path="/" icon={readme.techStack} />
        </div>
      </div>
    ) : (
      <div className={styles["modal-image"]} onClick={onClick}>
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    );
  };

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // TODO: 바깥으로 빼라. (파일 분리까지!)
  function DraggableComponent(props: {
    className: string;
    path: string;
    // FIXME: 함수를 받아랏!
    //onClick: () => string,
    type: string;
    title: TitleProps;
    width: number;
    height: number;
  }) {
    const { className, path, type, title, width, height } = props;

    const handleIconClick = (type: string) => {
      // TODO: 이 함수 정리해보기

      if (type === "fortune") {
        handleFortuneClick();
      } else if (type === "folder") {
        window.open(type, "_blank");
      } else {
        handleImageClick(type);
      }
    };

    const handleDesktopClick = () => {
      setIsMobile(false);
      handleIconClick(type);
    };

    const handleMobileClick = () => {
      setIsMobile(true);
      handleIconClick(type);
    };

    const draggableContent = (
      <div
        className={`${styles["icon"]} ${styles[className]}`}
        onDoubleClick={() => {
          windowWidth > 600 ? handleDesktopClick() : undefined;
        }}
        onClick={() => {
          windowWidth > 600 ? undefined : handleMobileClick();
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
            border: path === "readme" ? 0 : " 4px solid white",
          }}
        ></div>
        <div
          className={styles["icon-title"]}
          style={{
            marginTop: type === "folder" || type === "fortune" ? "5px" : "10px",
          }}
        >
          <div>{title[language]}</div>
        </div>
      </div>
    );

    return windowWidth > 600 ? (
      <Draggable>{draggableContent}</Draggable>
    ) : (
      <React.Fragment>{draggableContent}</React.Fragment>
    );
  }

  return (
    <div className={windowWidth < 600 ? styles["mobile-icon-container"] : ""}>
      {showImage && <ImageModal src={imgSrc} alt={imgAlt} onClick={handleModalClick} />}
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
        className="icon-cinephile"
        path="/cinephile"
        type="folder"
        title={iconTitle.cinephile}
        width={iconSize.folder.width}
        height={iconSize.folder.height}
      />
      <DraggableComponent
        className="icon-pomodoro"
        path="/pomodoro"
        type="folder"
        title={iconTitle.pomodoro}
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
        className="icon-pride"
        path="/pride"
        type="folder"
        title={iconTitle.pride}
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
    </div>
  );
}
