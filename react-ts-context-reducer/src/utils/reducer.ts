import { States, ActionType, ItemActions } from "../types";

export const initialState: States = {
  items: [],
  cartItems: [],
  cartItemQuantity: 0,
  total: 0,
};

export function reducer(state: States, action: ItemActions): States {
  switch (action.type) {
    case ActionType.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case ActionType.ADD_TO_CART:
      // check first if the item is in the cart already
      const isInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (isInCart) {
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cartItems: updatedCartItems };
      } else
        return { ...state, cartItems: [...state.cartItems, action.payload] };

    case ActionType.INCREASE_QTY: {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    }

    case ActionType.DECREASE_QTY: {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    }

    case ActionType.CALCULATE_TOTAL: {
      let itemQuantity: number = 0;
      let total: number = 0;

      state.cartItems.forEach((cartItem): void => {
        itemQuantity += cartItem.quantity;
        total += cartItem.price * itemQuantity;
      });
      return {
        ...state,
        cartItemQuantity: state.cartItemQuantity = itemQuantity,
        total: state.total = total,
      };
    }
    case ActionType.REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };
  }
}
