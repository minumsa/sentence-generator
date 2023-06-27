"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";

const Index: React.FC = () => {
  const [folderWidth, setFolderWidth] = useState<number>(800);
  const [folderHeight, setFolderHeight] = useState<number>(648);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [home, setHome] = useState<string>("home");
  const [about, setAbout] = useState<string>("about");
  const [contact, setContact] = useState<string>("contact");
  const [language, setLanguage] = useState("English");
  const [projects, setProjects] = useState([
    {
      path: "https://blog.divdivdiv.com",
      projectName: "Project 1",
      projectDescription: "Blog",
    },
    {
      path: "/cinephile-test",
      projectName: "Project 2",
      projectDescription: "Cinephile Test",
    },
    {
      path: "/sheep-pomodoro",
      projectName: "Project 3",
      projectDescription: "Pomodoro",
    },
    {
      path: "/fruits",
      projectName: "Project 4",
      projectDescription: "Fruits",
    },
    {
      path: "/possible-universe",
      projectName: "Project 5",
      projectDescription: "Possible Universe",
    },
  ]);

  const [currentTime, setCurrentTime] = useState<string>(() => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const date = new Date();
  //     const hours = String(date.getHours()).padStart(2, "0");
  //     const minutes = String(date.getMinutes()).padStart(2, "0");
  //     const seconds = String(date.getSeconds()).padStart(2, "0");
  //     setCurrentTime(`${hours}:${minutes}:${seconds}`);
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const languageHandler = () => {
    home === "home" ? setHome("홈") : setHome("home");
    about === "about" ? setAbout("소개") : setAbout("about");
    contact === "contact" ? setContact("연결") : setContact("contact");
    setLanguage(language === "English" ? "한국어" : "English");
    setProjects(prevProjects =>
      prevProjects.map(project => ({
        ...project,
        projectName:
          language === "English"
            ? getTranslatedProjectName(project.projectName)
            : getOriginalProjectName(project.projectName),
        projectDescription:
          language === "English"
            ? getTranslatedProjectDescription(project.projectDescription)
            : getOriginalProjectDescription(project.projectDescription),
      }))
    );
  };

  const getOriginalProjectName = (projectName: string) => {
    switch (projectName) {
      case "프로젝트 1":
        return "Project 1";
      case "프로젝트 2":
        return "Project 2";
      case "프로젝트 3":
        return "Project 3";
      case "프로젝트 4":
        return "Project 4";
      case "프로젝트 5":
        return "Project 5";
      default:
        return projectName;
    }
  };

  const getTranslatedProjectName = (projectName: string) => {
    switch (projectName) {
      case "Project 1":
        return "프로젝트 1";
      case "Project 2":
        return "프로젝트 2";
      case "Project 3":
        return "프로젝트 3";
      case "Project 4":
        return "프로젝트 4";
      case "Project 5":
        return "프로젝트 5";
      default:
        return projectName;
    }
  };

  const getOriginalProjectDescription = (projectDescription: string) => {
    switch (projectDescription) {
      case "블로그":
        return "Blog";
      case "시네필 테스트":
        return "Cinephile Test";
      case "뽀모도로":
        return "Pomodoro";
      case "과일 생성기":
        return "Fruits";
      case "문장 생성기":
        return "Possible Universe";
      default:
        return projectDescription;
    }
  };

  const getTranslatedProjectDescription = (projectDescription: string) => {
    switch (projectDescription) {
      case "Blog":
        return "블로그";
      case "Cinephile Test":
        return "시네필 테스트";
      case "Pomodoro":
        return "뽀모도로";
      case "Fruits":
        return "과일 생성기";
      case "Possible Universe":
        return "문장 생성기";
      default:
        return projectDescription;
    }
  };

  const clickIconHandler = (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank"); // 외부 링크를 새 탭에서 열기
    } else {
      const newTab = window.open(path, "_blank"); // 새 탭 열기
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
            width: folderWidth / 10,
            height: folderHeight / 10,
          }}
        ></div>
        <div
          className="index-icon-text"
          // style={
          //   language === "English"
          //     ? { fontFamily: `` }
          //     : {
          //         fontFamily: `"Pretendard Variable", Pretendard, -apple-system,
          // BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
          // "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
          // "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;`,
          //       }
          // }
        >
          <div>{projectName}</div>
          <div>({projectDescription})</div>
        </div>
      </div>
    </Draggable>
  );

  const currentTimeMemoized = useMemo(() => currentTime, [currentTime]);

  function getDayOfWeek(date: Date): string {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dayOfWeek = getDayOfWeek(currentDate);

  const [showImage, setShowImage] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",

        // backgroundColor: "black",
        // backgroundColor: "rgb(30, 30, 30)",
        // backgroundColor: "rgb(255, 255, 255)",
        // backgroundColor: "rgb(244, 244, 244)",
        // backgroundColor: "#333",
        backgroundColor: "#ffffff",
        fontFamily: `Pretendard Variable, Pretendard, -apple-system,
        BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI,
        Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji,
        Segoe UI Emoji, Segoe UI Symbol, sans-serif`,
      }}
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
            height: "60px",
            borderBottom: "1px solid #000000",
            // backgroundColor: "blue",
            // opacity: "50%",
          }}
        >
          <div className="menu-text">{home}</div>
          <div className="menu-text">{about}</div>
          <div className="menu-text">{contact}</div>
          <div className="menu-text" onClick={languageHandler}>
            {language}
          </div>
          <div className="menu-text">
            {month}월 {day}일 ({dayOfWeek}){/* {year} / 0{month} / {day} */}
          </div>
        </div>
      </div>
      <div
        style={{
          flexGrow: "1",
        }}
      >
        {projects.map((project, index) => (
          <IconContainer
            key={index}
            path={project.path}
            projectName={project.projectName}
            projectDescription={project.projectDescription}
            className={`index-icon-container-${index + 1}`}
          />
        ))}
        <div className="index-icon-container-6">
          {showImage && (
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
              onClick={handleImageClick}
            >
              <Image src={imgSrc} alt={imgAlt} width={720} height={961} />
            </div>
          )}
          <div
            className="index-icon-image"
            style={{
              color: "white",
              cursor: "move",
              backgroundImage: `url(cat.webp)`,
              backgroundSize: "100%",
              width: folderWidth / 11,
              height: folderHeight / 6.8,
              border: "4px solid white",
              boxShadow: "1.5px 1.5px 3px gray",
            }}
            onDoubleClick={() => handleDoubleClick(6)}
          ></div>
          <div className="index-icon-text">cat.webp</div>
        </div>
        <div className="index-icon-container-7">
          {showImage && (
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
              onClick={handleImageClick}
            >
              <Image src={imgSrc} alt={imgAlt} width={720} height={961} />
            </div>
          )}
          <div
            className="index-icon-image"
            style={{
              color: "white",
              cursor: "move",
              backgroundImage: `url(me.webp)`,
              backgroundSize: "100%",
              width: folderWidth / 11,
              height: folderHeight / 6.8,
              border: "4px solid white",
              boxShadow: "1.5px 1.5px 3px gray",
            }}
            onDoubleClick={() => handleDoubleClick(7)}
          ></div>
          <div className="index-icon-text">me.webp</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // width: "98%",
          height: "30px",
          borderTop: "1px solid #dddede",
          // backgroundColor: "blue",
          // opacity: "50%",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: "300" }}>5개의 항목</div>
        <div>
          <input type="range"></input>
        </div>
      </div>
    </div>
  );
};

export default Index;
