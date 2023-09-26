import { Action, Reducer } from "@/types/store";
import { IUserState } from "./typings";

// Define action types
export const LOGIN = "auth/LOGIN";
export const LOGOUT = "auth/LOGOUT";
export const UPDATE_USER = "auth/UPDATE_USER";

export const reducer: Reducer<IUserState, Action> = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, data: action.payload };
    case LOGOUT:
      return { ...state, data: null };
    case UPDATE_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
