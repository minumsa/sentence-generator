"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

const Index: React.FC = () => {
  const [folderWidth, setFolderWidth] = useState<number>(800);
  const [folderHeight, setFolderHeight] = useState<number>(648);

  const folderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const { left, top } = folderRef.current!.getBoundingClientRect();
    const offsetX = event.clientX - left;
    const offsetY = event.clientY - top;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = event.clientX - dragOffset.x;
    const y = event.clientY - dragOffset.y;
    folderRef.current!.style.transform = `translate(${x}px, ${y}px) translateZ(0)`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#0E1111" }}
    >
      {/* <a href="/sheep-pomodoro"> */}
      <div
        className="folder"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "move",
          zIndex: 100,
          pointerEvents: "auto",
          transitionDuration: "initial",
        }}
        ref={folderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div>
          <Image
            src="/folder.png"
            alt="folder"
            width={folderWidth / 8}
            height={folderHeight / 8}
            priority
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "15px",
            fontWeight: "bold",
            color: "#ffffff",
            lineHeight: "1.3",
            textShadow: "1px 1px 3px #000;",
          }}
        >
          <div>Project 1</div>
          <div>(Sheep Pomodoro)</div>
        </div>
      </div>
      {/* </a> */}
    </div>
  );
};

export default Index;
