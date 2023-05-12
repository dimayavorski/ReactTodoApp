import { ITodoItem } from '../models/ITodoItem';

export function useToDoRepository() {
	const key = 'todos';

	function saveData(todos: ITodoItem[]) {
		localStorage.setItem(key, JSON.stringify(todos));
	}

	function getData(): ITodoItem[] {
		const data = localStorage.getItem(key);

		if (data) {
			const todos: ITodoItem[] = JSON.parse(data) as ITodoItem[];
			return todos;
		}
		return [];
	}

	function getCompletedData(): ITodoItem[] {
		const data = localStorage.getItem(key);

		if (data) {
			const todos = JSON.parse(data) as ITodoItem[];
			return todos.filter((todo) => todo.checked);
		}
		return [];
	}

	function toggleTodo(todo: ITodoItem): ITodoItem[] {
		const data = localStorage.getItem(key);

		if (data) {
			const todos = JSON.parse(data) as ITodoItem[];
			const todoToToggle = todos.find((t) => t.id === todo.id);
			if (todoToToggle) {
				todoToToggle.checked = !todoToToggle.checked;
				saveData(todos);
				return todos;
			}
		}
		return [];
	}

	function getIncompleteData(): ITodoItem[] {
		const data = localStorage.getItem(key);

		if (data) {
			const todos = JSON.parse(data) as ITodoItem[];
			return todos.filter((todo) => todo.checked === false);
		}
		return [];
	}

	function removeCompleted(): ITodoItem[] {
		const data = getIncompleteData();
		saveData(data);
		return data;
	}

	return {
		removeCompleted,
		saveData,
		getData,
		getCompletedData,
		getIncompleteData,
		toggleTodo,
	};
}
