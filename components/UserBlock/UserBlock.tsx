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

      <div className={css.infoEditWrap}>
        <h2 className={css.infoTitle}>My information</h2>
        <ul className={css.formInfo}>
          {user?.name ? (
            <li className={css.field}>{user?.name}</li>
          ) : (
            <li className={css.fieldDef}>Name</li>
          )}
          {user?.email ? (
            <li className={css.field}>{user?.email}</li>
          ) : (
            <li className={css.fieldDef}>name@gmail.com</li>
          )}
          {user?.phone ? (
            <li className={css.field}>{user?.phone}</li>
          ) : (
            <li className={css.fieldDef}>+380</li>
          )}
        </ul>
      </div>
    </div>
  );
}
