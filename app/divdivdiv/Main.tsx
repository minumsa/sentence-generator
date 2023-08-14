"use client";

import React, { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./divdivdiv.module.css";
import { LanguageContext, fortune, iconTitle, readme } from "./data";
import { ImageModal } from "./Modal";

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

export default function Main() {
  const language = useContext(LanguageContext);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isMobile: boolean = windowWidth < 630;

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

  function DraggableComponent(props: {
    className: string;
    path: string;
    type: string;
    title: TitleProps;
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

    return isMobile ? (
      <React.Fragment>{draggableContent}</React.Fragment>
    ) : (
      <Draggable>{draggableContent}</Draggable>
    );
  }

  return (
    <div className={isMobile ? styles["mobile-icon-container"] : ""}>
      {showImage && (
        <ImageModal isMobile={isMobile} src={imgSrc} alt={imgAlt} onClick={handleModalClick} />
      )}
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
