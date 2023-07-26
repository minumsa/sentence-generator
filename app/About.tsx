"use client";

import styles from "./index.module.css";

interface PageProps {
  language: string;
}

export default function About({ language }: PageProps) {
  const lang = language == "A" ? "EN" : "KO";
  const about = {
    job: {
      EN: "I am working as a web developer in Seoul. 👨‍💻",
      KO: "서울에서 웹 개발자로 활동하고 있습니다. 👨‍💻",
    },
    interest: {
      EN: "I am interested in creating clean interfaces and interesting web pages. 💥",
      KO: "간결한 인터페이스와 흥미로운 페이지를 만드는 데 관심이 있습니다. 💥",
    },
    ai: {
      EN: "I am also exploring ways to survive in the age of AI. 🤖",
      KO: "AI로부터 살아남기 위한 방법을 찾고 있습니다. 🤖",
    },
  };

  return (
    <div className={styles["about-container"]}>
      <ul>
        <li>{about.job[lang]}</li>
        <li>{about.interest[lang]}</li>
        <li>{about.ai[lang]}</li>
      </ul>
    </div>
  );
}
