import ArtistContent from "../../../components/artist/ArtistContent";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { fetchArtistData } from "@/app/music/modules/api";
import { PageProps } from "@/app/music/modules/types";
import { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;

  try {
    const { artistData, artistDataCount } = await fetchArtistData(artistId, currentPage);

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
  const currentPage = params.page;

  try {
    const { artistData } = await fetchArtistData(artistId, currentPage);
    const firstArtistData = artistData[0];

    if (!firstArtistData) {
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
        siteName: "카버차트",
        description: textPreview,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
