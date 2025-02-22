import React, { useState, useEffect, useRef } from "react";

const Timer = ({ resetSignal, onStop }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // resetSignal 변경 시 타이머를 리셋하고 실행
  useEffect(() => {
    setSeconds(0);
    setIsRunning(true);
  }, [resetSignal]);

  // isRunning 상태에 따라 타이머 작동
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // 60초 이상일 경우 분, 초로 포맷
  const formatTime = (sec) => {
    if (sec < 60) return `${sec}초`;
    const minutes = Math.floor(sec / 60);
    const secondsRemaining = sec % 60;
    return `${minutes}분 ${secondsRemaining}초`;
  };

  const handleStop = () => {
    setIsRunning(false);
    if (onStop) onStop(); // 부모에게 타이머 중지 알림
  };

  return (
    <div style={{ marginTop: "20px", fontSize: "18px" }}>
      <p>타이머: {formatTime(seconds)}</p>
      {isRunning && (
        <button
          onClick={handleStop}
          style={{ padding: "5px 10px", fontSize: "14px", marginTop: "10px" }}
        >
          타이머 스탑
        </button>
      )}
    </div>
  );
};

export default Timer;
