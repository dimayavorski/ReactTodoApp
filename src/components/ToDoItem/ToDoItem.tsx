import { ITodoItem } from "../../models/ITodoItem";
import styles from "./ToDoItem.module.scss"
import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Checkbox } from "../checkbox/Checkbox";
import { useTodos } from "../../hooks/useTodos";

interface TodoItemProps {
    todoItem: ITodoItem;
}

export const ToDoItem: FC<TodoItemProps> = ({ todoItem }) => {
    const {removeTodo} = useTodos()

    const removeTask = (todo: ITodoItem) => {
        removeTodo(todo);
    }
    const toggleTodo = (todo: ITodoItem) => {
        //dispatch(toggleToDoComplete(todo))
    }

    return (
        <li className={styles.toDoItem}>
            <div className={styles.toDoItemInfo}>
                <Checkbox isActive={todoItem.checked} toggleCheckboxHandler={() => toggleTodo(todoItem)} />
                <p>{todoItem.text}</p>
            </div>
            <button className={styles.removeBtn} onClick={() => removeTask(todoItem)}><AiOutlineClose size={20} /></button>
        </li>
    )
}