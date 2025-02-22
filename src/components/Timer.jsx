import React, { useState, useEffect, useRef } from "react";

const Timer = ({ resetSignal }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(0);
    setIsRunning(true);
  }, [resetSignal]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (sec) => {
    if (sec < 60) {
      return `${sec}초`;
    } else {
      const minutes = Math.floor(sec / 60);
      const secondsRemaining = sec % 60;
      return `${minutes}분 ${secondsRemaining}초`;
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div style={{ marginTop: "20px", fontSize: "18px" }}>
      <p>타이머: {formatTime(seconds)}</p>
      {isRunning && (
        <button
          onClick={handleStop}
          style={{
            padding: "5px 10px",
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          타이머 스탑
        </button>
      )}
    </div>
  );
};

export default Timer;
