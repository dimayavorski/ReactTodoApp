import {
	RenderResult,
	fireEvent,
	render,
	screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from '../../store/store';

describe('App tests', () => {
	let component: RenderResult;

	beforeEach(() => {
		component = render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});
	it('should render component', () => {
		expect(screen.getByPlaceholderText('Add todo')).toBeInTheDocument();
	});

	it('should create new todo', () => {
		const inputElement = screen.getByPlaceholderText('Add todo');
		const saveBtn = component.container.getElementsByClassName('addTodo');

		expect(saveBtn.length).toBe(1);
		fireEvent.change(inputElement, { target: { value: 'Test Title' } });
		fireEvent.click(saveBtn[0]);

		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	it('should create todo with empty title', () => {
		const inputElement = screen.getByPlaceholderText('Add todo');
		const saveBtn = component.container.getElementsByClassName('addTodo');

		expect(saveBtn.length).toBe(1);
		fireEvent.change(inputElement, { target: { value: '       ' } });
		fireEvent.click(saveBtn[0]);

		expect(screen.queryByText('       ')).not.toBeInTheDocument();
	});
});
