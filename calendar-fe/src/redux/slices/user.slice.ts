// Redux Import
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../Types/types/user.type";

// Interface
interface initialStateT {
  token: string | null;
  user: IUser | null;
}

const initialState: initialStateT = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { updateUser, resetUser, updateToken } = userSlice.actions;

export default userSlice.reducer;
