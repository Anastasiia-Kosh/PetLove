import Image from "next/image";
import css from "./FriendsItem.module.css";
import { Friend } from "@/types/friends";

interface FriendsItemProps {
  friend: Friend;
}

export default function FriendsItem({ friend }: FriendsItemProps) {
  const workDay = friend.workDays?.find((day) => day.isOpen);

  return (
    <article className={css.card}>
      <p className={css.work}>
        {workDay ? `${workDay.from} - ${workDay.to}` : "Day and night"}
      </p>
      <div className={css.photoWrapper}>
        <Image
          src={friend.imageUrl}
          alt={friend.title}
          fill
          className={css.photo}
          sizes="(min-width: 1280px) 90px, (min-width: 768px) 90px, 80px"
        />
      </div>
      <div className={css.content}>
        <a
          href={friend.url}
          target="_blank"
          rel="noopener noreferrer"
          className={css.title}
        >
          {friend.title}
        </a>
        <div className={css.addresWrap}>
          {friend.email ? (
            <a href={`mailto:${friend.email}`} className={css.address}>
              <span className={css.addressAccent}>Email: </span>
              {friend.email}
            </a>
          ) : friend.phone ? (
            <p className={css.addressEmpty}>
              <span className={css.addressAccent}>Email: </span>
              phone only
            </p>
          ) : (
            <a
              href={friend.url}
              className={css.address}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={css.addressAccent}>Email: </span>
              website only
            </a>
          )}

          {friend.address ? (
            <a
              href={friend.addressUrl}
              className={css.address}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={css.addressAccent}>Address: </span>
              {friend.address}
            </a>
          ) : (
            <a
              href={friend.url}
              className={css.address}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={css.addressAccent}>Address: </span>
              website only
            </a>
          )}

          {friend.phone ? (
            <a href={`tel:${friend.phone}`} className={css.address}>
              <span className={css.addressAccent}>Phone: </span>
              {friend.phone}
            </a>
          ) : friend.email ? (
            <p className={css.addressEmpty}>
              <span className={css.addressAccent}>Phone: </span>
              email only
            </p>
          ) : (
            <a href={friend.url} className={css.address} target="_blank">
              <span className={css.addressAccent}>Phone: </span>
              website only
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
