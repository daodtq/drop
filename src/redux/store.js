import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";
import userSlice from "../features/slices";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["drop"],
};
const rootReducer = combineReducers({
  drop: userSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Bỏ qua các action của redux-persist
      },
    }),
});
export const persistor = persistStore(store);