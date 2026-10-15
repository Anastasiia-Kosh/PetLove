"use client";
import { useEffect, useState } from "react";
import css from "./NoticesFilters.module.css";
import type { SortBy } from "@/types/filters";
import SearchBox from "../SearchBox/SearchBox";
import Icon from "@/components/Icon/Icon";
import { getNoticeCategories } from "@/lib/api/clientApi";

interface NoticesFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function NoticesFilters({
  selectedCategory,
  onCategoryChange,
}: NoticesFiltersProps) {
  const [sortBy, setSortBy] = useState<SortBy>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getNoticeCategories();

      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSort = (value: Exclude<SortBy, null>) => {
    setSortBy((current) => (current === value ? null : value));
  };
  return (
    <div className={css.mainWrapFilters}>
      <SearchBox />
      <div className={css.filters}>
        <div className={css.filter}>
          <button
            type="button"
            className={css.filterButton}
            onClick={() =>
              setOpenFilter((prev) => (prev === "category" ? null : "category"))
            }
          >
            {selectedCategory
  ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
  : "Category"}
            <Icon
              name="chevron-down"
              className={`${css.iconChevron} ${
                openFilter === "category" ? css.iconChevronOpen : ""
              }`}
            />
          </button>

          {openFilter === "category" && (
            <ul className={css.dropdown}>
              <li>
                <button
                  type="button"
                  className={css.option}
                  onClick={() => {
                    setOpenFilter(null);
                    onCategoryChange(null);
                  }}
                >
                  Show all
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    className={`${css.option} ${
  selectedCategory === category ? css.selected : ""
}`}
                    onClick={() => {
                      setOpenFilter(null);
                      onCategoryChange(category);
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.filter}>
          <button type="button" className={css.filterButton}>
            By gender
          </button>
        </div>

        <div className={css.filter}>
          <button type="button" className={css.filterButton}>
            By type
          </button>
        </div>
      </div>
      <div className={css.location}>{/* Тут пізніше буде react-select */}</div>
      <div className={css.sortWrapper}>
        <div
          className={`${css.sortButton} ${sortBy === "popular" ? css.active : ""}`}
        >
          <button type="button" onClick={() => handleSort("popular")}>
            Popular
          </button>
          {sortBy === "popular" && (
            <button
              type="button"
              onClick={() => setSortBy(null)}
              aria-label="Reset sorting"
            >
              <Icon name="close" className={css.icon} />
            </button>
          )}
        </div>
        <div
          className={`${css.sortButton} ${sortBy === "unpopular" ? css.active : ""}`}
        >
          <button type="button" onClick={() => handleSort("unpopular")}>
            Unpopular
          </button>
          {sortBy === "unpopular" && (
            <button
              type="button"
              onClick={() => setSortBy(null)}
              aria-label="Reset sorting"
            >
              <Icon name="close" className={css.icon} />
            </button>
          )}
        </div>
        <div
          className={`${css.sortButton} ${sortBy === "expensive" ? css.active : ""}`}
        >
          <button type="button" onClick={() => handleSort("expensive")}>
            Expensive
          </button>
          {sortBy === "expensive" && (
            <button
              type="button"
              onClick={() => setSortBy(null)}
              aria-label="Reset sorting"
            >
              <Icon name="close" className={css.icon} />
            </button>
          )}
        </div>
        <div
          className={`${css.sortButton} ${sortBy === "cheap" ? css.active : ""}`}
        >
          <button type="button" onClick={() => handleSort("cheap")}>
            Cheap
          </button>
          {sortBy === "cheap" && (
            <button
              type="button"
              onClick={() => setSortBy(null)}
              aria-label="Reset sorting"
            >
              <Icon name="close" className={css.icon} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
