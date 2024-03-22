import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import Content from "@/app/music/components/@common/Content";
import { PageProps } from "@/app/music/modules/types";

export default async function Page({ params }: PageProps) {
  let currentGenre = params.genre;
  const currentPage = params.page;

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
