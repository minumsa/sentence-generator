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

  return {
    title: data?.album,
    description: data?.text.split(". ")[0] + ".",
    openGraph: {
      title: `${data?.artist} - ${data?.album}`,
      images: [data.imgUrl],
      description: data?.text.split(". ")[0] + ".",
    },
  };
}
