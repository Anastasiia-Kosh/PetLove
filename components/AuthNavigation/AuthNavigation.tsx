"use client";
// import { useAuth } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
// import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import UserBar from "@/components/UserBar/UserBar";

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
  // const { isAuthenticated, user, clearIsAuthenticated } = useAuth();
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

    // await logout();
    // clearIsAuthenticated();
    router.replace("/");
  };

  if (isMobile || isTabletHeader) {
    if (user) {
      return (
        <ul
          className={`${css.authNavigation} ${
            isTabletHeader ? css.tabletHeaderAuth : ""
          }`}
        >
          {isTabletHeader ? (
            <li>
              <UserBar />
            </li>
          ) : (
            <li>
              <button type="button" onClick={handleLogout}>
                LOG OUT
              </button>
            </li>
          )}
        </ul>
      );
    }

    return (
      <ul
        className={`${css.authNavigation} ${
          isTabletHeader ? css.tabletHeaderAuth : ""
        }`}
      >
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
      </ul>
    );
  }

  if (user) {
  return (
    <ul className={css.authNavigationDesc}>
      <li>
        <button type="button" onClick={handleLogout}>
          LOG OUT
        </button>
      </li>
      <li>
        <UserBar />
      </li>
    </ul>
  );
}
  return (
    <ul className={css.authNavigationDesc}>
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
    </ul>
  );

}
