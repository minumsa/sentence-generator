import { useAtom } from "jotai";
import styles from "../divdivdiv.module.css";
import { initialLanguage } from "../modules/data";

export const LanguageToggleButton = () => {
  const [language, setLanguage] = useAtom(initialLanguage);
  return (
    <div
      className={`${styles["button-right"]} ${styles["language"]}`}
      onClick={() => {
        setLanguage(language === "en" ? "ko" : "en");
      }}
    >
      {language === "en" ? "A" : "한"}
    </div>
  );
};
