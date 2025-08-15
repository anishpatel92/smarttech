export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<p className="small">© {year} SmartHome Blog</p>
			<style jsx>{`
				.footer { border-top: 1px solid var(--border); margin-top: 40px; padding: 24px 0; text-align: center; color: var(--muted); }
			`}</style>
		</footer>
	);
} 