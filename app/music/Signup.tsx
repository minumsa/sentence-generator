"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 회원가입 페이지 ｠
      </div>
      <div style={{ marginTop: "50px" }}>이메일</div>
      <input
        className="music-post-input"
        onChange={e => {
          setEmail(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>닉네임</div>
      <input
        className="music-post-input"
        onChange={e => {
          setName(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>비밀번호</div>
      <input
        className="music-post-input"
        onChange={e => {
          setPassword(e.target.value);
        }}
      ></input>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <div>아이디가 있다면?</div>
        <div
          style={{ marginLeft: "10px", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => router.push("/music/login")}
        >
          로그인
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="music-post-submit">회원가입</div>
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
