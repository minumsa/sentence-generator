import SearchContent from "@/app/music/components/search/SearchContent";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { PageProps } from "@/app/music/modules/types";

export default async function Page({ params }: PageProps) {
  const currentTag: string = params.tagName;
  const currentPage: number = params.page;

  try {
    const queryString = `?currentPage=${currentPage}&currentTag=${currentTag}`;
    const url = `https://divdivdiv.com/music/api/tag${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to search data");
    }

    const { slicedData, totalDataLength } = await response.json();
    const currentKeyword = "";
    const searchInfo = {
      currentKeyword,
      currentPage,
      currentTagName: currentTag,
      totalDataLength: totalDataLength,
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
