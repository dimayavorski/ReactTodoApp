import styles from './ToDoList.module.scss';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import { ITodoItem } from '../../models/ITodoItem';
import { useEffect } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { useToDoRepository } from '../../hooks/useToDoRepository';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Reorder } from 'framer-motion';

export function ToDoList() {
	const todos: ITodoItem[] = useAppSelector((state) => state.todos.todos);

	const { getAll, filterCompleted, filterIncomplete, set, clearCompleted } =
		useTodos();
	const { getData } = useToDoRepository();

	useEffect(() => {
		const initData = getData();
		set(initData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.toDoList}>
			<div className={styles.content}>
				<Reorder.Group
					axis="y"
					values={todos}
					onReorder={set}
					style={{
						overflowY: 'auto',
						height: '100%',
						listStyleType: 'none',
						paddingLeft: '0',
					}}
				>
					{todos.map((todo: ITodoItem) => (
						<ToDoItem key={todo.id} todoItem={todo} />
					))}
				</Reorder.Group>
			</div>
			<ul className={styles.actionsList}>
				<li>{todos.filter((todo) => !todo.checked).length} items left</li>
				<li className={styles.filter}>
					<span onClick={() => getAll()}>All</span>
					<span onClick={() => filterIncomplete()}>Active</span>
					<span onClick={() => filterCompleted()}>Completed</span>
				</li>
				<li>
					<span onClick={() => clearCompleted()}>Clear Completed</span>
				</li>
			</ul>
		</div>
	);
}
