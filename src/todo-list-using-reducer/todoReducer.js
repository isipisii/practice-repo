import { ACTION_TYPES } from "./Actions";

export const INITIAL_STATE = {
  todos: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case ACTION_TYPES.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case ACTION_TYPES.COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    // case ACTION_TYPES.EDIT_TODO:
    //   return {
    //     ...state,
    //     todos: state.todos.map((todo) => todo.id === action.id ? { ...todo, title: action.title } : todo
    //     ),
    //   };
  }
};
