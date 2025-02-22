import React, { useState } from "react";
import Timer from "./Timer";
import "./NumberMaker.css";

const NumberMaker = () => {
  const [numbers, setNumbers] = useState({ num1: null, num2: null });
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [timerStopped, setTimerStopped] = useState(false);
  const [answer, setAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const generateNumber = () => Math.floor(Math.random() * 900) + 100;

  const handleGenerate = () => {
    const num1 = generateNumber();
    const num2 = generateNumber();
    setNumbers({ num1, num2 });
    setTimerResetKey((prev) => prev + 1);
    setTimerStopped(false);
    setAnswer("");
    setResultMessage("");
  };

  const handleTimerStop = () => {
    setTimerStopped(true);
  };

  const handleCheckAnswer = () => {
    const correctAnswer = numbers.num1 * numbers.num2;
    if (parseInt(answer) === correctAnswer) {
      setResultMessage(`정답입니다! ${correctAnswer}`);
    } else {
      setResultMessage(`오답입니다! 정답은 ${correctAnswer} 입니다.`);
    }
  };

  return (
    <div className="number-maker-container">
      <div className="left-box">
        <h2>권수현의 최단기록: 56초</h2>
      </div>

      <div className="challenge-area">
        {!numbers.num1 && (
          <button onClick={handleGenerate}>도전하기</button>
        )}
        <div className="numbers-display">
        {numbers.num1 && numbers.num2 && !timerStopped ? (
            <div className="multiplication-layout">
            <div className="number-line">
                {numbers.num1}
            </div>
            <div className="number-line">
                <span className="multiply-sign">x</span>
                {numbers.num2}
                </div>
            <div className="underline"></div>
            </div>
        ) : !numbers.num1 ? (
            <p>3자리 곱셈 암산을 도전하세요!</p>
        ) : <p>{numbers.num1}X{numbers.num2}?</p>}
        </div>
        {numbers.num1 && numbers.num2 && !timerStopped && (
          <Timer
            key={timerResetKey}
            resetSignal={timerResetKey}
            onStop={handleTimerStop}
          />
        )}
        {timerStopped && (
          <div className="answer-section">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="답을 입력하세요"
            />
            <div className="buttons-container">
              <button onClick={handleCheckAnswer}>정답 확인하기</button>
              <button onClick={handleGenerate}>다시 도전하기</button>
            </div>
            {resultMessage && <p>{resultMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberMaker;