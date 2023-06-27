import { useContext } from "react";
import { GlobalContext } from "../Context";

import "./styles.css";

const Todo = () => {
  const { todos, addTodo, deleteTodo, handleCompleteTodo, todoTitle, setTodoTitle } = useContext(GlobalContext);

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
      {todos.map((todo) => (
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
