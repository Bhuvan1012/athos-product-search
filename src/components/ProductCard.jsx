import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const ProductCard = ({ item, qty, onAdd, onRemove }) => {
	const price = parseFloat(item.price);
	const msrp = item.msrp ? parseFloat(item.msrp) : null;
	const hasDiscount = msrp && msrp > price;

	return (
		<div className="product-card">
			<div className="product-img-wrap">
				<img
					src={item.thumbnailImageUrl}
					alt={item.name}
					className="product-img"
					loading="lazy"
				/>
				{hasDiscount && (
					<span className="discount-badge">
						-{Math.round(((msrp - price) / msrp) * 100)}%
					</span>
				)}
			</div>

			<div className="product-body">
				<p className="product-name">{item.name}</p>

				<div className="product-pricing">
					<span className="product-price">${price.toFixed(2)}</span>
					{hasDiscount && (
						<span className="product-msrp">${msrp.toFixed(2)}</span>
					)}
				</div>

				<div className="product-action">
					{qty === 0 ? (
						<Button
							variant="contained"
							fullWidth
							startIcon={<AddShoppingCartIcon />}
							className="add-btn"
							onClick={onAdd}
							disableElevation
						>
							Add to Cart
						</Button>
					) : (
						<div className="qty-controls">
							<IconButton
								size="small"
								className="qty-icon-btn"
								onClick={onRemove}
								aria-label="decrease quantity"
							>
								<RemoveIcon fontSize="small" />
							</IconButton>
							<span className="qty-display">{qty}</span>
							<IconButton
								size="small"
								className="qty-icon-btn"
								onClick={onAdd}
								aria-label="increase quantity"
							>
								<AddIcon fontSize="small" />
							</IconButton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
