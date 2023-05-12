import {
	RenderResult,
	fireEvent,
	render,
	screen,
} from '@testing-library/react';
import { FooterButton } from './FooterButton';

describe('Footer tests', () => {
	let component: RenderResult;

	const clickFn = jest.fn();
	const isActive = false;
	const text = 'testText';
	const dataTestId = 'dataTestId';

	beforeEach(() => {
		component = render(
			<FooterButton
				clickAction={clickFn}
				isActive={isActive}
				text={text}
				dataTestId={dataTestId}
			/>
		);
	});

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('should have active class if isActive passed as prop', () => {
		render(
			<FooterButton
				clickAction={clickFn}
				isActive={true}
				text={'ActiveText'}
				dataTestId={'ActiveTestId'}
			/>
		);
		expect(screen.getByText('ActiveText')).toHaveClass('active');
	});

	it('button should trigger click function', () => {
		fireEvent.click(screen.getByText(text));

		expect(clickFn).toHaveBeenCalled();
	});
});
