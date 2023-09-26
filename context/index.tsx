import { useReducer, createContext, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { combineReducers } from "@/helper/utils";
import { Action, Dispatch } from "@/types/store";

import {
  IUserState,
  reducer as authReducer,
  initialState as authInitialState,
  LOGIN,
  LOGOUT,
} from "./auth";
import {
  ICartState,
  reducer as cartReducer,
  initialState as cartInitialState,
  GET_CART_ITEMS,
} from "./cart";

type Props = {
  children: React.ReactNode;
};

type TContext = {
  state: RootState;
  dispatch: Dispatch;
};

export interface RootState {
  auth: IUserState;
  cart: ICartState;
}

const initalRootState = {
  auth: authInitialState,
  cart: cartInitialState,
};

const rootReducer = combineReducers<RootState, Action>({
  auth: authReducer,
  cart: cartReducer,
});

const initialContext: TContext = {
  state: initalRootState,
  dispatch: () => {},
};

// create context
const Context = createContext<TContext>(initialContext);

// context provider
const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(rootReducer, initalRootState);
  // const [cartItems, cartDispatch] = useReducer(cartReducer, []);

  // router
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: LOGIN,
      payload: JSON.parse(window.localStorage.getItem("_digi_user") || "{}"),
    });
    // get cart items from localStorage
    const cartItems = JSON.parse(
      window.localStorage.getItem("_digi_cart") || "[]"
    );
    dispatch({ type: GET_CART_ITEMS, payload: cartItems });
    return;
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response;
    },
    function (error) {
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .put("/api/v1/users/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({
                type: LOGOUT,
                payload: undefined,
              });
              localStorage.removeItem("_digi_user");
              router.push("/auth");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BASE_API_PREFIX + "/csrf-token"
      );
      const csrfToken = data.result;
      if (!csrfToken) {
        throw new Error("CSRF Token not found");
      }
      // csrf token to axios header
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      console.log("CSRF Token", csrfToken, axios.defaults.headers);
    };
    getCsrfToken();
  }, []);

  const providerValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    []
  );

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export { Context, Provider };
