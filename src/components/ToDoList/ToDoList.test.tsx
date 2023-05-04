import { ITodoItem } from '../../models/ITodoItem';
import {
	fireEvent,
	render,
	screen,
	RenderResult,
} from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ToDoList } from './ToDoList';
import { useLocalStorage } from '../../hooks/useToDoRepository';

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
describe('ToDoList tests', () => {
	const { saveData } = useLocalStorage();
	let component: RenderResult;

	saveData(mockItems);
	beforeEach(() => {
		component = render(
			<Provider store={store}>
				<ToDoList />
			</Provider>
		);
	});

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('should render component with 3 items', () => {
		expect(screen.queryAllByText(/someName/).length).toBe(3);
	});

	it('should show all todos', () => {
		const allspan = screen.getByText('All');

		fireEvent.click(allspan);

		expect(screen.queryAllByText(/someName/).length).toBe(3);
	});

	it('should show completed todos', () => {
		const allspan = screen.getByText('Completed');

		fireEvent.click(allspan);

		expect(screen.queryAllByText(/someName/).length).toBe(2);
	});

	it('should show incomplete todos', () => {
		const allspan = screen.getByText('Active');

		fireEvent.click(allspan);

		expect(screen.queryAllByText(/someName/).length).toBe(1);
	});
});
