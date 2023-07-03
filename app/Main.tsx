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
          // border: imgSrc === "/exp_ko.webp" ? "0.5px solid white" : 0,
          // borderRadius: imgSrc === "/exp_ko.webp" ? "10px" : 0,
          boxShadow:
            imgSrc === "/exp_ko.webp" || imgSrc === "/exp_en.webp"
              ? "1px 2px 5px gray"
              : 0,
          // border: imgSrc === "/exp_ko.webp" ? "1px solid black" : 0,
        }}
        onClick={onClick}
      >
        <Image
          src={src}
          alt={alt}
          width={
            imgSrc === "/exp_ko.webp" || imgSrc === "/exp_en.webp"
              ? width * 0.9
              : width
          }
          height={
            imgSrc === "/exp_ko.webp" || imgSrc === "/exp_en.webp"
              ? height * 0.9
              : height
          }
        />
      </div>
    );
  };

  // const IconContainer: React.FC<{
  //   path: string;
  //   projectName: string;
  //   projectDescription: string;
  //   className: string;
  // }> = ({ path, projectName, projectDescription, className }) => (
  //   <Draggable>
  //     <div
  //       className={className}
  //       onDoubleClick={() => clickIconHandler("https://blog.divdivdiv.com")}
  //     >
  //       <div
  //         className="index-icon-image"
  //         style={{
  //           color: "white",
  //           cursor: "move",
  //           backgroundImage: `url(folder.png)`,
  //           backgroundSize: "100%",
  //           backgroundRepeat: "no-repeat",
  //           width: folderWidth,
  //           height: folderHeight,
  //         }}
  //       ></div>
  //       <div className="index-icon-text">
  //         <div></div>
  //         <div>({projectDescription})</div>
  //       </div>
  //     </div>
  //   </Draggable>
  // );

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
    } else if (index === 8) {
      language === "A" ? setImgSrc("/exp_en.webp") : setImgSrc("/exp_ko.webp");
      setImgAlt("README.txt");
    }
    setShowImage(true);
  };

  const fortuneArr = [
    "집보다 나은 곳은 없습니다.",
    "오늘 만큼은 오직 마음이 이끄는 대로 하세요.",
    "가끔은 일부러 길을 잃어보세요.",
    "믿음은 사랑의 가장 중요한 조건입니다.",
    "결국에는 모두 괜찮아질 거예요.",
    "두려워하지 마세요. 죽기밖에 더 하겠어요?",
    "해야 할 일을 하세요.",
    "당연한 말이지만, 실패가 없으면 성공도 없습니다.",
    "여행자의 시선으로 일상을 살아가보세요.",
    "5분 동안만 20년 뒤의 당신을 떠올려보세요.",
    "평소의 당신과 반대로 행동해보세요.",
    "아무런 대가 없이 누군가를 도와보세요.",
    "이틀 전 아침에는 뭘 먹었나요?",
    "당신이 감사해야 할 사람들을 떠올려보세요.",
    "오늘 밤엔 예전에 좋아하던 영화를 다시 한번 관람해보면 어떨까요?",
    "누군가에게 찾아온 행운을 진심으로 축하해보세요. 당신에게도 그런 행운이 찾아올지 모릅니다.",
  ];

  const fortuneEngArr = [
    "There's no place like home.",
    "Just follow your heart.",
    "Sometimes, purposely get lost.",
    "Trust is the most important condition for love.",
    "Eventually, everything will be okay.",
    "Don't be afraid. What more can you do other than die?",
    "Do what you have to do.",
    "It goes without saying, but without failure, there is no success.",
    "Experience everyday life from the perspective of a traveler.",
    "Take a moment to envision yourself 20 years from now.",
    "Act opposite to your usual self.",
    "Help someone without expecting anything in return.",
    "What did you eat for breakfast two days ago?",
    "Think of the people you should be grateful for.",
    "How about watching a movie you used to love tonight?",
    "Sincerely congratulate someone who has encountered good luck. You never know, such luck might come to you too.",
  ];

  const handleFortuneClick = () => {
    language === "A"
      ? alert(fortuneEngArr[Math.floor(Math.random() * fortuneArr.length)])
      : alert(fortuneArr[Math.floor(Math.random() * fortuneArr.length)]);
  };

  return (
    <>
      {showImage && (
        <ImageModal src={imgSrc} alt={imgAlt} onClick={handleImageClick} />
      )}
      {/* {projects.map((project, index) => (
        <IconContainer
          key={index}
          path={project.path}
          projectName={project.projectName}
          projectDescription={project.projectDescription}
          className={`index-icon-container-${index + 1}`}
        />
      ))} */}
      <Draggable>
        <div
          className="index-icon-container-1"
          onDoubleClick={() => clickIconHandler("https://blog.divdivdiv.com")}
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
      </Draggable>
      <Draggable>
        <div
          className="index-icon-container-2"
          onDoubleClick={() => clickIconHandler("/cinephile-test")}
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
      </Draggable>
      <Draggable>
        <div
          className="index-icon-container-3"
          onDoubleClick={() => clickIconHandler("/sheep-pomodoro")}
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
      </Draggable>
      <Draggable>
        <div
          className="index-icon-container-4"
          onDoubleClick={() => clickIconHandler("/fruits")}
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
            <div>{language === "A" ? "(fruits)" : "(과일 생성기)"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div
          className="index-icon-container-5"
          onDoubleClick={() => clickIconHandler("/possible-universe")}
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
            <div>{language === "A" ? "(Sentences)" : "(문장 생성기)"}</div>
          </div>
        </div>
      </Draggable>
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
      <Draggable>
        <div className="index-icon-container-8">
          <div
            className="index-icon-image"
            style={{
              color: "white",
              cursor: "move",
              backgroundImage: `url(fortune.webp)`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              width: 80,
              height: 83,
            }}
            onDoubleClick={() => handleFortuneClick()}
          ></div>
          <div className="index-icon-text">
            <div> {language === "A" ? "fortune.exe" : "포춘쿠키.exe"}</div>
          </div>
        </div>
      </Draggable>
      <Draggable>
        <div className="index-icon-container-9">
          <div
            className="index-icon-image"
            style={{
              color: "white",
              cursor: "move",
              backgroundImage:
                language === "A" ? "url(exp_en.webp)" : "url(exp_ko.webp)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              width: imgFileWidth,
              height: imgFileHeight,
              boxShadow: "1px 2px 5px gray",
            }}
            onDoubleClick={() => handleDoubleClick(8)}
          ></div>
          <div className="index-icon-text" style={{ marginTop: "12px" }}>
            <div> {language === "A" ? "README.txt" : "프로젝트 설명.txt"}</div>
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
        <div
          className="index-mobile-icon-container"
          style={{ marginLeft: "10px" }}
        >
          <div
            className="index-icon-image"
            style={{
              color: "white",
              cursor: "move",
              backgroundImage: `url(fortune.webp)`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              width: 80 * 0.9,
              height: 83 * 0.9,
              marginTop: "10px",
            }}
            onClick={() => {
              setIsMobile(true);
              handleFortuneClick();
            }}
          ></div>
          <div className="index-mobile-img-text">
            {language === "A" ? "fortune.exe" : "포춘쿠키.exe"}
          </div>
        </div>

        <div className="index-mobile-icon-container">
          <div
            className="index-icon-image"
            style={{
              color: "white",
              cursor: "move",
              backgroundImage:
                language === "A" ? "url(exp_en.webp)" : "url(exp_ko.webp)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              width: MobileImgFileWidth,
              height: MobileImgFileHeight,
              boxShadow: "1px 2px 5px gray",
              marginTop: "8px",
            }}
            onClick={() => {
              setIsMobile(true);
              handleDoubleClick(8);
            }}
          ></div>
          <div className="index-mobile-img-text">
            <div> {language === "A" ? "README.txt" : "프로젝트 설명.txt"}</div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
