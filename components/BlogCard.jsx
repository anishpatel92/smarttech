import Link from 'next/link';
import Tag from './Tag';

export default function BlogCard({ post }) {
	const { slug, title, excerpt, date, readTime, tags = [] } = post;
	
	// Format date consistently for server/client hydration
	const formatDate = (dateStr) => {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-GB', { 
			day: 'numeric', 
			month: 'numeric', 
			year: 'numeric' 
		});
	};
	
	return (
		<article className="card">
			<div className="eyebrow small">{readTime} min • {formatDate(date)}</div>
			<h3 className="title"><Link href={`/blog/${slug}`}>{title}</Link></h3>
			<p className="excerpt">{excerpt}</p>
			<div className="tags">
				<span className="tagicon" aria-hidden>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41L11 3.83a2 2 0 00-1.41-.58H4a2 2 0 00-2 2v5.59c0 .53.21 1.04.59 1.41l9.59 9.59a2 2 0 002.82 0l5.59-5.59a2 2 0 000-2.82z"></path><circle cx="7.5" cy="7.5" r="1.5"></circle></svg>
				</span>
				<div className="taglist">
					{tags.map((t) => (<Tag key={t}>{t}</Tag>))}
				</div>
			</div>
			<div className="actions">
				<Link className="btn" href={`/blog/${slug}`}>Read →</Link>
			</div>
			<style jsx>{`
				.card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px; transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
				.card:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,0.2); border-color: color-mix(in srgb, var(--border) 60%, var(--primary)); }
				.title { margin: 8px 0 6px; font-size: 1.1rem; }
				.excerpt { color: var(--muted); }
				.tags { display: flex; align-items: center; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
				.tagicon { color: var(--muted); display: inline-flex; }
				.taglist { display: flex; gap: 8px; flex-wrap: wrap; }
				.actions { margin-top: 14px; }
				.btn { display: inline-block; padding: 8px 12px; border-radius: 10px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: #001018; font-weight: 600; }
				.btn:focus-visible { outline: 2px solid color-mix(in srgb, var(--primary) 70%, white); outline-offset: 2px; }
			`}</style>
		</article>
	);
} 