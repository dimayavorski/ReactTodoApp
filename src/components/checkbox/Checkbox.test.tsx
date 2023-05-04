import {
	RenderResult,
	fireEvent,
	render,
	screen,
} from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox component tests', () => {
	const mockData = {
		isActive: true,
		toggleCheckboxHandler: jest.fn(),
	};
	let component: RenderResult;
	beforeEach(() => {
		component = render(
			<Checkbox
				toggleCheckboxHandler={mockData.toggleCheckboxHandler}
				isActive={mockData.isActive}
			/>
		);
	});

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});
	it('should render component', () => {
		expect(screen.getByRole('checkbox')).toBeInTheDocument();
		expect(screen.getByRole('checkbox')).toBeChecked();
	});

	it('should trigger handler when checked', () => {
		const checkbox = screen.getByRole('checkbox');
		fireEvent.click(checkbox);
		expect(mockData.toggleCheckboxHandler).toHaveBeenCalled();
	});
});
