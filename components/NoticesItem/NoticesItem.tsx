import type { NoticeItem } from "@/types/notice";
import css from "./NoticesItem.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";

interface NoticesItemProps {
  notice: NoticeItem;
}

export default function NoticesItem({ notice }: NoticesItemProps) {
const formattedDate = notice.birthday
  ? new Date(
      notice.birthday.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"),
    )
      .toLocaleDateString("en-GB")
      .replaceAll("/", ".")
  : "Unknown";
  return (
    <article className={css.card}>
      <div className={css.photoWrapper}>
        <Image
          src={notice.imgURL}
          alt={notice.title}
          fill
          className={css.photo}
          loading="eager"
          sizes="(min-width: 1280px) 315px, (min-width: 768px) 294px, 287px"
        />
      </div>

      <div className={css.titleRating}>
        <h2 className={css.title}>{notice.title}</h2>

        <p className={css.rating}>
          <Icon name="star" className={css.star} />
          {notice.popularity}
        </p>
      </div>
      <ul className={css.features}>
        <li className={css.featuresItem}>
          <p className={css.featuresTitle}>Name</p>
          <p className={css.featuresDescr}>{notice.name}</p>
        </li>
        <li className={css.featuresItem}>
          <p className={css.featuresTitle}>Birthday</p>
          <p className={css.featuresDescr}>{formattedDate}</p>
        </li>
        <li className={css.featuresItem}>
                  <p className={css.featuresTitle}>Sex</p>
                  
          <p className={css.featuresDescr}>{notice.sex.charAt(0).toUpperCase() + notice.sex.slice(1)}</p>
        </li>
        <li className={css.featuresItem}>
          <p className={css.featuresTitle}>Species</p>
          <p className={css.featuresDescr}>{notice.species.charAt(0).toUpperCase() + notice.species.slice(1)}</p>
        </li>
        <li className={css.featuresItem}>
          <p className={css.featuresTitle}>Category</p>
          <p className={css.featuresDescr}>{notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}</p>
        </li>
      </ul>
      <p className={css.comment}>{notice.comment}</p>
          {notice.price && <p className={css.price}>${notice.price}</p>}
          <div className={css.buttonsWrap}>
           <button type="button" className={css.buttonMore}>
                Learn more
          </button>
           <button type="button" className={css.buttonHeart}>
                <Icon name="heart" className={css.heart} />
              </button></div>
    </article>
  );
}
