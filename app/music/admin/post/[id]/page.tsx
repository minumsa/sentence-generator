import { Post } from "@/app/music/components/Post";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import { Metadata } from "next";

export default async function Page({ params }: PageProps) {
  const currentId = params.id;

  try {
    const url = `https://divdivdiv.com/music/api/update?id=${currentId}`;

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

    console.log("slicedData", slicedData);

    return (
      <MusicLayout>
        <Post albumData={slicedData} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const currentId = params.id;
  const queryString = `?id=${currentId}`;
  const url = `https://divdivdiv.com/music/api/update${queryString}`;
  const data = await fetch(url).then(res => res.json());
  const { imgUrl, artist, album, text } = data;
  const firstSentence = text.split(". ")[0] + ".";
  const currentUrl = `https://divdivdiv.com/music/post/${currentId}`;

  return {
    title: `${artist} - ${album}`,
    description: firstSentence,
    openGraph: {
      title: `${artist} - ${album}`,
      images: [imgUrl],
      description: firstSentence,
      url: currentUrl,
      type: "website",
      siteName: "divdivdiv",
    },
  };
}
