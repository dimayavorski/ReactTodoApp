import { createSlice } from "@reduxjs/toolkit"
import { ITodoItem } from "../models/ITodoItem"
import { RootState } from "./store";




const todos: ITodoItem[] = [
    // {
    //     id: new Date().toISOString(),
    //     text: "12321412",
    //     checked: false
    // },
    // {
    //     id: new Date().toISOString() + "1",
    //     text: "1asdasdasd",
    //     checked: false
    // }
];

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: todos
    },
    reducers: {
        addToDo(state, action) {
            state.todos.push(action.payload.todo)
        },
        removeToDo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleToDoComplete(state, action) {
            const toggleTodo = state.todos.find(todo => todo.id === action.payload.id);
            if (toggleTodo)
                toggleTodo.checked = !toggleTodo.checked;
        },
        removeCompletedToDos(state, action) { },
        addToDos(state, action) {
            state.todos = action.payload.todos;
        },
        getCompleted(state) {
            state.todos = todos.filter(todo => todo.checked)
        },
        getIncomplete(state) {
            state.todos = todos.filter(todo => !todo.checked)
        }
    },
})

export const { addToDo, removeToDo, toggleToDoComplete, removeCompletedToDos, addToDos } = todoSlice.actions;
//export const selectCount = (state: RootState) => state.counter.value
export default todoSlice.reducer;