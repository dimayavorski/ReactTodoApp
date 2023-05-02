import { ITodoItem } from "../../models/ITodoItem";
import { FaRegTrashAlt } from "react-icons/fa"
import styles from "./ToDoItem.module.scss"
import { FC } from "react";
import { removeToDo } from "../../store/todoSlice"
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface TodoItemProps {
    todoItem: ITodoItem;
}

export const ToDoItem: FC<TodoItemProps> = ({ todoItem }) => {
    const dispatch = useAppDispatch();
    const removeTask = (todo: ITodoItem) => {
        dispatch(removeToDo(todo))
    }


    return (
        <li className={styles.toDoItem}>
            <input type="checkbox" checked={todoItem.checked} />
            <p>{todoItem.text}</p>
            <button onClick={() => removeTask(todoItem)}><FaRegTrashAlt /></button>
        </li>
    )
}