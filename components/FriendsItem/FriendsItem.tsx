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
        <a href={friend.url} target="_blank" className={css.title}>
          {friend.title}
        </a>

        <div className={css.addresWrap}>
          <a
            href={`mailto:${friend.email}`}
            className={css.address}
            target="_blank"
          >
            <span className={css.addressAccent}>Email: </span>

            {friend.email ? friend.email : friend.url}
          </a>

          <a href={friend.addressUrl} className={css.address} target="_blank">
            <span className={css.addressAccent}>Address: </span>
            {friend.address ? friend.address : "website only"}
          </a>

          <a
            href={`tel:${friend.phone}`}
            className={css.address}
            target="_blank"
          >
            <span className={css.addressAccent}>Phone: </span>
            {friend.phone ? friend.phone : "email only"}
          </a>
        </div>
      </div>
    </article>
  );
}
