import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [pointVisible, setPointVisible] = useState(false);
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
          setGameOver(
            "Game over! Congratulations, you performed extremely well!"
          );
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
    setTimeout(() => {
      setPointVisible(false);
    }, 700);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (gameOver) {
      setUserAnswer("No more attempts left.");
      return;
    }

    const parsedUserAnswer = parseInt(userAnswer);
    const [num1, operator, num2] = question.split(" ");
    const correctAnswer = eval(`${num1} ${operator} ${num2}`);

    if (parsedUserAnswer === correctAnswer) {
      setScore((score) => score + 1);
      handlePoint();
      generateQuestion();
    } else {
      setUserAnswer("Incorrect. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-6">Speed Arithmetic Trainer</h1>

      <div className="flex gap-6 mb-6">
        <div className="bg-white text-blue-500 py-2 px-4 rounded-lg shadow-md font-bold">
          Time Left: {timeLeft}s
        </div>
        <div className="bg-white text-blue-500 py-2 px-4 rounded-lg shadow-md font-bold">
          Score: {score}
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setDifficulty(0)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          Easy
        </button>
        <button
          onClick={() => setDifficulty(1)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          Medium
        </button>
        <button
          onClick={() => setDifficulty(2)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md"
        >
          Hard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4 mb-6">
        <p className="text-2xl font-bold bg-white text-blue-500 py-2 px-4 rounded-lg shadow-md">
          {question}
        </p>
        <span className="text-4xl">=</span>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-32 text-center text-blue-500 bg-white py-3 px-4 rounded-lg shadow-md font-semibold text-lg"
          placeholder="Your Answer"
        />
      </form>

      <button
        type="submit"
        className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
      >
        Submit
      </button>

      {pointVisible && (
        <div className="mt-6 text-xl font-bold bg-green-500 px-4 py-2 rounded-lg shadow-md">
          +1 Point!
        </div>
      )}

      {gameOver && (
        <div className="mt-6 text-center text-xl font-semibold bg-red-500 px-6 py-4 rounded-lg shadow-md">
          {gameOver}
        </div>
      )}
    </div>
  );
};

export default App;
