import { Grid } from "./components/main/Grid";
import { MusicLayout } from "./components/@common/MusicLayout";
import { PER_PAGE_COUNT } from "./modules/constants";

const SCROLL_COUNT = 1;
const CURRENT_TAG_KEY = "";

export default async function Page() {
  try {
    const queryString = `?scrollCount=${SCROLL_COUNT}&currentTagKey=${CURRENT_TAG_KEY}`;
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
    const totalScrollCount = Math.max(1, Math.ceil(totalDataLength / PER_PAGE_COUNT));

    return (
      <MusicLayout>
        <Grid initialData={slicedData} totalScrollCount={totalScrollCount} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}
