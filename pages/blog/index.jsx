import BlogCard from '../../components/BlogCard';
import { getAllPostsMeta } from '../../lib/mdx';

export default function BlogIndex({ posts }) {
	return (
		<div>
			<h1>Blog</h1>
			<div className="grid">
				{posts.map((p) => (<BlogCard key={p.slug} post={p} />))}
			</div>
			<style jsx>{`
				.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
			`}</style>
		</div>
	);
}

export function getStaticProps() {
	return { props: { posts: getAllPostsMeta() } };
} 