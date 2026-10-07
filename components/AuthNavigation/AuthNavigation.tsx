"use client";
// import { useAuth } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
// import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface AuthNavigationProps {
  isMobile?: boolean;
  onCloseMobileMenu?: () => void;
  pathname: string;
}

export default function AuthNavigation({
  isMobile = false,
  onCloseMobileMenu,
  pathname,
}: AuthNavigationProps) {
  const router = useRouter();
  // const { isAuthenticated, user, clearIsAuthenticated } = useAuth();

  const [menuPathname, setMenuPathname] = useState<string | null>(null);

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

  if (isMobile) {
    return  (
      <ul className={css.authNavigation}>
        <li className={css.navLogin}>
          <Link href="/login" onClick={onCloseMobileMenu}>
            LOG IN
          </Link>
        </li>

        <li className={css.navReg}>
          <Link href="/register" onClick={onCloseMobileMenu}>
            REGISTRATION
          </Link>
        </li>
      </ul>)
  }
  // if (isMobile) {
  //   return isAuthenticated && user ? (
  //     <li>
  //       <button type="button" onClick={handleLogout}>
  //         LOG OUT
  //       </button>
  //     </li>
  //   ) : (
  //     <>
  //       <li>
  //         <Link href="/sign-in" onClick={onCloseMobileMenu}>
  //           LOG IN
  //         </Link>
  //       </li>

  //       <li>
  //         <Link href="/sign-up" onClick={onCloseMobileMenu}>
  //           REGISTRATION
  //         </Link>
  //       </li>
  //     </>
  //   );
  // }
  return (
    <ul className={css.authNavigationDesc}>
      <li className={css.navLogin}>
        <Link href="/login" onClick={onCloseMobileMenu}>
          LOG IN
        </Link>
      </li>

      <li className={css.navReg}>
        <Link href="/register" onClick={onCloseMobileMenu}>
          REGISTRATION
        </Link>
      </li>
    </ul>
  );

  // return isAuthenticated && user ? (
  //   <li>
  //     <button type="button" onClick={handleLogout}>
  //       LOG OUT
  //     </button>
  //   </li>
  // ) : (
  //   <>
  //     <li>
  //       <Link href="/sign-in" onClick={onCloseMobileMenu}>
  //         LOG IN
  //       </Link>
  //     </li>

  //     <li>
  //       <Link href="/sign-up" onClick={onCloseMobileMenu}>
  //         REGISTRATION
  //       </Link>
  //     </li>
  //   </>
  // );
}
