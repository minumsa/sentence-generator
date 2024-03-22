import ArtistContent from "@/app/music/components/artist/ArtistContent";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { PageProps } from "@/app/music/modules/types";
import { fetchArtistData } from "@/app/music/modules/api";

export default async function Page({ params }: PageProps) {
  const artistId = params.id;
  const currentPage = params.page;
  let artistData;
  let artistDataCount;

  try {
    const result = await fetchArtistData(artistId, currentPage);

    if (result) {
      artistData = result.artistData;
      artistDataCount = result.artistDataCount;
    }

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
