"use client";

import Image from "next/image";

export default function Upload() {
  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 업로드 페이지 ｠
      </div>
      <div style={{ marginTop: "50px" }}>앨범 아트</div>
      <input
        className="music-post-input"
        style={{
          width: "200px",
          height: "200px",
          fontSize: "50px",
          textAlign: "center",
        }}
        placeholder="+"
      ></input>
      <div style={{ marginTop: "50px" }}>아티스트</div>
      <input className="music-post-input"></input>
      <div style={{ marginTop: "50px" }}>앨범</div>
      <input className="music-post-input"></input>
      <div style={{ marginTop: "50px" }}>발매 연도</div>
      <input
        className="music-post-input"
        type="number"
        placeholder="2023"
        min="1900"
      ></input>
      <div style={{ marginTop: "50px" }}>레이블</div>
      <input className="music-post-input"></input>
      <div style={{ marginTop: "50px" }}>장르</div>
      <select className="music-post-input" style={{ width: "100.7%" }}>
        <option value="pop">POP</option>
        <option value="Kpop">K-POP</option>
        <option value="Rock">ROCK</option>
        <option value="Disco">DISCO</option>
        <option value="Folk">FOLK</option>
        <option value="Jazz">JAZZ</option>
        <option value="Classical">CLASSICAL</option>
        <option value="Soundtrack">SOUNDTRACK</option>
        <option value="All">ALL</option>
      </select>
      <div style={{ marginTop: "50px" }}>링크</div>
      <input className="music-post-input"></input>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="music-post-submit">제출하기</div>
      </div>
      <div
        style={{
          // borderBottom: "thick double #ffccff",
          borderBottom: "1px solid #ffccff",
          padding: "20px",
          marginBottom: "100px",
        }}
      ></div>
    </div>
  );
}
