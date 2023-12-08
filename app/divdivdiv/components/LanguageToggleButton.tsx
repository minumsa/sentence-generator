import { useAtom } from "jotai";
import styles from "../divdivdiv.module.css";
import { languageAtom } from "../modules/data";

export const LanguageToggleButton = () => {
  const [language, setLanguage] = useAtom(languageAtom);
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
