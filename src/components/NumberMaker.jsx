import React, { useState } from "react";
import Timer from "./Timer";

const NumberMaker = () => {
  const [numbers, setNumbers] = useState({ num1: null, num2: null });
  const [timerResetKey, setTimerResetKey] = useState(0);

  const generateNumber = () => Math.floor(Math.random() * 900) + 100;

  const handleGenerate = () => {
    const num1 = generateNumber();
    const num2 = generateNumber();
    setNumbers({ num1, num2 });
    setTimerResetKey((prev) => prev + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>랜덤 3자리 숫자 생성기 + 타이머</h1>
      <button
        onClick={handleGenerate}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        숫자 생성하기
      </button>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        {numbers.num1 && numbers.num2 ? (
          <>
            <p>숫자 1: {numbers.num1}</p>
            <p>숫자 2: {numbers.num2}</p>
          </>
        ) : (
          <p>버튼을 눌러서 숫자와 타이머를 시작해보세요!</p>
        )}
      </div>
      {timerResetKey > 0 && <Timer resetSignal={timerResetKey} />}
    </div>
  );
};

export default NumberMaker;
