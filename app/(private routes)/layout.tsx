"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isAuthChecked = useAppSelector(
    (state) => state.auth.isAuthChecked
  );

  useEffect(() => {
    if (isAuthChecked && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isAuthChecked, isLoggedIn, router]);

  if (!isAuthChecked || !isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
