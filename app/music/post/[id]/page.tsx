import { PageProps } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export default function Page({ params }: PageProps) {
  const currentId = params.id;

  return (
    <MusicLayout>
      <Post currentId={currentId} />
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
