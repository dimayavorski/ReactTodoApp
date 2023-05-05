import { FC } from 'react';
import styles from './Checkbox.module.scss';

interface ICheckboxProps {
	toggleCheckboxHandler(value: boolean): void;
	isActive: boolean;
}
export const Checkbox: FC<ICheckboxProps> = ({
	toggleCheckboxHandler,
	isActive,
}) => {
	return (
		<div className={styles.checkBoxContainer}>
			<label>
				<input
					type="checkbox"
					checked={isActive}
					onChange={(e) => toggleCheckboxHandler(e.target.checked)}
				/>
				<span></span>
			</label>
		</div>
	);
};
