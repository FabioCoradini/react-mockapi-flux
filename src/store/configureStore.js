import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import logger from "./middleware/logger";
// import toast from "./middleware/toast";
import api from "./middleware/api";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware(),
    //   logger({ destination: "console" }),
    //   toast,
    api,
  ],
});

export const persistor = persistStore(store);
