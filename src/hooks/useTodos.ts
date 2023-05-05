import { ITodoItem } from '../models/ITodoItem';
import { useAppDispatch } from './useAppDispatch';
import { addToDo, removeToDo, updateToDos } from '../store/todoSlice';
import { useToDoRepository } from './useToDoRepository';

export function useTodos() {
	const {
		saveData,
		getData,
		getCompletedData,
		getIncompleteData,
		toggleTodo,
		removeCompleted,
	} = useToDoRepository();
	const dispatch = useAppDispatch();

	function set(todos: ITodoItem[]) {
		console.log(todos);
		dispatch(updateToDos(todos));
	}

	function getAll() {
		const todos = getData();
		set(todos);
	}

	function filterCompleted() {
		const todos = getCompletedData();
		set(todos);
	}

	function filterIncomplete() {
		const todos = getIncompleteData();
		set(todos);
	}

	function add(text: string, isActive: boolean) {
		const data = getData();
		const todo = {
			id: new Date().toISOString(),
			text,
			checked: isActive,
		};
		data.push(todo);
		saveData(data);
		dispatch(addToDo(todo));
	}

	function toggleComplete(todo: ITodoItem) {
		const todos = toggleTodo(todo);
		set(todos);
	}

	function remove(todo: ITodoItem) {
		let data = getData();
		data = data.filter((item) => item.id !== todo.id);
		saveData(data);
		dispatch(removeToDo(todo));
	}

	function clearCompleted() {
		const data = removeCompleted();
		set(data);
	}

	return {
		getAll,
		clearCompleted,
		filterCompleted,
		filterIncomplete,
		set,
		add,
		remove,
		toggleComplete,
	};
}
