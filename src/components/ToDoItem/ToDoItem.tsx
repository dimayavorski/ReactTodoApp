import { ITodoItem } from '../../models/ITodoItem';
import styles from './ToDoItem.module.scss';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Checkbox } from '../checkbox/Checkbox';
import { useTodos } from '../../hooks/useTodos';

interface TodoItemProps {
	todoItem: ITodoItem;
}

export const ToDoItem: FC<TodoItemProps> = ({ todoItem }) => {
	const { remove, toggleComplete } = useTodos();

	return (
		<li className={styles.toDoItem}>
			<div className={styles.toDoItemInfo}>
				<Checkbox
					isActive={todoItem.checked}
					toggleCheckboxHandler={() => toggleComplete(todoItem)}
				/>
				<p>{todoItem.text}</p>
			</div>
			<button className={styles.removeBtn} onClick={() => remove(todoItem)}>
				<AiOutlineClose size={20} />
			</button>
		</li>
	);
};
