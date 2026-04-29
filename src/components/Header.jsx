import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const Header = ({
	keyword,
	onKeywordChange,
	onSearchSubmit,
	onClear,
	onReset,
	totalInBasket,
}) => {
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') onSearchSubmit();
	};

	return (
		<header className="site-header">
			<div className="header-inner">
				{/* Logo */}
				<button className="logo-btn" onClick={onReset} aria-label="Go to home">
					<StorefrontIcon className="logo-icon" />
					<span className="logo-text">OneStopShop</span>
				</button>

				{/* Search Bar */}
				<div className="search-bar">
					<SearchIcon className="search-icon-left" />

					<InputBase
						className="search-input"
						placeholder="Search products…"
						value={keyword}
						onChange={onKeywordChange}
						onKeyDown={handleKeyDown}
						inputProps={{ 'aria-label': 'search products' }}
					/>

					{/* Clear button */}
					{keyword && (
						<Tooltip title="Clear search" placement="bottom">
							<IconButton
								className="search-clear-btn"
								size="small"
								onClick={onClear}
								aria-label="Clear search"
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					)}

					<Button
						variant="contained"
						className="search-btn"
						onClick={onSearchSubmit}
						disableElevation
					>
						Search
					</Button>
				</div>

				{/* Cart */}
				<IconButton className="cart-btn" aria-label="shopping cart">
					<Badge badgeContent={totalInBasket || null} color="error">
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
			</div>
		</header>
	);
};

export default Header;
