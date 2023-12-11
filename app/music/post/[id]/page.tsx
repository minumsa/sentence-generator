import { AlbumInfo, PageProps, initialAlbumInfo } from "../../modules/data";
import { Post } from "../../components/Post";
import { MusicLayout } from "../../components/MusicLayout";
import { metadata } from "../../layout";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";
import { fetchDataById } from "../../modules/api";

export default function Page({ params }: PageProps) {
  const currentId = params.id;
  // const [data, setData] = useState<AlbumInfo>(initialAlbumInfo);

  // useEffect(() => {
  //   async function getData() {
  //     const result = await fetchDataById(currentId);
  //     setData(result);
  //   }
  //   getData();
  // }, []);

  return (
    <MusicLayout>
      <Post currentId={currentId} />
    </MusicLayout>
  );
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currentId = params.id;
  const data = await fetch(`https://divdivdiv.com/music/api/update?id=${currentId}`).then(res =>
    res.json()
  );
  // const data = await fetchDataById(currentId);

  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data?.album,
    description: data?.text.split(". ")[0] + ".",
    openGraph: {
      title: `${data?.artist} - ${data?.album}`,
      images: [data.imgUrl],
    },
  };
}
