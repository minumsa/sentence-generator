"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Draggable from "react-draggable";

interface indexProps {
  language: string;
}

export default function Main({ language }: indexProps) {
  const [folderWidth, setFolderWidth] = useState<number>(80);
  const [folderHeight, setFolderHeight] = useState<number>(65);
  const [mobileFolderWidth, setMobileFolderWidth] = useState<number>(
    folderWidth * 0.9
  );
  const [mobileFolderHeight, setMobileFolderHeight] = useState<number>(
    folderHeight * 0.9
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<string>("");
  const [imgFileWidth, setImgFileWidth] = useState<number>(72);
  const [imgFileHeight, setImgFileHeight] = useState<number>(96);
  const [MobileImgFileWidth, setMobileImgFileWidth] = useState<number>(
    imgFileWidth * 0.9
  );
  const [MobileImgFileHeight, setMobileImgFileHeight] = useState<number>(
    imgFileHeight * 0.9
  );
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
        projectDescription: language === "A" ? "Sentences" : "문장 생성기",
      },
    ],
    [language]
  );

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

  const clickIconHandler = (path: string) => {
    if (path.startsWith("http")) {
      window.open(path, "_blank");
    } else {
      const newTab = window.open(path, "_blank"); // 새 탭에서 열기
      newTab?.focus(); // 새 탭으로 포커스 이동
    }
  };

  const handleImageClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

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

  return (
    <>
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
              boxShadow: "1px 2px 5px gray",
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
              boxShadow: "1px 2px 5px gray",
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
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className="index-mobile-icon-text">
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
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className="index-mobile-icon-text">
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
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className="index-mobile-icon-text">
            <div>{language === "A" ? "Project 3" : "프로젝트 3"}</div>
            <div>{language === "A" ? "(Pomodoro)" : "(뽀모도로)"}</div>
          </div>
        </div>
        <div
          className="index-mobile-icon-container-5"
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
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className="index-mobile-icon-text">
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
              width: mobileFolderWidth,
              height: mobileFolderHeight,
            }}
          ></div>
          <div className="index-mobile-icon-text">
            <div>{language === "A" ? "Project 5" : "프로젝트 5"}</div>
            <div>{language === "A" ? "(Sentences)" : "(문장 생성기)"}</div>
          </div>
        </div>
        {/* <div
          className="index-mobile-icon-container"
          style={{ width: "60px" }}
        ></div> */}
        {/* <div className="index-mobile-img-content-container"> */}
        <div className="index-mobile-icon-container">
          <div
            className="index-icon-image"
            style={{
              color: "white",
              cursor: "move",
              backgroundImage: `url(cat.webp)`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              border: "4px solid white",
              boxShadow: "1px 2px 5px gray",
            }}
            onClick={() => {
              setIsMobile(true);
              handleDoubleClick(6);
            }}
          ></div>
          <div className="index-mobile-img-text">
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
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              border: "4px solid white",
              boxShadow: "1px 2px 5px gray",
            }}
            onClick={() => {
              setIsMobile(true);
              handleDoubleClick(7);
            }}
          ></div>
          <div className="index-mobile-img-text">
            {language === "A" ? "me.webp" : "나.webp"}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
