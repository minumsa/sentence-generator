"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import Clock from "./Clock";

const Index: React.FC = () => {
  const [folderWidth, setFolderWidth] = useState<number>(80);
  const [folderHeight, setFolderHeight] = useState<number>(65);
  const [imgFileWidth, setImgFileWidth] = useState<number>(72);
  const [imgFileHeight, setImgFileHeight] = useState<number>(96);
  const [language, setLanguage] = useState<string>("A");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const projects = useMemo(
    () => [
      {
        path: "https://blog.divdivdiv.com",
        projectName: language === "A" ? "Project 1" : "프로젝트 1",
        projectDescription: language === "A" ? "Blog" : "블로그",
      },
      {
        path: "/cinephile-test",
        projectName: language === "A" ? "Project 2" : "프로젝트 2",
        projectDescription:
          language === "A" ? "Cinephile Test" : "시네필 테스트",
      },
      {
        path: "/sheep-pomodoro",
        projectName: language === "A" ? "Project 3" : "프로젝트 3",
        projectDescription: language === "A" ? "Pomodoro" : "뽀모도로",
      },
      {
        path: "/fruits",
        projectName: language === "A" ? "Project 4" : "프로젝트 4",
        projectDescription: language === "A" ? "Fruits" : "과일 생성기",
      },
      {
        path: "/possible-universe",
        projectName: language === "A" ? "Project 5" : "프로젝트 5",
        projectDescription:
          language === "A" ? "Possible Universe" : "문장 생성기",
      },
    ],
    [language]
  );

  const clickIconHandler = (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      const newTab = window.open(path, "_blank"); // 새 탭에서 열기
      newTab?.focus(); // 새 탭으로 포커스 이동
    }
  };

  const IconContainer: React.FC<{
    path: string;
    projectName: string;
    projectDescription: string;
    className: string;
  }> = ({ path, projectName, projectDescription, className }) => (
    <Draggable>
      <div className={className} onDoubleClick={() => clickIconHandler(path)}>
        <div
          className="index-icon-image"
          style={{
            color: "white",
            cursor: "move",
            backgroundImage: `url(folder.png)`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            width: folderWidth,
            height: folderHeight,
          }}
        ></div>
        <div className="index-icon-text">
          <div>{projectName}</div>
          <div>({projectDescription})</div>
        </div>
      </div>
    </Draggable>
  );

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentDate.getDate();
  const [dayOfWeek, dayOfEngWeek] = getDayOfWeek(currentDate);

  function getDayOfWeek(date: Date): [string, string] {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const daysOfEngWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayIndex = date.getDay();
    return [daysOfWeek[dayIndex], daysOfEngWeek[dayIndex]];
  }

  const [showImage, setShowImage] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleDoubleClick = (index: number) => {
    if (index === 6) {
      setImgSrc("/cat.webp");
      setImgAlt("Cat");
    } else if (index === 7) {
      setImgSrc("/me.webp");
      setImgAlt("Me");
    }
    setShowImage(true);
  };

  const handleImageClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  interface ImageModalProps {
    src: string;
    alt: string;
    onClick: any;
  }

  const ImageModal = ({ src, alt, onClick }: ImageModalProps) => {
    let width = 720;
    let height = 961;

    if (isMobile) {
      width /= 2;
      height /= 2;
    }

    return (
      <div
        className="image-modal"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onClick}
      >
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
    );
  };

  const [checkerWidth, setCheckerWidth] = useState<number>(4);

  return (
    <div
      className="index-container-container"
      style={{
        backgroundColor: isDarkMode ? "#ffffff" : "#000000",
        backgroundSize: isDarkMode
          ? `${checkerWidth * 2}px ${checkerWidth * 2}px`
          : "0",
        backgroundPosition: isDarkMode
          ? `0 0, 0 ${checkerWidth}px, ${checkerWidth}px -${checkerWidth}px, -${checkerWidth}px 0px`
          : "0",
      }}
    >
      <div
        className="index-container"
        style={
          isDarkMode
            ? { backgroundColor: "rgb(30, 30, 30)", color: "#ffffff" }
            : { backgroundColor: "#ffffff", color: "rgb(30, 30, 30)" }
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "98%",
              height: "35px",
              borderBottom: isDarkMode
                ? "0.5px solid #ffffff"
                : "0.5px solid #000000",
            }}
          >
            <div className="menu-text" style={{ marginLeft: "10px" }}>
              divdivdiv
            </div>
            <div className="menu-text">
              {language === "A" ? "About" : "소개"}
            </div>
            <div className="menu-text">
              {language === "A" ? "Contact" : "연결"}
            </div>
            <div className="index-menu-grow" style={{ flexGrow: "1" }}></div>
            <div
              className="dark-mode-icon"
              style={
                isDarkMode
                  ? {
                      backgroundColor: "rgba(30, 30, 30)",
                      border: "1px solid #ffffff",
                    }
                  : {
                      backgroundColor: "#ffffff",
                      border: "1px solid #000000",
                    }
              }
              onClick={() => {
                isDarkMode ? setIsDarkMode(false) : setIsDarkMode(true);
              }}
            ></div>
            <div
              className="right-menu-language"
              onClick={() => {
                language === "A" ? setLanguage("한") : setLanguage("A");
              }}
              style={{
                border: isDarkMode ? "1px solid #ffffff" : "1px solid #000000",
                borderRadius: "5px",
                padding: "1px 7px",
              }}
            >
              {language}
            </div>
            <div
              className="right-menu-calender"
              style={{
                border: isDarkMode ? "1px solid #ffffff" : "1px solid #000000",
                borderRadius: "5px",
              }}
            >
              {language === "A"
                ? `${months[month - 1]} ${day} (${dayOfEngWeek})`
                : `${month}월 ${day}일 (${dayOfWeek})`}
            </div>
            <div className="right-menu-clock">
              <Clock language={language} />
            </div>
          </div>
        </div>
        <div
          className="index-content-container"
          style={{
            flexGrow: "1",
          }}
        >
          {/* <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
            }}
          ></div> */}
          {showImage && (
            <ImageModal src={imgSrc} alt={imgAlt} onClick={handleImageClick} />
          )}
          {projects.map((project, index) => (
            <IconContainer
              key={index}
              path={project.path}
              projectName={project.projectName}
              projectDescription={project.projectDescription}
              className={`index-icon-container-${index + 1}`}
            />
          ))}
          <Draggable>
            <div className="index-icon-container-6">
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(cat.webp)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: imgFileWidth,
                  height: imgFileHeight,
                  border: "4px solid white",
                  boxShadow: "1.5px 1.5px 3px gray",
                }}
                onDoubleClick={() => handleDoubleClick(6)}
              ></div>
              <div className="index-img-text">
                {language === "A" ? "cat.webp" : "고양이.webp"}
              </div>
            </div>
          </Draggable>
          <Draggable>
            <div className="index-icon-container-7">
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(me.webp)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: imgFileWidth,
                  height: imgFileHeight,
                  border: "4px solid white",
                  boxShadow: "1.5px 1.5px 3px gray",
                }}
                onDoubleClick={() => handleDoubleClick(7)}
              ></div>
              <div className="index-img-text">
                {language === "A" ? "me.webp" : "나.webp"}
              </div>
            </div>
          </Draggable>
          {/* <Draggable>
            <div
              className="index-icon-container-8"
              style={
                isDarkMode
                  ? {
                      border: "1px solid #ffffff",
                      backgroundColor: "rgba(30, 30, 30)",
                    }
                  : { border: "1px solid #000000", backgroundColor: "#ffffff" }
              }
            >
              <div
                style={{
                  fontSize: "60px",
                  padding: "10px",
                }}
              >
                살려야 한다
              </div>
            </div>
          </Draggable> */}
          <div className="index-mobile-content-container">
            <div
              className="index-mobile-icon-container"
              onClick={() => clickIconHandler("https://blog.divdivdiv.com")}
            >
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(folder.png)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: folderWidth,
                  height: folderHeight,
                }}
              ></div>
              <div className="index-icon-text">
                <div>{language === "A" ? "Project 1" : "프로젝트 1"}</div>
                <div>{language === "A" ? "(Blog)" : "(블로그)"}</div>
              </div>
            </div>
            <div
              className="index-mobile-icon-container"
              onClick={() => clickIconHandler("/cinephile-test")}
            >
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(folder.png)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: folderWidth,
                  height: folderHeight,
                }}
              ></div>
              <div className="index-icon-text">
                <div>{language === "A" ? "Project 2" : "프로젝트 2"}</div>
                <div>
                  {language === "A" ? "(Cinephile Test)" : "(시네필 테스트)"}
                </div>
              </div>
            </div>
            <div
              className="index-mobile-icon-container"
              onClick={() => clickIconHandler("/sheep-pomodoro")}
            >
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(folder.png)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: folderWidth,
                  height: folderHeight,
                }}
              ></div>
              <div className="index-icon-text">
                <div>{language === "A" ? "Project 3" : "프로젝트 3"}</div>
                <div>{language === "A" ? "(Pomodoro)" : "(뽀모도로)"}</div>
              </div>
            </div>
            <div
              className="index-mobile-icon-container"
              onClick={() => clickIconHandler("/fruits")}
            >
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(folder.png)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: folderWidth,
                  height: folderHeight,
                }}
              ></div>
              <div className="index-icon-text">
                <div>{language === "A" ? "Project 4" : "프로젝트 4"}</div>
                <div>{language === "A" ? "(Fruits)" : "(과일 생성기)"}</div>
              </div>
            </div>
            <div
              className="index-mobile-icon-container-5"
              onClick={() => clickIconHandler("/possible-universe")}
            >
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(folder.png)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: folderWidth,
                  height: folderHeight,
                }}
              ></div>
              <div className="index-icon-text">
                <div>{language === "A" ? "Project 5" : "프로젝트 5"}</div>
                <div>
                  {language === "A" ? "(Possible Universe)" : "(문장 생성기)"}
                </div>
              </div>
            </div>
            {/* <div
              className="index-mobile-icon-container"
              style={{ width: "60px" }}
            ></div> */}
            <div className="index-mobile-icon-container">
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(cat.webp)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: imgFileWidth,
                  height: imgFileHeight,
                  border: "4px solid white",
                  boxShadow: "1.5px 1.5px 3px gray",
                }}
                onClick={() => {
                  setIsMobile(true);
                  handleDoubleClick(6);
                }}
              ></div>
              <div className="index-img-text">
                {language === "A" ? "cat.webp" : "고양이.webp"}
              </div>
            </div>
            <div className="index-mobile-icon-container">
              <div
                className="index-icon-image"
                style={{
                  color: "white",
                  cursor: "move",
                  backgroundImage: `url(me.webp)`,
                  backgroundSize: "100%",
                  backgroundRepeat: "no-repeat",
                  width: imgFileWidth,
                  height: imgFileHeight,
                  border: "4px solid white",
                  boxShadow: "1.5px 1.5px 3px gray",
                }}
                onClick={() => {
                  setIsMobile(true);
                  handleDoubleClick(7);
                }}
              ></div>
              <div className="index-img-text">
                {language === "A" ? "me.webp" : "나.webp"}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "none",
            justifyContent: "space-between",
            alignItems: "center",
            height: "30px",
            borderTop: isDarkMode ? "0.5px solid #ffffff" : "1px solid #dddede",
          }}
        >
          <div style={{ width: "100px" }}></div>
          <div style={{ fontSize: "12px", fontWeight: "300" }}>
            {language === "A" ? "7 items" : "7개의 항목"}
          </div>
          <div style={{ marginRight: "10px" }}>
            <input type="range"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
