import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
	const router = useRouter();
	const isHome = router.pathname === '/';
	const isBlog = router.pathname === '/blog' || router.pathname.startsWith('/blog/');

	return (
		<header className="navwrap">
			<nav className="nav">
				<Link href="/" className="brand">SmartHome</Link>
				<div className="links">
					<Link href="/" className={`link ${isHome ? 'active' : ''}`}>Home</Link>
					<Link href="/blog" className={`link ${isBlog ? 'active' : ''}`}>Blog</Link>
					<a href="#" className="link" aria-disabled>YouTube</a>
				</div>
			</nav>
			<style jsx>{`
				.navwrap { position: sticky; top: 0; z-index: 50; backdrop-filter: saturate(120%) blur(8px); }
				.nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--bg) 86%, black); }
				.brand { font-weight: 700; letter-spacing: 0.2px; }
				.links { display: flex; gap: 16px; }
				.link { color: var(--muted); padding: 6px 2px; border-bottom: 2px solid transparent; }
				.link:hover { color: var(--text); }
				.link.active { color: var(--text); border-bottom-color: var(--primary); }
			`}</style>
		</header>
	);
} 