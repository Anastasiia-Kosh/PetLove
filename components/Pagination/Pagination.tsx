"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Icon from "../Icon/Icon";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={css.paginationWrap}>
      <button
        onClick={() => handlePageChange(1)}
        className={css.firstPage}
        type="button"
        aria-label="First page"
        disabled={safeCurrentPage === 1}
      >
        <Icon name="prevGroup" className={css.icon_firstPage} />
      </button>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={2}
        marginPagesDisplayed={0}
        onPageChange={({ selected }) => handlePageChange(selected + 1)}
        forcePage={safeCurrentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        previousClassName={css.previous}
        nextClassName={css.next}
        disabledClassName={css.disabled}
        breakLabel ="..." 
        previousLabel={<Icon name="prev" className={css.icon_previousLabel} />}
        nextLabel={<Icon name="next" className={css.icon_nextLabel} />}
      />
      <button
        onClick={() => handlePageChange(totalPages)}
        className={css.lastPage}
        type="button"
        aria-label="Last page"
        disabled={safeCurrentPage === totalPages}
      >
        <Icon name="nextGroup" className={css.icon_lastPage} />
      </button>
    </div>
  );
}
