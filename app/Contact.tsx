"use client";

import styles from "./index.module.css";

interface PageProps {
  language: string;
}

export default function Contact({ language }: PageProps) {
  return (
    <div className={styles["contact-container"]}>
      <a
        className={styles["contact-link"]}
        href="https://github.com/minumsa"
        target="_blank"
      >
        <div className={styles["button-contact"]}>
          {language === "A" ? "GitHub" : "깃허브"}
        </div>
      </a>
      <a
        className={styles["contact-link"]}
        href="mailto:carver1014@kakao.com"
        target="_blank"
      >
        <div className={styles["button-contact"]}>
          {language === "A" ? "E-mail" : "이메일"}
        </div>
      </a>
    </div>
  );
}
