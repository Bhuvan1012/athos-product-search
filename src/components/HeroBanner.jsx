import { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';

const ROTATING_WORDS = ['Style', 'Comfort', 'Fashion', 'Trends', 'Deals'];

const CATEGORY_PILLS = [
	{ label: 'Women', query: 'women' },
	{ label: 'Sweaters', query: 'sweater' },
	{ label: 'Dresses', query: 'dress' },
	{ label: 'Accessories', query: 'accessories' },
	{ label: 'Jackets', query: 'jacket' },
	{ label: 'Shoes', query: 'shoes' },
];

const PERKS = [
	{
		icon: <LocalShippingOutlinedIcon fontSize="small" />,
		text: 'Free Shipping over $50',
	},
	{
		icon: <WorkspacePremiumOutlinedIcon fontSize="small" />,
		text: 'Premium Quality',
	},
	{ icon: <CachedOutlinedIcon fontSize="small" />, text: 'Easy Returns' },
];

const HeroBanner = ({ onCategoryClick }) => {
	const [wordIndex, setWordIndex] = useState(0);
	const [fading, setFading] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setFading(true);
			setTimeout(() => {
				setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
				setFading(false);
			}, 350);
		}, 2200);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="hero">
			{/* Background layers */}
			<div className="hero-bg-grid" aria-hidden="true" />
			<div className="hero-blob hero-blob-1" aria-hidden="true" />
			<div className="hero-blob hero-blob-2" aria-hidden="true" />

			{/* Content */}
			<div className="hero-inner">
				{/* Left copy */}
				<div className="hero-copy">
					<span className="hero-eyebrow">New Season Arrivals ✦</span>

					<h1 className="hero-heading">
						Discover Your
						<br />
						<span
							className={`hero-word ${fading ? 'hero-word--out' : 'hero-word--in'}`}
						>
							{ROTATING_WORDS[wordIndex]}
						</span>
					</h1>

					<p className="hero-sub">
						Thousands of curated products — search, explore, and find exactly
						what you love, all in one place.
					</p>

					{/* Category pills */}
					<div className="hero-pills">
						{CATEGORY_PILLS.map((cat) => (
							<button
								key={cat.query}
								className="hero-pill"
								onClick={() => onCategoryClick(cat.query)}
							>
								{cat.label}
							</button>
						))}
					</div>
				</div>

				{/* Right visual */}
				<div className="hero-visual" aria-hidden="true">
					<div className="hero-card hero-card-1">
						<img
							src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80&auto=format&fit=crop"
							alt="Fashion"
							className="hero-card-img"
						/>
						<div className="hero-card-tag">Trending Now</div>
					</div>
					<div className="hero-card hero-card-2">
						<img
							src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=280&q=80&auto=format&fit=crop"
							alt="Style"
							className="hero-card-img"
						/>
						<div className="hero-card-tag">New In</div>
					</div>
					{/* Floating badge */}
					<div className="hero-badge">
						<span className="hero-badge-num">186</span>
						<span className="hero-badge-label">
							pages of
							<br />
							products
						</span>
					</div>
				</div>
			</div>

			{/* Perks bar */}
			<div className="hero-perks">
				{PERKS.map((perk, i) => (
					<div key={i} className="hero-perk">
						<span className="hero-perk-icon">{perk.icon}</span>
						<span>{perk.text}</span>
					</div>
				))}
			</div>
		</section>
	);
};

export default HeroBanner;
