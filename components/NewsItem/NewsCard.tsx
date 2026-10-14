import Image from "next/image";
import css from "./NewsCard.module.css";
import type { NewsItem } from "@/types/news";

interface NewsItemProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsItemProps) {
  const formattedDate = new Date(
    news.date.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"),
  ).toLocaleDateString("en-GB");
  
  return (
    <article className={css.card}>
      <div className={css.photoWrapper}>
        <Image
          src={news.imgUrl}
          alt={news.title}
          fill
          className={css.photo}
          sizes="(min-width: 1280px) 361px, (min-width: 768px) 340px, 335px"
        />
      </div>

      <div className={css.content}>
        <h2 className={css.title}>{news.title}</h2>

        <p className={css.text}>{news.text}</p>
      </div>
      <div className={css.dataWrap}>
        <p className={css.date}>{formattedDate}</p>
        <a
          href={news.url}
          className={css.cardLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read more: ${news.title}`}
        >
          Read more
        </a>
      </div>
    </article>
  );
}
