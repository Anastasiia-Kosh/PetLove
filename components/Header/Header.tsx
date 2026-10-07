"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { usePathname } from "next/navigation";
import Icon from "../Icon/Icon";

export default function Header() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderScroll, setIsHeaderScroll] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${css.header} ${isHeaderScroll ? css.headerScroll : ""}`}
    >
      <div className="container">
        <div className={css.headerInner}>
          <Link href="/" aria-label="PetLove" className={css.logo}>
            Petl
            <Icon name="logo" className={css.icon_logo} />
            ve
          </Link>

          <button
            type="button"
            onClick={handleMobileMenu}
            aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={isMobileMenuOpen}
            className={`${css.menuButton} ${
              isMobileMenuOpen ? css.menuButtonOpen : ""
            }`}
          >
            <Icon
              name={isMobileMenuOpen ? "close" : "menu"}
              className={css.icon_menu}
            />
          </button>

          <nav aria-label="Main Navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
                 <li>
                <Link href="/news" onClick={handleCloseMobileMenu}>
                  News
                </Link>
              </li>

              <li>
                <Link href="/notices" onClick={handleCloseMobileMenu}>
                  Find pet
                </Link>
              </li>

              <li>
                <Link href="/friends" onClick={handleCloseMobileMenu}>
                  Our friends
                </Link>
              </li>
            </ul>
            <AuthNavigation pathname={pathname} />
          </nav>
        </div>
        {isMobileMenuOpen && (
          <nav className={css.mobileNav} aria-label="Mobile Navigation">
            <ul className={css.mobileNavigation}>
              <li>
                <Link href="/news" onClick={handleCloseMobileMenu}>
                  News
                </Link>
              </li>

              <li>
                <Link href="/notices" onClick={handleCloseMobileMenu}>
                  Find pet
                </Link>
              </li>

              <li>
                <Link href="/friends" onClick={handleCloseMobileMenu}>
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
