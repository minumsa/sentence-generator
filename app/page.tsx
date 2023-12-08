"use client";

import { imgAltAtom, imgSrcAtom, showImageAtom } from "./divdivdiv/modules/data";
import DraggableIcons from "./divdivdiv/components/DraggableIcons";
import { ImageModal } from "./divdivdiv/components/Modal";
import { useAtom } from "jotai";
import { FunctionalLayout } from "./divdivdiv/components/FunctionalLayout";

export default function Page() {
  const [showImage, setShowImage] = useAtom(showImageAtom);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [imgAlt, setImgAlt] = useAtom(imgAltAtom);

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  return (
    <>
      {showImage && <ImageModal src={imgSrc} alt={imgAlt} onClick={handleModalClick} />}
      <FunctionalLayout>
        <DraggableIcons />
      </FunctionalLayout>
    </>
  );
}
