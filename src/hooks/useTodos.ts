import { ITodoItem } from '../models/ITodoItem';
import { useAppDispatch } from './useAppDispatch';
import { removeToDo, updateToDos } from '../store/todoSlice';
import { useToDoRepository } from './useToDoRepository';
import { useAppSelector } from './useAppSelector';
import { FilterType } from '../models/FilterType';

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

	const filter = useAppSelector((state) => state.todos.filter);
	function set(todos: ITodoItem[]) {
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
	function setFiltered() {
		if (filter == FilterType.COMPLETED) {
			filterCompleted();
		} else if (filter == FilterType.INCOMPLETE) {
			filterIncomplete();
		} else {
			getAll();
		}
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
		setFiltered();
	}

	function toggleComplete(todo: ITodoItem) {
		toggleTodo(todo);
		setFiltered();
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
		setFiltered,
	};
}
