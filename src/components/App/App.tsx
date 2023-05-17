import { AiOutlinePlus } from 'react-icons/ai';
import styles from './App.module.scss';
import { ToDoList } from '../ToDoList/ToDoList';
import { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { Checkbox } from '../Checkbox/Checkbox';
import { Header } from '../Header/Header';

function App() {
	const [text, setText] = useState('');

	const [isActive, setIsActive] = useState<boolean>(false);
	const { add } = useTodos();

	const toggleCheckbox = (value: boolean) => {
		setIsActive(value);
	};
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if (text.trim().length > 0) {
			setText('');
			setIsActive(false);
			add(text, isActive);
		}
	};

	return (
		<div className={styles.app}>
			<Header />

			<form onSubmit={submitHandler}>
				<div className={styles.inputContainer} data-testid="inputContainer">
					<Checkbox
						isActive={isActive}
						toggleCheckboxHandler={toggleCheckbox}
					/>
					<input
						type="text"
						className={styles.input}
						placeholder="Add todo"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<button type="submit" disabled={!text} className={styles.addTodo}>
						<AiOutlinePlus size={30} />
					</button>
				</div>
			</form>
			<ToDoList />
		</div>
	);
}

export default App;
