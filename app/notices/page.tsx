"use client";
import { useEffect, useState } from "react";
import css from "./NoticesPage.module.css";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import { getNotices } from "@/lib/api/clientApi";
import type { NoticeItem } from "@/types/notice";
import NoticesList from "@/components/NoticesList/NoticesList";
import type { SortBy } from "@/types/filters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination/Pagination";
import toast from "react-hot-toast";

export default function NoticesPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const keyword = searchParams.get("keyword") ?? "";
  const selectedCategory = searchParams.get("category");
  const selectedSex = searchParams.get("sex");
  const selectedSpecies = searchParams.get("species");
  const sortParam = searchParams.get("sort");
  const sortBy: SortBy =
    sortParam === "popular" ||
    sortParam === "unpopular" ||
    sortParam === "expensive" ||
    sortParam === "cheap"
      ? sortParam
      : null;
  const selectedLocation = searchParams.get("locationId");

  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const handleCategoryChange = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  const handleSexChange = (sex: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sex) {
      params.set("sex", sex);
    } else {
      params.delete("sex");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  const handleSpeciesChange = (species: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (species) {
      params.set("species", species);
    } else {
      params.delete("species");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  const handleSortChange = (sort: SortBy) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  const handleLocationChange = (locationId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (locationId) {
      params.set("locationId", locationId);
    } else {
      params.delete("locationId");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
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
          locationId: selectedLocation || undefined,
          page: currentPage,
        });

        setNotices(data.results);
        setTotalPages(data.totalPages);
      } catch {
   toast.error("Failed to load the notices. Please try again.");
      }
    };

    fetchNotices();
  }, [
    selectedCategory,
    selectedSex,
    selectedSpecies,
    sortBy,
    keyword,
    selectedLocation,
    currentPage,
  ]);

  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Find your favorite pet</h1>
        <NoticesFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedSex={selectedSex}
          onSexChange={handleSexChange}
          selectedSpecies={selectedSpecies}
          onSpeciesChange={handleSpeciesChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onLocationChange={handleLocationChange}
          selectedLocationId={selectedLocation}
        />
        <div className={css.list}>
          <NoticesList notices={notices} />
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </section>
  );
}
