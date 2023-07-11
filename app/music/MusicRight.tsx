"use client";

import { useRouter } from "next/navigation";

export default function MusicRight({ children }: any) {
  const router = useRouter();

  // overflow: scroll;
  // width: 90%;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
      }}
    >
      <div
        className="music-right-container"
        style={{ overflow: "scroll", width: "90%" }}
      >
        <div
          className="music-top-menu"
          // onClick={() => setUploadPage(true)}
          onClick={() => router.push("/music/login")}
          //   style={
          //     loginPage
          //       ? {
          //           backgroundColor: "#ffccff",
          //           borderRadius: 0,
          //           color: "#000000",
          //           fontWeight: "bold",
          //         }
          //       : {}
          //   }
        >
          로그인
        </div>
        <div className="music-bottom-title">카버 차트 v1.1.1</div>
        {children}
      </div>
    </div>
  );
}
