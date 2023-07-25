"use client";

import React, { useState, useEffect } from "react";

const subjects: string[] = [
  "국회의원 또한",
  "국회의원 역시",
  "국회의원도",
  "국회의원은",
  "그 또한",
  "그 역시",
  "그는",
  "그도",
  "나 또한",
  "나 역시",
  "나는",
  "나도",
  "당신 또한",
  "당신 역시",
  "당신도",
  "당신은",
  "대통령 또한",
  "대통령 역시",
  "대통령도",
  "대통령은",
  "로봇 또한",
  "로봇도",
  "세상 또한",
  "세상도",
  "세상은",
  "신 또한",
  "신 역시",
  "신도",
  "아빠도",
  "엄마도",
  "에이아이도",
  "온 우주가",
  "우리 또한",
  "우리 역시",
  "우리는",
  "우리도",
  "유령 또한",
  "유령도",
  "정치인도",
  "한국인 또한",
  "한국인도",
  "한국인은",
  "할머니도",
  "할아버지도",
];

const objects: string[] = [
  "가려진 자들을",
  "게이를",
  "그들을",
  "남자 며느리를",
  "뉴트로이스를",
  "당신을",
  "대안가족을",
  "동성결혼을",
  "레즈비언을",
  "말 못하는 자들을",
  "모두를",
  "모두의 존엄을",
  "모든 존재를",
  "무성애자를",
  "바이젠더를",
  "범성애자를",
  "보이지 않는 자들을",
  "생활동반자법을",
  "성소수자를",
  "숨은 자들을",
  "안드로진을",
  "양성애자를",
  "에이젠더를",
  "여자 사위를",
  "우리를",
  "젠더퀴어를",
  "젠더플루이드를",
  "차별 없는 세상을",
  "차별금지법을",
  "침묵당한 자들을",
  "퀴어를",
  "트랜스젠더를",
  "폴리아모리를",
  "환대받지 못한 자들을",
];

const verbs: string[] = [
  "도울 것이다.",
  "돕는다.",
  "믿는다.",
  "믿을 것이다.",
  "반긴다.",
  "부정하지 않는다.",
  "부정하지 않을 것이다.",
  "외면하지 않는다.",
  "외면하지 않을 것이다.",
  "위해 목소리 낼 것이다.",
  "위해 목소리 낸다.",
  "위해 시간을 쓸 것이다.",
  "위해 시간을 쓴다.",
  "위해 싸울 것이다.",
  "위해 싸운다.",
  "위해 연대할 것이다.",
  "위해 연대한다.",
  "위해 움직일 것이다.",
  "위해 움직인다.",
  "위해 행동할 것이다.",
  "위해 행동한다.",
  "응원한다.",
  "응원할 것이다.",
  "존중한다.",
  "존중할 것이다.",
  "지나치지 않는다.",
  "지나치지 않을 것이다.",
  "지원한다.",
  "지원할 것이다.",
  "지지한다.",
  "지지할 것이다.",
  "차별하지 않을 것이다.",
  "차별하지 않는다.",
  "축복한다.",
  "축복할 것이다.",
  "환대한다.",
  "환대할 것이다.",
  "환영한다.",
  "환영할 것이다.",
];

const getRandomItemFromArray = (array: string[]): string => {
  return array[Math.floor(Math.random() * array.length)];
};

interface InitialWords {
  initialSubject: string;
  initialObject: string;
  initialVerb: string;
}

const generateRandomColor = (): string => {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
};

const RandomSentenceGenerator: React.FC<InitialWords> = () => {
  const [randomSubject, setRandomSubject] = useState<string>("Pride");
  const [randomObject, setRandomObject] = useState<string>("Month");
  const [randomVerb, setRandomVerb] = useState<string>("2023");
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const generateRandomSentence = () => {
    setRandomSubject(getRandomItemFromArray(subjects));
    setRandomObject(getRandomItemFromArray(objects));
    setRandomVerb(getRandomItemFromArray(verbs));
  };

  useEffect(() => {
    const intervalId = setInterval(generateRandomSentence, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleClick = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
    generateRandomSentence();
  };

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  return (
    <div className="possible-div">
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#f4f6f7"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#0e1111"
      />
      <div className="test30-div-1">
        <div className="test30-div-2" onClick={handleClick}>
          <span
            className="test30-subject-span"
            style={{
              display: "inline-block",
              color: generateRandomColor(),
            }}
          >
            {randomSubject}{" "}
          </span>
          <span
            className="test30-object-span"
            style={{
              display: "inline-block",
              color: generateRandomColor(),
            }}
          >
            {randomObject}{" "}
          </span>
          <span
            style={{
              display: "inline-block",
              color: generateRandomColor(),
            }}
          >
            {randomVerb}
          </span>
        </div>
        <div className="test30-test" onClick={handleClick}>
          <div className="test30-div-3">
            <div
              className="test30-div-3-1"
              style={{
                color: generateRandomColor(),
              }}
            >
              {randomSubject}{" "}
            </div>
            <div
              className="test30-div-3-2"
              style={{
                color: generateRandomColor(),
              }}
            >
              {randomObject}{" "}
            </div>
          </div>
          <div
            className="test30-div-3-3"
            style={{
              color: generateRandomColor(),
            }}
          >
            {randomVerb}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomSentenceGenerator;
