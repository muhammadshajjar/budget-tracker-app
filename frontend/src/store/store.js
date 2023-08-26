import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { budgetApi } from "./services";

export const store = configureStore({
  reducer: {
    [budgetApi.reducerPath]: budgetApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(budgetApi.middleware),
});

setupListeners(store.dispatch);
