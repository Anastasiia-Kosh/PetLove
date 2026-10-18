"use client";
import { useAppSelector } from "@/lib/store/hooks";
import css from "./Profile.module.css";
import Icon from "@/components/Icon/Icon";
import UserBlock from "@/components/UserBlock/UserBlock";
// import Image from "next/image";

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

          <UserBlock />

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
