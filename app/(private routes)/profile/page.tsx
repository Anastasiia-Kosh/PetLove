"use client";
import { useAppSelector } from "@/lib/store/hooks";
import css from "./Profile.module.css";
import Icon from "@/components/Icon/Icon";
import Image from "next/image";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.mainWhiteWrap}>
          <div className={css.userEditWrap}>
            <p className={css.userDecor}>
              User <Icon name="user" className={css.iconUser} />
            </p>
            <button className={css.editBtn}>
              <Icon name="edit" className={css.iconEdit} />
            </button>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="/images/avatar/avatar-default.png"
              alt="user avatar"
              fill
              className={css.photo}
              loading="eager"
              sizes="(min-width: 768px) 110px, 94px"
            />
          </div>
          <p className={css.uploadText}>Upload photo</p>

          <div className={css.infoEditWrap}>
            <form className={css.form}>
              <h2 className={css.formTitle}>My information</h2>
              <div className={css.fieldsWrap}>
                <div className={css.field}>
                  <label htmlFor="name" className="visually-hidden">
                    Name
                  </label>

                  <input id="name" type="text" placeholder={user?.name} />
                </div>
                <div className={css.field}>
                  <label htmlFor="name" className="visually-hidden">
                    Email
                  </label>

                  <input id="name" type="text" placeholder={user?.email} />
                </div>
                <div className={css.field}>
                  <label htmlFor="name" className="visually-hidden">
                    Phone
                  </label>

                  <input id="name" type="text" placeholder={user?.phone} />
                </div>{" "}
              </div>
            </form>
          </div>

          <div className={css.petsWrap}>
            <div className={css.petAddWrap}>
              <h2 className={css.formTitle}>My pets</h2>
              <button className={css.addBtn}>
                Add pet <Icon name="plus" className={css.iconPlus} />
              </button>
            </div>
            {/* картки моїх тварин з можливістю видалити*/}
          </div>

          <button type="button" className={css.logoutBtn}>
            LOG OUT
          </button>
        </div>
      </div>
    </section>
  );
}
