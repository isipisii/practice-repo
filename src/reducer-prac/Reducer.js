import { ACTION_TYPES } from "./Actions";

export const INITIAL_STATE = {
  title: "",
  description: "",
  price: 0,
  category: "",
  tags: [],
  images: {
    sm: "",
    md: "",
    lg: "",
  },
  quantity: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTION_TYPES.ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case ACTION_TYPES.REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload),
      };
    case ACTION_TYPES.INCREASE:
      return {
        ...state, quantity: state.quantity + 1,
      };
    case ACTION_TYPES.DECREASE:
      return {
        ...state, quantity: state.quantity - 1,
      };
  }
};
