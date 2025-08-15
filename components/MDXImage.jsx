import Image from 'next/image';

export default function MDXImage({ src, alt = '', width, height, priority = false, sizes = '100vw', aspect = 56.25, style }) {
	if (!src) return null;
	const numericWidth = width ? Number(width) : undefined;
	const numericHeight = height ? Number(height) : undefined;

	// Try to parse dimensions from query params like ?w=800&h=450
	let parsedW;
	let parsedH;
	try {
		const u = new URL(src, 'http://local');
		parsedW = u.searchParams.get('w');
		parsedH = u.searchParams.get('h');
	} catch {}

	const w = numericWidth ?? (parsedW ? Number(parsedW) : undefined);
	const h = numericHeight ?? (parsedH ? Number(parsedH) : undefined);

	// If we have explicit dimensions, use standard width/height mode
	if (w && h) {
		return (
			<span className="mdx-img-wrap">
				<Image
					src={src}
					alt={alt}
					width={w}
					height={h}
					priority={priority}
					sizes={sizes}
					style={style}
				/>
				<style jsx>{`
					.mdx-img-wrap :global(img) { width: 100%; height: auto; border-radius: 12px; border: 1px solid var(--border); display: block; }
				`}</style>
			</span>
		);
	}

	// Fallback: responsive fill with aspect ratio if no dimensions provided
	return (
		<span className="mdx-img-wrap ratio" style={{ paddingTop: `${aspect}%` }}>
			<Image
				src={src}
				alt={alt}
				fill
				priority={priority}
				sizes={sizes}
				style={style}
			/>
			<style jsx>{`
				.mdx-img-wrap { position: relative; width: 100%; display: block; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
				.ratio :global(img) { object-fit: cover; }
			`}</style>
		</span>
	);
} 