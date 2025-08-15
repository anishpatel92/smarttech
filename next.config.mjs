export default {
	output: 'export',
	images: {
		unoptimized: true,
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.unsplash.com' },
			{ protocol: 'https', hostname: 'www.tatacliq.com' }
		]
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}; 