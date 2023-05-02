import styles from "./ToDoList.module.scss";
import { ToDoItem } from "../ToDoItem/ToDoItem";
import { ITodoItem } from "../../models/ITodoItem";
import { useEffect } from "react";
import { useTodos } from "../../hooks/useTodos";
import { useLocalStorage } from "../../hooks/useLocalStorage";



export function ToDoList() {

    const { getAll, getCompleted, getIncomplete, setToDos } = useTodos();
    const { getData } = useLocalStorage()

    useEffect(() => {
        const initData = getData();
        setToDos(initData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.toDoList}>
            <ul className={styles.content}>
                {getAll().map((todo: ITodoItem) => <ToDoItem key={todo.id} todoItem={todo} />)}
            </ul>
            <ul className={styles.actionsList}>
                <li>{getAll().filter(todo => !todo.checked).length} items left</li>
                <li className={styles.filter}>
                    <span onClick={() => getAll()}>All</span>
                    <span onClick={() => getIncomplete}>Active</span>
                    <span onClick={() => getCompleted()}>Completed</span>
                </li>
                <span>Clear Completed</span>
            </ul>
        </div>
    )
}