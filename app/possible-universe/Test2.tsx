"use client";

import React, { useState, useEffect } from "react";

export default function Test2() {
  const subject: string[] = [
    "나는",
    "나도",
    "나 또한",
    "나 역시",
    "우리는",
    "우리도",
    "우리 또한",
    "우리 역시",
    "당신은",
    "당신도",
    "당신 또한",
    "당신 역시",
    "그는",
    "그도",
    "그 또한",
    "그 역시",
    // "그조차",
    "엄마도",
    "아빠도",
    "할머니도",
    "할아버지도",
    // "그녀는",
    // "그녀도",
    // "그녀조차",
    // "그녀 또한",
    // "그녀 역시",
    // "그들은",
    // "그들도",
    // "그들 또한",
    // "그들 역시",
    // "그들조차",
    "세상은",
    "세상도",
    "세상 또한",
    "한국인은",
    "한국인도",
    "한국인 또한",
    "국회의원은",
    "국회의원도",
    "국회의원 또한",
    "국회의원 역시",
    "정치인도",
    "대통령은",
    "대통령도",
    "대통령 또한",
    "대통령 역시",
    "온 우주가",
    "신도",
    "신 또한",
    "신 역시",
    "유령도",
    "유령 또한",
    "로봇도",
    "로봇 또한",
    "에이아이도",
    // "에이아이 또한",
    // "다스베이더도",
    // "타노스도",
    // "어린왕자도",
    // "프로메테우스도",
    // "쥐며느리도",
    // "옆집 아저씨는",
    // "옆집 아저씨도",
    // "뒷집 아주머니는",
    // "뒷집 아주머니도",
    // "엄마 친구 아들은",
    // "엄마 친구 딸도",
  ];
  const object: string[] = [
    // "가난한 자들을",
    "가려진 자들을",
    "게이를",
    "그들을",
    "당신을",
    "대안가족을",
    "동성결혼을",
    "레즈비언을",
    "말 못하는 자들을",
    "모두를",
    "모두의 존엄을",
    // "모든 생명을",
    "모든 존재를",
    "양성애자를",
    // "버림받은 자들을",
    "보이지 않는 자들을",
    // "빈곤한 자들을",
    "생활동반자법을",
    "성소수자를",
    "숨은 자들을",
    // "어린이를",
    "우리를",
    // "이주여성을",
    // "작은 자들을",
    "차별금지법을",
    "차별 없는 세상을",
    "침묵당한 자들을",
    "퀴어를",
    "트랜스젠더를",
    // "페미니스트를",
    "환대받지 못한 자들을",
    "남자 며느리를",
    "여자 사위를",
    "젠더퀴어를",
    "바이젠더를",
    "안드로진을",
    "뉴트로이스를",
    "에이젠더를",
    "젠더플루이드를",
    "무성애자를",
    "범성애자를",
    "폴리아모리를",
    // "장애인을",
  ];
  const verb: string[] = [
    // "사랑한다.",
    // "사랑할 것이다.",
    // "사랑하게 될 것이다.",
    "응원한다.",
    "응원할 것이다.",
    "지지한다.",
    "지지할 것이다.",
    "지원한다.",
    "지원할 것이다.",
    "축복한다.",
    "축복할 것이다.",
    // "좋아한다.",
    "환영한다.",
    "환영할 것이다.",
    "반긴다.",
    "환대한다.",
    "환대할 것이다.",
    "믿는다.",
    "믿을 것이다.",
    "돕는다.",
    "도울 것이다.",
    "외면하지 않는다.",
    "외면하지 않을 것이다.",
    "지나치지 않는다.",
    "지나치지 않을 것이다.",
    "존중한다.",
    "존중할 것이다.",
    "위해 싸울 것이다.",
    "위해 행동할 것이다.",
    "위해 움직일 것이다.",
    "위해 연대한다.",
    "위해 목소리 낼 것이다.",
    "위해 시간을 쓸 것이다.",
    "차별하지 않는다.",
    "부정하지 않는다.",
  ];

  const random1: number = Math.floor(Math.random() * subject.length);
  const random2: number = Math.floor(Math.random() * object.length);
  const random3: number = Math.floor(Math.random() * verb.length);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const [text1, setText1] = useState<string>(subject[random1]);
  const [text2, setText2] = useState<string>(object[random2]);
  const [text3, setText3] = useState<string>(verb[random3]);

  const generateRandomSentence = () => {
    const random1: number = Math.floor(Math.random() * subject.length);
    const random2: number = Math.floor(Math.random() * object.length);
    const random3: number = Math.floor(Math.random() * verb.length);

    setText1(subject[random1]);
    setText2(object[random2]);
    setText3(verb[random3]);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(generateRandomSentence, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleClick = () => {
    generateRandomSentence();
    setIsRunning(!isRunning);
    setTimeout(() => {
      setIsRunning(true);
    }, 2000);
  };

  return (
    <>
      {/* <Helmet>
        <title>가능세계</title>
        <meta property="og:title" content="가능세계" />
        <meta property="og:image" content="https://i.ibb.co/JxGrc32/test.png" />
        <meta
          property="og:url"
          content="https://divdivdiv.com/possible-universe"
        />
        <meta property="og:description" content="2023 프라이드 먼스" />

        <meta name="twitter:title" content="가능세계" />
        <meta name="twitter:description" content="2023 프라이드 먼스" />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/JxGrc32/test.png"
        />

        <link rel="canonical" href={"https://i.ibb.co/JxGrc32/test.png"} />
      </Helmet> */}
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
          {/* {sentence} */}
          <span
            style={{
              display: "inline-block",
              color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
              transform: `rotate(${Math.random() * 180 - 180}deg)`,
              // scale(${Math.random() * 1.2 + 0.3})
            }}
          >
            {text1}{" "}
          </span>
          <span
            style={{
              display: "inline-block",
              color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
              transform: `rotate(${Math.random() * 180 - 180}deg)`,
            }}
          >
            {text2}{" "}
          </span>
          <span
            style={{
              display: "inline-block",
              color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
              transform: `rotate(${Math.random() * 180 - 180}deg)`,
            }}
          >
            {text3}
          </span>
        </div>
        <div className="test30-test" onClick={handleClick}>
          <div className="test30-div-3">
            <div
              className="test30-div-3-1"
              style={{
                color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
                // transform: `rotate(${Math.random() * 180 - 180}deg)`,
                // scale(${Math.random() * 1.2 + 0.3})
              }}
            >
              {text1}{" "}
            </div>
            <div
              className="test30-div-3-2"
              style={{
                color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
                // transform: `rotate(${Math.random() * 180 - 180}deg)`,
              }}
            >
              {text2}{" "}
            </div>
          </div>
          <div
            className="test30-div-3-3"
            style={{
              color: "#" + Math.round(Math.random() * 0xffffff).toString(16),
              // transform: `rotate(${Math.random() * 180 - 50}deg)`,
            }}
          >
            {text3}
          </div>
        </div>
      </div>
    </>
  );
}
