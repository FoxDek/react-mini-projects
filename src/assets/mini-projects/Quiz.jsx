import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { quizData } from "../data";
import { baseButton } from "../styles/button";

const quizContent = cva(
  "quizContent relative max-w-md md:max-w-2xl w-full p-5 sm:py-10 sm:px-12 rounded-4xl bg-white motion-opacity-in-0 motion-delay-500"
);

// Firts block (intro)
const quizIntro = cva(
  "quizIntro flex flex-col gap-10 items-center justify-center"
);

const quizIntroTitle = cva("quizIntroTitle text-3xl font-bold text-center");

const quizIntroDescription = cva(
  "quizIntroDescription text-xl text-center italic"
);

// Second block (quiz)
const quizGame = cva("quizGame flex flex-col gap-10");

const quizGameProgressContainer = cva(
  "quizProgress w-full h-3 bg-gray-200 rounded-2xl overflow-hidden"
);

const quizGameProgressBar = cva(
  "quizProgressBar h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-2xl transition-all duration-300 ease-in-out motion-width-in-0 motion-width-out-100 motion-blur-in-md"
);

const quizGameAnswer = cva("quizAnswer text-xl sm:text-2xl font-medium");

const quizGameList = cva("quizList flex flex-col gap-5");

const quizGameListItem = cva(
  "quizListItem py-4 px-2 text-sm sm:text-base border-2 border-slate-200 rounded-2xl w-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-100 hover:motion-scale-loop-102 hover:shadow-[0_4px_0_rgba(0,0,0,0.2)]"
);

const quizGameBackdrop = cva(
  "absolute left-1/2 -translate-x-1/2 h-[10px] rounded-b-full"
);

// Third block (result)
const quizResult = cva(
  "quizResult flex flex-col items-center gap-7 justify-center"
);

const quizResultTitle = cva("quizResultTitle text-4xl");

const quizResultDescription = cva(
  "quizResultDescription text-xl text-center italic"
);

function Quiz() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [quizStatement, setQuizStatement] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(20);
  const [quizResultConclusion, setQuizResultConclusion] = useState("Great");

  const handleQuizItemClick = (correctAnswer, chosenAnswer) => {
    if (correctAnswer === chosenAnswer) {
      setCorrectCount(correctCount + 1);
    }

    if (activeQuestion < quizData.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else if (activeQuestion == quizData.length - 1) {
      evaluateResult();
      setQuizStatement(3);
    }
  };

  const evaluateResult = () => {
    const correctPercentage = correctCount / quizData.length;

    if (correctPercentage >= 0.8) {
      setQuizResultConclusion("You are a genius! 🎉");
    } else if (correctPercentage >= 0.4) {
      setQuizResultConclusion("You are a good one!");
    } else {
      setQuizResultConclusion("You need to work harder!");
    }
  };

  const handleQuizRestart = () => {
    setActiveQuestion(0);
    setQuizStatement(1);
    setCorrectCount(0);
  };

  useEffect(() => {
    setProgressBarWidth((activeQuestion / quizData.length) * 100);
  }, [activeQuestion]);

  return (
    <>
      <div className={quizContent()}>
        {quizStatement == 1 && (
          <div className={quizIntro()}>
            <h2 className={quizIntroTitle()}>Welcome to the Quiz</h2>
            <p className={quizIntroDescription()}>
              Click the button below to start the quiz
            </p>
            <button
              className={baseButton({
                className:
                  "bg-blue-300 text-white hover:bg-blue-400 active:bg-blue-500",
              })}
              onClick={() => setQuizStatement(2)}
            >
              Start Quiz
            </button>
          </div>
        )}

        {quizStatement == 2 && (
          <div className={quizGame()}>
            <div className={quizGameProgressContainer()}>
              <div
                className={quizGameProgressBar()}
                style={{ width: `${progressBarWidth}%` }}
              ></div>
            </div>
            <h3 className={quizGameAnswer()}>
              {quizData[activeQuestion].question}
            </h3>
            <ul className={quizGameList()}>
              {quizData[activeQuestion].answers.map((answer, index) => (
                <li
                  key={index}
                  className={quizGameListItem()}
                  onClick={() =>
                    handleQuizItemClick(
                      quizData[activeQuestion].correctAnswer,
                      index
                    )
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div
              className={quizGameBackdrop({
                className: "bg-white/80 w-[80%] sm:w-[90%] bottom-[-9px]",
              })}
            ></div>
            <div
              className={quizGameBackdrop({
                className: "bg-white/30 w-[75%] sm:w-[85%] bottom-[-18px]",
              })}
            ></div>
          </div>
        )}

        {quizStatement == 3 && (
          <div className={quizResult()}>
            <h3
              className={quizResultTitle()}
            >{`${correctCount} из ${quizData.length}`}</h3>
            <p className={quizResultDescription()}>{quizResultConclusion}</p>
            <button
              className={baseButton({
                className:
                  "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white",
              })}
              onClick={handleQuizRestart}
            >
              Ещё раз
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;
