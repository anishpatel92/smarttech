export default function Embed({ src, title, aspect = 56.25, allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share', allowFullScreen = true }) {
	return (
		<div className="embed" style={{ paddingTop: `${aspect}%` }}>
			<iframe src={src} title={title} allow={allow} allowFullScreen={allowFullScreen} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
			<style jsx>{`
				.embed { position: relative; width: 100%; background: #000; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
				.embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
			`}</style>
		</div>
	);
} 