import { ITodoItem } from '../models/ITodoItem';
import { store } from './store';
import {
	addToDo,
	removeToDo,
	toggleToDoComplete,
	updateToDos,
} from './todoSlice';

describe('todo slice tests', () => {
	const todos: ITodoItem[] = [
		{
			id: '1',
			text: '2asd',
			checked: true,
		},
		{
			id: '12',
			text: '2asd4',
			checked: true,
		},
	];
	const todo: ITodoItem = {
		id: '14',
		text: '2asd',
		checked: true,
	};

	beforeEach(() => {
		store.dispatch(updateToDos([]));
	});

	it('Show instanciate empty todos array', () => {
		const state = store.getState().todos;

		expect(state.todos).toEqual([]);
	});

	it('updateToDos should set todos', () => {
		store.dispatch(updateToDos(todos));

		const state = store.getState().todos;
		expect(state.todos.length).toEqual(2);
	});

	it('addToDo should add new todo', () => {
		store.dispatch(addToDo(todo));

		const state = store.getState().todos;
		expect(state.todos.find((t) => t.id == '14')).toBeTruthy();
	});

	it('removeToDo should remove item from store', () => {
		store.dispatch(addToDo(todo));
		store.dispatch(removeToDo(todo));

		const state = store.getState().todos;

		expect(state.todos.find((t) => t.id == todo.id)).toBeFalsy();
	});

	it('toggleTodo should update checked status of the todo', () => {
		store.dispatch(addToDo(todo));
		store.dispatch(toggleToDoComplete(todo));

		const state = store.getState().todos;
		expect(state.todos.find((t) => t.id == todo.id)?.checked).toBe(
			!todo.checked
		);
	});
});
