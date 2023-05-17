import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeContextWrapper from './hooks/ThemeContextWrapper';
import { ConfigProvider } from 'antd';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<ThemeContextWrapper>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#3a4a62',
					},
				}}
			>
				<App />
			</ConfigProvider>
		</ThemeContextWrapper>
	</Provider>
);
