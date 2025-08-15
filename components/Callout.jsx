export default function Callout({ type = 'info', children }) {
	return (
		<div className={`callout ${type}`}>
			{children}
			<style jsx>{`
				.callout { border-radius: 12px; padding: 12px 14px; border: 1px solid var(--border); }
				.callout.info { background: color-mix(in srgb, var(--primary) 12%, var(--card)); border-color: color-mix(in srgb, var(--primary) 40%, var(--border)); }
				.callout.warn { background: color-mix(in srgb, #ffb020 12%, var(--card)); border-color: color-mix(in srgb, #ffb020 40%, var(--border)); }
			`}</style>
		</div>
	);
} 