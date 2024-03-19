import { PageProps } from "../../../modules/data";
import ArtistContent from "../../../components/ArtistContent";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const artistId = params.id;
  const perPageCount = 5;
  const currentPage = params.page;

  try {
    const queryString = `?artistId=${artistId}&perPageCount=${perPageCount}&currentPage=${currentPage}`;
    const url = `https://divdivdiv.com/music/api/artist${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch artist data");
    }

    const { artistData, artistDataCount } = await response.json();

    return (
      <MusicLayout>
        <ArtistContent
          artistData={artistData}
          artistDataCount={artistDataCount}
          currentPage={currentPage}
        />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | undefined> {
  const artistId = params.id;
  const perPageCount = 5;
  const currentPage = params.page;

  const queryString = `?perPageCount=${perPageCount}&currentPage=${currentPage}&artistId=${artistId}&pathName=${""}&currentMethod=${"발매일"}&currentCriteria=${"내림차순"}`;
  const url = `https://divdivdiv.com/music/api/artist${queryString}`;

  try {
    const response = await fetch(url).then(res => res.json());

    if (!response.ok) {
      throw new Error("Failed to fetch artist data");
    }

    const { artistData } = response;
    const firstArtistData = artistData && artistData[0];
    if (!firstArtistData) {
      // 예외 처리: artistData가 없는 경우
      throw new Error("No artist data found");
    }

    const { artistImgUrl, artist, text } = firstArtistData;
    const currentUrl = `https://divdivdiv.com/music/artist/${artistId}/1`;
    const textPreview = text.substring(0, 30) + "...";

    return {
      title: artist,
      description: textPreview,
      openGraph: {
        title: `${artist}`,
        images: [artistImgUrl],
        url: currentUrl,
        type: "website",
        siteName: "divdivdiv",
        description: textPreview,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
