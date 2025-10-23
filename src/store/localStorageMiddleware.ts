import { Middleware, isAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const localStorageMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    if (!isAction(action)) return next(action);

    const result = next(action);

    if (action.type.startsWith("contacts/")) {
      const state = (storeAPI.getState() as RootState).contacts;
      localStorage.setItem("contacts", JSON.stringify(state));
    }

    return result;
  };
