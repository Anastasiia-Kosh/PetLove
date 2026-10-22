"use client";

import type { NoticeItem } from "@/types/notice";
import css from "./MyNotices.module.css"
import NoticesItem from "../NoticesItem/NoticesItem";

interface MyNoticesProps {
  notices: NoticeItem[];
}

export default function MyNotices({ notices }: MyNoticesProps) {
  return notices.length === 0 ? (
  <p className={css.textEmpty}>
                Oops, <span className={css.textEmptySpan}>looks like there aren&apos;t any furries </span>on our adorable page
                yet. Do not worry! View your pets on the &quot;find your favorite pet&quot; page and add them to your favorites.
              </p>
) : (
    <ul className={css.list}>
      {notices.map((notice) => (
        <li key={notice._id} className={css.item}>
              <NoticesItem notice={notice} variant="myNotices"/>
        </li>
      ))}
    </ul>
  );
}
