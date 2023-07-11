"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 로그인 페이지 ｠
      </div>
      <div style={{ marginTop: "50px" }}>이메일</div>
      <input
        className="music-post-input"
        onChange={e => {
          setEmail(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>비밀번호</div>
      <input
        className="music-post-input"
        onChange={e => {
          setPassword(e.target.value);
        }}
      ></input>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="music-post-submit">로그인</div>
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
