"use client";

import css from "./Profile.module.css";
import Icon from "@/components/Icon/Icon";
import PetsList from "@/components/PetsList/PetsList";
import UserBlock from "@/components/UserBlock/UserBlock";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyNotices from "@/components/MyNotices/MyNotices";
import ModalEditUser from "@/components/ModalEditUser/ModalEditUser";
import ModalAttention from "@/components/ModalAttention/ModalAttention";
import ModalLogout from "@/components/ModalLogout/ModalLogout";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [openModalEditUser, setOpenModalEditUser] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
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
              <button
                className={css.editBtn}
                onClick={() => {
                  setOpenModalEditUser(true);
                }}
              >
                <Icon name="edit" className={css.iconEdit} />
              </button>
            </div>

            {openModalEditUser && (
              <ModalEditUser onClose={() => setOpenModalEditUser(false)} />
            )}

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

            <button
              type="button"
              className={css.logoutBtn}
              onClick={() => {
                setIsLogoutModalOpen(true);
              }}
            >
              LOG OUT
            </button>
          </div>
          {isLogoutModalOpen && (
            <ModalLogout onClose={() => setIsLogoutModalOpen(false)} />
          )}
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
