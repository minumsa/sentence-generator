"use client";

import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSignup = async () => {
    try {
      await connectMongoDB();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return alert("Email already exists");
      }

      const newUser = new User({ email, name, password });
      await newUser.save();

      alert("User created");

      // 회원가입 성공 후 기본 페이지로 이동
      router.push("/music");
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 회원가입 페이지 ｠
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            width: "500px",
            display: "flex",
          }}
        >
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
          <div>닉네임</div>
        </div>
        <input
          className="music-post-input"
          onChange={e => {
            setName(e.target.value);
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
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "500px", display: "flex", marginTop: "50px" }}>
          <div>비밀번호 재입력</div>
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
        <div>아이디가 있다면?</div>
        <div
          style={{ marginLeft: "10px", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => router.push("/music/login")}
        >
          로그인
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        onClick={handleSignup}
      >
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
