import { Dispatch, createContext, useReducer, ReactElement, FC } from "react";
import { reducer, initialState } from "./reducer";
import { States, ItemActions } from "../types";

type CartContextType = {
  state: States;
  dispatch: Dispatch<ItemActions>;
};

type CartProviderProps = {
  children?: ReactElement | ReactElement[];
};

export const CartContext = createContext<CartContextType>({
  state: initialState,
  dispatch: () => {},
});

export const CartProvider: FC<CartProviderProps> = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
