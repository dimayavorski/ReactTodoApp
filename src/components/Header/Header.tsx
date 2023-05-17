import { Switch } from 'antd';
import { ThemeContext, themes } from '../../hooks/ThemeContext';
import { useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import styles from './Header.module.scss';

export function Header() {
	const [darkMode, setDarkMode] = useState(true);
	return (
		<div className={styles.header}>
			<h3 className={styles.title}>TODO App</h3>
			<div className={styles.themeToggle}>
				<ThemeContext.Consumer>
					{({ changeTheme }) => (
						<Switch
							checked={darkMode}
							onChange={() => {
								setDarkMode((prev) => !prev);
								changeTheme(darkMode ? themes.light : themes.dark);
							}}
						/>
					)}
				</ThemeContext.Consumer>
				{darkMode ? <MdDarkMode /> : <MdLightMode />}
			</div>
		</div>
	);
}
