import { MDXRemote } from 'next-mdx-remote';
import { useMDXComponents } from '../../mdx-components';
import MDXGlobalStyles from '../../mdx-components';
import { getAllPostSlugs, getPostBySlug } from '../../lib/mdx';
import Tag from '../../components/Tag';
import Breadcrumbs from '../../components/Breadcrumbs';
import Link from 'next/link';

export default function BlogPost({ mdxSource, meta }) {
	const components = useMDXComponents();
	
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
		<article>
			<Breadcrumbs title={meta.title} />
			<div className="eyebrow small">{meta.readTime} min • {formatDate(meta.date)}</div>
			<h1>{meta.title}</h1>
			<div className="tagrow">{meta.tags.map((t) => (<Tag key={t}>{t}</Tag>))}</div>
			<MDXGlobalStyles />
			<div className="content">
				<MDXRemote {...mdxSource} components={components} />
			</div>
			<div className="back">
				<Link href="/blog" className="ghost">← All posts</Link>
			</div>
			<style jsx>{`
				.tagrow { display: flex; gap: 8px; flex-wrap: wrap; margin: 10px 0 14px; }
				.content :global(img) { border-radius: 12px; border: 1px solid var(--border); }
				.back { margin-top: 20px; }
				.ghost { display: inline-block; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--border); color: var(--muted); }
				.ghost:hover { color: var(--text); border-color: color-mix(in srgb, var(--border) 60%, var(--primary)); }
			`}</style>
		</article>
	);
}

export async function getStaticPaths() {
	const slugs = getAllPostSlugs();
	return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
	const { mdxSource, meta } = await getPostBySlug(params.slug);
	return { props: { mdxSource, meta } };
} 