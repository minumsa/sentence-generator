import { Grid } from "../components/Grid";
import { MusicLayout } from "../components/MusicLayout";

export default async function Page() {
  try {
    const perPageCount = 40;
    const scrollCount = 1;
    const pathName = "";
    const currentMethod = "별점";
    const currentCriteria = "내림차순";
    const currentTagKey = "";

    const queryString = `?pathName=${pathName}&perPageCount=${perPageCount}&currentPage=${scrollCount}&currentMethod=${currentMethod}&currentCriteria=${currentCriteria}&currentTagKey=${currentTagKey}`;
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

    const { slicedData } = await response.json();

    return (
      <MusicLayout>
        <Grid initialData={slicedData} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}
