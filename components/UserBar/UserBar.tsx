"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import css from "./UserBar.module.css";
import Icon from "../Icon/Icon";

export default function UserBar() {
  const user = useAppSelector((state) => state.auth.user);

  if (user === null) {
    return null;
  }

  return (
    <Link href="/profile" className={css.profileLink}>
      <div className={css.avatarWrapper}>
      {user?.avatar ? (
      <Image
        src={user.avatar}
        alt={user.name}
        fill
        sizes="(min-width: 768px) 50px, 40px"
        className={css.avatar}
      /> ) : (
          <Icon name="user" className={css.avatarIcon} />
        )}
        </div>
      <p className={css.userName}>{user.name}</p>
    </Link>
  );
}
