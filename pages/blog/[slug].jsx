import { MDXRemote } from 'next-mdx-remote';
import { useMDXComponents } from '../../mdx-components';
import MDXGlobalStyles from '../../mdx-components';
import { getAllPostSlugs, getPostBySlug } from '../../lib/mdx';
import Tag from '../../components/Tag';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import StructuredData from '../../components/StructuredData';
import Link from 'next/link';

export default function BlogPost({ mdxSource, meta, post }) {
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
	
	// Enhanced post data with SEO and structured data
	const enhancedPost = {
		...meta,
		...post,
		metaDescription: post?.metaDescription || meta.description || meta.excerpt || '',
		metaKeywords: post?.metaKeywords || meta.tags?.join(', ') || '',
		geoTargets: post?.geoTargets || ['Delhi NCR', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'],
		canonical: post?.canonical || `https://yourdomain.com/blog/${meta.slug}`,
		productMentions: post?.productMentions || [],
		updatedAt: post?.updatedAt || meta.date
	};
	
	return (
		<>
			<SEOHead
				title={`${enhancedPost.title} | Smart Tech India`}
				description={enhancedPost.metaDescription}
				keywords={enhancedPost.metaKeywords}
				image={enhancedPost.image || enhancedPost.coverImage}
				canonical={enhancedPost.canonical}
				geoTargets={enhancedPost.geoTargets}
				publishedTime={enhancedPost.date}
				modifiedTime={enhancedPost.updatedAt}
			/>
			
			<StructuredData
				type="LocalBusiness"
				name="Smart Tech India"
				areaServed={enhancedPost.geoTargets}
				products={enhancedPost.productMentions}
			/>
			
			<StructuredData
				type="Article"
				articleTitle={enhancedPost.title}
				articleDescription={enhancedPost.metaDescription}
				articleImage={enhancedPost.image || enhancedPost.coverImage}
				articlePublishedTime={enhancedPost.date}
				articleModifiedTime={enhancedPost.updatedAt}
			/>
			
			<article>
				<Breadcrumbs title={enhancedPost.title} />
				<div className="eyebrow small">{enhancedPost.readTime} min • {formatDate(enhancedPost.date)}</div>
				<h1>{enhancedPost.title}</h1>
				<div className="tagrow">{enhancedPost.tags?.map((t) => (<Tag key={t}>{t}</Tag>))}</div>
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
		</>
	);
}

export async function getStaticPaths() {
	const slugs = getAllPostSlugs();
	return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
	const { mdxSource, meta } = await getPostBySlug(params.slug);
	
	// Enhanced post data with SEO and structured data
	const post = {
		title: meta.title,
		metaDescription: meta.description || meta.excerpt || '',
		metaKeywords: meta.tags?.join(', ') || '',
		geoTargets: ['Delhi NCR', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai'],
		canonical: `https://yourdomain.com/blog/${meta.slug}`,
		productMentions: extractProductMentions(meta.tags || []),
		updatedAt: meta.updatedAt || meta.date,
		image: meta.coverImage || meta.image,
		date: meta.date
	};
	
	return { 
		props: { 
			mdxSource, 
			meta,
			post 
		}
	};
}

// Helper function to extract product mentions from tags
function extractProductMentions(tags) {
	const productKeywords = [
		'Philips Wiz', 'Syska', 'TP-Link', 'Tapo', 'smart bulb', 'smart switch', 
		'dimmer', 'smart home', 'automation', 'IoT', 'WiFi', 'Bluetooth'
	];
	
	return tags.filter(tag => 
		productKeywords.some(keyword => 
			tag.toLowerCase().includes(keyword.toLowerCase())
		)
	);
} 