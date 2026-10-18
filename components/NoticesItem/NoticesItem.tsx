"use client";
import type { NoticeItem, NoticeDetails } from "@/types/notice";
import css from "./NoticesItem.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useState } from "react";
import ModalAttention from "../ModalAttention/ModalAttention";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { updateFavorites } from "@/lib/store/authStore";
import ModalNotice from "../ModalNotice/ModalNotice";
import {
  addNoticeToFavorites,
  removeNoticeFromFavorites,
  getNoticeById,
} from "@/lib/api/clientApi";
import toast from "react-hot-toast";

interface NoticesItemProps {
  notice: NoticeItem;
}

export default function NoticesItem({ notice }: NoticesItemProps) {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const isFavorite = useAppSelector((state) =>
    state.auth.favoriteNoticeIds.includes(notice._id),
  );

  const [openModalAttention, setOpenModalAttention] = useState(false);
  const [openModalNotice, setOpenModalNotice] = useState(false);
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
    } catch (error) {
      console.error("Failed to fetch notice details:", error);
    }
  };

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      setOpenModalAttention(true);
      return;
    }
    try {
      const favorites = isFavorite
        ? await removeNoticeFromFavorites(notice._id)
        : await addNoticeToFavorites(notice._id);

      dispatch(updateFavorites(favorites));
      if (isFavorite) {
        toast.success("Removed from favorites");
      } else {
        toast.success("Added to favorites");
      }
    } catch {
      toast.error("Failed to update favorites");
    }
  };

  return (
    <article className={css.card}>
      <div className={css.photoWrapper}>
        <Image
          src={notice.imgURL}
          alt={notice.title}
          fill
          className={css.photo}
          loading="eager"
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
        <ul className={css.features}>
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
            className={`${css.buttonHeart} ${
              isFavorite ? css.buttonHeartActive : ""
            }`}
            onClick={handleFavoriteClick}
          >
            <Icon name="heart" className={css.heart} />
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
    </article>
  );
}
