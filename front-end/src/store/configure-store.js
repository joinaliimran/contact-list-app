import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./reducers/auth-slice";
import uiSlice from "./reducers/ui-slice";
import contactSlice from "./reducers/contact-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducer = combineReducers({
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  contact: contactSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
