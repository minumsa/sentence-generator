import { useEffect, useState } from "react";
import NoSSR from "./NoSSR";

interface PageProps {
  language: string;
}

export default function Clock({ language }: PageProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours: number = currentTime.getHours();
  const minutes: string = String(currentTime.getMinutes()).padStart(2, "0");
  const twelveHourFormat: number = hours % 12 || 12;
  let period: string = "";
  let clock = `${period} ${String(twelveHourFormat).padStart(
    2,
    "0"
  )}:${minutes}`;

  if (language === "A") {
    period = hours >= 12 ? "PM" : "AM";
    const engClock = `${period} ${String(twelveHourFormat).padStart(
      2,
      "0"
    )}:${minutes}`;
    return <NoSSR>{clock}</NoSSR>;
  } else {
    period = hours >= 12 ? "오후" : "오전";
    const korClock = `${period} ${String(twelveHourFormat).padStart(
      2,
      "0"
    )}:${minutes}`;
    return <NoSSR>{korClock}</NoSSR>;
  }
}
