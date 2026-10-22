"use client";

import type { NoticeItem } from "@/types/notice";
import css from "./NoticesList.module.css"
import NoticesItem from "../NoticesItem/NoticesItem";

interface NoticesListProps {
  notices: NoticeItem[];
}

export default function NoticesList({ notices }: NoticesListProps) {
return notices.length > 0 ? (
  <ul className={css.list}>
    {notices.map((notice) => (
      <li key={notice._id} className={css.item}>
        <NoticesItem notice={notice} />
      </li>
    ))}
  </ul>
) : (
   <p className={css.textEmpty}>No animals found for your search. Please select different filters.</p>
);
}