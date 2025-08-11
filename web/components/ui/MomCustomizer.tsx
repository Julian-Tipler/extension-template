"use client";
import { BRAND_NAME } from "@/lib/siteConfig";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./Button";
import { IconColor } from "./icons/IconColor";

const moms = [
  {
    happy:
      "https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-happy.png",
    sad: "https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-sad.png",
  },
  {
    happy:
      "https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-happy.png",
    sad: "https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/mom-sprites/mom-sad.png",
  },
];

export default function MomCustomizer() {
  const [momIndex, setMomIndex] = useState(0);
  const [expression, setExpression] = useState<"happy" | "sad">("happy");

  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Large preview of selected mom */}
      <div className="relative bg-gray-50 p-8 rounded-lg flex justify-center items-center w-full">
        <Image
          src={moms[momIndex][expression]}
          alt={`Mom ${momIndex + 1} (${expression})`}
          width={128}
          height={128}
          className="object-contain transform transition-all duration-300 hover:scale-110"
          style={{ imageRendering: "pixelated" }}
          priority
        />
      </div>

      {/* Mood selection */}
      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={() => setExpression("happy")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            expression === "happy"
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <span className="text-xl">😊</span>
          <span>Happy</span>
        </button>
        <button
          onClick={() => setExpression("sad")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            expression === "sad"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <span className="text-xl">😢</span>
          <span>Sad</span>
        </button>
      </div>

      {/* Mom selection */}
      <div className="w-full">
        <h3 className="text-gray-500 text-sm font-medium mb-3 text-center">
          Choose Your Mom:
        </h3>
        <div className="grid grid-cols-3 gap-3 w-full">
          {moms.map((mom, i) => (
            <button
              key={i}
              onClick={() => setMomIndex(i)}
              className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                momIndex === i
                  ? "bg-purple-100 ring-2 ring-purple-500"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Image
                src={mom.happy}
                alt={`Mom ${i + 1}`}
                width={48}
                height={48}
                className="object-contain mb-2"
                style={{ imageRendering: "pixelated" }}
              />
              <span className="text-xs font-medium">Mom {i + 1}</span>
            </button>
          ))}
        </div>
      </div>
      <Button variant={"primary"} className="px-8">
        Get {BRAND_NAME}!
      </Button>
    </div>
  );
}
