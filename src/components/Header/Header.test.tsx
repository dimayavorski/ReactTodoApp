import { Header } from './Header';
import { RenderResult, render } from '@testing-library/react';

describe('header tests', () => {
	const component: RenderResult = render(<Header />);

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});
});
