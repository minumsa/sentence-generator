import SearchContent from "@/app/music/components/SearchContent";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { PageProps } from "@/app/music/modules/types";

export default async function Page({ params }: PageProps) {
  const pathName = "search";

  const currentTagKey: string = params.tagName;
  const currentPage: number = params.page;

  try {
    const queryString = `?pathName=${pathName}&currentPage=${currentPage}&currentTagKey=${currentTagKey}`;
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

    const { slicedData, totalDataLength } = await response.json();
    const currentKeyword = "";
    const searchInfo = {
      currentKeyword,
      currentPage,
      currentTagName: currentTagKey,
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
