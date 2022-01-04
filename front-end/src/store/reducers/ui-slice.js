import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: {
    notification: null,
    isLoading: false,
  },

  reducers: {
    showNotification(state, action) {
      state.notification = {
        title: action.payload.title,
        name: action.payload.name,
        message: action.payload.message,
      };
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.loading;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
