"use client";

import { useEffect, useState } from "react";

export default function Lunch() {
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

  const koreanFood = [
    "김치찌개",
    "된장찌개",
    "청국장",
    "제육볶음",
    "비빔밥",
    "삼겹살",
    "떡볶이",
  ];
  const chineseFood = [
    "짜장면",
    "짬뽕",
    "탕수육",
    "팔보채",
    "양장피",
    "깐풍기",
    "유산슬",
    "우동",
    "볶음밥",
    "마라탕",
    "꿔바로우",
    "양꼬치",
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
        <div className="lunch-start-button">메뉴 고르러 가기</div>
      </div>
    </div>
  );
}
