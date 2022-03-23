import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../reducers/authenticate";
import userReducer from "../reducers/user";

export default configureStore({
  reducer: {
    authenticate: authenticateReducer,
    user: userReducer,
  },
});
