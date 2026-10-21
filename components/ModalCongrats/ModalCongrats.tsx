"use client";

import Image from "next/image";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import { useRouter } from "next/navigation";
import css from "./ModalCongrats.module.css";

interface ModalCongratsProps {
  onClose: () => void;
}

export default function ModalCongrats({ onClose }: ModalCongratsProps) {
  const router = useRouter();
  return (
    <Modal onClose={onClose} className={css.modalCongrats}>
      <div className={css.cardImage}>
        <div className={css.imageWrap}>
          <Image
            src="/images/avatar/cat.png"
            alt="cat"
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
      <h2 className={css.modalTitle}>Congats</h2>
      <p className={css.modalText}>
        The first fluff in the favorites! May your friendship be the happiest
        and filled with fun.
      </p>

      <button
        type="button"
        onClick={() => router.replace("/profile")}
        className={css.button}
      >
        Go to profile
      </button>
    </Modal>
  );
}
