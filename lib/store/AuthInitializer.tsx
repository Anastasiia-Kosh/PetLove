
"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser, clearUser } from "@/lib/store/authStore";
import { currentUserFullInfo } from "../api/clientApi";


export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const fullUser = await currentUserFullInfo(token);
        dispatch(setUser(fullUser));
      } catch {
        localStorage.removeItem("token");
        dispatch(clearUser());
      }
    };

    restoreUser();
  }, [dispatch]);

  return null;
}
