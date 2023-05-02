import { createSlice } from "@reduxjs/toolkit"
import { ITodoItem } from "../models/ITodoItem"
import { RootState } from "./store";

const todos: ITodoItem[] =[];

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: todos
    },
    reducers: {
        addToDo(state, action) {
            console.log(state);
            console.log(action);
            
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload.text,
                checked: action.payload.active
            })
        }, 
        removeToDo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleToDoComplete(state, action) {},
        removeCompletedToDos(state, action) {}
    },
})

export const {addToDo, removeToDo, toggleToDoComplete, removeCompletedToDos} = todoSlice.actions;
//export const selectCount = (state: RootState) => state.counter.value
export default todoSlice.reducer;