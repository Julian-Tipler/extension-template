"use client";
import { useEffect, useState } from "react";
import { MessageBubble } from "./MessageBubble";

const conversations = [
  {
    user: "I'm looking for comfortable running shoes under $100. Can you help?",
    assistant: (
      <span>
        Definitely! Here are a few options for running shoes under $100:{" "}
        <div className="text-primary mt-2">
          1. Nike Flex Experience Run 10 - $75
        </div>
        <div className="text-primary">2. Adidas Duramo 9 - $85</div>
        <div className="text-primary">3. New Balance Fresh Foam Roav - $95</div>
      </span>
    ),
  },
  {
    user: "How do I return a product?",
    assistant: (
      <span>
        You can return any item within 30 days of purchase. Just fill out the
        return form <span className="text-primary">here</span>, and we&apos;ll
        send you a prepaid shipping label!
      </span>
    ),
  },
  {
    user: "What time are you open today?",
    assistant: <span> We are open today from 10am-6pm. Come on in!</span>,
  },
  {
    user: "Where can I park near your store?",
    assistant: (
      <span>
        We have parking available right behind our store at 123 Main Street.
        There&apos;s also a public parking lot two blocks away on Oak Street,
        and street parking is available nearby!
      </span>
    ),
  },
  {
    user: "What's on the dinner menu tonight?",
    assistant: (
      <span className="flex flex-col">
        <span className="mb-2">Tonight&apos;s dinner menu includes:</span>
        <span>• Grilled Salmon with Lemon Butter</span>
        <span>• Chicken Alfredo Pasta</span>
        <span>• Vegetarian Stir-Fry</span>
        <span className="mt-2">
          You can view the full menu <span className="text-primary">here</span>.
        </span>
      </span>
    ),
  },
];

export const RotatingMessages = () => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % conversations.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const conversation = conversations[selected];

  return (
    <div className="flex flex-col w-full items-center justify-center gap-8 h-[320px]">
      <MessageBubble
        key={`user-${selected}`}
        className="animate-slide-in"
        message={{
          role: "user",
          content: conversation.user,
        }}
      />
      <MessageBubble
        key={`assistant-${selected}`}
        className="animate-slide-in invisible"
        style={{ animationDelay: "1s" }}
        message={{
          role: "assistant",
          content: conversation.assistant,
        }}
      />
    </div>
  );
};
