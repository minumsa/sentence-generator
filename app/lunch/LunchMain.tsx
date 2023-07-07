import Image from "next/image";

export default function LunchMain() {
  const koreanFood = [
    "김밥",
    "김치볶음밥",
    "김치찌개",
    "낙곱새",
    "냉면",
    "돼지국밥",
    "된장찌개",
    "떡볶이",
    "만두",
    "만둣국",
    "모듬튀김",
    "보쌈정식",
    "부대찌개",
    "비빔밥",
    "삼겹살",
    "삼계탕",
    "생선구이",
    "수제비",
    "순대",
    "순댓국",
    "알밥",
    "제육볶음",
    "찜닭",
    "청국장",
    "칼국수",
    "멸치국수",
    "비빔국수",
    "간장계란밥",
  ];

  const districts = [
    "강남구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  return (
    <>
      <div className="lunchmain-container">
        <div style={{ width: "20%", height: "100%", overflow: "scroll" }}>
          <div className="lunchmenu-text-container">
            {districts.map((x, index) => (
              <div key={index} className="lunchmenu-text-title">
                {x}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            height: "100%",
          }}
        >
          <div style={{ overflow: "scroll" }}>
            <div className="food-bottom-title">서울의 맛집 v1.1.1</div>
            <div className="lunchmenu-text">
              {/* <Image
                src="/IMG_0336.webp"
                alt="IMG_0336"
                width={500}
                height={370}
                style={{
                  // marginBottom: window.innerWidth > 450 ? "20px" : "15px",
                  // marginTop: window.innerWidth > 450 ? "15px" : "15px",
                  border: "1px solid black",
                }}
              /> */}
              <a
                href="https://naver.me/xw69Cb5o"
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "#000000",
                  cursor: "pointer",
                }}
              >
                <div className="lunchmenu-text-block">① 진미평양냉면 ↵</div>
              </a>
              <div className="lunchmenu-text-block">
                특이사항: 미쉐린 가이드 빕 구르망
              </div>
              <div className="lunchmenu-text-block">
                방문일 : 2022년 11월 6일
              </div>
              <div className="lunchmenu-text-block">
                주문 메뉴 : 냉면(14,000원), 만두반(7,000원)
              </div>
              <div className="lunchmenu-text-block">
                리뷰 : 주문한 지 3분도 안 돼서 음식이 서빙되었다. 매장은 대규모
                기사식당 분위기. 최고라고는 할 수 없지만 평균 점수 이상의
                평양냉면이었다. 면이 두꺼운 편이고 육수가 맑다. 몇 점 들어 있는
                수육이 신선하고 쫀득했다. 만두는 평범한 편.
              </div>
              {/* {koreanFood.sort().map((x, index) => (
                <span
                  key={index}
                  style={{
                    padding: "5px 20px",
                    display: "inline-block",
                  }}
                >
                  {x}
                </span>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
