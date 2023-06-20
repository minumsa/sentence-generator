"use client";

import React, { useState, useEffect } from "react";

interface NameProps {
  value: string;
}

export default function Test31({ value }: NameProps) {
  return (
    <>
      <div className="cine-end-div">{value} 님의 시네필 별점은...</div>
    </>
  );
}
