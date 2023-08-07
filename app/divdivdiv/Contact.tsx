"use client";

import { useContext } from "react";
import styles from "./divdivdiv.module.css";
import { LanguageContext } from "./data";

export default function Contact() {
  const language = useContext(LanguageContext);

  return (
    <div className={styles["contact-container"]}>
      <a className={styles["contact-link"]} href="https://github.com/minumsa" target="_blank">
        <div className={styles["button-contact"]}>{language === "en" ? "GitHub" : "깃허브"}</div>
      </a>
      <a className={styles["contact-link"]} href="mailto:carver1014@kakao.com" target="_blank">
        <div className={styles["button-contact"]}>{language === "en" ? "E-mail" : "이메일"}</div>
      </a>
    </div>
  );
}
