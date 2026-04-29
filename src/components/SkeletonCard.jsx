import Skeleton from '@mui/material/Skeleton';

const SkeletonCard = () => {
	return (
		<div className="product-card skeleton-card">
			<div className="product-img-wrap">
				<Skeleton
					variant="rectangular"
					width="100%"
					height={200}
					sx={{ borderRadius: '12px', transform: 'none' }}
				/>
			</div>
			<div className="product-body">
				<Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
				<Skeleton variant="text" width="60%" height={20} sx={{ mb: 1.5 }} />
				<Skeleton variant="text" width="40%" height={28} sx={{ mb: 1.5 }} />
				<Skeleton
					variant="rectangular"
					width="100%"
					height={40}
					sx={{ borderRadius: '8px', transform: 'none' }}
				/>
			</div>
		</div>
	);
};

export default SkeletonCard;
