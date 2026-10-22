
"use client";

import { useEffect, useState } from "react";
import css from "./Loader.module.css";

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return Math.min(prev + Math.ceil(Math.random() * 5), 95);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const offset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div className={css.overlay}>
      <div className={css.loader}>
        <svg className={css.circle} viewBox="0 0 100 100">
          <circle
            className={css.track}
            cx="50"
            cy="50"
            r={RADIUS}
          />
          <circle
            className={css.progress}
            cx="50"
            cy="50"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <span className={css.percentage}>{progress}%</span>
      </div>
    </div>
  );
}
