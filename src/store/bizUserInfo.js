import { createSlice } from "@reduxjs/toolkit";

const initialBizInfoState = {
  bizUserInfo: null,
};

const bizUserInfoSlice = createSlice({
  name: "bizInfo",
  initialState: initialBizInfoState,
  reducers: {
    save(state, action) {
      state.bizUserInfo = action.payload;
    },
  },
});
export const bizUserInfoActions = bizUserInfoSlice.actions;

export default bizUserInfoSlice.reducer;
