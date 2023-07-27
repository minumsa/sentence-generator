"use client";

import Image from "next/image";
import { useState } from "react";
import Draggable from "react-draggable";
import styles from "./index.module.css";
import { fortuneArr, fortuneEngArr, icon, readme } from "./data";

interface PageProps {
  language: string;
}

interface ImageModalProps {
  src: string;
  alt: string;
  onClick: any;
}

export default function Main({ language }: PageProps) {
  const folder: number[] = [80, 65];
  const mobileFolder: number[] = [folder[0] * 0.9, folder[1] * 0.9];
  const img: number[] = [72, 96];
  const mobileImg: number[] = [img[0] * 0.9, img[1] * 0.9];
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const [isReadme, setIsReadme] = useState<boolean>(false);
  const lang = language == "A" ? "EN" : "KO";

  const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
    let width: number = 720;
    let height: number = 960;

    if (isMobile) {
      width /= 2;
      height /= 2;
    }

    return isReadme ? (
      <div
        className={styles["modal-container"]}
        style={{
          boxShadow:
            imgSrc === "/divdivdiv/readme-nav-ko.webp" ||
            imgSrc === "/divdivdiv/readme-nav-en.webp"
              ? "1px 2px 5px gray"
              : undefined,
        }}
        onClick={onClick}
      >
        <div className={styles["modal"]}>
          <Image
            src={src}
            alt={alt}
            width={isMobile ? 0 : 620}
            height={isMobile ? 0 : 50}
          />
          <div
            style={{
              height: isMobile
                ? language === "A"
                  ? "760px"
                  : "660px"
                : language === "A"
                ? "980px"
                : "850px",
              width: isMobile ? "370px" : "620px",
            }}
          >
            <div
              className={styles["last-updated"]}
              style={{
                marginTop: isMobile ? "10px" : 0,
                fontWeight: isMobile ? 600 : 400,
              }}
            >
              {readme.lastUpdated.text[lang]}
            </div>
            <div className={styles["paragraph"]}>
              <div
                className={styles["paragraph-title"]}
                onClick={() => clickIconHandler("https://blog.divdivdiv.com")}
              >
                {`${readme.blog.title[lang]} ${readme.blog.emoji}`}
              </div>
              {readme.blog.text[lang]}
            </div>
            <div className={styles["paragraph"]}>
              <div
                className={styles["paragraph-title"]}
                onClick={() => clickIconHandler("/cinephile")}
              >
                {`${readme.cinephile.title[lang]} ${readme.cinephile.emoji}`}
              </div>
              {readme.cinephile.text[lang]}
            </div>
            <div className={styles["paragraph"]}>
              <div
                className={styles["paragraph-title"]}
                onClick={() => clickIconHandler("/pomodoro")}
              >
                {`${readme.pomodoro.title[lang]} ${readme.pomodoro.emoji}`}
              </div>
              {readme.pomodoro.text[lang]}
            </div>
            <div className={styles["paragraph"]}>
              <div
                className={styles["paragraph-title"]}
                onClick={() => clickIconHandler("/fruits")}
              >
                {`${readme.fruits.title[lang]} ${readme.fruits.emoji}`}
              </div>
              {readme.fruits.text[lang]}
            </div>
            <div className={styles["paragraph"]}>
              <div
                className={styles["paragraph-title"]}
                onClick={() => clickIconHandler("/pride-2023")}
              >
                {`${readme.pride.title[lang]} ${readme.pride.emoji}`}
              </div>
              {readme.pride.text[lang]}
            </div>
            <div className={styles["paragraph"]}>
              <div
                className={styles["paragraph-title"]}
                onClick={() => clickIconHandler("/pride-2023")}
              >
                {`${readme.music.title[lang]} ${readme.music.emoji}`}
              </div>
              {readme.music.text[lang]}
            </div>
            <div className={styles["paragraph"]}>
              <div
                className={styles["paragraph-title"]}
                style={{ cursor: "help" }}
              >
                {`${readme.techStack.text[lang]} ${readme.techStack.emoji}`}
              </div>
              TypeScript, CSS, Next.js, React
            </div>
          </div>
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
    if (name === "cat") {
      setImgSrc("/divdivdiv/cat.webp");
      setImgAlt("Cat");
    } else if (name === "me") {
      setImgSrc("/divdivdiv/me.webp");
      setImgAlt("Me");
    } else if (name === "readme") {
      language === "A"
        ? setImgSrc("/divdivdiv/readme-nav-en.webp")
        : setImgSrc("/divdivdiv/readme-nav-ko.webp");
      setImgAlt("README.txt");
    }
    setShowImage(true);
  };

  const handleFortuneClick = () => {
    return language === "A"
      ? alert(fortuneEngArr[Math.floor(Math.random() * fortuneArr.length)])
      : alert(fortuneArr[Math.floor(Math.random() * fortuneArr.length)]);
  };

  interface TitleProps {
    EN: string;
    KO: string;
  }

  function DraggableComponent(props: {
    className: string;
    link: string;
    icon: string;
    title: TitleProps;
    size: number[];
  }) {
    const { className, link, icon, title, size } = props;
    const linkFunction = (link: string) => {
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
    const DraggableContent = (
      <div
        className={styles[`${className}`]}
        onDoubleClick={() => {
          if (!className.includes("mobile")) {
            setIsMobile(false);
            linkFunction(link);
          }
        }}
        onClick={() => {
          if (className.includes("mobile")) {
            setIsMobile(true);
            linkFunction(link);
          }
        }}
      >
        <div
          className={styles["icon-image"]}
          style={{
            width: size[0],
            height: size[1],
            backgroundImage: `url(/divdivdiv/${icon}.webp)`,
            boxShadow:
              size === img || size === mobileImg
                ? "1px 2px 5px gray"
                : undefined,
            border: icon === "readme" ? 0 : " 4px solid white",
          }}
        ></div>
        <div className={styles["icon-title"]}>
          <div>{language === "A" ? `${title.EN}` : `${title.KO}`}</div>
        </div>
      </div>
    );

    return className.includes("mobile") ? (
      <div>{DraggableContent}</div>
    ) : (
      <Draggable>{DraggableContent}</Draggable>
    );
  }

  return (
    <div>
      {showImage && (
        <ImageModal src={imgSrc} alt={imgAlt} onClick={handleImageClick} />
      )}
      <DraggableComponent
        className="icon-blog"
        link="https://blog.divdivdiv.com"
        icon="folder"
        title={readme.blog.title}
        size={folder}
      />
      <DraggableComponent
        className="icon-cinephile"
        link="/cinephile"
        icon="folder"
        title={readme.cinephile.title}
        size={folder}
      />
      <DraggableComponent
        className="icon-pomodoro"
        link="/pomodoro"
        icon="folder"
        title={readme.pomodoro.title}
        size={folder}
      />
      <DraggableComponent
        className="icon-fruits"
        link="/fruits"
        icon="folder"
        title={readme.fruits.title}
        size={folder}
      />
      <DraggableComponent
        className="icon-pride"
        link="/pride-2023"
        icon="folder"
        title={readme.pride.title}
        size={folder}
      />
      <DraggableComponent
        className="icon-pride"
        link="/pride-2023"
        icon="folder"
        title={readme.pride.title}
        size={folder}
      />
      <DraggableComponent
        className="icon-cat"
        link="cat"
        icon="cat"
        title={icon.cat}
        size={img}
      />
      <DraggableComponent
        className="icon-me"
        link="me"
        icon="me"
        title={icon.me}
        size={img}
      />
      <DraggableComponent
        className="icon-fortune"
        link="fortune"
        icon="fortune"
        title={icon.fortune}
        size={[80, 83]}
      />
      <DraggableComponent
        className="icon-readme"
        link="readme"
        icon="readme"
        title={icon.readme}
        size={img}
      />
      <DraggableComponent
        className="icon-music"
        link="/music"
        icon="folder"
        title={readme.music.title}
        size={folder}
      />

      <div className={styles["mobile-icon-container"]}>
        <DraggableComponent
          className="mobile-icon"
          link="https://blog.divdivdiv.com"
          icon="folder"
          title={readme.blog.title}
          size={mobileFolder}
        />
        <DraggableComponent
          className="mobile-icon"
          link="/cinephile"
          icon="folder"
          title={readme.cinephile.title}
          size={mobileFolder}
        />
        <DraggableComponent
          className="mobile-icon"
          link="/pomodoro"
          icon="folder"
          title={readme.pomodoro.title}
          size={mobileFolder}
        />
        <DraggableComponent
          className="mobile-icon"
          link="/fruits"
          icon="folder"
          title={readme.fruits.title}
          size={mobileFolder}
        />
        <DraggableComponent
          className="mobile-icon"
          link="/pride-2023"
          icon="folder"
          title={readme.pride.title}
          size={mobileFolder}
        />
        <DraggableComponent
          className="mobile-icon"
          link="/music"
          icon="folder"
          title={readme.music.title}
          size={mobileFolder}
        />
        <DraggableComponent
          className="mobile-icon"
          link="readme"
          icon="readme"
          title={icon.readme}
          size={mobileImg}
        />
        <DraggableComponent
          className="mobile-icon"
          link="me"
          icon="me"
          title={icon.me}
          size={mobileImg}
        />
        <DraggableComponent
          className="mobile-icon"
          link="cat"
          icon="cat"
          title={icon.cat}
          size={mobileImg}
        />
        <DraggableComponent
          className="mobile-icon"
          link="fortune"
          icon="fortune"
          title={icon.fortune}
          size={[80 * 0.9, 83 * 0.9]}
        />
      </div>
    </div>
  );
}
