import styles from "./Checkbox.module.scss"

interface ICheckboxProps {
    toggleCheckboxHandler(value: boolean): void;
    isActive: boolean;
}
export function Checkbox({ toggleCheckboxHandler, isActive }: ICheckboxProps) {
    return (
            <div className={styles.checkBoxContainer}>
                <label>
                    <input type="checkbox" checked={isActive} onChange={e => toggleCheckboxHandler(e.target.checked)} />
                    <span></span>
                </label>
            </div>
    )
}