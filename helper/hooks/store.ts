import { Context, RootState } from "@/context/index";
import { Dispatch } from "@/types/store";
import { useContext } from "react";

export const useAppSelector = <T>(selector: (state: RootState) => T): T => {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error("MyProvider not found");
  }

  return selector(contextValue.state);
};

export const useAppDispatch = (): Dispatch => {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error("MyProvider not found");
  }

  return contextValue.dispatch;
};
