import { useAppSelector } from '../../hooks/useAppSelector';
import { useTodos } from '../../hooks/useTodos';
import { ITodoItem } from '../../models/ITodoItem';
import { FooterButton } from '../FooterButton/FooterButton';
import styles from './Footer.module.scss';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateFilter } from '../../store/todoSlice';
import { FilterType } from '../../models/FilterType';
import { useEffect, useState } from 'react';

export function Footer() {
	const { clearCompleted, setFiltered } = useTodos();

	const [active, setActive] = useState(0);
	const todos: ITodoItem[] = useAppSelector((state) => state.todos.todos);
	const dispatch = useAppDispatch();
	const setIncompleteFilter = () => {
		dispatch(updateFilter(FilterType.INCOMPLETE));
		setActive(FilterType.INCOMPLETE);
	};
	const setCompletedFilter = () => {
		dispatch(updateFilter(FilterType.COMPLETED));
		setActive(FilterType.COMPLETED);
	};
	const setAllFilter = () => {
		dispatch(updateFilter(FilterType.ALL));
		setActive(FilterType.ALL);
	};

	useEffect(() => {
		setFiltered();
	}, [active]);

	return (
		<ul className={styles.actionsList}>
			<li>{todos.filter((todo) => !todo.checked).length} items left</li>
			<li className={styles.filter}>
				<FooterButton
					isActive={active == FilterType.ALL}
					clickAction={setAllFilter}
					text="All"
					dataTestId="getAll"
				/>

				<FooterButton
					isActive={active == FilterType.INCOMPLETE}
					clickAction={setIncompleteFilter}
					text="Active"
					dataTestId="getActive"
				/>

				<FooterButton
					isActive={active == FilterType.COMPLETED}
					clickAction={setCompletedFilter}
					text="Completed"
					dataTestId="getCompleted"
				/>
			</li>
			<li>
				<FooterButton
					clickAction={clearCompleted}
					text="Clear Completed"
					dataTestId="clearCompleted"
				/>
			</li>
		</ul>
	);
}
