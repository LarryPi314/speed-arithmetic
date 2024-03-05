import "./App.css";

import React, { useState, useEffect } from "react";

/*
Light-weight application to demonstrate the power of React.js
*/

const App = () => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [PointVisible, setPointVisible] = useState(0);
  const [gameOver, setGameOver] = useState("");
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    generateQuestion();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setGameOver("Game over! Congratulations, you performed extremely well!")
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQuestion = () => {
    let num1, num2;
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let ans;
    if(difficulty == 0){
      switch (operator) {
        case "/":
          num2 = Math.floor(Math.random() * 9)+1;
          num1 = Math.floor(Math.random() * 10)*num2;
          break;
        default:
          num1 = Math.floor(Math.random() * 10);
          num2 = Math.floor(Math.random() * 10);
          break;
      }
    } else if (difficulty === 1){
      switch (operator) {
        case "/":
          num2 = Math.floor(Math.random() * 9)+1;
          num1 = Math.floor(Math.random() * 20)*num2;
          break;
        default:
          num1 = Math.floor(Math.random() * 20);
          num2 = Math.floor(Math.random() * 20);
          break;
      }
    } else{
      switch (operator) {
        case "/":
          num2 = Math.floor(Math.random() * 20)+1;
          num1 = Math.floor(Math.random() * 50)*num2;
          break;
        default:
          num1 = Math.floor(Math.random() * 100);
          num2 = Math.floor(Math.random() * 100);
          break;
      }
    }
    
    setQuestion(`${num1} ${operator} ${num2}`);
    setUserAnswer("");
  };

  const handlePoint = () => {
    setPointVisible(true);

    // Hide the point after 2 seconds
    setTimeout(() => {
      setPointVisible(false);
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(gameOver){
      setUserAnswer("No more attempts left.");
      return 0;
    }

    const parsedUserAnswer = parseInt(userAnswer);
    const [num1, operator, num2] = question.split(" ");
    const correctAnswer = eval(`${num1} ${operator} ${num2}`);

    if (parsedUserAnswer === correctAnswer) {
      setScore((score) => score + 1);
      handlePoint();
      console.log(difficulty);
      generateQuestion();
    } else{
      setUserAnswer("Incorrect. Try again!")
    }
  };
  
  const setEasy = () => {
    setDifficulty(0);
  }
  const setMed = () => {
    setDifficulty(1);
  }
  const setHard = () => {
    setDifficulty(2);
  }

  return (
    <div className="app-container">
      <h1>Speed Arithmetic Tester</h1>

      <div className="score-time-container">
        <p>Time Left: {timeLeft} seconds</p>
        <p>Score: {score}</p>
      </div>

      <div class="difficulty-buttons">
        <button id="easyButton" onClick = {setEasy}>Easy</button>
        <button id="mediumButton" onClick = {setMed}>Medium</button>
        <button id="hardButton" onClick = {setHard}>Hard</button>
      </div>

      <form onSubmit={handleSubmit}>
        <p className="question">{question} =</p>
        <input
          type="text"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {PointVisible? <div className="point">+1 point!</div>: null}

      <div className="gameOver">
        <p>{gameOver}</p>
      </div>
    </div>
  );
};

export default App;

