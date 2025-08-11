"use client";

import { useEffect, useState } from "react";

const USE_CASES = ["at work", "at school", "at home", "personal goals"];
const COLORS = ["text-primary", "text-primary", "text-primary", "text-tertiary"];
export const UseCaseText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % USE_CASES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${COLORS[index]}`}>
      <b>{USE_CASES[index]}</b>
    </span>
  );
};
