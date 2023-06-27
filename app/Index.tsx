"use client";

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
  const [language, setLanguage] = useState("EN");
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
      projectDescription: "Sheep Pomodoro",
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

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const languageHandler = () => {
    home === "home" ? setHome("홈") : setHome("home");
    about === "about" ? setAbout("소개") : setAbout("about");
    contact === "contact" ? setContact("연결") : setContact("contact");
    setLanguage(language === "EN" ? "한국어" : "EN");
    setProjects(prevProjects =>
      prevProjects.map(project => ({
        ...project,
        projectName:
          language === "EN"
            ? getTranslatedProjectName(project.projectName)
            : getOriginalProjectName(project.projectName),
        projectDescription:
          language === "EN"
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
      case "복제양 뽀모도로":
        return "Sheep Pomodoro";
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
      case "Sheep Pomodoro":
        return "복제양 뽀모도로";
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
        <div className="index-icon-text">
          <div>{projectName}</div>
          <div>({projectDescription})</div>
        </div>
      </div>
    </Draggable>
  );

  const currentTimeMemoized = useMemo(() => currentTime, [currentTime]);

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
        backgroundColor: "rgb(244, 244, 244)",
        // backgroundColor: "#333",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          borderBottom: "1px solid #A1A1A1",
          backgroundColor: "blue",
          // opacity: "50%",
        }}
      >
        <div className="menu-text">{home}</div>
        <div className="menu-text">{about}</div>
        <div className="menu-text">{contact}</div>
        <div className="menu-text" onClick={languageHandler}>
          {language}
        </div>
        <div className="menu-text">{currentTimeMemoized}</div>
      </div>
      <div style={{ flexGrow: "1" }}>
        {projects.map((project, index) => (
          <IconContainer
            key={index}
            path={project.path}
            projectName={project.projectName}
            projectDescription={project.projectDescription}
            className={`index-icon-container-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
