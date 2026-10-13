"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import css from "./SearchBox.module.css";
import Icon from "../Icon/Icon";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");

  const handleSearch = (formData: FormData) => {
    const search = formData.get("keyword")?.toString().trim() ?? "";
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("keyword", search);
    } else {
      params.delete("keyword");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setKeyword("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("keyword");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className={css.form} action={handleSearch}>
      <input
        className={css.input}
        type="text"
        name="keyword"
        placeholder="Search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />

      {keyword.length > 0 && (
        <button
          className={css.clearButton}
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
        >
          <Icon name="close" className={css.icon} />
        </button>
      )}

      <button
        className={css.searchButton}
        type="submit"
        aria-label="Submit search"
      >
        <Icon name="search" className={css.icon} />
      </button>
    </form>
  );
}
