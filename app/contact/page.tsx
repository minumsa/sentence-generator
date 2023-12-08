"use client";

import styles from "../divdivdiv/divdivdiv.module.css";
import { Nav } from "../divdivdiv/components/Nav";
import Contact from "../divdivdiv/components/Contact";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { languageAtom } from "../divdivdiv/modules/data";

export default function Page(request: Request) {
  const [language, setLanguage] = useAtom(languageAtom);
  const searchParams = useSearchParams();
  const currentLanguage: any = searchParams.get("language");

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
