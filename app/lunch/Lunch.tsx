"use client";

import { useState } from "react";
import LunchMain from "./LunchMain";
import LunchIndex from "./LunchIndex";

export default function Lunch() {
  const [showIndex, setShowIndex] = useState<boolean>(true);
  const [showMain, setShowMain] = useState<boolean>(false);

  return (
    <>
      {showIndex && (
        <LunchIndex setShowIndex={setShowIndex} setShowMain={setShowMain} />
      )}
      {showMain && <LunchMain />}
    </>
  );
}
