import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<div className="layout">
			<Navbar />
			<main className="container">{children}</main>
			<Footer />
			<style jsx>{`
				.container {
					max-width: 1100px;
					padding: 0 20px;
					margin: 0 auto;
				}
			`}</style>
		</div>
	);
} 