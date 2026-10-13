"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { logoutUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/authStore";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import Icon from "../Icon/Icon";
import Image from "next/image";

interface AuthNavigationProps {
  isMobile?: boolean;
  isTabletHeader?: boolean;
  onCloseMobileMenu?: () => void;
  pathname: string;
}

export default function AuthNavigation({
  isMobile = false,
  isTabletHeader = false,
  onCloseMobileMenu,
  pathname,
}: AuthNavigationProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isHomePage = pathname === "/";

  const handleLogout = async () => {
    onCloseMobileMenu?.();

    try {
      await logoutUser();
      toast.success("You have logged out successfully.");
    } catch {
      toast.error("Failed to complete the session on the server.");
    } finally {
      localStorage.removeItem("token");
      dispatch(clearUser());
      setIsLogoutModalOpen(false);
      router.replace("/");
    }
  };

  const authNavigationClass =
    isMobile || isTabletHeader
      ? `${css.authNavigation} ${isTabletHeader ? css.tabletHeaderAuth : ""}`
      : css.authNavigationDesc;

  const logoutClass = isTabletHeader
    ? `${css.navLogin} ${isHomePage ? css.navLoginHome : ""}`
    : isHomePage
      ? `${css.navLogin} ${css.navLoginHome}`
      : css.navLogin;

  return (
    <>
      <ul className={authNavigationClass}>
        {user ? (
          <li>
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className={logoutClass}
            >
              LOG OUT
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                onClick={onCloseMobileMenu}
                className={`${css.navLogin} ${isHomePage ? css.navLoginHome : ""}`}
              >
                LOG IN
              </Link>
            </li>

            <li>
              <Link
                href="/register"
                onClick={onCloseMobileMenu}
                className={css.navReg}
              >
                REGISTRATION
              </Link>
            </li>
          </>
        )}
      </ul>
      {isLogoutModalOpen && (
        <Modal
          onClose={() => setIsLogoutModalOpen(false)}
          className={css.logoutModal}
        >
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
            onClick={() => setIsLogoutModalOpen(false)}
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
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(false)}
              className={css.logoutCancel}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
