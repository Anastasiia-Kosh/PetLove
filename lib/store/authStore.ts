import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/types/user";

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  favoriteNoticeIds: string[];
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  favoriteNoticeIds: [],
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.favoriteNoticeIds =
        action.payload.noticesFavorites?.map((favorite) => favorite._id) ?? [];
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.favoriteNoticeIds = [];
    },
    updateFavorites(state, action: PayloadAction<string[]>) {
      state.favoriteNoticeIds = action.payload;
    },
    setAuthChecked(state) {
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, clearUser, updateFavorites, setAuthChecked } =
  authSlice.actions;
export default authSlice.reducer;
