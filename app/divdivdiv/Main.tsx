"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./index.module.css";
import { fortune, icon, readme } from "./data";

interface PageProps {
  language: string;
}

interface ImageModalProps {
  src: string;
  alt: string;
  onClick: any;
}

// FIXME:  icon 객체로 통일하기
const iconType = {
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
  const [isReadme, setIsReadme] = useState<boolean>(false);
  const lang = language == "en" ? "ko" : "en";

  const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
    let width: number = 720;
    let height: number = 960;

    if (isMobile) {
      if (isReadme) {
        width /= 2;
        height /= 1.5;
      } else {
        width /= 2;
        height /= 2;
      }
    }

    function ReadmeComponent(props: { link: string; icon: any }) {
      const { link, icon } = props;

      return (
        <div
          className={styles["paragraph"]}
          style={{
            paddingBottom: icon === readme.techStack ? "20px" : 0,
            margin: isMobile ? "10px 30px" : "10px 70px",
          }}
        >
          <div className={styles["paragraph-title"]} onClick={() => clickIconHandler(link)}>
            {`${icon.title[lang]} ${icon.emoji}`}
          </div>
          {icon.text[lang]}
        </div>
      );
    }

    return isReadme ? (
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
            {readme.lastUpdated.text[lang]}
          </div>
          <ReadmeComponent link="https://blog.divdivdiv.com" icon={readme.blog} />
          <ReadmeComponent link="/cinephile" icon={readme.cinephile} />
          <ReadmeComponent link="/pomodoro" icon={readme.pomodoro} />
          <ReadmeComponent link="/fruits" icon={readme.fruits} />
          <ReadmeComponent link="/pride" icon={readme.pride} />
          <ReadmeComponent link="/music" icon={readme.music} />
          <ReadmeComponent link="/" icon={readme.techStack} />
        </div>
      </div>
    ) : (
      <div className={styles["modal-image"]} onClick={onClick}>
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    );
  };

  const clickIconHandler = (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      const newTab = window.open(path, "_blank");
      newTab?.focus();
    }
  };

  const handleImageClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  const handleClick = (name: string) => {
    if (name === "readme") {
      language === "en"
        ? setImgSrc("/divdivdiv/readme-en.webp")
        : setImgSrc("/divdivdiv/readme-ko.webp");
    } else {
      setImgSrc(`/divdivdiv/${name}.webp`);
    }

    setImgAlt(name);
    setShowImage(true);
  };

  const handleFortuneClick = () => {
    return language === "en"
      ? alert(fortune["en"][Math.floor(Math.random() * fortune["en"].length)])
      : alert(fortune["ko"][Math.floor(Math.random() * fortune["ko"].length)]);
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
    link: string;
    // FIXME: 함수를 받아랏!
    //onClick: () => string,
    iconType: string;
    title: TitleProps;
    width: number;
    height: number;
  }) {
    const { className, link, iconType, title, width, height } = props;

    const linkFunction = (link: string) => {
      // TODO: 이 함수 정리해보기
      if (link === "readme") {
        setIsReadme(true);
      } else {
        setIsReadme(false);
      }
      if (link === "fortune") {
        handleFortuneClick();
      } else if (link.includes("/")) {
        clickIconHandler(link);
      } else {
        handleClick(link);
      }
    };

    const handleDesktopClick = () => {
      setIsMobile(false);
      linkFunction(link);
    };

    const handleMobileClick = () => {
      setIsMobile(true);
      linkFunction(link);
    };

    const draggableContent = (
      <div
        className={`${styles["icon"]} ${styles[className]}`}
        onDoubleClick={() => {
          windowWidth > 500 ? handleDesktopClick() : undefined;
        }}
        onClick={() => {
          windowWidth > 500 ? undefined : handleMobileClick();
        }}
      >
        <div
          className={styles["icon-image"]}
          style={{
            width: width,
            height: height,
            backgroundImage: `url(/divdivdiv/${iconType}.webp)`,
            boxShadow:
              iconType !== "folder" && iconType !== "fortune" ? "1px 2px 5px gray" : undefined,
            border: iconType === "readme" ? 0 : " 4px solid white",
          }}
        ></div>
        <div
          className={styles["icon-title"]}
          style={{
            marginTop: iconType === "folder" || iconType === "fortune" ? "5px" : "10px",
          }}
        >
          <div>{language === "en" ? `${title.en}` : `${title.ko}`}</div>
        </div>
      </div>
    );

    return windowWidth < 500 ? (
      <React.Fragment>{draggableContent}</React.Fragment>
    ) : (
      <Draggable>{draggableContent}</Draggable>
    );
  }

  return (
    <div className={windowWidth < 500 ? styles["mobile-icon-container"] : ""}>
      {showImage && <ImageModal src={imgSrc} alt={imgAlt} onClick={handleImageClick} />}
      <DraggableComponent
        className="icon-blog"
        link="https://blog.divdivdiv.com"
        iconType="folder"
        title={readme.blog.title}
        width={iconType.folder.width}
        height={iconType.folder.height}
      />
      <DraggableComponent
        className="icon-cinephile"
        link="/cinephile"
        iconType="folder"
        title={readme.cinephile.title}
        width={iconType.folder.width}
        height={iconType.folder.height}
      />
      <DraggableComponent
        className="icon-pomodoro"
        link="/pomodoro"
        iconType="folder"
        title={readme.pomodoro.title}
        width={iconType.folder.width}
        height={iconType.folder.height}
      />
      <DraggableComponent
        className="icon-fruits"
        link="/fruits"
        iconType="folder"
        title={readme.fruits.title}
        width={iconType.folder.width}
        height={iconType.folder.height}
      />
      <DraggableComponent
        className="icon-pride"
        link="/pride"
        iconType="folder"
        title={readme.pride.title}
        width={iconType.folder.width}
        height={iconType.folder.height}
      />
      <DraggableComponent
        className="icon-cat"
        link="cat"
        iconType="cat"
        title={icon.cat}
        width={iconType.image.width}
        height={iconType.image.height}
      />
      <DraggableComponent
        className="icon-me"
        link="me"
        iconType="me"
        title={icon.me}
        width={iconType.image.width}
        height={iconType.image.height}
      />
      <DraggableComponent
        className="icon-fortune"
        link="fortune"
        iconType="fortune"
        title={icon.fortune}
        width={iconType.fortune.width}
        height={iconType.fortune.height}
      />
      <DraggableComponent
        className="icon-readme"
        link="readme"
        iconType="readme"
        title={icon.readme}
        width={iconType.image.width}
        height={iconType.image.height}
      />
      <DraggableComponent
        className="icon-music"
        link="/music"
        iconType="folder"
        title={readme.music.title}
        width={iconType.folder.width}
        height={iconType.folder.height}
      />
    </div>
  );
}
