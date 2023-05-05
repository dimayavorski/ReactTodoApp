import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITodoItem } from '../models/ITodoItem';

const todos: ITodoItem[] = [];

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos,
	},
	reducers: {
		addToDo(state, action: PayloadAction<ITodoItem>) {
			state.todos.push(action.payload);
		},
		removeToDo(state, action: PayloadAction<ITodoItem>) {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
		},
		toggleToDoComplete(state, action: PayloadAction<ITodoItem>) {
			const toggleTodo = state.todos.find(
				(todo) => todo.id === action.payload.id
			);
			if (toggleTodo) toggleTodo.checked = !toggleTodo.checked;
		},
		updateToDos(state, action: PayloadAction<ITodoItem[]>) {
			state.todos = action.payload;
		},
	},
});

export const { updateToDos, addToDo, removeToDo, toggleToDoComplete } =
	todoSlice.actions;
//export const selectCount = (state: RootState) => state.counter.value
export default todoSlice.reducer;
