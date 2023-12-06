"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./divdivdiv/divdivdiv.module.css";
import {
  Language,
  LanguageContext,
  Weather,
  fetchData,
  initialImgAlt,
  initialImgSrc,
  initialIsMobile,
  initialShowImage,
} from "./divdivdiv/data";
import Clock from "./divdivdiv/components/Clock";
import Main from "./divdivdiv/Main";
import { ImageModal } from "./divdivdiv/Modal";
import { useAtom } from "jotai";
import { RenderButtonLeft } from "./divdivdiv/components/RenderButtonLeft";
import { Calender } from "./divdivdiv/components/Calender";

export default function Page() {
  const [showImage, setShowImage] = useAtom(initialShowImage);
  const [isMobile, setIsMobile] = useAtom(initialIsMobile);
  const [imgSrc, setImgSrc] = useAtom(initialImgSrc);
  const [imgAlt, setImgAlt] = useAtom(initialImgAlt);

  const [language, setLanguage] = useState<Language>("ko");
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
    <LanguageContext.Provider value={language}>
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
                <div
                  className={`${styles["button-right"]} ${styles["language"]}`}
                  onClick={() => {
                    setLanguage(language === "en" ? "ko" : "en");
                  }}
                >
                  {language === "en" ? "A" : "한"}
                </div>
                <Calender language={language} />
                <Clock />
              </div>
            </div>
            <div className={styles["content"]}>
              <Main />
            </div>
          </div>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}
