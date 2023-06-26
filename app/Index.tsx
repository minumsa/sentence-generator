"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Draggable from "react-draggable";

const Index: React.FC = () => {
  const [folderWidth, setFolderWidth] = useState<number>(800);
  const [folderHeight, setFolderHeight] = useState<number>(648);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

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
            width: folderWidth / 9,
            height: folderHeight / 9,
          }}
        ></div>
        <div className="index-icon-text">
          <div>{projectName}</div>
          <div>({projectDescription})</div>
        </div>
      </div>
    </Draggable>
  );

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#0E1111" }}
    >
      <IconContainer
        path="/sheep-pomodoro"
        projectName="Project 1"
        projectDescription="Sheep Pomodoro"
        className="index-icon-container"
      />
      <IconContainer
        path="/cinephile-test"
        projectName="Project 2"
        projectDescription="Cinephile Test"
        className="index-icon-container-2"
      />
      <IconContainer
        path="/possible-universe"
        projectName="Project 3"
        projectDescription="Possible Universe"
        className="index-icon-container-3"
      />
      <IconContainer
        path="https://blog.divdivdiv.com"
        projectName="Project 4"
        projectDescription="Blog"
        className="index-icon-container-4"
      />
      <IconContainer
        path="/fruits"
        projectName="Project 5"
        projectDescription="Fruits"
        className="index-icon-container-5"
      />
    </div>
  );
};

export default Index;
