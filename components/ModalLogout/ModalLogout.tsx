"use client";

import Image from "next/image";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";
import css from "./ModalLogout.module.css";
import { useAppDispatch } from "@/lib/store/hooks";
import { logoutUser } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import { clearUser } from "@/lib/store/authStore";


interface ModalLogoutProps {
  onClose: () => void;
}

export default function ModalLogout({ onClose }: ModalLogoutProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("You have logged out successfully.");
    } catch {
      toast.error("Failed to complete the session on the server.");
    } finally {
      localStorage.removeItem("token");
      dispatch(clearUser());
      onClose();
      router.replace("/");
    }
  };
  return (
    <Modal onClose={onClose} className={css.logoutModal}>
      <div className={css.cardImage}>
        <Image
          src="/images/avatar/cat.png"
          alt="cat"
          width={32}
          height={32}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className={css.image}
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        className={css.logoutModalClose}
        aria-label="Close modal"
      >
        <Icon name="close" className={css.icon_close} />
      </button>

      <p className={css.logoutModalText}>Already leaving?</p>

      <div className={css.logoutModalActions}>
        <button
          type="button"
          onClick={handleLogout}
          className={css.logoutConfirm}
        >
          Yes
        </button>
        <button type="button" onClick={onClose} className={css.logoutCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
