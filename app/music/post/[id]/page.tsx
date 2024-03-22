import { Post } from "../../components/post/Post";
import { MusicLayout } from "../../components/@common/MusicLayout";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { PageProps } from "../../modules/types";

export default async function Page({ params }: PageProps) {
  const currentId = params.id;

  try {
    const queryString = `?albumId=${currentId}`;
    const url = `https://divdivdiv.com/music/api/post${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post data");
    }

    const data = await response.json();

    return (
      <MusicLayout>
        <Post albumData={data} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const currentId = params.id;
  const queryString = `?albumId=${currentId}`;
  const url = `https://divdivdiv.com/music/api/post${queryString}`;
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
