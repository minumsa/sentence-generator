import Content from "../components/Content";
import { MusicLayout } from "../components/MusicLayout";
import { PageProps } from "../modules/types";

export default async function Page({ params }: PageProps) {
  let currentGenre = params.genre;
  const currentPage = Number(params.page);

  const genreFilters = currentGenre === "kpop" || currentGenre === "jpop";
  if (genreFilters) {
    currentGenre = currentGenre.slice(0, 1) + "-" + currentGenre.slice(1);
  }

  try {
    const pathName = currentGenre;
    const currentTagKey = "";

    const queryString = `?pathName=${pathName}&currentPage=${currentPage}&currentTagKey=${currentTagKey}`;
    const url = `https://divdivdiv.com/music/api${queryString}`;

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
        <Content data={slicedData} totalDataLength={totalDataLength} currentPage={currentPage} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}
