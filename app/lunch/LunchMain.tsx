export default function LunchMain() {
  const menu = ["한식", "중식", "일식", "양식"];

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
  const chineseFood = [
    "짜장면",
    "짬뽕",
    "탕수육",
    "팔보채",
    "양장피",
    "깐풍기",
    "유산슬",
    "우동",
    "볶음밥",
    "마라탕",
    "꿔바로우",
    "양꼬치",
  ];

  return (
    <>
      <div className="lunchmain-container">
        <div style={{ width: "20%", height: "100%" }}>
          <div className="lunchmenu-text-container">
            <div className="lunchmenu-text-title">한식</div>
            <div className="lunchmenu-text-title">중식</div>
            <div className="lunchmenu-text-title">일식</div>
            <div className="lunchmenu-text-title">양식</div>
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
          <div style={{ height: "85%" }}>
            <div className="lunchmenu-text">
              {koreanFood.sort().map(x => (
                <span
                  key={x}
                  style={{
                    padding: "5px 20px",
                    display: "inline-block",
                  }}
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "15%",
              fontSize: "70px",
              textAlign: "right",
              marginRight: "20px",
            }}
          >
            다음 페이지로
          </div>
        </div>
      </div>
    </>
  );
}
