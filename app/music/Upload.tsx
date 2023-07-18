"use client";

import { useState } from "react";

interface UploadItem {
  albumId: string;
  text: string;
  genre: string;
}

interface UploadProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  albumId: string;
  setAlbumId: React.Dispatch<React.SetStateAction<string>>;
  uploadItem: UploadItem;
  setUploadItem: React.Dispatch<React.SetStateAction<UploadItem>>;
  uploadItems: UploadItem[];
  setUploadItems: React.Dispatch<React.SetStateAction<UploadItem[]>>;
}

export default function Upload({
  text,
  setText,
  genre,
  setGenre,
  albumId,
  setAlbumId,
  uploadItem,
  setUploadItem,
  uploadItems,
  setUploadItems,
}: UploadProps) {
  const handleSubmit = () => {
    const newItem: UploadItem = {
      albumId: albumId,
      text: text,
      genre: genre,
    };
    setUploadItems(prevUploadItems => [newItem, ...prevUploadItems]);
    setAlbumId("");
    setGenre("");
    setText("");
  };

  // console.log(albumId);

  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 업로드 페이지 ｠
      </div>
      <div style={{ marginTop: "100px" }}>앨범 ID</div>
      <input
        className="music-post-input"
        value={albumId}
        onChange={e => {
          setAlbumId(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>장르</div>
      <input
        className="music-post-input"
        value={genre}
        onChange={e => {
          setGenre(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>글</div>
      <input
        className="music-post-input music-post-input-text"
        // type="text"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      ></input>
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
