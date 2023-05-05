import { AiOutlinePlus } from 'react-icons/ai';
import styles from './App.module.scss';
import { ToDoList } from '../ToDoList/ToDoList';
import { useEffect, useState } from 'react';
import { useToDoRepository } from '../../hooks/useToDoRepository';
import { useTodos } from '../../hooks/useTodos';
import { Checkbox } from '../Checkbox/Checkbox';

function App() {
	const [text, setText] = useState('');
	const [isActive, setIsActive] = useState<boolean>(false);
	const { add } = useTodos();
	const { initDatabase } = useToDoRepository();

	useEffect(() => {
		initDatabase();
	}, [initDatabase]);

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
			<h3 className={styles.title}>TODO App</h3>
			<form onSubmit={submitHandler}>
				<div className={styles.inputContainer}>
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
					<button className={styles.addTodo}>
						<AiOutlinePlus size={30} />
					</button>
				</div>
			</form>
			<ToDoList />
		</div>
	);
}

export default App;
