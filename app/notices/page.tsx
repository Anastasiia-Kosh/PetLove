"use client";
import { useEffect, useState } from "react";
import css from "./NoticesPage.module.css";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { getNotices } from "@/lib/api/clientApi";
import type { NoticeItem } from "@/types/notice";
import NoticesList from "@/components/NoticesList/NoticesList";

export default function NoticesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const data = await getNotices({
        category: selectedCategory ?? undefined,
      });

      setNotices(data.results);
    };

    fetchNotices();
  }, [selectedCategory]);

  return (
    <section className={css.page}>
      <div className="container">
        <h1>Find your favorite pet</h1>
        <NoticesFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <NoticesList notices={notices} />
        
      </div>
    </section>
  );
}
