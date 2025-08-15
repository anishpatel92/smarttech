export default function Tag({ children }) {
	return (
		<span className="tag">{children}
			<style jsx>{`
				.tag { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); font-size: 12px; }
			`}</style>
		</span>
	);
} 