import React, { useState, useEffect, useRef } from "react";
import style from "./Stopwatch.module.css";

const Stopwatch = ({ fDeleted, name }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = () => {
    const ms = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
    const sec = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    const min = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, "0");
    const hrs = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, "0");
    return `${hrs}:${min}:${sec}.${ms}`;
  };

  return (
    <div className={style.card}>
      <div className={style.header}>
        <span className={style.tagName}>{name.toUpperCase()}</span>
        <button className={style.closeBtn} onClick={() => fDeleted(time)}>
          ×
        </button>
      </div>

      <div className={style.display}>{formatTime()}</div>

      <div className={style.controls}>
        {!isRunning ? (
          <button className={style.startBtn} onClick={() => setIsRunning(true)}>
            START
          </button>
        ) : (
          <button className={style.stopBtn} onClick={() => setIsRunning(false)}>
            STOP
          </button>
        )}
        <button className={style.resetBtn} onClick={() => setTime(0)}>
          RESET
        </button>
      </div>
    </div>
  );
};
export default Stopwatch;
