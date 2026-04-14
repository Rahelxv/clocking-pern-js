import { useState, useEffect } from "react";
import style from "./Stopwatch.module.css";

function Stopwatch({ name, startTime, fDeleted }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const gap = currentTime - startTime;
      setTime(gap);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (timeInMs) => {
    const hours = Math.floor(timeInMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    const seconds = Math.floor((timeInMs / 1000) % 60);
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className={style.stopwatchBox}>
      <h2 className={style.title}>{name.toUpperCase()}</h2>
      <h1 className={style.time}>{formatTime(time)}</h1>
      <button className={style.stopBtn} onClick={() => fDeleted(time)}>
        STOP & SAVE
      </button>
    </div>
  );
}

export default Stopwatch;
