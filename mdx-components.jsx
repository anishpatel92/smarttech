import Callout from './components/Callout';
import Embed from './components/Embed';
import MDXImage from './components/MDXImage';
import NextLink from 'next/link';

export function useMDXComponents(components) {
	return {
		h2: (props) => <h2 {...props} className="mdx-h2" />,
		blockquote: (props) => <blockquote {...props} className="mdx-bq" />,
		// Map markdown images to Next.js Image wrapper
		img: (props) => <MDXImage {...props} />,
		// Raw video/iframe still supported
		video: (props) => <video {...props} className={`mdx-video ${props.className || ''}`.trim()} controls preload="metadata" />,
		iframe: (props) => <iframe {...props} className={`mdx-iframe ${props.className || ''}`.trim()} loading="lazy" />,
		// Allow using <Link> directly in MDX without import
		Link: (props) => <NextLink {...props} />,
		// Make <a> automatically use NextLink for internal routes
		a: ({ href, children, ...rest }) => href && href.startsWith('/') ? (
			<NextLink href={href} {...rest}>{children}</NextLink>
		) : (
			<a href={href} {...rest}>{children}</a>
		),
		Callout,
		Embed,
		...components,
	};
}

export { Callout, Embed };

export default function MDXGlobalStyles() {
	return (
		<style jsx global>{`
			.mdx-h2 { font-size: 1.35rem; margin: 24px 0 10px; }
			.mdx-bq { margin: 12px 0; padding: 10px 12px; border-left: 3px solid var(--primary); background: color-mix(in srgb, var(--primary) 8%, var(--card)); border-radius: 8px; }
			.content :global(p) { color: var(--text); margin: 0 0 12px; }
			.mdx-video, .mdx-iframe { width: 100%; max-width: 100%; border-radius: 12px; border: 1px solid var(--border); outline: none; }
		`}</style>
	);
} 