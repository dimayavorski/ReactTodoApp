import exp from 'constants';
import { ITodoItem } from '../models/ITodoItem';
import { useToDoRepository } from './useToDoRepository';

describe('useToDoRepository tests', () => {
	const {
		initDatabase,
		saveData,
		getData,
		getCompletedData,
		getIncompleteData,
		toggleTodo,
		removeCompleted,
	} = useToDoRepository();

	const mockItems: ITodoItem[] = [
		{
			id: 'asdasd',
			text: 'someName',
			checked: true,
		},
		{
			id: 'asdasd2',
			text: 'someName2',
			checked: true,
		},
		{
			id: 'asdasd3',
			text: 'someName3',
			checked: false,
		},
	];

	const todoMock: ITodoItem = {
		id: '14',
		text: '2asd',
		checked: true,
	};
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('initDatabase repository should set some data', () => {
		initDatabase();
		const data = getData();

		expect(data.length).toBeGreaterThan(0);
	});

	it('getData should return data', () => {
		initDatabase();
		const data = getData();

		expect(data).toBeTruthy();
	});

	it('getIncomplete data should return not checked items', () => {
		saveData(mockItems);
		const data = getIncompleteData();
		expect(data.filter((todo) => todo.checked == false).length).toBe(1);
	});

	it('getCompleted data should return checked items', () => {
		saveData(mockItems);
		const data = getCompletedData();
		expect(data.filter((todo) => todo.checked == true).length).toBe(2);
	});

	it('toggleTodo should change status of passed todo', () => {
		saveData([todoMock]);
		const todos = toggleTodo(todoMock);

		expect(todos.find((t) => t.id == todoMock.id)?.checked).not.toBe(
			todoMock.checked
		);
	});

	it('removeCompleted should remove completed todos', () => {
		saveData(mockItems);
		const items = removeCompleted();

		expect(items.length).toBe(1);
	});
});
