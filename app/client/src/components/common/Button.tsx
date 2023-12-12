function Button({ children, onClick, styles }: { children: React.ReactNode; onClick: () => void; styles: string }) {
	return (
		<button onClick={() => onClick()} className={styles}>
			<>{children}</>
		</button>
	);
}

export default Button;
