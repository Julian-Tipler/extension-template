"use client";

import { useEffect, useState } from "react";

const USE_CASES = [
  "product discovery",
  "customer support",
  "sales & conversions",
  "user experience",
];
const COLORS = [
  "text-primary",
  "text-primary",
  "text-primary",
  "text-primary",
];
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
