"use client";

import css from "./Profile.module.css";
import Icon from "@/components/Icon/Icon";
import PetsList from "@/components/PetsList/PetsList";
import UserBlock from "@/components/UserBlock/UserBlock";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyNotices from "@/components/MyNotices/MyNotices";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">(
    "favorites",
  );
  const notices =
    activeTab === "favorites"
      ? (user?.noticesFavorites ?? [])
      : (user?.noticesViewed ?? []);

  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.descWrap}>
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
                <button
                  className={css.addBtn}
                  onClick={() => {
                    router.push("/add-pet");
                  }}
                >
                  Add pet <Icon name="plus" className={css.iconPlus} />
                </button>
              </div>
              <PetsList pets={user?.pets ?? []} />
            </div>

            <button type="button" className={css.logoutBtn}>
              LOG OUT
            </button>
          </div>

          <div className={css.noticesWrap}>
            <div className={css.buttonWrap}>
              <button
                type="button"
                className={`${css.buttonFav} ${
                  activeTab === "favorites" ? css.active : ""
                }`}
                onClick={() => setActiveTab("favorites")}
              >
                My favorites pets
              </button>
              <button
                type="button"
                className={`${css.buttonView} ${
                  activeTab === "viewed" ? css.active : ""
                }`}
                onClick={() => setActiveTab("viewed")}
              >
                Viewed
              </button>
            </div>
            <MyNotices notices={notices} />
          </div>
        </div>
      </div>
    </section>
  );
}
