"use client";
import type { NoticeItem, NoticeDetails } from "@/types/notice";
import css from "./NoticesItem.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useState } from "react";
import ModalAttention from "../ModalAttention/ModalAttention";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setUser, updateFavorites } from "@/lib/store/authStore";
import ModalNotice from "../ModalNotice/ModalNotice";
import {
  addNoticeToFavorites,
  removeNoticeFromFavorites,
  getNoticeById,
  currentUserFullInfo,
} from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import ModalCongrats from "../ModalCongrats/ModalCongrats";

interface NoticesItemProps {
  notice: NoticeItem;
  variant?: "default" | "myNotices";
  priority?: boolean;
}

export default function NoticesItem({
  notice,
  variant = "default",
  priority = false,
}: NoticesItemProps) {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isFavorite = useAppSelector((state) =>
    state.auth.favoriteNoticeIds.includes(notice._id),
  );
  const favoriteNoticeIds = useAppSelector(
    (state) => state.auth.favoriteNoticeIds,
  );

  const [openModalAttention, setOpenModalAttention] = useState(false);
  const [openModalNotice, setOpenModalNotice] = useState(false);
  const [openModalCongrats, setOpenModalCongrats] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<NoticeDetails | null>(
    null,
  );

  const formattedDate = notice.birthday
    ? new Date(notice.birthday.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"))
        .toLocaleDateString("en-GB")
        .replaceAll("/", ".")
    : "Unknown";

  const handleLearnMore = async () => {
    if (!isLoggedIn) {
      setOpenModalAttention(true);
      return;
    }
    try {
      const data = await getNoticeById(notice._id);

      setSelectedNotice(data);
      setOpenModalNotice(true);

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const updatedUser = await currentUserFullInfo(token);
          dispatch(setUser(updatedUser));
        } catch {
          toast.error("Notice loaded, but the profile could not be refreshed.");
        }
      }
    } catch {
      toast.error("Failed to load notice details");
    }
  };

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      setOpenModalAttention(true);
      return;
    }

    const isFirstFavorite = !isFavorite && favoriteNoticeIds.length === 0;

    try {
      const favorites = isFavorite
        ? await removeNoticeFromFavorites(notice._id)
        : await addNoticeToFavorites(notice._id);

      dispatch(updateFavorites(favorites));

      if (isFirstFavorite) {
        setOpenModalCongrats(true);
      }

      if (isFavorite) {
        toast.success("Removed from favorites");
      } else {
        toast.success("Added to favorites");
      }

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const updatedUser = await currentUserFullInfo(token);
          dispatch(setUser(updatedUser));
        } catch (error) {
          console.error("Failed to refresh user profile:", error);
          toast.error("Favorites changed, but profile could not be refreshed");
        }
      }
    } catch {
      toast.error("Failed to update favorites");
    }
  };

  return (
    <article
      className={`${css.card} ${
        variant === "myNotices" ? css.myNoticesCard : ""
      }`}
    >
      <div className={css.photoWrapper}>
        <Image
          src={notice.imgURL}
          alt={notice.title}
          fill
          className={css.photo}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(min-width: 1280px) 315px, (min-width: 768px) 294px, 287px"
        />
      </div>
      <div className={css.content}>
        <div className={css.titleRating}>
          <h2 className={css.title}>{notice.title}</h2>

          <p className={css.rating}>
            <Icon name="star" className={css.star} />
            {notice.popularity}
          </p>
        </div>
        <ul
          className={`${css.features} ${
            variant === "myNotices" ? css.myNoticesFeatures : ""
          }`}
        >
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Name</p>
            <p className={css.featuresDescr}>{notice.name}</p>
          </li>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Birthday</p>
            <p className={css.featuresDescr}>{formattedDate}</p>
          </li>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Sex</p>

            <p className={css.featuresDescr}>
              {notice.sex.charAt(0).toUpperCase() + notice.sex.slice(1)}
            </p>
          </li>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Species</p>
            <p className={css.featuresDescr}>
              {notice.species.charAt(0).toUpperCase() + notice.species.slice(1)}
            </p>
          </li>
          <li className={css.featuresItem}>
            <p className={css.featuresTitle}>Category</p>
            <p className={css.featuresDescr}>
              {notice.category.charAt(0).toUpperCase() +
                notice.category.slice(1)}
            </p>
          </li>
        </ul>
        <p className={css.comment}>{notice.comment}</p>
        <p className={css.price}>{notice.price ? `$${notice.price}` : "$0"}</p>
        <div className={css.buttonsWrap}>
          <button
            type="button"
            className={css.buttonMore}
            onClick={handleLearnMore}
          >
            Learn more
          </button>

          <button
            type="button"
            className={css.buttonHeart}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Icon name={isFavorite ? "trash" : "heart"} className={css.heart} />
          </button>
        </div>
      </div>
      {openModalAttention && (
        <ModalAttention onClose={() => setOpenModalAttention(false)} />
      )}
      {openModalNotice && selectedNotice && (
        <ModalNotice
          onClose={() => setOpenModalNotice(false)}
          notice={selectedNotice}
        />
      )}
      {openModalCongrats && (
        <ModalCongrats onClose={() => setOpenModalCongrats(false)} />
      )}
    </article>
  );
}
