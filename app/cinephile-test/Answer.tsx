"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Answer() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "50px" }}
    >
      <div style={{ marginTop: "10px" }}>
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
                ? "초밥"
                : answerIndex === 2
                ? "볶음밥"
                : answerIndex === 3
                ? "파스타"
                : answerIndex === 4
                ? "석류"
                : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="cine-answer-line"></div>
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
            {answerIndex === 1
              ? `“제 삶도 언젠가 빛이 날까요?”`
              : answerIndex === 2
              ? `“언니, 그건 지난 학기잖아요.”`
              : answerIndex === 3
              ? `“더 나아지기 위해 우리는 기꺼이 더 나빠졌다. 그게 우리의
                최선이었다.” // <최선의 삶>(2019, 이우정)에 등장하는 대사`
              : answerIndex === 4
              ? `“우리는 늘 누군가를 만나 무언가를 나눈다는 것, 세상은 참 신기하고
                아름답다.”`
              : ""}
          </div>
        ))}
      </div>
      <div className="cine-answer-line"></div>
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
            {answerIndex === 1
              ? `드라이브 마이 카(2021, 하마구치 류스케)`
              : answerIndex === 2
              ? `버닝(2018, 이창동)`
              : answerIndex === 3
              ? `토니 타키타니(2004, 이치카와 준)`
              : answerIndex === 4
              ? `환상의 빛(1995, 고레에다 히로카즈) // 소설가 미야모토 테루의 동명소설이 원작이다.`
              : ""}
          </div>
        ))}
      </div>
      <div className="cine-answer-line"></div>
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
          {` 여러분, 그 누구도 여러분께 전성기가 지났다는 말을 하지 못하게 하세요."`}
        </div>
      </div>
      <div className="cine-answer-line"></div>
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
      <div className="cine-answer-line"></div>
      <div className="cine-test-format">
        <div className="cine-quiz">
          {`6. 다음은 영화 <샤이닝>(1980, 스탠리 큐브릭)의 한 장면이다. 사진 속 인물의 대사로 가장 적절한 것은?`}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src="/test6-img.jpeg"
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
            {answerIndex === 1
              ? `"Johnny is coming!"`
              : answerIndex === 2
              ? `"Johnny, I found you!"`
              : answerIndex === 3
              ? `"It's me, Johnny!"`
              : answerIndex === 4
              ? `"Here's Johnny!"`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line"></div>
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
            {answerIndex === 1
              ? `<스크림> 시리즈`
              : answerIndex === 2
              ? `<13일의 금요일> 시리즈`
              : answerIndex === 3
              ? `<이블 데드> 시리즈`
              : answerIndex === 4
              ? `<컨저링> 시리즈`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line"></div>
      <div
        className="cine-test-format"
        style={
          {
            // marginTop: window.innerWidth > 450 ? "15px" : "0",
            // marginBottom: window.innerWidth > 450 ? "20px" : "0",
          }
        }
      >
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
              answerIndex === 3 ? "cine-answer-selected" : ""
            }`}
          >
            ({answerIndex}){" "}
            {answerIndex === 1
              ? `코퍼헤드 // 버니타 그린`
              : answerIndex === 2
              ? `캘리포니아 마운틴 스네이크 // 엘 드라이버`
              : answerIndex === 3
              ? `블랙 맘바 // 베아트릭스 키도`
              : answerIndex === 4
              ? `코튼마우스 // 오렌 이시이`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line"></div>
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
            {answerIndex === 1
              ? `호수의 이방인(2013, 알랭 기로디)`
              : answerIndex === 2
              ? `보이후드(2014, 리처드 링클레이터)`
              : answerIndex === 3
              ? `타오르는 여인의 초상(2019, 셀린 시아마)`
              : answerIndex === 4
              ? `걸(2018, 루카스 돈트)`
              : ``}
          </div>
        ))}
      </div>
      <div className="cine-answer-line"></div>
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
            {answerIndex === 1
              ? `아비정전(1990)`
              : answerIndex === 2
              ? `중경삼림(1994)`
              : answerIndex === 3
              ? `해피 투게더(1997)`
              : answerIndex === 4
              ? `화양연화(2000)`
              : ``}
          </div>
        ))}
      </div>
    </div>
  );
}
