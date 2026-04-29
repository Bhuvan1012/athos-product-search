import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';

const SKELETON_COUNT = 12;

const ProductGrid = ({ items, isFetching, basketMap, adjustBasket }) => {
	if (isFetching) {
		return (
			<div className="product-grid">
				{Array.from({ length: SKELETON_COUNT }).map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="product-grid">
			{items.map((item) => (
				<ProductCard
					key={item.id}
					item={item}
					qty={basketMap[item.id] || 0}
					onAdd={() => adjustBasket(item.id, false)}
					onRemove={() => adjustBasket(item.id, true)}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
