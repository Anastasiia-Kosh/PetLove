"use client";

import Image from "next/image";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";
import css from "./ModalAttention.module.css";

interface ModalAttentionProps {
  onClose: () => void;
}

export default function ModalAttention({ onClose }: ModalAttentionProps) {
  const router = useRouter();
  return (
    <Modal onClose={onClose} className={css.modalAttention}>
      <div className={css.cardImage}>
        <div className={css.imageWrap}>
          <Image
            src="/images/avatar/dog.png"
            alt="dog"
            width={44}
            height={44}
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className={css.image}
          />
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
      <h2 className={css.modalTitle}>Attention</h2>
      <p className={css.modalText}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className={css.modalActions}>
        <button
          type="button"
          onClick={() => router.replace("/login")}
          className={css.buttonLogin}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => router.replace("/register")}
          className={css.buttonReg}
        >
          Registration
        </button>
      </div>
    </Modal>
  );
}
