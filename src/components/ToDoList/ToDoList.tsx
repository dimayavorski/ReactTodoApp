import styles from "./ToDoList.module.scss";
import { ToDoItem } from "../ToDoItem/ToDoItem";
import { ITodoItem } from "../../models/ITodoItem";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { useLocalStorage } from "../../hooks/useLocalStorage";



export function ToDoList() {

    const { getAll, getCompleted, getIncomplete, setToDos } = useTodos();
    const { saveData, getData } = useLocalStorage()

    useEffect(() => {
        let initData = getData();
        setToDos(initData);
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
                    <span onClick={() => getIncomplete()}>Active</span>
                    <span onClick={() => getCompleted()}>Completed</span>
                </li>
                <a>Clear Completed</a>
            </ul>
        </div>
    )
}