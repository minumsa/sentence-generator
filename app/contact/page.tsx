"use client";

import styles from "../divdivdiv/divdivdiv.module.css";
import { Nav } from "../divdivdiv/components/Nav";
import Contact from "../divdivdiv/components/Contact";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { languageAtom } from "../divdivdiv/modules/data";

export default function Page() {
  const currentUrl = window.location.href;
  const currentLanguage: any = currentUrl.split("contact?language=")[1];
  const [language, setLanguage] = useAtom(languageAtom);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, []);

  return (
    <div className={styles["container-background"]}>
      <div className={styles["container"]}>
        <div className={styles["nav-container"]}>
          <Nav />
        </div>
        <div className={styles["content"]}>
          <Contact />
        </div>
      </div>
    </div>
  );
}
