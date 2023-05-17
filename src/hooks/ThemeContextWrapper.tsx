import { useEffect, useState } from 'react';
import { ThemeContext, themes } from './ThemeContext';

interface IThemeContextWrapperProps {
	children: JSX.Element;
}
export default function ThemeContextWrapper({
	children,
}: IThemeContextWrapperProps) {
	const [theme, setTheme] = useState<string>(themes.dark);

	function changeTheme(themeState: string) {
		setTheme(themeState);
	}

	useEffect(() => {
		switch (theme) {
			case themes.dark:
				document.body.classList.add('dark-content');
				break;
			case themes.light:
				document.body.classList.remove('dark-content');
				break;
			default:
				document.body.classList.remove('dark-content');
				break;
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
