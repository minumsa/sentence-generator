"use client";

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
    router.push(path);
  };

  const IconContainer: React.FC<{
    path: string;
    projectName: string;
    projectDescription: string;
    className: string;
    onTouchStart?: () => void;
    onTouchEnd?: () => void;
  }> = ({
    path,
    projectName,
    projectDescription,
    className,
    onTouchStart,
    onTouchEnd,
  }) => (
    <Draggable>
      <div
        className={className}
        onDoubleClick={() => clickIconHandler(path)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
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
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      />
      <IconContainer
        path="/cinephile-test"
        projectName="Project 2"
        projectDescription="Cinephile Test"
        className="index-icon-container-2"
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      />
      <IconContainer
        path="/possible-universe"
        projectName="Project 3"
        projectDescription="Possible Universe"
        className="index-icon-container-3"
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      />
      <IconContainer
        path="/fruits"
        projectName="Project 4"
        projectDescription="Fruits"
        className="index-icon-container-4"
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
      />
    </div>
  );
};

export default Index;
