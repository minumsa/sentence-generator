import { Post } from "@/app/music/components/post/Post";
import { MusicLayout } from "@/app/music/components/@common/MusicLayout";
import { Metadata } from "next";
import { PageProps } from "@/app/music/modules/types";
import { fetchPostData } from "@/app/music/modules/api";

export default async function Page({ params }: PageProps) {
  const currentId = params.id;

  try {
    const postData = await fetchPostData(currentId);

    return (
      <MusicLayout>
        <Post postData={postData} />
      </MusicLayout>
    );
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const currentId = params.id;
  const postData = await fetchPostData(currentId);
  const { imgUrl, artist, album, text } = postData;
  const textPreview = text.substring(0, 30) + "...";
  const currentUrl = `https://divdivdiv.com/music/post/${currentId}`;

  return {
    title: `${artist} - ${album}`,
    description: textPreview,
    openGraph: {
      title: `${artist} - ${album}`,
      images: [imgUrl],
      description: textPreview,
      url: currentUrl,
      type: "website",
      siteName: "divdivdiv",
    },
  };
}
