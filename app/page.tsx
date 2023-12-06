"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./divdivdiv/divdivdiv.module.css";
import {
  Weather,
  fetchData,
  initialImgAlt,
  initialImgSrc,
  initialIsMobile,
  initialLanguage,
  initialShowImage,
} from "./divdivdiv/data";
import Clock from "./divdivdiv/components/Clock";
import Main from "./divdivdiv/Main";
import { ImageModal } from "./divdivdiv/Modal";
import { useAtom } from "jotai";
import { RenderButtonLeft } from "./divdivdiv/components/RenderButtonLeft";
import { Calender } from "./divdivdiv/components/Calender";
import NoSSR from "./divdivdiv/NoSSR";
import { LanguageToggleButton } from "./divdivdiv/components/LanguageToggleButton";

export default function Page() {
  const [showImage, setShowImage] = useAtom(initialShowImage);
  const [isMobile, setIsMobile] = useAtom(initialIsMobile);
  const [imgSrc, setImgSrc] = useAtom(initialImgSrc);
  const [imgAlt, setImgAlt] = useAtom(initialImgAlt);
  const [language, setLanguage] = useAtom(initialLanguage);
  const [weather, setWeather] = useState<Weather>({
    icon: null,
    temp: null,
  });

  useEffect(() => {
    fetchData(setWeather);
  }, []);

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  return (
    <>
      {showImage && (
        <ImageModal isMobile={isMobile} src={imgSrc} alt={imgAlt} onClick={handleModalClick} />
      )}
      <div className={styles["container-background"]}>
        <div className={styles["container-fade"]} style={{ opacity: showImage ? 0.5 : undefined }}>
          <div className={styles["container"]}>
            <div className={styles["nav-container"]}>
              <div className={styles["nav"]}>
                <RenderButtonLeft text="divdivdiv" path="/" />
                <RenderButtonLeft text={language === "en" ? "about" : "소개"} path="/about" />
                <RenderButtonLeft text={language === "en" ? "contact" : "연결"} path="/contact" />
                <div className={styles["blank-space"]}></div>
                <React.Fragment>
                  {weather.icon && (
                    <div className={`${styles["button-right"]} ${styles["weather"]}`}>
                      <Image
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        width={35}
                        height={35}
                        alt="Weather Icon"
                      />
                    </div>
                  )}
                  <div className={`${styles["button-right"]} ${styles["temperature"]}`}>
                    {weather.temp && `${(weather.temp - 273.15).toFixed(1)}°`}
                  </div>
                </React.Fragment>
                <LanguageToggleButton language={language} setLanguage={setLanguage} />
                <Calender language={language} />
                <Clock language={language} />
              </div>
            </div>
            <div className={styles["content"]}>
              {/* FIXME: 이미지 모달 사진 크기 때문에 window.innerWidth 사용해서 NoSSR 넣음. 추후에 미디어 쿼리 등 다른 방향으로 수정할 수 있으면 하고 NoSSR 제거하기.*/}
              <NoSSR>
                <Main language={language} />
              </NoSSR>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
