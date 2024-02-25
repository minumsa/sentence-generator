import { Post } from "@/app/music/components/Post";
import { PageProps } from "@/app/music/modules/data";
import { MusicLayout } from "@/app/music/components/MusicLayout";
import { Metadata } from "next";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <Post albumId={currentId} />
    </MusicLayout>
  );
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
