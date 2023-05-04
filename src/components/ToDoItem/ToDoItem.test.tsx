import { ITodoItem } from '../../models/ITodoItem';
import {
	RenderResult,
	fireEvent,
	render,
	screen,
} from '@testing-library/react';
import { ToDoItem } from './ToDoItem';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const mockItem: ITodoItem = {
	id: 'asdasd',
	text: 'someName',
	checked: true,
};

let component: RenderResult;

describe('ToDoItem tests', () => {
	beforeEach(() => {
		component = render(
			<Provider store={store}>
				<ToDoItem todoItem={mockItem} />
			</Provider>
		);
	});

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('should render component', () => {
		expect(screen.getByText(mockItem.text)).toBeInTheDocument();
	});

	it('should change checkbox value', () => {
		const checkbox = screen.getByRole('checkbox');

		fireEvent.change(checkbox, { target: { checked: true } });

		expect(checkbox).toBeChecked();
	});
});
