import React, { useState, useEffect } from "react";
import { useWindowScroll } from "react-use";
import styles from "./scrollbar.module.css";

const ScrollBar = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const currentScrollPercentage = (pageYOffset / (scrollHeight - clientHeight)) * 100;
        setScrollPercentage(currentScrollPercentage);
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageYOffset]);

  return <div className={styles["progress-bar"]} style={{ width: `${scrollPercentage}%` }} />;
};

export default ScrollBar;
