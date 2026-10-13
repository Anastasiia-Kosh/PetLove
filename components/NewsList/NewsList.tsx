"use client";

import css from "./NewsList.module.css";
import type { NewsItem } from "@/types/news";
import { useEffect } from "react";
import toast from "react-hot-toast";
import NewsCard from "../NewsItem/NewsCard";

interface NewsListProps {
  results: NewsItem[];
  keyword?: string;
}

export default function NewsList({ results, keyword }: NewsListProps) {
  useEffect(() => {
    if (keyword && results.length === 0) {
      toast.error(`No results found for the query "${keyword}"`, {
        id: "search-no-results",
      });
    }
  }, [keyword, results.length]);

  return (
    <ul className={css.list}>
      {results.map((news) => (
        <li key={news._id} className={css.item}>
          <NewsCard news={news} />
        </li>
      ))}
    </ul>
  );
}
