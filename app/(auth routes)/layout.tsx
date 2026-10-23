"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn, isAuthChecked } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthChecked && isLoggedIn) {
      router.replace("/");
    }
  }, [isAuthChecked, isLoggedIn, router]);

  if (!isAuthChecked || isLoggedIn) {
    return null;
  }

  return children;
}