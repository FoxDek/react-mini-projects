import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { baseButton } from "../styles/button";

const counterContent = cva(
  'counterContent flex flex-col items-center gap-20 py-5'
)

const counterTitle = cva(
  "counterTitle text-6xl font-bold text-black",

  {
    variants: {
      activeColor: {
        plus: "text-green-500",
        minus: "text-red-500",
      },
    },
  }
);

const counterButtons = cva(
  'counterButtons grid grid-cols-1 sm:grid-cols-2 gap-6'
)

function Counter() {
  const [count, setCount] = useState(0);
  const [countColor, setCountColor] = useState("");

  useEffect(() => {
    if (count < 0) {
      setCountColor('minus')
    } else if (count > 0) {
      setCountColor('plus')
    } else {
      setCountColor('')
    }
  }, [count]);

  const handleClickPlus = () => {
    setCount(count + 1);
  };

  const handleClickMinus = () => {
    setCount(count - 1);
  };

  return (
    <>
      <div className={counterContent()}>
        <h2 className={counterTitle({ activeColor: countColor })}>{count}</h2>
        <div className={counterButtons()}>
          <button
            onClick={handleClickMinus}
            className={baseButton({ className: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700" })}
          >
            Minus
          </button>
          <button
            onClick={handleClickPlus}
            className={baseButton({ className: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700" })}
          >
            Plus
          </button>
        </div>
      </div>
    </>
  );
}

export default Counter;
