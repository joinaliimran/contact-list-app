import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: { isLoggedIn: false, tokenData: null },

  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload.loggedIn;
    },
    setTokenData(state, action) {
      state.tokenData = {
        token: action.payload.token,
        expiryDate: action.payload.expiryDate,
        userId: action.payload.userId,
      };
    },
    logout(state, action) {
      // From here we can take action only at this "counter" state
      // But, as we have taken care of this particular "logout" action
      // in rootReducer, we can use it to CLEAR the complete Redux Store's state
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
