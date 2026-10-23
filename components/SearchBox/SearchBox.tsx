"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import css from "./SearchBox.module.css";
import Icon from "../Icon/Icon";

interface SearchBoxProps {
  className?: string;
  keyword?: string;
  onKeywordChange?: (keyword: string) => void;
}

export default function SearchBox({
  className,
  keyword: controlledKeyword,
  onKeywordChange,
}: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [localKeyword, setLocalKeyword] = useState(
    searchParams.get("keyword") ?? "",
  );

  const keyword = controlledKeyword ?? localKeyword;
  const setKeyword = onKeywordChange ?? setLocalKeyword;

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
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className={`${css.form} ${className ?? ""}`} action={handleSearch}>
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
