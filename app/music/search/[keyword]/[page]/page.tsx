import SearchContent from "@/app/music/components/SearchContent";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";

export default async function Page({ params }: PageProps) {
  const currentKeyword: string = params.keyword;
  const perPageCount: number = 5;
  const currentPage: number = params.page;

  try {
    const queryString = `?perPageCount=${perPageCount}&currentPage=${currentPage}&currentKeyword=${currentKeyword}`;
    const url = `https://divdivdiv.com/music/api/search${queryString}`;

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
    const currentTagName = "";
    const searchInfo = {
      currentKeyword,
      currentPage,
      currentTagName,
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
