"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { usePathname } from "next/navigation";
import Icon from "../Icon/Icon";
import UserBar from "@/components/UserBar/UserBar";
import { useAppSelector } from "@/lib/store/hooks";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const user = useAppSelector((state) => state.auth.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${css.header} ${isHomePage ? css.headerHome : ""}`}>
      <div className="container">
        <div className={css.headerInner}>
          <Link href="/" aria-label="PetLove" className={css.logo}>
            Petl
            <Icon name="logo" className={css.icon_logo} />
            ve
          </Link>
          {user && (
            <div className={css.mobileUserBar}>
              <UserBar />
            </div>
          )}
          <div className={css.tabletAuthNavigation}>
            <AuthNavigation isTabletHeader pathname={pathname} />
            <UserBar />
          </div>
          <button
            type="button"
            onClick={handleMobileMenu}
            aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isMobileMenuOpen}
            className={`${css.menuButton} ${
              isMobileMenuOpen ? css.menuButtonOpen : ""
            } ${isMobileMenuOpen && isHomePage ? css.menuButtonHomeOpen : ""}`}
          >
            <Icon
              name={isMobileMenuOpen ? "close" : "menu"}
              className={css.icon_menu}
            />
          </button>

          <nav aria-label="Main Navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
              <li>
                <Link
                  href="/news"
                  onClick={handleCloseMobileMenu}
                  className={`${css.navLink} ${pathname === "/news" ? css.activeLink : ""}`}
                >
                  News
                </Link>
              </li>

              <li>
                <Link
                  href="/notices"
                  onClick={handleCloseMobileMenu}
                  className={`${css.navLink} ${pathname === "/notices" ? css.activeLink : ""}`}
                >
                  Find pet
                </Link>
              </li>

              <li>
                <Link
                  href="/friends"
                  onClick={handleCloseMobileMenu}
                  className={`${css.navLink} ${pathname === "/friends" ? css.activeLink : ""}`}
                >
                  Our friends
                </Link>
              </li>
            </ul>
            <div className={css.descAuthNavigation}>
              <AuthNavigation pathname={pathname} />
              <UserBar />
            </div>
          </nav>
        </div>
        {isMobileMenuOpen && (
          <nav
            className={`${css.mobileNav} ${
              isHomePage ? css.mobileNavHome : css.mobileNavInner
            }`}
            aria-label="Mobile Navigation"
          >
            <ul className={css.mobileNavigation}>
              <li>
                <Link
                  href="/news"
                  onClick={handleCloseMobileMenu}
                  className={`${css.navLinkMob} ${pathname === "/news" ? css.activeLinkMob : ""}`}
                >
                  News
                </Link>
              </li>

              <li>
                <Link
                  href="/notices"
                  onClick={handleCloseMobileMenu}
                  className={`${css.navLinkMob} ${pathname === "/notices" ? css.activeLinkMob : ""}`}
                >
                  Find pet
                </Link>
              </li>

              <li>
                <Link
                  href="/friends"
                  onClick={handleCloseMobileMenu}
                  className={`${css.navLinkMob} ${pathname === "/friends" ? css.activeLinkMob : ""}`}
                >
                  Our friends
                </Link>
              </li>
            </ul>
            <AuthNavigation
              isMobile
              onCloseMobileMenu={handleCloseMobileMenu}
              pathname={pathname}
            />
          </nav>
        )}
      </div>
    </header>
  );
}
