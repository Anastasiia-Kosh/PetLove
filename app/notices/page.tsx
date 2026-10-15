"use client";
import { useEffect, useState } from "react";
import css from "./NoticesPage.module.css";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { getNotices } from "@/lib/api/clientApi";
import type { NoticeItem } from "@/types/notice";
import NoticesList from "@/components/NoticesList/NoticesList";
import type { SortBy } from "@/types/filters";
import { useSearchParams } from "next/navigation";

export default function NoticesPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  const [notices, setNotices] = useState<NoticeItem[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      const data = await getNotices({
        keyword: keyword || undefined,
        category: selectedCategory ?? undefined,
        sex: selectedSex ?? undefined,
        species: selectedSpecies ?? undefined,
        byPopularity:
          sortBy === "popular"
            ? false
            : sortBy === "unpopular"
              ? true
              : undefined,
        byPrice:
          sortBy === "expensive"
            ? false
            : sortBy === "cheap"
              ? true
              : undefined,
      });

      setNotices(data.results);
    };

    fetchNotices();
  }, [selectedCategory, selectedSex, selectedSpecies, sortBy, keyword]);

  return (
    <section className={css.page}>
      <div className="container">
        <h1>Find your favorite pet</h1>
        <NoticesFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSex={selectedSex}
          onSexChange={setSelectedSex}
          selectedSpecies={selectedSpecies}
          onSpeciesChange={setSelectedSpecies}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <NoticesList notices={notices} />
      </div>
    </section>
  );
}
