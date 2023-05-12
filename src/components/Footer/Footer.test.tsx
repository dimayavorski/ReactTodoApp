import { RenderResult } from '@testing-library/react';
import { Footer } from './Footer';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Footer tests', () => {
	let component: RenderResult;

	beforeEach(() => {
		<Provider store={store}>
			component = render(
			<Footer />
			);
		</Provider>;
	});

	it('should match snapshot', () => {
		expect(component).toMatchSnapshot();
	});
});
