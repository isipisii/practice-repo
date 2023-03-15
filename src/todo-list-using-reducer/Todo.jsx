import { ACTION_TYPES } from "./Actions";
import { useReducer, useState } from "react";
import { nanoid } from "nanoid";
import { INITIAL_STATE, reducer } from "./todoReducer";

import "./styles.css";

const Todo = () => {
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

  return (
    <div>
      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button
        onClick={() => {
          addTodo(todoTitle);
          setTodoTitle("");
        }}
      >
        Add
      </button>
      <h1>TO-DO List</h1>
      {state.map((todo) => (
        <div key={todo.id}>
          <h1 className={todo.isCompleted ? "completed" : undefined}>
            {todo.title}
          </h1>
          <p>{todo.time}</p>
          <p>{todo.isCompleted}</p>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleCompleteTodo(todo.id)}
          />
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
