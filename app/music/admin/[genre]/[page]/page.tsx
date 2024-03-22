import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import Content from "@/app/music/components/@common/Content";
import { PageProps } from "@/app/music/modules/types";

export default async function Page({ params }: PageProps) {
  let currentGenre = params.genre;
  let currentPage = params.page;

  try {
    const queryString = `?currentGenre=${currentGenre}&currentPage=${currentPage}`;
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
        <Content data={slicedData} totalDataLength={totalDataLength} currentPage={currentPage} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}
