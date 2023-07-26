"use client";

import Image from "next/image";
import { useState } from "react";
import Draggable from "react-draggable";
import styles from "./index.module.css";
import { fortuneArr, fortuneEngArr, readme } from "./data";

interface PageProps {
  language: string;
}

interface ImageModalProps {
  src: string;
  alt: string;
  onClick: any;
}

export default function Main({ language }: PageProps) {
  const folderWidth: number = 80;
  const folderHeight: number = 65;
  const mobileFolderWidth: number = folderWidth * 0.9;
  const mobileFolderHeight: number = folderHeight * 0.9;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const imgFileWidth: number = 72;
  const imgFileHeight: number = 96;
  const MobileImgFileWidth: number = imgFileWidth * 0.9;
  const MobileImgFileHeight: number = imgFileHeight * 0.9;

  const [isMemo, setIsMemo] = useState<boolean>(false);
  const lang = language == "A" ? "EN" : "KO";

  const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
    let width: number = 720;
    let height: number = 961;

    if (isMobile) {
      width /= 2;
      height /= 2;
    }

    return isMemo ? (
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

  const handleDoubleClick = (index: number) => {
    if (index === 6) {
      setImgSrc("/divdivdiv/cat.webp");
      setImgAlt("Cat");
    } else if (index === 7) {
      setImgSrc("/divdivdiv/me.webp");
      setImgAlt("Me");
    } else if (index === 8) {
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
  }) {
    const { className, link, icon, title } = props;

    return (
      <Draggable>
        <div
          className={styles[`${className}`]}
          onDoubleClick={() => clickIconHandler(link)}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/${icon}.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["icon-title"]}>
            {/* <div>{language === "A" ? "Project 1" : "프로젝트 1"}</div> */}
            <div>{language === "A" ? `${title.EN}` : `${title.KO}`}</div>
          </div>
        </div>
      </Draggable>
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
      />
      <DraggableComponent
        className="icon-cinephile"
        link="/cinephile"
        icon="folder"
        title={readme.cinephile.title}
      />
      <DraggableComponent
        className="icon-pomodoro"
        link="/pomodoro"
        icon="folder"
        title={readme.pomodoro.title}
      />
      <DraggableComponent
        className="icon-fruits"
        link="/fruits"
        icon="folder"
        title={readme.fruits.title}
      />
      <DraggableComponent
        className="icon-pride"
        link="/pride-2023"
        icon="folder"
        title={readme.pride.title}
      />
      <DraggableComponent
        className="icon-pride"
        link="/pride-2023"
        icon="folder"
        title={readme.pride.title}
      />
      {/* TODO: 이미지 모달 DraggableComponent 구현 */}
      <Draggable>
        <div
          className={styles["icon-cat"]}
          onDoubleClick={() => {
            setIsMemo(false);
            handleDoubleClick(6);
          }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/cat.webp)`,
              width: imgFileWidth,
              height: imgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
          ></div>
          <div className={styles["icon-title"]}>
            {language === "A" ? "cat.webp" : "고양이.webp"}
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["icon-me"]}
          onDoubleClick={() => {
            setIsMemo(false);
            handleDoubleClick(7);
          }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/me.webp)`,
              width: imgFileWidth,
              height: imgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
          ></div>
          <div className={styles["icon-title"]}>
            {language === "A" ? "me.webp" : "나.webp"}
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["icon-fortune"]}
          onDoubleClick={() => handleFortuneClick()}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/fortune.webp)`,
              width: 80,
              height: 83,
            }}
          ></div>
          <div className={styles["icon-title"]}>
            <div> {language === "A" ? "fortune.exe" : "포춘쿠키.exe"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["icon-readme"]}
          onDoubleClick={() => {
            setIsMemo(true);
            handleDoubleClick(8);
          }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: "url(/divdivdiv/readme-icon.webp)",
              width: imgFileWidth,
              height: imgFileHeight,
              boxShadow: "1px 2px 5px gray",
              border: 0,
            }}
          ></div>
          <div className={styles["icon-title"]} style={{ marginTop: "13px" }}>
            <div> {language === "A" ? "README.txt" : "프로젝트 설명.txt"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className={styles["icon-music"]}
          onDoubleClick={() => clickIconHandler("/music")}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: folderWidth,
              height: folderHeight,
            }}
          ></div>
          <div className={styles["icon-title"]}>
            <div>{language === "A" ? "Project 0" : "프로젝트 0"}</div>
            <div>{language === "A" ? "(Carver Chart)" : "(카버 차트)"}</div>
          </div>
        </div>
      </Draggable>
      <div className={styles["mobile-icon-container"]}>
        <div
          className={styles["mobile-icon"]}
          onClick={() => clickIconHandler("https://blog.divdivdiv.com")}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            <div>{language === "A" ? "Project 1" : "프로젝트 1"}</div>
            <div>{language === "A" ? "(Blog)" : "(블로그)"}</div>
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          onClick={() => clickIconHandler("/cinephile")}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            <div>{language === "A" ? "Project 2" : "프로젝트 2"}</div>
            <div>
              {language === "A" ? "(Cinephile Test)" : "(시네필 테스트)"}
            </div>
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          onClick={() => clickIconHandler("/pomodoro")}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            <div>{language === "A" ? "Project 3" : "프로젝트 3"}</div>
            <div>{language === "A" ? "(Pomodoro)" : "(뽀모도로)"}</div>
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          onClick={() => clickIconHandler("/fruits")}
          style={{ marginLeft: "20px" }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            <div>{language === "A" ? "Project 4" : "프로젝트 4"}</div>
            <div>{language === "A" ? "(Fruits)" : "(과일 생성기)"}</div>
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          onClick={() => clickIconHandler("/pride-2023")}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            <div>{language === "A" ? "Project 5" : "프로젝트 5"}</div>
            <div>{language === "A" ? "(Sentences)" : "(문장 생성기)"}</div>
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          onClick={() => clickIconHandler("/music")}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/folder.webp)`,
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            <div>{language === "A" ? "Project 0" : "프로젝트 0"}</div>
            <div>{language === "A" ? "(Carver Chart)" : "(카버 차트)"}</div>
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          onClick={() => {
            setIsMobile(true);
            setIsMemo(true);
            handleDoubleClick(8);
          }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: "url(/divdivdiv/readme-icon.webp)",
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              boxShadow: "1px 2px 5px gray",
              border: 0,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            <div> {language === "A" ? "README.txt" : "프로젝트 설명.txt"}</div>
          </div>
        </div>

        <div
          className={styles["mobile-icon"]}
          onClick={() => {
            setIsMemo(false);
            setIsMobile(true);
            handleDoubleClick(7);
          }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/me.webp)`,
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            {language === "A" ? "me.webp" : "나.webp"}
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          onClick={() => {
            setIsMobile(true);
            setIsMemo(false);
            handleDoubleClick(6);
          }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/cat.webp)`,
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            {language === "A" ? "cat.webp" : "고양이.webp"}
          </div>
        </div>
        <div
          className={styles["mobile-icon"]}
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setIsMobile(true);
            handleFortuneClick();
          }}
        >
          <div
            className={styles["icon-image"]}
            style={{
              backgroundImage: `url(/divdivdiv/fortune.webp)`,
              width: 80 * 0.9,
              height: 83 * 0.9,
              marginTop: "10px",
              border: undefined,
              boxShadow: undefined,
            }}
          ></div>
          <div className={styles["mobile-icon-title"]}>
            {language === "A" ? "fortune.exe" : "포춘쿠키.exe"}
          </div>
        </div>
      </div>
    </div>
  );
}
