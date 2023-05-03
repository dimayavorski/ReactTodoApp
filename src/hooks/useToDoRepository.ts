import { ITodoItem } from '../models/ITodoItem';

export function useLocalStorage() {
	const key = 'todos';

	const todosMock: ITodoItem[] = [
		{
			id: new Date().toISOString(),
			text: '12321412',
			checked: false,
		},
		{
			id: new Date().toISOString() + '1',
			text: '1asdasdasd',
			checked: false,
		},
	];

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

	function initDatabase() {
		if (!localStorage.getItem(key))
			localStorage.setItem(key, JSON.stringify(todosMock));
	}

	return {
		initDatabase,
		removeCompleted,
		saveData,
		getData,
		getCompletedData,
		getIncompleteData,
		toggleTodo,
	};
}
