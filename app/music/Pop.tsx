"use client";

import Error from "next/error";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UploadItem {
  fetchMusicData: any;
  text: string;
  genre: string;
}

interface UploadProps {
  uploadItems: UploadItem[];
}

export default function Pop({ uploadItems }: UploadProps) {
  const [musicData, setMusicData] = useState<any | null>(null);
  const [musicDatas, setMusicDatas] = useState<any[]>([]);

  const fetchAccessToken = async () => {
    try {
      const url = "https://accounts.spotify.com/api/token";
      const clientId = "9ba8de463724427689b855dfcabca1b1";
      const clientSecret = "7cfb4b90f97a4b1a8f02f2fe6d2d42bc";
      const basicToken = btoa(`${clientId}:${clientSecret}`);
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicToken}`,
      };
      const data = "grant_type=client_credentials";

      const accessTokenResponse = await fetch(url, {
        method: "POST",
        headers,
        body: data,
      });

      if (!accessTokenResponse.ok) {
        throw new Error("Access token fetch failed");
      }

      const accessTokenData = await accessTokenResponse.json();
      return accessTokenData.access_token;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const accessToken = await fetchAccessToken();
      if (!accessToken) {
        throw new Error("Access token is not available");
      }

      const musicDataArray: UploadItem[] = await Promise.all(
        uploadItems.map(async uploadItem => {
          const url = `https://api.spotify.com/v1/albums/${uploadItem.albumId}`;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };
          const musicDataResponse = await fetch(url, { headers });

          if (!musicDataResponse.ok) {
            throw new Error("music fetch failed");
          }

          const fetchedMusicData = await musicDataResponse.json();
          return {
            fetchMusicData: fetchedMusicData,
            text: uploadItem.text,
            genre: uploadItem.genre,
          };
        })
      );

      setMusicDatas(prevMusicDatas => [...musicDataArray, ...prevMusicDatas]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [uploadItems]);

  console.log("musicDatas", musicDatas);
  // key={data.fetchMusicData.id}

  return (
    <div>
      {musicDatas
        ? musicDatas.map((data, index) => {
            return data.genre === "pop" ? (
              <div className="music-post-container">
                <div className="album-container" key={index}>
                  <div style={{ marginRight: "20px" }}>
                    <Image
                      src={data.fetchMusicData.images[0].url}
                      alt="album art"
                      width="250"
                      height="250"
                    />
                  </div>
                  <div className="music-post-container-block">
                    <div style={{ display: "flex" }}>
                      <div>{data.fetchMusicData.artists[0].name}</div>
                      <div style={{ marginLeft: "10px" }}>
                        {`｟${data.fetchMusicData.name}｠`}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>{data.fetchMusicData.label}</div>
                      <div style={{ marginLeft: "10px" }}>
                        {data.fetchMusicData.release_date}
                      </div>
                    </div>
                    <a
                      href={data.fetchMusicData.external_urls.spotify}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "#ffccff",
                      }}
                    >
                      <div className="play-applemusic">Play on Spotify ↵</div>
                    </a>
                  </div>
                  <div className="music-post-container-block">{data.text}</div>
                  <div
                    style={{
                      borderBottom: "1px solid #ffccff",
                      padding: "20px",
                    }}
                  ></div>
                </div>
              </div>
            ) : null;
          })
        : ""}
    </div>
  );
}
