import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';

const PaginationBar = ({ pageInfo, onPageSelect }) => {
	if (!pageInfo || pageInfo.totalPages <= 1) return null;

	const { currentPage, totalPages } = pageInfo;

	const startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(totalPages, currentPage + 2);
	const visiblePages = [];
	for (let p = startPage; p <= endPage; p++) visiblePages.push(p);

	return (
		<nav className="pagination-bar" aria-label="Product pagination">
			<IconButton
				className="page-nav-btn"
				disabled={currentPage === 1}
				onClick={() => onPageSelect(currentPage - 1)}
				aria-label="Previous page"
			>
				<ChevronLeftIcon />
			</IconButton>

			{startPage > 1 && (
				<>
					<button className="page-num-btn" onClick={() => onPageSelect(1)}>
						1
					</button>
					{startPage > 2 && <span className="page-ellipsis">…</span>}
				</>
			)}

			{visiblePages.map((p) => (
				<button
					key={p}
					className={`page-num-btn ${p === currentPage ? 'active' : ''}`}
					onClick={() => onPageSelect(p)}
					aria-current={p === currentPage ? 'page' : undefined}
				>
					{p}
				</button>
			))}

			{endPage < totalPages && (
				<>
					{endPage < totalPages - 1 && <span className="page-ellipsis">…</span>}
					<button
						className="page-num-btn"
						onClick={() => onPageSelect(totalPages)}
					>
						{totalPages}
					</button>
				</>
			)}

			<IconButton
				className="page-nav-btn"
				disabled={currentPage === totalPages}
				onClick={() => onPageSelect(currentPage + 1)}
				aria-label="Next page"
			>
				<ChevronRightIcon />
			</IconButton>
		</nav>
	);
};

export default PaginationBar;
