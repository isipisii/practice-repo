import { ACTION_TYPES } from "./Actions";

export const INITIAL_STATE = {
  todos: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return { ...state, todo: action.payload };
    case ACTION_TYPES.DELETE_TODO:
      return {
        ...state,
        todo: todo.filter((todo) => todo.id !== action.payload),
      };
    case ACTION_TYPES.COMPLETE_TODO:
      return {
        ...state,
        todos: todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
  }
};
