import { PageProps } from "../../../modules/data";
import ArtistContent from "../../../components/ArtistContent";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import { Metadata } from "next";

export default function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;

  return (
    <MusicLayout>
      <ArtistContent isAdminPage={false} artistId={artistId} currentPage={currentPage} />
    </MusicLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const artistId = params.id;
  const currentPage = params.page;

  const queryString = `?perPageCount=${5}&currentPage=${currentPage}&artistId=${artistId}&pathName=${""}&currentMethod=${"발매일"}&currentCriteria=${"내림차순"}`;
  const url = `https://divdivdiv.com/music/api/artist${queryString}`;
  const fetchArtistData = await fetch(url).then(res => res.json());
  const data = fetchArtistData?.slicedData[0];
  const { artistImgUrl, artist, album, text } = data;
  const currentUrl = `https://divdivdiv.com/music/artist/${artistId}/1`;
  const firstSentence = text.split(". ")[0] + ".";

  return {
    title: artist,
    description: firstSentence,
    openGraph: {
      title: `${artist}`,
      images: [artistImgUrl],
      url: currentUrl,
      type: "website",
      siteName: "divdivdiv",
      description: firstSentence,
    },
  };
}
