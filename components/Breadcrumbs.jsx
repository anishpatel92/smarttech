import Link from 'next/link';

export default function Breadcrumbs({ title }) {
	return (
		<nav className="crumbs" aria-label="Breadcrumb">
			<Link href="/" className="crumb">Home</Link>
			<span className="sep">/</span>
			<Link href="/blog" className="crumb">Blog</Link>
			<span className="sep">/</span>
			<span className="crumb current" title={title}>{title}</span>
			<style jsx>{`
				.crumbs { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 0.9rem; margin: 10px 0 14px; overflow: hidden; }
				.sep { color: var(--border); }
				.crumb { white-space: nowrap; }
				.current { color: var(--text); overflow: hidden; text-overflow: ellipsis; display: inline-block; max-width: 60vw; }
				@media (min-width: 640px) { .current { max-width: 480px; } }
			`}</style>
		</nav>
	);
} 