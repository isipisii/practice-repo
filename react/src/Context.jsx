import React from "react";
import { useState, createContext, useReducer } from "react";
import { ACTION_TYPES } from "./todo-list-using-reducer/Actions";
import { INITIAL_STATE, reducer } from "./todo-list-using-reducer/todoReducer";
import { nanoid } from "nanoid";

const GlobalContext = createContext();

const Context = ({ children }) => {
  const [userName, setUserName] = useState("");

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [todoTitle, setTodoTitle] = useState(""); 
  const date = new Date();

  const todo = (title) => {
    return {
      title: title,
      id: nanoid(),
      time: date.toLocaleTimeString(),
      isCompleted: false,
    };
  };

  const addTodo = (title) => {
    if (!todoTitle) {
      alert("Please input your to-do");
    } else dispatch({ type: ACTION_TYPES.ADD_TODO, payload: todo(title) });
  };

  const deleteTodo = (id) => {
    dispatch({ type: ACTION_TYPES.DELETE_TODO, payload: id });
  };

  const handleCompleteTodo = (id) => {
    dispatch({ type: ACTION_TYPES.COMPLETE_TODO, payload: id });
  };

  // const handleEditTodo = (title) => {
  //   dispatch({type: ACTION_TYPES.EDIT_TODO,  title: title})
  // }

  function onChange(e) {
    setUserName(e.target.value);
  }

  return (
    <GlobalContext.Provider
      value={{
        userName,
        setUserName,
        onChange,

        ...state,
        addTodo,
        handleCompleteTodo,
        deleteTodo,
        todo,
        setTodoTitle,
        todoTitle,
        // handleEditTodo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { Context, GlobalContext };
