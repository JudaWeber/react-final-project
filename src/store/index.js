import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import bizUserInfoReducer from "./bizUserInfo";

//initial the global redux "state"
const store = configureStore({
  reducer: {
    auth: authReducer,
    bizUserInfo: bizUserInfoReducer,
  },
});

export default store;
