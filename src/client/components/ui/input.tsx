import React from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export function Input(props: InputProps) {
  const { className, error, ...rest } = props;
  const classes =
    "p-2 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 w-full";
  const errorClass =
    "border-red-300 bg-red-100 dark:bg-red-900 dark:border-red-600";
  return (
    <input className={`${classes} ${error ? errorClass : ""}`} {...rest} />
  );
}
