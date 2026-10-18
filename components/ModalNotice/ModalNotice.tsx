"use client";

import type { NoticeDetails } from "@/types/notice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateFavorites } from "@/lib/store/authStore";
import {
  addNoticeToFavorites,
  removeNoticeFromFavorites,
} from "@/lib/api/clientApi";
import Modal from "../Modal/Modal";
import css from "./ModalNotice.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useState } from "react";
import toast from "react-hot-toast";

interface ModalNoticeProps {
  notice: NoticeDetails;
  onClose: () => void;
}

export default function ModalNotice({ onClose, notice }: ModalNoticeProps) {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) =>
    state.auth.favoriteNoticeIds.includes(notice._id),
  );
  const [showContacts, setShowContacts] = useState(false);

  const handleFavoriteClick = async () => {
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

  const formattedDate = notice.birthday
    ? new Date(notice.birthday.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"))
        .toLocaleDateString("en-GB")
        .replaceAll("/", ".")
    : "Unknown";
  return (
    <Modal onClose={onClose} className={css.modalNotice}>
      <div className={css.cardImage}>
        <div className={css.imageWrap}>
          <Image
            src={notice.imgURL}
            alt={notice.name}
            width={120}
            height={120}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className={css.image}
          />

          <p className={css.category}>
            {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={css.modalClose}
        aria-label="Close modal"
      >
        <Icon name="close" className={css.icon_close} />
      </button>
      <h2 className={css.title}>{notice.title}</h2>
      <p className={css.rating}>
        <Icon name="star" className={css.star} />
        {notice.popularity}
      </p>
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
      </ul>
      <p className={css.comment}>{notice.comment}</p>
      <p className={css.price}>{notice.price ? `$${notice.price}` : ""}</p>
      <div className={css.modalActions}>
        <button
          type="button"
          className={css.buttonAdd}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "Remove from" : "Add to"}
          <Icon name="heart" className={css.heart} />
        </button>

        <button
          type="button"
          className={css.buttonContact}
          onClick={() => setShowContacts((prev) => !prev)}
        >
          {showContacts ? "Hide contacts" : "Contact"}
        </button>
      </div>
      {showContacts && (
        <div className={css.contacts}>
          {notice.user.phone && (
            <a href={`tel:${notice.user.phone}`}>{notice.user.phone}</a>
          )}
          {notice.user.email && (
            <a href={`mailto:${notice.user.email}`}>{notice.user.email}</a>
          )}
        </div>
      )}
    </Modal>
  );
}
