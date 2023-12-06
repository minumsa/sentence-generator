import { RenderButtonLeft } from "./RenderButtonLeft";
import styles from "../divdivdiv.module.css";
import { Language, initialLanguage } from "../modules/data";
import { CurrentWeather } from "./Weather";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { useAtom } from "jotai";
import { Calender } from "./Calender";
import Clock from "./Clock";

export const Nav = () => {
  const [language, setLanguage] = useAtom(initialLanguage);

  return (
    <div className={styles["nav"]}>
      <RenderButtonLeft text="divdivdiv" path="/" />
      <RenderButtonLeft text={language === "en" ? "about" : "소개"} path="/about" />
      <RenderButtonLeft text={language === "en" ? "contact" : "연결"} path="/contact" />
      <div className={styles["blank-space"]}></div>
      <CurrentWeather />
      <LanguageToggleButton language={language} setLanguage={setLanguage} />
      <Calender language={language} />
      <Clock language={language} />
    </div>
  );
};
