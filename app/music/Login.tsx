"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  return (
    <div
      className="music-post-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <div style={{ textAlign: "center", fontWeight: "normal" }}>
          ｟ 로그인 페이지 ｠
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <div style={{ width: "500px", display: "flex", marginTop: "50px" }}>
            <div>이메일</div>
          </div>
          <input
            className="music-post-input"
            onChange={e => {
              setEmail(e.target.value);
            }}
            style={{ width: "500px" }}
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "500px", display: "flex", marginTop: "50px" }}>
            <div>비밀번호</div>
          </div>
          <input
            className="music-post-input"
            onChange={e => {
              setPassword(e.target.value);
            }}
            style={{ width: "500px" }}
            type="password"
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            textAlign: "center",
          }}
        >
          <div>아이디가 없다면?</div>
          <div
            style={{
              marginLeft: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => router.push("/music/signup")}
          >
            회원가입
          </div>
        </div>
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
    </div>
  );
}
