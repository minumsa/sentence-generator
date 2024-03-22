import Content from "../../components/@common/Content";
import { MusicLayout } from "../../components/@common/MusicLayout";
import { PageProps } from "../../modules/types";

const CURRENT_PAGE = 1;

export default async function Page({ params }: PageProps) {
  let currentGenre = params.genre;

  try {
    const queryString = `?currentGenre=${currentGenre}&currentPage=${CURRENT_PAGE}`;
    const url = `https://divdivdiv.com/music/api/genre${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch music data");
    }

    const { slicedData, totalDataLength } = await response.json();

    return (
      <MusicLayout>
        <Content data={slicedData} totalDataLength={totalDataLength} currentPage={CURRENT_PAGE} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}
