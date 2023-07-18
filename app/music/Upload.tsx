"use client";

interface UploadItem {
  albumId: string;
  genre: string;
  link: string;
  text: string;
}

interface UploadProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
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
  link,
  setLink,
  genre,
  setGenre,
  albumId,
  setAlbumId,
  uploadItem,
  setUploadItem,
  uploadItems,
  setUploadItems,
}: UploadProps) {
  // const handleSubmit = () => {
  //   const newItem: UploadItem = {
  //     albumId: albumId,
  //     genre: genre,
  //     link: link,
  //     text: text,
  //   };
  //   setUploadItems(prevUploadItems => [newItem, ...prevUploadItems]);
  //   setAlbumId("");
  //   setGenre("");
  //   setText("");
  //   setLink("");
  // };

  // console.log(albumId);

  const handleSubmit = async () => {
    const newItem: UploadItem = {
      albumId: albumId,
      genre: genre,
      link: link,
      text: text,
    };

    try {
      const response = await fetch("/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to upload music data");
      }

      const data = await response.json();
      console.log(data.message);

      setUploadItems(prevUploadItems => [newItem, ...prevUploadItems]);
      setAlbumId("");
      setGenre("");
      setText("");
      setLink("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="music-post-container">
      <div style={{ textAlign: "center", fontWeight: "normal" }}>
        ｟ 업로드 페이지 ｠
      </div>
      <div style={{ marginTop: "100px" }}>앨범 ID(Spotify)</div>
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
      <div style={{ marginTop: "50px" }}>링크(Apple Music)</div>
      <input
        className="music-post-input"
        value={link}
        onChange={e => {
          setLink(e.target.value);
        }}
      ></input>
      <div style={{ marginTop: "50px" }}>글</div>
      <textarea
        className="music-post-input music-post-input-text"
        // type="text"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
      ></textarea>
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
