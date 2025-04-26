import { cva } from "class-variance-authority";

export const baseButton = cva(
  "border border-gray-800 rounded-2xl py-2 px-5 text-slate-600 text-base font-bold text-center cursor-pointer transition-all duration-75 ease-in-out shadow-[0_4px_0_rgba(0,0,0,0.3)] hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-none",
);