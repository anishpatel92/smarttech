import Link from 'next/link';
import BlogCard from '../components/BlogCard';
import { getAllPostsMeta } from '../lib/mdx';

export default function Home({ posts }) {
	const featured = posts.slice(0, 3);
	return (
		<div className="home">
			<section className="hero">
				<h1>Make Your Home Smarter in 2025</h1>
				<p className="sub">Practical guides and picks for Indian households — clear, budget-friendly, and brand-agnostic.</p>
				<div className="actions">
					<Link href="/blog" className="cta">Explore Blog</Link>
				</div>
			</section>
			<section>
				<h2>Featured</h2>
				<div className="grid">
					{featured.map((p) => (<BlogCard key={p.slug} post={p} />))}
				</div>
			</section>
			<section className="how">
				<h2>How We Write</h2>
				<ol>
					<li>Simple, clear tips you can act on today.</li>
					<li>Tested in typical Indian apartments.</li>
					<li>No hype — just what works under a budget.</li>
				</ol>
			</section>
			<style jsx>{`
				.hero { padding: 28px 0 10px; }
				.sub { color: var(--muted); max-width: 700px; }
				.actions { margin-top: 14px; }
				.cta { display: inline-block; padding: 10px 14px; border-radius: 12px; background: linear-gradient(135deg, var(--primary), var(--accent)); color: #001018; font-weight: 700; }
				.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
				.how { margin-top: 28px; background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
				ol { margin: 10px 0 0 20px; }
				@media (max-width: 400px) { h1 { font-size: 1.6rem; } .sub { font-size: 0.95rem; } }
			`}</style>
		</div>
	);
}

export async function getStaticProps() {
	return { props: { posts: getAllPostsMeta() } };
} 