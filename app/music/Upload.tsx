"use client";

import Image from "next/image";
import { useState } from "react";

export default function Upload() {
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [year, setYear] = useState<number>(2000);
  const [label, setLabel] = useState<string>("");
  const [genre, setGenre] = useState<string>("POP");
  const [link, setLink] = useState<string>("");

  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 업로드 페이지 ｠
      </div>
      <div style={{ marginTop: "50px" }}>앨범 아트</div>
      <div style={{ display: "flex", alignItems: "center" }}>
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
        {/* <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: "#ffccff",
          }}
        ></div> */}
      </div>
      <div style={{ marginTop: "50px" }}>아티스트</div>
      <input
        className="music-post-input"
        onChange={e => {
          setArtist(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>앨범</div>
      <input
        className="music-post-input"
        onChange={e => {
          setAlbum(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>발매 연도</div>
      <input
        className="music-post-input"
        type="number"
        placeholder="2023"
        min="1900"
        onChange={e => {
          setYear(Number(e.target.value));
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>레이블</div>
      <input
        className="music-post-input"
        onChange={e => {
          setLabel(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>장르</div>
      <select
        value={genre}
        onChange={e => setGenre(e.target.value)}
        className="music-post-input"
        style={{ width: "100.7%" }}
      >
        <option value="pop">POP</option>
        <option value="Kpop">K-POP</option>
        <option value="Rock">ROCK</option>
        <option value="Disco">DISCO</option>
        <option value="Folk">FOLK</option>
        <option value="Jazz">JAZZ</option>
        <option value="Classical">CLASSICAL</option>
        <option value="Soundtrack">SOUNDTRACK</option>
      </select>
      <div style={{ marginTop: "50px" }}>링크</div>
      <input
        className="music-post-input"
        onChange={e => {
          setLink(e.target.value);
        }}
      ></input>
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
