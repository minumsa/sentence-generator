"use client";

import { imgAltAtom, imgSrcAtom, isMobileAtom, showImageAtom } from "./divdivdiv/modules/data";
import DraggableContents from "./divdivdiv/components/DraggableContents";
import { ImageModal } from "./divdivdiv/components/Modal";
import { useAtom } from "jotai";
import { FunctionalLayout } from "./divdivdiv/components/FunctionalLayout";

export default function Page() {
  const [showImage, setShowImage] = useAtom(showImageAtom);
  const [isMobile, setIsMobile] = useAtom(isMobileAtom);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [imgAlt, setImgAlt] = useAtom(imgAltAtom);

  const handleModalClick = () => {
    setShowImage(false);
    setImgSrc("");
    setImgAlt("");
  };

  return (
    <>
      {showImage && (
        <ImageModal isMobile={isMobile} src={imgSrc} alt={imgAlt} onClick={handleModalClick} />
      )}
      <FunctionalLayout>
        <DraggableContents />
      </FunctionalLayout>
    </>
  );
}
