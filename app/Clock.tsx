import { useEffect, useState } from "react";
import NoSSR from "./NoSSR";

export default function Clock({ language }: any) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = currentTime.getHours();
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  const twelveHourFormat = hours % 12 || 12;
  let period = "";

  if (language === "A") {
    period = hours >= 12 ? "PM" : "AM";

    const engClock = `${String(twelveHourFormat).padStart(2, "0")}:${minutes}`;
    return (
      <NoSSR>
        {period} {engClock}
      </NoSSR>
    );
  } else {
    period = hours >= 12 ? "오후" : "오전";
    const korClock = `${period} ${String(twelveHourFormat).padStart(
      2,
      "0"
    )}:${minutes}`;
    return <NoSSR>{korClock}</NoSSR>;
  }
}
