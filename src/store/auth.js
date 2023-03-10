import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  loggedIn: false,
  userInfo: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => initialAuthState,
    updateUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
