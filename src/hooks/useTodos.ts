import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { ITodoItem } from "../models/ITodoItem";
import { useAppDispatch } from "./useAppDispatch";
import { addToDo, addToDos, removeToDo } from "../store/todoSlice";
import { useLocalStorage } from "./useLocalStorage";

export function useTodos() {
    
    const todos: ITodoItem[] = useAppSelector(state => state.todos.todos);
    const {saveData, getData} = useLocalStorage()
    const dispatch = useAppDispatch()

    function getAll() {
        return todos;
    }

    function getCompleted() {

    }

    function getIncomplete() {
        // todos.filter(todo => !todo.checked)
    }

    function addTodo(text: string, isActive: boolean) {
        let data = getData();
        const todo = {
            id: new Date().toISOString(),
            text: text,
            checked: isActive
        }
        data.push(todo);
        saveData(data);
        dispatch(addToDo({ todo: todo }))
    }

    function setToDos(todos: ITodoItem[]) {
        dispatch(addToDos({ todos }))
    }

    function removeTodo(todo: ITodoItem) {
        let data = getData();
        data = data.filter(item => item.id !== todo.id)
        saveData(data);
        dispatch(removeToDo(todo))
    }

  

    

    // useEffect(() => {
    //     let data = getData();
    //     setTodos(data);
    // })

    return { getAll, getCompleted, getIncomplete, setToDos, addTodo, removeTodo }
}