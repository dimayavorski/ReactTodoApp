import { ITodoItem } from "../models/ITodoItem";

export function useLocalStorage() {
    const key = "todos";

    const todosMock: ITodoItem[] = [{
        id: new Date().toISOString(),
        text: "12321412",
        checked: false
    },
    {
        id: new Date().toISOString() + "1",
        text: "1asdasdasd",
        checked: false
    }];

    function saveData(todos: ITodoItem[]) {
        localStorage.setItem(key, JSON.stringify(todos));
    }

    function getData(): ITodoItem[] {
        let data = localStorage.getItem(key);
        if (data) {
            let todosInitial: ITodoItem[] = JSON.parse(data);
            return todosInitial;
        }
        return [];
    }

    function initDatabase() {
        console.log("init db.....");
        if (!localStorage.getItem(key))
            localStorage.setItem(key, JSON.stringify(todosMock));
    }

    return {initDatabase, saveData, getData};
}