"use client";

import Image from "next/image";
import { useState } from "react";
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
const folder: number[] = [80, 65];
const mobileFolder: number[] = [folder[0] * 0.9, folder[1] * 0.9];
const img: number[] = [72, 96];
const mobileImg: number[] = [img[0] * 0.9, img[1] * 0.9];

export default function Main({ language }: PageProps) {
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
      language === "A"
        ? setImgSrc("/divdivdiv/readme-en.webp")
        : setImgSrc("/divdivdiv/readme-ko.webp");
    } else {
      setImgSrc(`/divdivdiv/${name}.webp`);
    }

    setImgAlt(name);
    setShowImage(true);
  };

  const handleFortuneClick = () => {
    return language === "A"
      ? alert(fortune["EN"][Math.floor(Math.random() * fortune["EN"].length)])
      : alert(fortune["KO"][Math.floor(Math.random() * fortune["KO"].length)]);
  };

  interface TitleProps {
    EN: string;
    KO: string;
  }

  // TODO: 바깥으로 빼라. (파일 분리까지!)
  function DraggableComponent(props: {
    className: string;
    link: string;
    // FIXME: 함수를 받아랏!
    //onClick: () => string,
    icon: string;
    title: TitleProps;
    size: number[];
  }) {
    const { className, link, icon, title, size } = props;

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
        className={styles[`${className}`]}
        onDoubleClick={() => {
          !className.includes("mobile") ? handleDesktopClick() : undefined;
        }}
        onClick={() => {
          className.includes("mobile") ? handleMobileClick() : undefined;
        }}
      >
        <div
          className={styles["icon-image"]}
          style={{
            width: size[0],
            height: size[1],
            backgroundImage: `url(/divdivdiv/${icon}.webp)`,
            boxShadow: size === img || size === mobileImg ? "1px 2px 5px gray" : undefined,
            border: icon === "readme" ? 0 : " 4px solid white",
          }}
        ></div>
        <div
          className={styles["icon-title"]}
          style={{
            marginTop: icon === "folder" || icon === "fortune" ? "5px" : "10px",
          }}
        >
          <div>{language === "A" ? `${title.EN}` : `${title.KO}`}</div>
        </div>
      </div>
    );

    return className.includes("mobile") ? (
      <div>{draggableContent}</div>
    ) : (
      <Draggable>{draggableContent}</Draggable>
    );
  }

  return (
    <div>
      {showImage && <ImageModal src={imgSrc} alt={imgAlt} onClick={handleImageClick} />}
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
        link="/pride"
        icon="folder"
        title={readme.pride.title}
        size={folder}
      />
      <DraggableComponent className="icon-cat" link="cat" icon="cat" title={icon.cat} size={img} />
      <DraggableComponent className="icon-me" link="me" icon="me" title={icon.me} size={img} />
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
          link="/pride"
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
