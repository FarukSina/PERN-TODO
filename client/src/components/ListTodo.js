import React,{Fragment,useEffect, useState} from 'react'
import EditTodo from "./EditTodo"

export default function ListTodo() {
    const [todos, setTodos] = useState([])

    const getTodos = async () =>{
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    } 
    useEffect(() => {
       getTodos();
    }, [])
    console.log("todos", todos)
    const deleteTodoHandler = async(id) => {
        try {
            const deleteTodo = await fetch("http://localhost:5000/todos/" + id, {
                method: "DELETE",
            })
            console.log(deleteTodo)
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => {
                        return(
                    <tr key={todo.todo_id}>
                        <th >{todo.description}</th>
                        <td><EditTodo todo={todo}/></td>
                        <td><button onClick={() => window.confirm("Are you sure to delete the todo") ? deleteTodoHandler(todo.todo_id) : null} className="btn btn-danger">Delete</button></td>
                    </tr>
                        )
                    })} 
                </tbody>
            </table>
        </Fragment>
            
    )
}
