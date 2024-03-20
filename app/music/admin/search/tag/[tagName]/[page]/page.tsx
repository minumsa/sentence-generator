import SearchContent from "@/app/music/components/SearchContent";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import { PageProps } from "@/app/music/modules/types";
import { SUB_PER_PAGE_COUNT } from "@/app/music/modules/constants";

export default async function Page({ params }: PageProps) {
  const pathName = "search";
  const currentMethod = "별점";
  const currentCriteria = "내림차순";
  const currentTagKey: string = params.tagName;
  const currentPage: number = params.page;

  try {
    const queryString = `?pathName=${pathName}&perPageCount=${SUB_PER_PAGE_COUNT}&currentPage=${currentPage}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}&currentTagKey=${currentTagKey}`;
    const url = `https://divdivdiv.com/music/api${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search data");
    }

    const { slicedData, genreDataLength } = await response.json();
    const currentKeyword = "";
    const searchInfo = {
      currentKeyword,
      currentPage,
      currentTagName: currentTagKey,
      totalDataLength: genreDataLength,
    };

    return (
      <MusicLayout>
        <SearchContent data={slicedData} searchInfo={searchInfo} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}
