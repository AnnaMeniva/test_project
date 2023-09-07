import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IUserLogin } from "../types/types";

export interface IUserState {
  user: IUserLogin | null;
  isAuth: boolean;
}

export const initialState: IUserState = {
  user: null,
  isAuth: false,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserLogin>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, logout } = usersSlice.actions;

export const selectStatus = (state: RootState) => state.users;
export default usersSlice.reducer;
