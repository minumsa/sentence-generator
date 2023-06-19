"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Test0() {
  return (
    <>
      <div
        style={{ width: "100%", height: "470px", border: "1.5px solid black" }}
      >
        <Image
          src="/cine-img-0.png"
          alt="cine-img-0"
          width={window.innerWidth > 450 ? "550" : "350"}
          height={window.innerWidth > 450 ? "470" : "200"}
          style={{}}
        />
      </div>
    </>
  );
}
