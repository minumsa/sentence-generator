"use client";

import { useState } from "react";

interface UploadProps {
  albumIds: any[];
  setAlbumIds: any;
}

export default function Upload({ albumIds, setAlbumIds }: UploadProps) {
  const [text, setText] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [albumId, setAlbumId] = useState<string>("");

  const handleSubmit = () => {
    setAlbumIds(prevAlbumIds => [...prevAlbumIds, albumId]);
    setText(""); // Reset the input field after submission
  };

  console.log(albumId);

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
      <div style={{ marginTop: "50px" }}>장르</div>
      <input
        className="music-post-input "
        onChange={e => {
          setGenre(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>글</div>
      <div
        contenteditable="true"
        className="music-post-input music-post-input-text"
        // type="text"
        onChange={() => {}}
      ></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="music-post-submit" onClick={handleSubmit}>
          제출하기
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid #ffccff",
          padding: "20px",
          marginBottom: "100px",
        }}
      ></div>
    </div>
  );
}
