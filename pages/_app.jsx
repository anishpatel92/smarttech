import Layout from '../components/Layout';
import { Analytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
			<Analytics />
			<style jsx global>{`
				:root { 
					--bg: #0b0f14; 
					--card: #121821; 
					--muted: #97a3b6; 
					--text: #e6edf6; 
					--primary: #5b9cff; 
					--accent: #00c2a8; 
					--border: #1f2a38;
				}
				html, body, #__next { height: 100%; }
				body {
					margin: 0;
					background: var(--bg);
					color: var(--text);
					font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
					line-height: 1.65;
					-webkit-font-smoothing: antialiased;
				}
				a { color: inherit; text-decoration: none; }
				* { box-sizing: border-box; }
				img { max-width: 100%; height: auto; }
				:focus-visible {
					outline: 2px solid color-mix(in srgb, var(--primary) 70%, white);
					outline-offset: 2px;
					border-radius: 6px;
				}
				h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 12px; }
				h2 { font-size: 1.4rem; margin: 24px 0 10px; }
				p { margin: 0 0 12px; color: var(--text); }
				.small { color: var(--muted); font-size: 0.95rem; }
			`}</style>
		</Layout>
	);
} 