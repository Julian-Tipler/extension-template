"use client";
import Image from "next/image";
import { useState } from "react";

const moms = [
  { happy: "/moms/mom_1_happy.png", sad: "/moms/mom_1_sad.png" },
  { happy: "/moms/mom_2_happy.png", sad: "/moms/mom_2_sad.png" },
  // ... all 8
];

export default function MomCustomizer() {
  const [momIndex, setMomIndex] = useState(0);
  const [expression, setExpression] = useState<"happy" | "sad">("happy");

  return (
    <div>
      <Image
        src={moms[momIndex][expression]}
        alt="Your Mom"
        width={64}
        height={64}
        style={{ imageRendering: "pixelated" }}
      />
      <div>
        <button onClick={() => setExpression("happy")}>😊</button>
        <button onClick={() => setExpression("sad")}>😢</button>
      </div>
      <div>
        {moms.map((_, i) => (
          <button key={i} onClick={() => setMomIndex(i)}>
            Mom {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
