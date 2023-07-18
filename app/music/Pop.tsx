"use client";

import Error from "next/error";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UploadItem {
  albumId: string;
  text: string;
  genre: string;
}

interface UploadProps {
  uploadItems: UploadItem[];
}

export default function Pop({ uploadItems }: UploadProps) {
  const [musicData, setMusicData] = useState<any | null>(null);

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

      // 5sztejERqpktXEdemlUvU5
      const url = `https://api.spotify.com/v1/albums/${albumId}`;
      // const url = `https://api.spotify.com/v1/albums/5sztejERqpktXEdemlUvU5`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const musicDataResponse = await fetch(url, { headers });

      if (!musicDataResponse.ok) {
        throw new Error("music fetch failed");
      }

      const result = await musicDataResponse.json();

      setMusicData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // 새로운 div 만들기
  }, [uploadItems]);

  // console.log(musicData);

  return (
    <div className="music-post-container">
      <div className="album-container">
        <div style={{ marginRight: "20px" }}>
          {musicData ? (
            <Image
              src={musicData.images[0].url}
              alt="album art"
              width="250"
              height="250"
            />
          ) : (
            ""
          )}
        </div>
        <div className="music-post-container-block">
          <div style={{ display: "flex" }}>
            <div>{musicData ? musicData.artists[0].name + "," : ""}</div>
            <div style={{ marginLeft: "10px" }}>
              {musicData ? `｟${musicData.name}｠` : ""}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>{musicData ? musicData.label + "," : ""}</div>
            <div style={{ marginLeft: "10px" }}>
              {musicData ? musicData.release_date : ""}
            </div>
          </div>
          <a
            href={
              musicData ? (
                musicData.external_urls.spotify
              ) : (
                <Error statusCode={404} />
              )
            }
            target="_blank"
            style={{
              textDecoration: "none",
              color: "#ffccff",
            }}
          >
            <div className="play-applemusic">Play on Spotify ↵</div>
          </a>
        </div>
      </div>
      <div className="music-post-container-block">
        {`이 앨범은 스티브 갯, 조 샘플, 빅터 펠드만, 웨인 쇼터, 리 릿나워, 버나드 퍼디, 피트 크리스트리엡 등 당대의 정상급 재즈 연주자들을 참여시켜 완성한 것으로 타이틀곡 'Aja'를 비롯해 대부분의 트랙이 크게 히트했다. 수록곡 거의 대부분을 히트시키는 경우는 팝계에서는 흔히 있을 수 있는 일이지만 재즈계에선 거의 드문 일이라는 점을 감안할 때 이 앨범의 인기가 당시 어떠했는지를 잘 알 수 있다. 빌보드 앨범 차트에서 3위를 기록했으며, 1978년 연말 차트에서는 5위를 기록했다. 스틸리 댄의 앨범 중 상업적으로 가장 성공한 앨범이기도 하다.`}
      </div>
      <div
        style={{
          // borderBottom: "thick double #ffccff",
          borderBottom: "1px solid #ffccff",
          padding: "20px",
        }}
      ></div>
      {/* {koreanFood.sort().map((x, index) => (
      <span
        key={index}
        style={{
          padding: "5px 20px",
          display: "inline-block",
        }}
      >
        {x}
      </span>
    ))} */}
    </div>
  );
}
