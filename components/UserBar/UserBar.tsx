"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import css from "./UserBar.module.css";

export default function UserBar() {
  const user = useAppSelector((state) => state.auth.user);

  if (user === null) {
    return null;
  }

  return (
    <Link href="/profile" className={css.profileLink}>
      <Image
        src={user.avatar ? user.avatar : "/images/avatar/avatar-default.png"}
        alt={user.name}
        width={40}
        height={40}
        sizes="100vw"
        className={css.avatar}
      />
      <p className={css.userName}>{user.name}</p>
    </Link>
  );
}
