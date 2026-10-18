"use client";

import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";
import css from "./UserBlock.module.css";

export default function UserBlock() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className={css.userBlock}>
      <div className={css.avatarWrapper}>
        <Image
          src={
            user?.avatar ? user?.avatar : "/images/avatar/avatar-default.png"
          }
          alt="user avatar"
          fill
          className={css.photo}
          loading="eager"
          sizes="(min-width: 768px) 110px, 94px"
        />
      </div>
      <p className={css.uploadText}>Upload photo</p>

      <div className={css.infoEditWrap}>
        <h2 className={css.infoTitle}>My information</h2>
        <ul className={css.formInfo}>
          <li className={css.field}>{user?.name ? user?.name : "Name"}</li>
          <li className={css.field}>
            {user?.email ? user?.email : "name@gmail.com"}
          </li>
          <li className={css.field}>{user?.phone ? user?.phone : "+380"}</li>
        </ul>
      </div>
    </div>
  );
}
