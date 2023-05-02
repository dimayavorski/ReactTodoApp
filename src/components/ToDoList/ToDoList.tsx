import styles from "./ToDoList.module.scss";
import { ToDoItem } from "../ToDoItem/ToDoItem";
import { ITodoItem } from "../../models/ITodoItem";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useState } from "react";



export function ToDoList() {
    const todos = useAppSelector(state => state.todos.todos)
    console.log('todos', todos);
    
    // const toggleToDoComplete = (todoId) => {
        
    // }
   
    // const [todos, setTodos] = useState<ITodoItem[]>([
    //     {
    //         id: "1",
    //         text: "SomeItem",
    //         checked: true,
    //     },
    //     {
    //         id: "2",
    //         text: "SomeItem2",
    //         checked: false,
    //     },
    // ])
    return (
        <div className={styles.toDoList}>
            <ul className={styles.content}>
                {todos.map((todo: ITodoItem) => <ToDoItem key={todo.id} todoItem={todo} />)}
            </ul>
            <div className={styles.actionsList}>
                <a>5 items left</a>
                <div className={styles.filter}>
                    <a>All</a>
                    <a>Active</a>
                    <a>Completed</a>
                </div>
                <a>Clear Completed</a>
            </div>
        </div>
    )
}