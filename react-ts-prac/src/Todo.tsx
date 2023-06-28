import {FC} from 'react'

interface Props {
    todoName: string
    isDone: boolean
    id: string
    deleteTodo(id: string): void
    handleCompleteTodo(id: string): void 
    handleEditTodo(id: string): void
}

// the props generic will only accept the incoming props base on what is only defined in the interface
const Todo: FC<Props> =({todoName, isDone, id, deleteTodo, handleCompleteTodo, handleEditTodo})=> {
  return (
    <div>
        <h1 style={isDone ? {textDecorationLine: "line-through"} : {textDecorationLine: "none"}}>{todoName}</h1>
        <input type="checkbox" onChange={() => handleCompleteTodo(id)}/>
        <p onClick={() => deleteTodo(id)}>Delete</p>
        <p onClick={() => handleEditTodo(id)}>Edit</p>
    </div>
  )
}

export default Todo