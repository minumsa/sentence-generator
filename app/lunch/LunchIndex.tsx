"use client";

import { useEffect, useState } from "react";

interface LunchProps {
  setShowIndex: any;
  setShowMain: any;
}

export default function LunchIndex({ setShowIndex, setShowMain }: LunchProps) {
  const foodEmoji = [
    "🥐",
    "🥯",
    "🥖",
    "🥨",
    "🍳",
    "🥞",
    "🧇",
    "🥓",
    "🥩",
    "🍗",
    "🌭",
    "🍔",
    "🍟",
    "🍕",
    "🥪",
    "🥙",
    "🧆",
    "🌮",
    "🌯",
    "🫔",
    "🥗",
    "🥘",
    "🍝",
    "🍜",
    "🍲",
    "🍛",
    "🍣",
    "🍱",
    "🥟",
    "🍤",
    "🍙",
    "🍘",
    "🍩",
  ];

  const [currentEmojiIndex, setCurrentEmojiIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmojiIndex(prevIndex =>
        prevIndex === foodEmoji.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lunch-container">
      <div className="lunch-main-text">
        <div>{`오늘의 점심은? ${foodEmoji[currentEmojiIndex]}`}</div>
        <div
          className="lunch-start-button"
          onClick={() => {
            setShowIndex(false);
            setShowMain(true);
          }}
        >
          메뉴 고르러 가기
        </div>
      </div>
    </div>
  );
}
