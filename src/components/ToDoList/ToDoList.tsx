import styles from './ToDoList.module.scss';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import { ITodoItem } from '../../models/ITodoItem';
import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTodos } from '../../hooks/useTodos';
import { useToDoRepository } from '../../hooks/useToDoRepository';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Footer } from '../Footer/Footer';
import { FilterType } from '../../models/FilterType';

export function ToDoList() {
	const todos: ITodoItem[] = useAppSelector((state) => state.todos.todos);
	const filter: number = useAppSelector((state) => state.todos.filter);
	const { set } = useTodos();
	const { getData, saveData } = useToDoRepository();

	const isDraggableDisabled = filter !== FilterType.ALL;
	const onDragEnd = (event: any) => {
		if (!event.destination) {
			return;
		}

		const items = Array.from(todos);
		const [reorderedItem] = items.splice(event.source.index, 1);
		items.splice(event.destination.index, 0, reorderedItem);
		saveData(items);
		set(items);
	};

	useEffect(() => {
		const initData = getData();
		set(initData);
	}, []);

	return (
		<div className={styles.toDoList}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="todos">
					{(provided: any) => (
						<ul
							className={styles.content}
							data-testid="content"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{todos.map((todo: ITodoItem, index: number) => (
								<Draggable
									key={todo.id}
									draggableId={todo.id}
									index={index}
									isDragDisabled={isDraggableDisabled}
								>
									{(providedInner: any) => (
										<li
											ref={providedInner.innerRef}
											{...providedInner.draggableProps}
											{...providedInner.dragHandleProps}
										>
											<ToDoItem key={todo.id} todoItem={todo} />
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			<Footer />
		</div>
	);
}
