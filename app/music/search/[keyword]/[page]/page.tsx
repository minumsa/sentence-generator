import SearchContent from "@/app/music/components/search/SearchContent";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { PageProps } from "@/app/music/modules/types";
import { fetchSearchData } from "@/app/music/modules/api";

export default async function Page({ params }: PageProps) {
  const currentKeyword: string = params.keyword;
  const currentPage: number = params.page;

  try {
    const { searchData, searchDataCount } = await fetchSearchData(currentKeyword, currentPage);
    const searchInfo = {
      currentKeyword,
      currentPage,
      currentTagName: "",
      totalDataLength: searchDataCount,
    };

    return (
      <MusicLayout>
        <SearchContent data={searchData} searchInfo={searchInfo} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}
