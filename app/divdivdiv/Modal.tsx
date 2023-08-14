import { useContext, useEffect, useState } from "react";
import styles from "./divdivdiv.module.css";
import Image from "next/image";
import { LanguageContext, readme } from "./data";

interface ImageModalProps {
  isMobile: boolean;
  src: string;
  alt: string;
  onClick: any;
}

export const ImageModal = ({ isMobile, src, alt, onClick }: ImageModalProps) => {
  const language = useContext(LanguageContext);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  // FIXME: Main 이 Desktop 이랑 ModalContainer 를 가지고 있어서
  // Modal의 상태 변화가 Desktop 과 연관이 없도록 만들어주면
  // Modal 이 열리고 닫힐때마다 Desktop 이 re-rendering 되지 않게 할수 있다.
  // 상태 변수는 여기에 두고 props 형태로 자식 컴포넌트로 보내기

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  let height: number = windowHeight / 1.2;
  let width: number = windowHeight * 0.65;

  if (isMobile) {
    width = windowWidth * 0.9;
    height = width * 1.3;

    if (alt === "readme") {
      width = windowWidth * 0.9;
      height = width * 1.6;
    }
  }

  function ReadmeComponent(props: { path: string; icon: any }) {
    const { path, icon } = props;

    return (
      <div
        className={styles["paragraph"]}
        style={{
          margin: isMobile ? "10px 30px" : "10px 70px",
        }}
      >
        <div className={styles["paragraph-title"]} onClick={() => window.open(path, "_blank")}>
          {`${icon.title[language]} ${icon.emoji}`}
        </div>
        {icon.text[language]}
      </div>
    );
  }

  // FIXME: 리드미와 이미지 모달 컴포넌트를 아예 별개로 분리
  return alt === "readme" ? (
    <div className={styles["modal-container"]} onClick={onClick}>
      <div className={styles["modal"]} style={{ width: width, height: height }}>
        {/* <Image src={src} alt={alt} width={width} height={isMobile ? 0 : 50} /> */}
        <div
          className={styles["last-updated"]}
          style={
            isMobile ? { margin: "10px 0 0 0" } : { margin: "0 0 30px 0", paddingTop: "10px" }
            // margin: isMobile ? "10px 0 0 0" : "0 0 30px 0",
            // paddingTop: isMobile ? undefined : "10px",
          }
        >
          {readme.lastUpdated.text[language]}
        </div>
        <ReadmeComponent path="https://blog.divdivdiv.com" icon={readme.blog} />
        <ReadmeComponent path="/music" icon={readme.music} />
        <ReadmeComponent path="/cinephile" icon={readme.cinephile} />
        <ReadmeComponent path="/fruits" icon={readme.fruits} />
        <ReadmeComponent path="/pride" icon={readme.pride} />
        <ReadmeComponent path="/" icon={readme.techStack} />
      </div>
    </div>
  ) : (
    <div className={styles["modal-image"]} onClick={onClick}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};
