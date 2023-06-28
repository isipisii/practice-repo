import { FC, useState, ChangeEvent, FormEvent } from "react";
import Todo from "./Todo";
import { nanoid } from "nanoid";

interface ITodo {
  todoName: string;
  isDone: boolean;
  id: string;
}

const App: FC = () => {
  const [todoToBeEdited, setTodoToBeEdited] = useState<ITodo | null>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState<ITodo>({
    todoName: "",
    isDone: false,
    id: "",
  });

  function handleOnChange(e: ChangeEvent<HTMLInputElement>): void {
    setTodo((prevState) => ({
      ...prevState,
      todoName: e.target.value,
      id: nanoid(),
    }));
  }

  function handleOnSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    setTodos((prevTodos) => [...prevTodos, todo]);
    setTodo({ ...todo, todoName: "", id: "" });
  }

  function deleteTodo(id: string): void {
    const filteredTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodo);
  }

  function handleCompleteTodo(id: string): void {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });

    setTodos(updatedTodo);
  }

  function handleEditTodo(id: string) {
    const todo = todos.find((todo) => id === todo.id);
    setTodoToBeEdited(todo);
  }

  function updateTodo(e: FormEvent<HTMLFormElement>, todoToBeEdited: ITodo) {
    e.preventDefault();
    const updatedTodo: ITodo[] = todos.map((todo) =>
      todo.id === todoToBeEdited.id ? { ...todoToBeEdited } : todo
    );
    setTodos(updatedTodo);
    setTodoToBeEdited(null)
  }

  return (
    <div>
      {/* edit form */}
      {todoToBeEdited ? (
        <form onSubmit={(e) => updateTodo(e, todoToBeEdited)}>
          <input
            type="text"
            value={todoToBeEdited.todoName}
            onChange={(e) =>
              setTodoToBeEdited({ ...todoToBeEdited, todoName: e.target.value })
            }
          />
          <button
            type="submit"
            disabled={!todoToBeEdited.todoName ? true : false}
          >
            Update Todo
          </button>
        </form>
      ) : (
        // add form
        <form onSubmit={handleOnSubmit}>
          <input type="text" value={todo.todoName} onChange={handleOnChange} />
          <button type="submit" disabled={!todo.todoName ? true : false}>
            Submit Todo
          </button>
        </form>
      )}

      <ul>
        {todos.map((todo, index) => (
          <Todo
            todoName={todo.todoName}
            isDone={todo.isDone}
            key={index}
            deleteTodo={deleteTodo}
            id={todo.id}
            handleCompleteTodo={handleCompleteTodo}
            handleEditTodo={handleEditTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
