import Home from "./mini-projects/Home";
import Counter from "./mini-projects/Counter";
import NotFound from "./mini-projects/NotFound";
import Modal from "./mini-projects/Modal";
import Quiz from "./mini-projects/Quiz";
import UsersInviter from "./mini-projects/UsersInviter";
import CurrencyConverter from "./mini-projects/CurrencyConverter";
import ImageCollection from "./mini-projects/ImageCollection";

export const routes = [
  {
    path: "/",
    title: "Home",
    element: <Home />,
    fullHeight: true,
    bgColor: "",
  },
  {
    path: "/counter",
    title: "Counter",
    element: <Counter />,
    fullHeight: false,
    bgColor: "",
  },
  {
    path: "/modal",
    title: "Modal",
    element: <Modal />,
    fullHeight: false,
    bgColor: "",
  },
  {
    path: "/quiz",
    title: "Quiz",
    element: <Quiz />,
    fullHeight: true,
    bgColor: "bg-blue-300",
  },
  {
    path: "/users-inviter",
    title: "Users inviter",
    element: <UsersInviter />,
    fullHeight: true,
    bgColor: "bg-orange-100",
  },
  {
    path: "/currency-converter",
    title: "Currency converter",
    element: <CurrencyConverter />,
    fullHeight: true,
    bgColor: "bg-green-100",
  },
  {
    path: "/image-collection",
    title: "Image collection",
    element: <ImageCollection />,
    fullHeight: true,
    bgColor: "",
  },
  // {
  //   path: "/",
  //   title: "",
  //   element: < />,
  //   fullHeight: true,
  //   bgColor: "",
  // },
  {
    path: "*",
    title: "404 Not Found",
    element: <NotFound />,
    fullHeight: true,
    bgColor: "",
  },
];

export const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the 'Red Planet'?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    answers: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What is the largest mammal in the world?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which language is the most widely spoken in the world?",
    answers: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correctAnswer: 2,
  },
];
