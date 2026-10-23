"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import ModalLogout from "../ModalLogout/ModalLogout";

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

  const user = useAppSelector((state) => state.auth.user);
  const isAuthChecked = useAppSelector(
  (state) => state.auth.isAuthChecked
);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isHomePage = pathname === "/";



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
        {isAuthChecked && (user ? (
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
        ))}
      </ul>
      {isLogoutModalOpen && <ModalLogout onClose={() => setIsLogoutModalOpen(false)} />}
    </>
  );
}
