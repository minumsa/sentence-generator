"use client";

import React, { useState, useEffect } from "react";

import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";
import Test4 from "./Test4";
import Test5 from "./Test5";
import Test6 from "./Test6";
import Test7 from "./Test7";
import Test8 from "./Test8";
import Test9 from "./Test9";
import Test10 from "./Test10";
import Test11 from "./Test11";
import Test12 from "./Test12";
import Test13 from "./Test13";
import Test14 from "./Test14";
import Test15 from "./Test15";
import Test16 from "./Test16";
import Test17 from "./Test17";
import Test18 from "./Test18";
import Test19 from "./Test19";
import Test20 from "./Test20";
import Test21 from "./Test21";
import Test22 from "./Test22";
import Test23 from "./Test23";
import Test24 from "./Test24";
import Test25 from "./Test25";
import Test26 from "./Test26";
import Test27 from "./Test27";
import Test28 from "./Test28";
import Test29 from "./Test29";
import Test30 from "./Test30";
import Test0 from "./Test0";
import Test31 from "./Test31";
import Image from "next/image";
import Answer from "./Answer";
import Script from "next/script";

declare global {
  // Kakao 전역에서 접근 가능하도록
  interface Window {
    Kakao: any;
  }
}

const kakaoInit = () => {
  // 페이지가 로드시 실행
  if (!window.Kakao.isInitialized())
    // 선언되지 않았을 때만 실행하도록 if문 추가
    window.Kakao.init("8b2e769ecd8f1b59e13d651bd3177712");
};

export default function Cinephile() {
  const [testNumber, setTestNumber] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const minTestNumber = 0;
  const maxTestNumber = 31;
  const progressPercent = Math.floor((testNumber / (maxTestNumber - 1)) * 100);
  const [progressContent, setProgressContent] = useState<any>();
  const [buttonContent, setButtonContent] = useState<any>();
  const [contentStyle, setContentStyle] = useState<any>();
  const [navStyle, setNavStyle] = useState<any>();
  const [value, setValue] = useState<string>("참가자");
  const [scoreComment, setScoreComment] = useState<string>("");
  const [testMove, setTestMove] = useState<any>();
  const [scoreToStar, setScoreToStar] = useState<string>("⭐️");
  const convertedScore = Math.floor((score / 120) * 5 * 2) / 2; // 점수를 5점 만점으로 환산하고 0.5 단위로 변경

  useEffect(() => {
    if (convertedScore >= 0 && convertedScore < 1) {
      setScoreToStar("⭐️");
    } else if (convertedScore >= 1 && convertedScore < 2) {
      setScoreToStar("⭐️⭐️");
    } else if (convertedScore >= 2 && convertedScore < 3) {
      setScoreToStar("⭐️⭐️⭐️");
    } else if (convertedScore >= 3 && convertedScore < 4) {
      setScoreToStar("⭐️⭐️⭐️⭐️");
    } else if (convertedScore >= 4) {
      setScoreToStar("⭐️⭐️⭐️⭐️⭐️");
    }
  }, [convertedScore]);

  const onShare = async () => {
    await window.Kakao.Share.sendDefault({
      objectType: "text",
      text: `나의 시네필 평점은? ${scoreToStar}`,
      link: {
        mobileWebUrl: "https://divdivdiv.com/cinephile-test",
        webUrl: "https://divdivdiv.com/cinephile-test",
      },
    });
  };

  function handleTest() {
    switch (testNumber) {
      case 0:
        return <Test0 />;
      case 1:
        return <Test1 score={score} setScore={setScore} />;
      case 2:
        return <Test2 score={score} setScore={setScore} />;
      case 3:
        return <Test3 score={score} setScore={setScore} />;
      case 4:
        return <Test4 score={score} setScore={setScore} />;
      case 5:
        return <Test5 score={score} setScore={setScore} />;
      case 6:
        return <Test6 score={score} setScore={setScore} />;
      case 7:
        return <Test7 score={score} setScore={setScore} />;
      case 8:
        return <Test8 score={score} setScore={setScore} />;
      case 9:
        return <Test9 score={score} setScore={setScore} />;
      case 10:
        return <Test10 score={score} setScore={setScore} />;
      case 11:
        return <Test11 score={score} setScore={setScore} />;
      case 12:
        return <Test12 score={score} setScore={setScore} />;
      case 13:
        return <Test13 score={score} setScore={setScore} />;
      case 14:
        return <Test14 score={score} setScore={setScore} />;
      case 15:
        return <Test15 score={score} setScore={setScore} />;
      case 16:
        return <Test16 score={score} setScore={setScore} />;
      case 17:
        return <Test17 score={score} setScore={setScore} />;
      case 18:
        return <Test18 score={score} setScore={setScore} />;
      case 19:
        return <Test19 score={score} setScore={setScore} />;
      case 20:
        return <Test20 score={score} setScore={setScore} />;
      case 21:
        return <Test21 score={score} setScore={setScore} />;
      case 22:
        return <Test22 score={score} setScore={setScore} />;
      case 23:
        return <Test23 score={score} setScore={setScore} />;
      case 24:
        return <Test24 score={score} setScore={setScore} />;
      case 25:
        return <Test25 score={score} setScore={setScore} />;
      case 26:
        return <Test26 score={score} setScore={setScore} />;
      case 27:
        return <Test27 score={score} setScore={setScore} />;
      case 28:
        return <Test28 score={score} setScore={setScore} />;
      case 29:
        return <Test29 score={score} setScore={setScore} />;
      case 30:
        return <Test30 score={score} setScore={setScore} />;
      case 31:
        return <Test31 value={value} score={score} />;
      case 32:
        return <Answer />;
      default:
        return null;
    }
  }

  useEffect(() => {
    let scoreComment = "";
    switch (true) {
      case score >= 0 && score <= 11:
        scoreComment = `${value} 님, 문제 푼 거 맞나요? 🙄`;
        break;
      case score >= 12 && score <= 23:
        scoreComment = `그래도 노력은 인정합니다! 👏`;
        break;
      case score >= 24 && score <= 35:
        scoreComment = `어느 정도 맞췄지만 시네필이 되려면 아직 멀었습니다. 🫣`;
        break;
      case score >= 36 && score <= 47:
        scoreComment = `시네필은 아니지만 영화를 상당히 많이 보셨군요? 😮`;
        break;
      case score >= 48 && score <= 59:
        scoreComment = `시네필은 아니지만 상당히 훌륭합니다! ☺️`;
        break;
      case score >= 60 && score <= 71:
        scoreComment = `${value} 님은 시네필 꿈나무입니다! ⭐️`;
        break;
      case score >= 72 && score <= 83:
        scoreComment = `에? ${value} 님은 애매한 시네필입니다! 🤨`;
        break;
      case score >= 84 && score <= 95:
        scoreComment = `오오! ${value} 님은 시네필이 분명합니다. 🥳`;
        break;
      case score >= 96 && score <= 107:
        scoreComment = `시네필 출두요! ${value} 님은 거의 모르는 영화가 없으시군요? 🥸`;
        break;
      case score >= 108:
        scoreComment = `놀랍습니다! ${value} 님은 상위 1% 시네필입니다. 🤩`;
        break;
      default:
        scoreComment = "";
    }
    setScoreComment(scoreComment);
  }, [score, value]);

  useEffect(() => {
    if (testNumber === 0 || testNumber > 30) {
      setProgressContent("");
    } else if (testNumber < 32) {
      setProgressContent(
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="cine-progress-bar">
            <div
              className="cine-progress-content"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: `${(testNumber / (maxTestNumber - 1)) * 100}%`,
                backgroundColor: "#0e1111",
              }}
            >
              <div className="cine-progress-font" style={{ color: "white" }}>
                {progressPercent > 5 ? `${progressPercent}%` : ``}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }, [testNumber, value]);

  useEffect(() => {
    if (testNumber === 0) {
      setButtonContent(
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <input
            autoFocus
            type="string"
            placeholder="닉네임 입력"
            className="cine-name-input"
            onChange={e => setValue(e.target.value)}
          />
          <div
            className="cine-next-button-flex"
            onClick={() => {
              if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
            }}
          >
            <div className="cine-next-button">테스트 시작</div>
          </div>
        </div>
      );
    } else if (testNumber < 30) {
      setButtonContent(
        <div
          className="cine-next-button-flex"
          onClick={() => {
            if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
          }}
        >
          <div className="cine-next-button">다음 문제</div>
        </div>
      );
    } else if (testNumber === 30) {
      setButtonContent(
        <div
          className="cine-next-button-flex"
          onClick={() => {
            if (testNumber < maxTestNumber) setTestNumber(x => x + 1);
          }}
        >
          <div className="cine-next-button">결과 보기</div>
        </div>
      );
    } else if (testNumber === 31) {
      setButtonContent(
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: "30px",
            }}
          >
            <div className="cine-score-comment">{scoreComment}</div>
            <div
              className="cine-answer-button-flex"
              style={{ marginTop: "10px" }}
              onClick={() => {
                setTestNumber(32);
              }}
            >
              <div className="cine-next-button">정답 및 해설 보기</div>
            </div>
            <div
              className="cine-twitter-button-flex"
              style={{ marginTop: "10px" }}
              onClick={() => {
                window.open(
                  `https://twitter.com/share?url=https://divdivdiv.com/cinephile-test&text=나의 시네필 평점은? ${scoreToStar}`
                );
              }}
            >
              <div className="cine-next-button">트위터 공유하기</div>
            </div>
            <div
              className="cine-kakao-button-flex"
              style={{ marginTop: "10px" }}
              onClick={() => {
                onShare();
              }}
            >
              <div className="cine-next-button">카카오톡 공유하기</div>
            </div>
            <div
              className="cine-challenge-button-flex"
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                setTestNumber(0);
                setScore(0);
                setValue("참가자");
              }}
            >
              <Image
                src="https://quiz.watcha.io/retry.svg"
                alt="retry"
                width={25}
                height={25}
              />
              <div className="cine-next-button" style={{ marginLeft: "5px" }}>
                다시 도전
              </div>
            </div>
          </div>
        </>
      );
    } else if (testNumber === 32) {
      setButtonContent(
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              className="cine-answer-button-flex"
              style={{ marginTop: "10px" }}
              onClick={() => {
                setTestNumber(0);
                setScore(0);
                setValue("참가자");
              }}
            >
              <div className="cine-next-button">처음으로 돌아가기</div>
            </div>{" "}
            <div
              className="cine-answer-button-flex"
              style={{ marginTop: "10px", marginBottom: "60px" }}
              onClick={() => {
                setTestNumber(31);
              }}
            >
              <div className="cine-next-button">이전 페이지로 돌아가기</div>
            </div>
          </div>
        </>
      );
    }
  }, [testNumber, value]);

  useEffect(() => {
    if (testNumber === 0) {
      setContentStyle({ marginBottom: "20px" });
    } else if (testNumber > 0) {
      setContentStyle({ marginBottom: "20px" });
    } else if (testNumber > 30) {
      setContentStyle({});
    }
  }, [testNumber]);

  useEffect(() => {
    if (testNumber === 0) {
      setNavStyle({ height: "30px" });
    } else if (testNumber > 0) {
      setNavStyle({ height: "90px" });
    }
  }, [testNumber]);

  function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      text = text.substring(0, maxLength) + "...";
      const lastSpaceIndex = text.lastIndexOf(" ");
      if (lastSpaceIndex !== -1) {
        text = text.substring(0, lastSpaceIndex) + "...";
      }
    }
    return text;
  }

  const options = [
    {
      value: 1,
      text: "1. 다음 중 <헤어질 결심>(2022, 박찬욱)에 등장하지 않는 음식은?",
    },
    {
      value: 2,
      text: "2. 다음 중 <벌새>(2018, 김보라)에 등장하는 대사가 아닌 것은?",
    },
    {
      value: 3,
      text: "3. 다음 중 소설가 무라카미 하루키의 소설을 바탕으로 만든 영화가 아닌 것은?",
    },
    {
      value: 4,
      text: "4. 배우 양자경은 제95회 아카데미 시상식에서 <에브리씽 에브리웨어 올 앳 원스>(2022, 댄 콴)로 여우주연상을 수상했다. 다음 빈칸을 채워 해당 수상 소감을 완성하시오.",
    },
    {
      value: 5,
      text: "5. 다음 중 칸 영화제에서 황금종려상을 수상하지 않은 작품은?",
    },
    {
      value: 6,
      text: "6. 다음은 영화 <샤이닝>(1980, 스탠리 큐브릭)의 한 장면이다. 사진 속 인물의 대사로 가장 적절한 것은?",
    },
    {
      value: "7",
      text: `7. 웨스 크레이븐이 연출을 맡고 케빈 윌리엄슨이 각본을 썼으며, "공포영화의 법칙"이라는 클리셰를 메타픽션적으로 활용해 개봉 당시 흥행과 더불어 작품성까지 크게 호평받은 이 공포영화 시리즈는?`,
    },
    {
      value: 8,
      text: "8. <킬 빌> 시리즈에는 데들리 바이퍼스 출신의 4명의 암살자 캐릭터가 등장하는데, 해당 인물들은 모두 독사의 이름을 딴 독특한 코드 네임을 가지고 있다. 다음 중 주인공 베아트릭스 키도의 첫 번째 표적이었던 오렌 이시이의 코드 네임으로 가장 적절한 것은?",
    },
    {
      value: 9,
      text: "9. 다음 중 성소수자 주인공이 등장하지 않는 영화는?",
    },
    {
      value: 10,
      text: "10. 다음 중 아래 제시된 이모지들과 가장 어울리는 왕가위의 영화는?",
    },
    {
      value: 11,
      text: "11. 다음 중 <언더 더 스킨>(2013, 조나단 글레이저)에서 에일리언 로라가 지구로 오게 된 이유로 가장 적절한 것은?",
    },
    {
      value: 12,
      text: "12. 1895년 겨울, 뤼미에르 형제는 프랑스의 한 카페에서 자신들이 만든 영상을 공개했다.",
    },
    {
      value: 13,
      text: "13. 다음 중 국내에서 가장 큰 아이맥스 스크린을 보유하고 있는 영화관은? (2023년 6월 기준)",
    },
    {
      value: 14,
      text: "14. 다음 중 영화에 관련된 줄임말이 아닌 것은?",
    },
    {
      value: 15,
      text: "15. 다음 중 <타미 페이의 눈>(2021, 마이클 쇼월터)에 등장하는 타미 페이 바커의 직업으로 가장 적절한 것은?",
    },
    {
      value: 16,
      text: "16. 다음 중 세계 최초의 장편 유성영화는?",
    },
    {
      value: 17,
      text: "17. 다음 중 어제 박스오피스 1위를 기록한 영화는?",
    },
    {
      value: 18,
      text: "18. <다가오는 것들>(2016, 미아 한센 러브)에서 주인공 나탈리는 파리의 한 고등학교에서 교사로 일한다. 다음 중 나탈리가 가르치는 과목으로 가장 적절한 것은?",
    },
    {
      value: 19,
      text: "19. 다음 중 <라쇼몽>(1950, 구로사와 아키라)에서 미후네 토시로가 연기한 산적 캐릭터의 이름으로 가장 적절한 것은?",
    },

    {
      value: 20,
      text: "20. <더 랍스터>(2015, 요르고스 란티모스)에서 호텔에 입소하게 된 사람들은 45일 동안 특정 조건을 만족시키지 않으면 동물로 변하게 된다. 다음 중 해당 조건으로 가장 적절한 것은?",
    },
    {
      value: 21,
      text: "21. 다음은 <로제타>(1999, 다르덴 형제)의 줄거리 일부이다. 다음 중 빈칸에 가장 적절한 단어는?",
    },
    {
      value: 22,
      text: "22. 다음 중 레일을 깔아 수레에 카메라를 설치한 뒤, 정해진 노선에 따라 지면을 이동하며 안정적으로 촬영하는 방식을 뜻하는 용어로 가장 적절한 것은?",
    },
    {
      value: 23,
      text: "23. 다음 중 미국 영화 산업의 중심지인 할리우드가 위치한 지역은?",
    },
    {
      value: 24,
      text: "24. <레이디 버드>(2017), <작은 아씨들>(2019), <바비>(2023)를 연출했으며, 배우로도 활동 중인 다음 사진 속 감독의 이름은?",
    },
    {
      value: 25,
      text: "25. 다음은 <마블 시네마틱 유니버스 페이즈 4> 시리즈를 무작위로 나열한 것이다. 해당 영화들을 개봉 순으로 올바르게 정렬한 것은?",
    },
    {
      value: 26,
      text: "26. 다음 중 <엑스맨 2>(2003), <엑스맨: 아포칼립스>(2016), <엑스맨: 다크 피닉스>(2019)에 등장하는 나이트크롤러의 능력으로 가장 적절한 것은?",
    },
    {
      value: 27,
      text: "27. 오즈의 마법사(1939, 빅터 플레밍)에서 주인공 도로시는 어떤 행위를 통해 무사히 고향으로 돌아갈 수 있게 된다. 다음 중 그 행위로 가장 적절한 것은?",
    },
    {
      value: 28,
      text: "28. 다음 설명에 가장 잘 부합하는 영화의 제목은?",
    },
    {
      value: 29,
      text: "29. 다음 중 픽사 애니메이션 스튜디오에서 만든 영화가 아닌 것은?",
    },
    {
      value: 30,
      text: "30. 한국영상자료원에서 운영하고 있는 시네마테크(KOFA)는 일종의 영화 도서관으로, 영화 관련 영상를 보존하고 이를 모든 일반인에게 무료로 공개해 해당 자료의 가치를 공유한다. 다음 중 국내 시네마테크가 위치해 있는 지역은?",
    },
  ];

  const truncatedOptions = options.map(option => ({
    value: option.value,
    text: truncateText(option.text, 39),
  }));

  function handleSelectChange(event: { target: { value: any } }) {
    const selectedValue = event.target.value;
    if (selectedValue) {
      window.location.href = `#${selectedValue}`;
    }
  }

  return (
    <div className="cine-container">
      <div className="cine-flex-container">
        <div
          className={
            testNumber === 32 ? "cine-nav-32-container" : "cine-nav-container"
          }
          style={
            testNumber < 31
              ? navStyle
              : testNumber === 31
              ? { height: "30px" }
              : testNumber === 32
              ? { ...navStyle, height: "0" }
              : navStyle
          }
        >
          <div
            className="cine-test-title"
            onClick={() => {
              // if (testNumber > 0) {
              setTestNumber(31);
              // }
            }} // TODO: 테스트용 온 클릭, 나중에 빼기!!
          >
            <div>{"시네필 테스트"}</div>
          </div>
          <div
            className={testNumber === 32 ? "cine-hide" : ""}
            style={testNumber === 32 ? {} : { display: "none" }}
          >
            <div className="cine-select-div">
              <select
                className="cine-hide-select"
                name="tests"
                id="test-select"
                style={{ width: "100%" }}
                onChange={handleSelectChange}
              >
                {truncatedOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {progressContent}
        </div>
        <div className="cine-content-container" style={contentStyle}>
          {handleTest()}
          {/* TODO: 테스트용 페이지 이동 기능, 나중에 빼기!! */}
          {/* <input
            onChange={e => {
              setTestMove(Number(e.target.value));
            }}
          ></input>
          <button
            onClick={() => {
              setTestNumber(testMove);
            }}
            style={{ fontSize: "25px" }}
          >
            이동
          </button> */}
        </div>
        <div className="cine-footer-container">{buttonContent}</div>
      </div>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={kakaoInit}
      />
    </div>
  );
}
