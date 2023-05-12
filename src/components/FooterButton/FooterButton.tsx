import styles from './FooterButton.module.scss';

interface IFooterButtonProps {
	clickAction(): void;
	text: string;
	dataTestId: string;
	isActive?: boolean;
}

export function FooterButton({
	clickAction,
	text,
	dataTestId,
	isActive = false,
}: IFooterButtonProps) {
	const btnStyle = isActive
		? `${styles.footerButton} ${styles.active}`
		: styles.footerButton;
	return (
		<span className={btnStyle} onClick={clickAction} data-testid={dataTestId}>
			{text}
		</span>
	);
}
