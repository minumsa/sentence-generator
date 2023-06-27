import { useEffect, useState } from "react";
import NoSSR from "./NoSSR";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentTime.getSeconds()).padStart(2, "0");
  const dateStr = `${hours}:${minutes}:${seconds}`;

  return <NoSSR>{dateStr}</NoSSR>;
}
