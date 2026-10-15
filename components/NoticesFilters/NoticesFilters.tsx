"use client";
import { useEffect, useState } from "react";
import css from "./NoticesFilters.module.css";
import SearchBox from "../SearchBox/SearchBox";
import type { SortBy } from "@/types/filters";
import Icon from "@/components/Icon/Icon";
import {
  getNoticeCategories,
  getNoticeSex,
  getNoticeSpecies,
} from "@/lib/api/clientApi";

interface NoticesFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedSex: string | null;
  onSexChange: (sex: string | null) => void;
  selectedSpecies: string | null;
  onSpeciesChange: (species: string | null) => void;
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
}

export default function NoticesFilters({
  selectedCategory,
  onCategoryChange,
  selectedSex,
  onSexChange,
  selectedSpecies,
  onSpeciesChange,
  sortBy,
  onSortChange,
}: NoticesFiltersProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [sexes, setSexes] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getNoticeCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSexes = async () => {
      const data = await getNoticeSex();
      setSexes(data);
    };
    fetchSexes();
  }, []);

  useEffect(() => {
    const fetchSpecies = async () => {
      const data = await getNoticeSpecies();
      setSpecies(data);
    };
    fetchSpecies();
  }, []);

  const handleSort = (value: Exclude<SortBy, null>) => {
    onSortChange(sortBy === value ? null : value);
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
              ? selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
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
          <button
            type="button"
            className={css.filterButton}
            onClick={() =>
              setOpenFilter((prev) => (prev === "sexes" ? null : "sexes"))
            }
          >
            {selectedSex
              ? selectedSex.charAt(0).toUpperCase() + selectedSex.slice(1)
              : "By gender"}
            <Icon
              name="chevron-down"
              className={`${css.iconChevron} ${
                openFilter === "sexes" ? css.iconChevronOpen : ""
              }`}
            />
          </button>

          {openFilter === "sexes" && (
            <ul className={css.dropdown}>
              <li>
                <button
                  type="button"
                  className={css.option}
                  onClick={() => {
                    setOpenFilter(null);
                    onSexChange(null);
                  }}
                >
                  Show all
                </button>
              </li>
              {sexes.map((sex) => (
                <li key={sex}>
                  <button
                    type="button"
                    className={`${css.option} ${
                      selectedSex === sex ? css.selected : ""
                    }`}
                    onClick={() => {
                      setOpenFilter(null);
                      onSexChange(sex);
                    }}
                  >
                    {sex.charAt(0).toUpperCase() + sex.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.filter}>
          <button
            type="button"
            className={css.filterButton}
            onClick={() =>
              setOpenFilter((prev) => (prev === "species" ? null : "species"))
            }
          >
            {selectedSpecies
              ? selectedSpecies.charAt(0).toUpperCase() +
                selectedSpecies.slice(1)
              : "By type"}
            <Icon
              name="chevron-down"
              className={`${css.iconChevron} ${
                openFilter === "species" ? css.iconChevronOpen : ""
              }`}
            />
          </button>

          {openFilter === "species" && (
            <ul className={css.dropdown}>
              <li>
                <button
                  type="button"
                  className={css.option}
                  onClick={() => {
                    setOpenFilter(null);
                    onSpeciesChange(null);
                  }}
                >
                  Show all
                </button>
              </li>
              {species.map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    className={`${css.option} ${
                      selectedSpecies === type ? css.selected : ""
                    }`}
                    onClick={() => {
                      setOpenFilter(null);
                      onSpeciesChange(type);
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          )}
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
              onClick={() => onSortChange(null)}
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
              onClick={() => onSortChange(null)}
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
              onClick={() => onSortChange(null)}
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
              onClick={() => onSortChange(null)}
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
