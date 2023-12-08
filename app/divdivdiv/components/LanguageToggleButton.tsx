import { useAtom } from "jotai";
import styles from "../divdivdiv.module.css";
import { languageAtom } from "../modules/data";
import { usePathname, useRouter } from "next/navigation";

export const LanguageToggleButton = () => {
  const [language, setLanguage] = useAtom(languageAtom);
  const router = useRouter();
  const path = usePathname();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ko" : "en";
    setLanguage(newLanguage);
    router.push(`${path}?language=${newLanguage}`);
  };

  return (
    <div className={`${styles["button-right"]} ${styles["language"]}`} onClick={toggleLanguage}>
      {language === "en" ? "A" : "한"}
    </div>
  );
};
