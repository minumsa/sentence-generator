"use client";

import { NextPage } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Upload from "../Upload";
import Image from "next/image";

interface MongoItem {
  id: string;
  imgUrl: string;
  artist: string;
  album: string;
  label: string;
  releaseDate: string;
  genre: string;
  link: string;
  text: string;
  uploadDate: string;
}

const ContentPage: NextPage<{ params: { slug: string } }> = ({ params }) => {
  const decodedSlug = decodeURIComponent(params.slug);
  const router = useRouter();
  const pathName = usePathname();
  const genreByPath =
    pathName.split("/").length > 2 ? pathName.split("/")[2].toUpperCase() : "";

  const [albumId, setAlbumId] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [mongoDataArr, setMongoDataArr] = useState<MongoItem[]>([]);

  const contents = [
    "POP",
    "K-POP",
    "ROCK",
    "DISCO",
    "FOLK",
    "JAZZ",
    "CLASSICAL",
    "SOUNDTRACK",
    "ALL",
  ];

  const [activeGenre, setActiveGenre] = useState("ALL");
  const [loginPage, setLoginPage] = useState(false);

  const handleGenreClick = (genre: any) => {
    setLoginPage(false);
    const genrePath = genre.toLowerCase();
    genrePath === "all"
      ? router.push(`/music`)
      : router.push(`/music/${genrePath}`);
  };

  const [musicData, setMusicData] = useState<MongoItem | null>(null);

  async function fetchMongoData() {
    try {
      const response = await fetch("/api/music", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload music data");
      }

      const data = await response.json();

      setMongoDataArr(data);
      mongoDataArr.sort((a, b) => {
        return Number(a.uploadDate) - Number(b.uploadDate);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchMongoData();
  }, []);

  return (
    <>
      <div
        className="music-left-container"
        style={{ width: "250px", height: "100%" }}
      >
        <div className="music-genre-container" style={{ paddingTop: "10px" }}>
          {contents.map((genre, index) => (
            <div
              key={genre}
              className={`music-genre ${activeGenre === genre ? "active" : ""}`}
              onClick={() => {
                setActiveGenre(genre);
                handleGenreClick(genre);
              }}
              style={
                (genreByPath === genre && !loginPage) ||
                (genreByPath.length < 1 && activeGenre === genre)
                  ? {
                      backgroundColor: "#ffccff",
                      borderRadius: 0,
                      color: "#000000",
                      fontWeight: "bold",
                    }
                  : {}
              }
            >
              {genre}
            </div>
          ))}
        </div>
      </div>
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
          {/* <div
            className="music-top-menu"
            onClick={() => {
              router.push("/music/upload");
              setActiveGenre("");
            }}
          >
            업로드
          </div> */}
          {/* <div className="music-bottom-title">카버 차트 v1.1.1</div> */}
          {decodedSlug === "upload" ? (
            <Upload
              genre={genre}
              setGenre={setGenre}
              link={link}
              setLink={setLink}
              text={text}
              setText={setText}
              albumId={albumId}
              setAlbumId={setAlbumId}
              musicData={musicData}
              setMusicData={setMusicData}
              // uploadItem={uploadItem}
              // setUploadItem={setUploadItem}
              // uploadItems={uploadItems}
              // setUploadItems={setUploadItems}
            />
          ) : mongoDataArr ? (
            mongoDataArr.map((data, index) => {
              return data.genre === decodedSlug ? (
                <div className="music-post-container" key={index}>
                  <div className="album-container">
                    <div style={{ marginRight: "20px" }}>
                      <Image
                        src={data.imgUrl}
                        alt="album art"
                        width="250"
                        height="250"
                      />
                    </div>
                    <div className="music-post-container-block">
                      <div>
                        <span>{data.artist},</span>{" "}
                        <span>{`｟${data.album}｠`}</span>
                      </div>
                      <div>
                        <span>{data.label},</span>{" "}
                        <span>{data.releaseDate}</span>
                      </div>
                      <div>
                        <a
                          href={data.link}
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "#ffccff",
                          }}
                        >
                          <div className="play-applemusic">
                            Play on Apple Music ↵
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="music-post-container-block">{data.text}</div>
                  <div
                    style={{
                      borderBottom: "1px solid #ffccff",
                      padding: "20px",
                    }}
                  ></div>
                </div>
              ) : null;
            })
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default ContentPage;
