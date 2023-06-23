"use client";

import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Answer() {
  const [lastDay, setLastDay] = useState<string | undefined>();
  const [lastDaysBoxOfficeList, setLastDaysBoxOfficeList] = useState<any[]>();
  const [movie1, setMovie1] = useState<string>("");
  const [movie2, setMovie2] = useState<string>("");
  const [movie3, setMovie3] = useState<string>("");
  const [movie4, setMovie4] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 월은 0부터 시작
    const day = today.getDate() - 1;

    if (day < 0) {
      const prevMonth = month - 1 === 0 ? 12 : month - 1;
      const prevYear = month - 1 === 0 ? year - 1 : year;
      const prevMonthLastDate = new Date(prevYear, prevMonth, 0).getDate();
      setLastDay(
        prevYear +
          (prevMonth < 10 ? "0" + String(prevMonth) : String(prevMonth)) +
          (prevMonthLastDate < 10 ? "0" + prevMonthLastDate : prevMonthLastDate)
      );
    } else {
      setLastDay(
        year +
          (month < 10 ? "0" + String(month) : String(month)) +
          (day < 10 ? "0" + day : day)
      );
    }
  }, []);

  useEffect(() => {
    if (lastDay && !lastDaysBoxOfficeList) {
      const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${lastDay}`;

      axios
        .get(url)
        .then(res => {
          const data = res.data;
          setLastDaysBoxOfficeList(data.boxOfficeResult.dailyBoxOfficeList);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [lastDay, lastDaysBoxOfficeList]);

  useEffect(() => {
    if (lastDay && !lastDaysBoxOfficeList) {
      const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${lastDay}`;

      axios
        .get(url)
        .then(res => {
          const data = res.data;
          setLastDaysBoxOfficeList(data.boxOfficeResult.dailyBoxOfficeList);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [lastDay, lastDaysBoxOfficeList]);

  useEffect(() => {
    if (lastDaysBoxOfficeList && lastDaysBoxOfficeList.length > 0) {
      setMovie1(lastDaysBoxOfficeList[0].movieNm);
      setMovie2(lastDaysBoxOfficeList[1].movieNm);
      setMovie3(lastDaysBoxOfficeList[2].movieNm);
      setMovie4(lastDaysBoxOfficeList[3].movieNm);
    }
  }, [lastDaysBoxOfficeList]);

  return (
    <div
      className="cine-answer-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ marginTop: "10px" }} id="1">
        <div className="cine-test-format">
          <div className="cine-quiz">
            <span>{`1. 다음 중 <헤어질 결심>(2022, 박찬욱)에 등장하지 `}</span>
            <span style={{ textDecoration: "underline" }}>않는</span>
            <span> 음식은?</span>
          </div>
          {[1, 2, 3, 4].map(answerIndex => (
            <div
              key={answerIndex}
              className={`cine-answer-answer ${
                answerIndex === 3 ? "cine-answer-selected" : ""
              }`}
            >
              ({answerIndex}){" "}
              {answerIndex === 1
                ? "초밥 // 해준이 서래를 심문할 때 시마스시에서 특초밥 세트를 주문해 함께 먹는다."
                : answerIndex === 2
                ? "볶음밥 // 해준이 서래에게 중국식 볶음밥을 직접 만들어준다."
                : answerIndex === 3
                ? "파스타"
                : answerIndex === 4
                ? "석류 // 해준과 정안이 이포로 이사한 뒤 거실에서 함께 석류를 손질한다."
                : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="cine-answer-line" id="2"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`2. 다음 중 <벌새>(2018, 김보라)에 등장하는 대사가 `}</span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것은?</span>
        </div>

        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `“제 삶도 언젠가 빛이 날까요?”`
            ) : answerIndex === 2 ? (
              `“언니, 그건 지난 학기잖아요.”`
            ) : answerIndex === 3 ? (
              <>
                <span>{`“더 나아지기 위해 우리는 기꺼이 더 나빠졌다. 그게 우리의
                최선이었다.” // <최선의 삶>(2019, 이우정)에 등장하는 대사`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://youtu.be/WjJ6pdVeOAg?t=88"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 영상
                  </a>
                </span>
              </>
            ) : answerIndex === 4 ? (
              `“우리는 늘 누군가를 만나 무언가를 나눈다는 것, 세상은 참 신기하고
                아름답다.”`
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="3"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>
            3. 다음 중 소설가 무라카미 하루키의 소설을 바탕으로 만든 영화가{" "}
          </span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것은?</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `드라이브 마이 카(2021, 하마구치 류스케)`
            ) : answerIndex === 2 ? (
              `버닝(2018, 이창동) // 참고로 원작 소설의 제목은 <헛간을 태우다>이다.`
            ) : answerIndex === 3 ? (
              `토니 타키타니(2004, 이치카와 준)`
            ) : answerIndex === 4 ? (
              <>
                <span>
                  환상의 빛(1995, 고레에다 히로카즈) // 미야모토 테루의 동명
                  소설이 원작이다.
                </span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=49852122&start=slayer"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="4"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          {`4. 배우 양자경은 제95회 아카데미 시상식에서 <에브리씽 에브리웨어 올 앳
          원스>(2022, 댄 콴)로 여우주연상을 수상했다. 다음 빈칸을 채워 해당 수상
          소감을 완성하시오.`}
        </div>
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #0e1111",
            padding: "15px",
          }}
        >
          {`"`}
          <input disabled placeholder="여성" className="cine-test-input" />
          <span>{` 여러분, 그 누구도 여러분께 전성기가 지났다는 말을 하지 못하게 하세요." // SBS가 해당 수상 소감에서 "여성"이라는 단어를 일부러 삭제했다는 의혹이 있었다. 논란이 일자 재편집한 영상이 업로드되었다.`}</span>
          <span className="cine-reference-black">
            <a
              href="https://youtu.be/DZldmL7zeSY?t=109"
              target="_blank"
              style={{ color: "black", textDecoration: "none" }}
            >
              관련 영상
            </a>
          </span>
        </div>
      </div>
      <div className="cine-answer-line" id="5"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`5. 다음 중 칸 영화제에서 황금종려상을 수상하지 `}</span>
          <span style={{ textDecoration: "underline" }}>{`않은`}</span>
          <span>{` 작품은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `가장 따뜻한 색, 블루(2013, 압델라티프 케시시)`
              : answerIndex === 2
              ? `어느 가족(2018, 고레에다 히로카즈)`
              : answerIndex === 3
              ? `노매드랜드(2020, 클로이 자오) // 제78회 베니스 영화제에서 황금사자상을 수상했다.`
              : answerIndex === 4
              ? `슬픔의 삼각형(2022, 루벤 외스틀룬드)`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="6"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          {`6. 다음은 영화 <샤이닝>(1980, 스탠리 큐브릭)의 한 장면이다. 사진 속 인물의 대사로 가장 적절한 것은?`}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/cine-img-6.webp"
            alt="test6-img"
            width={window.innerWidth > 450 ? "280" : "180"}
            height={window.innerWidth > 450 ? "180" : "120"}
            style={{
              marginBottom: window.innerWidth > 450 ? "20px" : "15px",
              marginTop: window.innerWidth > 450 ? "15px" : "15px",
              border: "1px solid black",
            }}
          />
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `"Johnny is coming!"`
            ) : answerIndex === 2 ? (
              `"Johnny, I found you!"`
            ) : answerIndex === 3 ? (
              `"It's me, Johnny!"`
            ) : answerIndex === 4 ? (
              <>
                <span>{`"Here's Johnny!"`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://youtu.be/WDpipB4yehk?t=105"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 영상
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="7"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          {`7. 웨스 크레이븐이 연출을 맡고 케빈 윌리엄슨이 각본을 썼으며, "공포영화의 법칙"이라는 클리셰를 메타픽션적으로 활용해 개봉 당시 흥행과 더불어 작품성까지 크게 호평받은 이 공포영화 시리즈는?`}
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 1 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              <>
                <span>{`<스크림> 시리즈`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://youtu.be/UCf7s7jvP9c?t=602"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 영상
                  </a>
                </span>
              </>
            ) : answerIndex === 2 ? (
              `<13일의 금요일> 시리즈`
            ) : answerIndex === 3 ? (
              `<이블 데드> 시리즈`
            ) : answerIndex === 4 ? (
              `<컨저링> 시리즈`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="8"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`8. <킬 빌> 시리즈에는 데들리 바이퍼스 출신의 4명의 암살자 캐릭터가 등장하는데, 해당 인물들은 모두 독사의 이름을 딴 독특한 코드 네임을 가지고 있다. 다음 중 주인공 베아트릭스 키도의 첫 번째 표적이었던 `}</span>
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            오렌 이시이
          </span>
          <span>의 코드 네임으로 가장 적절한 것은?</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `코퍼헤드 // 버니타 그린`
            ) : answerIndex === 2 ? (
              `캘리포니아 마운틴 스네이크 // 엘 드라이버`
            ) : answerIndex === 3 ? (
              `블랙 맘바 // 베아트릭스 키도`
            ) : answerIndex === 4 ? (
              <>
                <span>{`코튼마우스 // 오렌 이시이`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://namu.wiki/w/데들리%20바이퍼스"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="9"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`9. 다음 중 성소수자 주인공이 등장하지 `}</span>
          <span style={{ textDecoration: "underline" }}>{`않는`}</span>
          <span>{` 영화는?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 2 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              <>
                <span>{`호수의 이방인(2013, 알랭 기로디) // 게이 주인공이 등장한다.`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://www.youtube.com/watch?v=5Ezl0ma9XWc"
                    target="_blank"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 2 ? (
              <>
                <span>{`보이후드(2014, 리처드 링클레이터)`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=BlCivrRQXtY"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 3 ? (
              <>
                <span>{`타오르는 여인의 초상(2019, 셀린 시아마) // 레즈비언 주인공이 등장한다.`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://www.youtube.com/watch?v=rv-m744KKXE"
                    target="_blank"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 4 ? (
              <>
                <span>{`걸(2018, 루카스 돈트) // 트랜스젠더 주인공이 등장한다.`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://www.youtube.com/watch?v=3j5EwmS_ISA"
                    target="_blank"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="10"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`10. 다음 중 아래 제시된 이모지들과 가장 어울리는 왕가위의 영화는?`}</span>
        </div>
        <div className="cine-test10-emoji" style={{ margin: "40px 0" }}>
          📞 🍍 🕒 😎
        </div>
        <div className="cine-test10-emoji">👮‍♂️ 💌 🔑 🛫</div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 2 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `아비정전(1990)`
            ) : answerIndex === 2 ? (
              <>
                <span>{`중경삼림(1994) // 1부에서 하지무는 헤어진 연인을 기다리며 유통기한이 5월 1일까지인 파인애플 통조림을 30일 동안 사 모은다. 그리고 선글라스를 쓴 여인에게서 전화가 오길 기다린다. 2부에서 페이는 경찰 663에게 호감을 느끼고, 그와 연인 관계였던 스튜어디스가 보낸 편지 봉투에서 663의 집 열쇠를 찾는다.`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=OPCug9jyG9k"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 3 ? (
              `해피 투게더(1997)`
            ) : answerIndex === 4 ? (
              `화양연화(2000)`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="11"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`11. 다음 중 <언더 더 스킨>(2013, 조나단 글레이저)에서 에일리언 로라가 지구로 오게 된 이유로 가장 적절한 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 1 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              <>
                <span>{`식량으로 사용할 생물을 찾으려고`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=J7bAZCOk0Sc"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 2 ? (
              `인간을 납치해 실험체로 쓰려고`
            ) : answerIndex === 3 ? (
              `우연히 블랙홀 속으로 빨려들어서`
            ) : answerIndex === 4 ? (
              `우주 탐사 도중 비행체의 결함으로 불시착해서`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="12"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <div>{`12. 다음 빈칸을 적절하게 채워 정답을 완성하시오.`}</div>
          <div
            style={{
              border: "1px solid black",
              padding: "15px 25px",
              marginTop: "10px",
            }}
          >
            {`1895년 겨울, 뤼미에르 형제는 프랑스의 한 카페에서 자신들이 만든 영상을 공개했다. 이때 상영된 50초 분량의 <`}
            <input
              disabled
              placeholder="열차"
              className="cine-test-input"
            ></input>
            <span>{`의 도착>이라는 작품은 세계 최초의 영화로 널리 알려져 있다.`}</span>
            <span
              style={{
                marginLeft: "10px",
                backgroundColor: "#0e1111",
                color: "white",
                padding: "13px 5px",
              }}
            >
              {`"세계 최초의 영화"로 가장 많이 알려진 작품은 <열차의 도착>이지만, 사실 이 작품은 당시 뤼미에르 형제가 상영했던 단편영화 컬렉션 중 하나였다. 해당 컬렉션에서 가장 먼저 상영되었던 작품은 <공장 문을 나서는 노동자들>이었다.`}{" "}
              <span
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#0e1111",
                  color: "white",
                  padding: "5px",
                  border: "2px solid white",
                }}
              >
                <a
                  href="https://www.youtube.com/watch?v=-e1u7Fgoocc"
                  target="_blank"
                  style={{ color: "white", textDecoration: "none" }}
                >{`<열차의 도착> 보러 가기`}</a>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="cine-answer-line" id="13"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`13. 다음 중 국내에서 가장 큰 아이맥스 스크린을 보유하고 있는 영화관은? (2023년 6월 기준)`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 2 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `CGV 왕십리`
            ) : answerIndex === 2 ? (
              <>
                <span>CGV 용산아이파크몰</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.mk.co.kr/news/culture/8781694"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : answerIndex === 3 ? (
              `CGV 천호`
            ) : answerIndex === 4 ? (
              `CGV 서면`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="14"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`14. 다음 중 영화에 관련된 줄임말이 `}</span>
          <span style={{ textDecoration: "underline" }}>아닌</span>
          <span> 것은?</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 2 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `코돌비 // 메가박스 코엑스 돌비 시네마`
              : answerIndex === 2
              ? `분조카 // 분위기 좋은 카페`
              : answerIndex === 3
              ? `용아맥 // CGV 용산아이파크몰 아이맥스`
              : answerIndex === 4
              ? `영스엑 // CGV 영등포 스크린 X`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="15"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`15. 다음 중 <타미 페이의 눈>(2021, 마이클 쇼월터)에 등장하는 타미 페이 바커의 직업으로 가장 적절한 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `기자`
            ) : answerIndex === 2 ? (
              `미용사`
            ) : answerIndex === 3 ? (
              `안경사`
            ) : answerIndex === 4 ? (
              <>
                <span>전도사</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=eMMLRnXPPJk"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="16"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`16. 다음 중 세계 최초의 장편 유성영화는?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 2 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `전함 포템킨(1925, 세르게이 에이젠슈타인)`
            ) : answerIndex === 2 ? (
              <>
                <span>{`재즈 싱어(1927, 앨런 크로슬랜드)`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://ko.wikipedia.org/wiki/재즈_싱어"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : answerIndex === 3 ? (
              `모던 타임즈(1936, 찰리 채플린)`
            ) : answerIndex === 4 ? (
              `시민 케인(1941, 오슨 웰스)`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="17"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>
            {`17. 다음 중 어제(${lastDay
              ?.split("")
              .slice(0, 4)
              .join("")}.${lastDay?.split("").slice(4, 6).join("")}.${lastDay
              ?.split("")
              .slice(6, 8)
              .join("")}.) 박스오피스 1위를 기록한 영화는?`}{" "}
          </span>
          <span style={{ color: "gray" }}>
            (* 10초 이상 기다려도 보기가 뜨지 않는다면 다음 문제로
            넘어가주세요.)
          </span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `${movie2} // 2위`
              : answerIndex === 2
              ? `${movie3} // 3위`
              : answerIndex === 3
              ? `${movie1} // 1위`
              : answerIndex === 4
              ? `${movie4} // 4위`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="18"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`18. <다가오는 것들>(2016, 미아 한센 러브)에서 주인공 나탈리는 파리의 한 고등학교에서 교사로 일한다. 다음 중 나탈리가 가르치는 과목으로 가장 적절한 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `문학`
            ) : answerIndex === 2 ? (
              `수학`
            ) : answerIndex === 3 ? (
              <>
                <span>{`철학`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=VtmE1AAvncE"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 4 ? (
              `미술`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="19"></div>
      <div className="cine-test-format">
        <div
          className="cine-quiz"
          style={{
            marginBottom: window.innerWidth > 450 ? "10px" : "0",
          }}
        >{`19. 다음 중 <라쇼몽>(1950, 구로사와 아키라)에서 미후네 토시로가 연기한 산적 캐릭터의 이름으로 가장 적절한 것은?`}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/cine-img-19.webp"
            alt="test19-img"
            width={window.innerWidth > 450 ? "280" : "180"}
            height={window.innerWidth > 450 ? "210" : "140"}
            style={{
              marginBottom: "15px",
              marginTop: "5px",
              border: "1px solid black",
            }}
          />
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `토모야 // 세리자와 토모야는 <스즈메의 문단속>에 등장하는 주인공 소타의 친구 이름이다.`
            ) : answerIndex === 2 ? (
              `탄지로 // 카마도 탄지로는 <귀멸의 칼날> 시리즈에 등장하는 주인공 이름이다.`
            ) : answerIndex === 3 ? (
              `타케노리 // 아카기 타케노리는 <슬램덩크> 시리즈에 등장하는 채치수의 원작 이름이다.`
            ) : answerIndex === 4 ? (
              <>
                <span>{`타조마루`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=Zqoyl2p8_lw&t=112s"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="20"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`20. <더 랍스터>(2015, 요르고스 란티모스)에서 호텔에 입소하게 된 사람들은 45일 동안 특정 조건을 만족시키지 않으면 동물로 변하게 된다. 다음 중 해당 조건으로 가장 적절한 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `한 명 이상의 인간을 살해한다.`
            ) : answerIndex === 2 ? (
              `자신이 정한 한 가지 종류의 음식만 먹는다.`
            ) : answerIndex === 3 ? (
              `말을 하지 않는다.`
            ) : answerIndex === 4 ? (
              <>
                <span>{`연인을 찾는다.`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=vU29VfayDMw&t=16s"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="21"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`21. 다음은 <로제타>(1999, 다르덴 형제)의 줄거리 일부이다. 다음 중 빈칸에 가장 적절한 단어는?`}</span>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "15px",
            border: "1px solid #0e1111",
            padding: "15px 25px",
          }}
        >
          <span>
            {` 알코올 중독에 빠진 어머니와 함께 이동식 트레일러에서 생활하고 있는 18살의 로제타에게 가난은 일상이다. 헌옷을 주워 어머니가 수선하면 내다 팔고, 먹을 음식이 없어 강에서 숭어를 잡기도 한다. 공장에서 일한 기간이 짧아 실업급여는 나오지 않고, 다른 일거리를 찾는 일도 어렵기만 하다. 그러다 로제타는 근처 `}
          </span>
          <input disabled placeholder="와플" className="cine-test-input" />
          <span>{` 가게에서 일하는 리케와 친구가 된다.`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `신발`
            ) : answerIndex === 2 ? (
              `중고책`
            ) : answerIndex === 3 ? (
              `과일`
            ) : answerIndex === 4 ? (
              <>
                <span>{`와플`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=woN2P4r65oA"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="22"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`22. 다음 중 레일을 깔아 수레에 카메라를 설치한 뒤, 정해진 노선에 따라 지면을 이동하며 안정적으로 촬영하는 방식을 뜻하는 용어로 가장 적절한 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 1 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              <>
                <span>{`달리 샷`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://youtu.be/ramDgHoBSvc?t=952"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 영상
                  </a>
                </span>
              </>
            ) : answerIndex === 2 ? (
              `크레인 샷 // 크레인과 같은 높은 지지대 역할을 하는 장비에 장착해 수평, 수직 축으로 촬영하는 기법`
            ) : answerIndex === 3 ? (
              `핸드헬드 샷 // 카메라를 손으로 잡거나 어깨에 들쳐 메고 찍는 촬영하는 기법`
            ) : answerIndex === 4 ? (
              `롱 샷 // 카메라와 피사체 간의 거리를 멀리 두고 촬영하는 기법`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="23"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`23. 다음 중 미국 영화 산업의 중심지인 할리우드가 위치한 지역은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `뉴욕`
            ) : answerIndex === 2 ? (
              `필라델피아`
            ) : answerIndex === 3 ? (
              `샌디에이고`
            ) : answerIndex === 4 ? (
              <>
                <span>{`로스앤젤레스`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://ko.wikipedia.org/wiki/할리우드"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="24"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">{`24. <레이디 버드>(2017), <작은 아씨들>(2019), <바비>(2023)를 연출했으며, 배우로도 활동 중인 다음 사진 속 감독의 이름은?`}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/cine-img-24.webp"
            alt="test24-img"
            width={window.innerWidth > 450 ? "280" : "180"}
            height={window.innerWidth > 450 ? "190" : "120"}
            style={{
              marginBottom: window.innerWidth > 450 ? "25px" : "15px",
              marginTop: window.innerWidth > 450 ? "15px" : "5px",
              border: "1px solid black",
            }}
          />
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `패티 젠킨스`
            ) : answerIndex === 2 ? (
              `캐서린 비글로우`
            ) : answerIndex === 3 ? (
              `소피아 코폴라`
            ) : answerIndex === 4 ? (
              <>
                <span>{`그레타 거윅`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://ko.wikipedia.org/wiki/그레타_거윅"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="25"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`25. 다음은 <마블 시네마틱 유니버스 페이즈 4> 시리즈를 무작위로 나열한 것이다. 해당 영화들을 `}</span>
          <span style={{ textDecoration: "underline" }}>개봉 순</span>
          <span>으로 올바르게 정렬한 것은?</span>
        </div>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            border: "1px solid #0e1111",
            padding: "15px 25px",
          }}
        >
          <div>{`ㄱ. 블랙 위도우 // 2021년 7월`}</div>
          <div>{`ㄴ. 블랙 팬서: 와칸다 포에버 // 2022년 11월`}</div>
          <div>{`ㄷ. 이터널스 // 2021년 11월`}</div>
          <div>{`ㄹ. 닥터 스트레인지: 대혼돈의 멀티버스 // 2022년 5월`}</div>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `ㄱ → ㄹ → ㄴ → ㄷ`
              : answerIndex === 2
              ? `ㄱ → ㄹ → ㄷ → ㄴ`
              : answerIndex === 3
              ? `ㄱ → ㄷ → ㄴ → ㄹ`
              : answerIndex === 4
              ? `ㄱ → ㄷ → ㄹ → ㄴ`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="26"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`26. 다음 중 <엑스맨 2>(2003), <엑스맨: 아포칼립스>(2016), <엑스맨: 다크 피닉스>(2019)에 등장하는 `}</span>
          <span style={{ textDecoration: "underline" }}>{`나이트크롤러`}</span>
          <span>{`의 능력으로 가장 적절한 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 4 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              <>
                <span>{`핌 입자를 사용해 몸 크기를 축소하거나 확대하고, 생체 전기로 에너지 광선을 발사한다. // <마블 유니버스> 시리즈에 등장하는 캐릭터인 와스프에 대한 설명이다.`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://namu.wiki/w/와스프(마블%20코믹스)"
                    target="_blank"
                    style={{ color: "#0e1111", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : answerIndex === 2 ? (
              <>
                <span>{`세포와 조직을 자유자재로 조작해 다른 사람의 외형으로 변신할 수 있고 목소리까지 복제한다. // <엑스맨 유니버스> 시리즈에 등장하는 캐릭터인 미스틱에 대한 설명이다.`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://namu.wiki/w/미스틱(엑스맨%20유니버스)"
                    target="_blank"
                    style={{ color: "#0e1111", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : answerIndex === 3 ? (
              <>
                <span>{`상대의 에너지를 흡수한다. 뮤턴트의 에너지를 흡수해 그 능력을 사용할 수도 있다. // <마블 유니버스> 시리즈에 등장하는 캐릭터인 로그에 대한 설명이다.`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://namu.wiki/w/로그(엑스맨%20유니버스)"
                    target="_blank"
                    style={{ color: "#0e1111", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : answerIndex === 4 ? (
              <>
                <span>{`차원을 통과해 텔레포트할 수 있다. 뼈 구조가 유연해 뛰어난 민첩성과 균형 감각을 가지고 있다.`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://namu.wiki/w/나이트크롤러(엑스맨%20유니버스)"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="27"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`27. 오즈의 마법사(1939, 빅터 플레밍)에서 주인공 도로시는 어떤 행위를 통해 무사히 고향으로 돌아갈 수 있게 된다. 다음 중 그 행위로 가장 적절한 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `문고리를 반대 방향으로 돌린다.`
            ) : answerIndex === 2 ? (
              `무지개 지팡이를 휘두른다.`
            ) : answerIndex === 3 ? (
              <>
                <span>{`구두 뒤꿈치를 맞부딪친다.`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://youtu.be/ooM-RGUTe2E?t=26"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 영상
                  </a>
                </span>
              </>
            ) : answerIndex === 4 ? (
              `파란 요정에게 기도를 한다.`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="28"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`28. 다음 설명에 가장 잘 부합하는 영화의 제목은?`}</span>
        </div>
        <div
          style={{
            border: "1px solid black",
            padding: "0 15px 0 5px",
            margin: "15px 0 20px 0",
          }}
        >
          <ul>
            <li>거스 밴 샌트가 연출했다.</li>
            <li>숀 펜이 출연해 제81회 아카데미에서 남우주연상을 수상했다.</li>
            <li>
              미국의 성소수자 인권운동가이자 정치가인 실존 인물의 삶을 바탕으로
              만든 전기 영화이다.
            </li>
          </ul>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 1 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              <>
                <span>{`밀크`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.youtube.com/watch?v=UB6Rd0tw9QI"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 2 ? (
              <>
                <span>{`미스테리어스 스킨`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://www.youtube.com/watch?v=MYv5V6W4vvI"
                    target="_blank"
                    style={{ color: "#0e1111", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 3 ? (
              <>
                <span>{`콜 미 바이 유어 네임`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://www.youtube.com/watch?v=am_aqh4qW5c"
                    target="_blank"
                    style={{ color: "#0e1111", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : answerIndex === 4 ? (
              <>
                <span>{`필라델피아`}</span>
                <span className="cine-reference-black">
                  <a
                    href="https://www.youtube.com/watch?v=CKDz2LVHz0Y"
                    target="_blank"
                    style={{ color: "#0e1111", textDecoration: "none" }}
                  >
                    예고편
                  </a>
                </span>
              </>
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="29"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`29. 다음 중 픽사 애니메이션 스튜디오에서 만든 영화가 `}</span>
          <span style={{ textDecoration: "underline" }}>{`아닌`}</span>
          <span>{` 것은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 2 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `엘리멘탈(2023, 피터 손)`
              : answerIndex === 2
              ? `보스 베이비(2017, 톰 맥그라스) // 드림웍스 애니메이션 스튜디오에서 만들었다.`
              : answerIndex === 3
              ? `라따뚜이(2007, 브래드 버드)`
              : answerIndex === 4
              ? `벅스 라이프(1998, 존 라세터)`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line" id="30"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          <span>{`30. 한국영상자료원에서 운영하고 있는 시네마테크(KOFA)는 일종의 영화 도서관으로, 영화 관련 영상를 보존하고 이를 모든 일반인에게 무료로 공개해 해당 자료의 가치를 공유한다. 다음 중 국내 시네마테크가 위치해 있는 지역은?`}</span>
        </div>
        {[1, 2, 3, 4].map(answerIndex => (
          <div
            key={answerIndex}
            className={`cine-answer-answer ${
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1 ? (
              `서울특별시 광진구`
            ) : answerIndex === 2 ? (
              `서울특별시 종로구`
            ) : answerIndex === 3 ? (
              <>
                <span>{`서울특별시 마포구`}</span>
                <span className="cine-reference-white">
                  <a
                    href="https://www.koreafilm.or.kr/main"
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    관련 자료
                  </a>
                </span>
              </>
            ) : answerIndex === 4 ? (
              `부산광역시 해운대구`
            ) : (
              ``
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
