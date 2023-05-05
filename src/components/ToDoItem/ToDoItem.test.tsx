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
import { Reorder } from 'framer-motion';

const mockItem: ITodoItem = {
	id: 'asdasd',
	text: 'someName',
	checked: true,
};

let component: RenderResult;
describe('ToDoItem tests', () => {
	const reorder = jest.fn();
	beforeEach(() => {
		component = render(
			<Provider store={store}>
				<Reorder.Group values={[mockItem]} onReorder={reorder}>
					<ToDoItem todoItem={mockItem} />
				</Reorder.Group>
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
