import { Action } from "@/types/store";
import { Reducer } from "react";
import { ICartState } from "./typings";

// Define action types
export const ADD_TO_CART = "cart/ADD_TO_CART";
export const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
export const UPDATE_CART = "cart/UPDATE_CART";
export const GET_CART_ITEMS = "cart/GET_CART_ITEMS";
export const CLEAR_CART = "cart/CLEAR_CART";

export const reducer: Reducer<ICartState, Action> = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // add items to localStorage
      const cartItems = [...state.data, action.payload];
      window.localStorage.setItem("_digi_cart", JSON.stringify(cartItems));
      return cartItems;
    case REMOVE_FROM_CART:
      // remove items from localStorage
      const newCartItems = state.data.filter(
        (item) => item.skuId !== action.payload?.skuId
      );
      window.localStorage.setItem("_digi_cart", JSON.stringify(newCartItems));
      return newCartItems;
    case UPDATE_CART:
      // update items in localStorage
      const updatedCartItems = state.data.map((item: any) => {
        if (item.skuId === action.payload?.skuId) {
          return action.payload;
        }
        return item;
      });
      window.localStorage.setItem(
        "_digi_cart",
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    case GET_CART_ITEMS:
      return action.payload;
    case CLEAR_CART:
      // clear cart from localStorage
      window.localStorage.removeItem("_digi_cart");
      return [];
    default:
      return state;
  }
};
