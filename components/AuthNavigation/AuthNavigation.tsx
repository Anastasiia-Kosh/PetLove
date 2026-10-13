"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { logoutUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/authStore";
import toast from "react-hot-toast";

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
  const [menuPathname, setMenuPathname] = useState<string | null>(null);
  const isHomePage = pathname === "/";
  const isUserMenuOpen = menuPathname === pathname;

  const handleMenu = () => {
    setMenuPathname((prev) => (prev === pathname ? null : pathname));
  };

  const handleCloseMenu = () => {
    setMenuPathname(null);
  };

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
      router.replace("/");
    }
  };

 
  const authNavigationClass = isMobile || isTabletHeader
    ? `${css.authNavigation} ${isTabletHeader ? css.tabletHeaderAuth : ""}`
    : css.authNavigationDesc;

  const logoutClass = isTabletHeader
    ? `${css.navLogin} ${isHomePage ? css.navLoginHome : ""}`
    : isHomePage
      ? `${css.navLogin} ${css.navLoginHome}`
      : css.navLogin;

  return (
    <ul className={authNavigationClass}>
      {user ? (
        <li>
          <button
            type="button"
            onClick={handleLogout}
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
  );
}