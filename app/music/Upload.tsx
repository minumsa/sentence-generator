"use client";

import { useState } from "react";

export default function Upload() {
  const [albumId, setAlbumId] = useState<string>("");
  const [text, setText] = useState<string>("");

  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 업로드 페이지 ｠
      </div>
      <div style={{ marginTop: "100px" }}>앨범 ID</div>
      <input
        className="music-post-input "
        onChange={e => {
          setAlbumId(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>글</div>
      <input
        className="music-post-input music-post-input-text"
        type="text"
        onChange={e => {
          setText(e.target.value);
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
