import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';


const postsDir = path.join(process.cwd(), 'content', 'posts');

function toDateString(value) {
	if (!value) return '1970-01-01';
	const d = typeof value === 'string' ? new Date(value) : value;
	if (Number.isNaN(d?.getTime?.())) return '1970-01-01';
	return d.toISOString().slice(0, 10);
}

function parsePostFile(fileName) {
	const fileSlug = fileName.replace(/\.mdx$/, '');
	const fullPath = path.join(postsDir, fileName);
	const raw = fs.readFileSync(fullPath, 'utf8');
	const { content, data } = matter(raw);
	const frontSlug = data?.slug ? String(data.slug) : fileSlug;
	const meta = {
		slug: frontSlug,
		title: data?.title || fileSlug,
		excerpt: data?.excerpt || '',
		description: data?.description || data?.excerpt || '',
		date: toDateString(data?.date),
		readTime: data?.readTime || 1,
		tags: Array.isArray(data?.tags) ? data.tags : [],
		// Enhanced SEO metadata
		metaKeywords: data?.metaKeywords || '',
		geoTargets: Array.isArray(data?.geoTargets) ? data.geoTargets : [],
		image: data?.image || '',
		coverImage: data?.coverImage || data?.image || '',
		canonical: data?.canonical || '',
		productMentions: data?.productMentions || [],
		updatedAt: toDateString(data?.updatedAt || data?.date),
	};
	return { fileSlug, frontSlug, fullPath, content, meta };
}

function readAllPosts() {
	const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
	return files.map(parsePostFile);
}

export function getAllPostSlugs() {
	return readAllPosts().map((p) => p.frontSlug);
}

export function getAllPostsMeta() {
	const posts = readAllPosts().map((p) => p.meta);
	return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slug) {
	const posts = readAllPosts();
	const match = posts.find((p) => p.frontSlug === slug) || posts.find((p) => p.fileSlug === slug);
	if (!match) {
		throw new Error(`Post not found for slug: ${slug}`);
	}
	const mdxSource = await serialize(match.content, {
		mdxOptions: { remarkPlugins: [remarkGfm] },
	});
	return { mdxSource, meta: match.meta };
} 