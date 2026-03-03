"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const words = ["Business", "Tech"];

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 350);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const isBusiness = words[index] === "Business";

  return (
    <span
      className={cn(
        "inline-block transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        isBusiness
          ? "text-transparent bg-clip-text bg-gradient-to-r from-biz-500 to-biz-400"
          : "text-transparent bg-clip-text bg-gradient-to-r from-tech-500 to-tech-400"
      )}
    >
      {words[index]}
    </span>
  );
}
