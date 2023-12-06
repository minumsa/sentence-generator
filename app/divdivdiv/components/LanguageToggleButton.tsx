import { Language } from "../data";
import styles from "../divdivdiv.module.css";

interface LanguageToggleButtonProps {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

export const LanguageToggleButton = ({ language, setLanguage }: LanguageToggleButtonProps) => {
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
