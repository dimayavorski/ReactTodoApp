import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITodoItem } from '../models/ITodoItem';
import { FilterType } from '../models/FilterType';

const todos: ITodoItem[] = [];
const filter: number = FilterType.ALL;

const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos,
		filter,
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
		updateFilter(state, action: PayloadAction<FilterType>) {
			state.filter = action.payload;
		},
	},
});

export const {
	updateToDos,
	addToDo,
	removeToDo,
	toggleToDoComplete,
	updateFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
