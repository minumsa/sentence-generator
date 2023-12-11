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

  return {
    title: data.album,
    description: data.text.split(". ")[0] + ".",
    openGraph: {
      title: `${data.artist}`,
      images: [data.artistImgUrl],
      description: data.text.split(". ")[0] + ".",
    },
  };
}
