import SearchOffIcon from '@mui/icons-material/SearchOff';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const EmptyState = ({ keyword }) => {
	const isInitial = !keyword || keyword.trim() === '';

	return (
		<div className="empty-state">
			<div className="empty-icon-wrap">
				{isInitial ? (
					<TravelExploreIcon className="empty-icon" />
				) : (
					<SearchOffIcon className="empty-icon" />
				)}
			</div>
			<h2 className="empty-title">
				{isInitial ? 'Discover Products' : `No results for "${keyword}"`}
			</h2>
			<p className="empty-sub">
				{isInitial
					? 'Type something in the search bar to explore our catalogue.'
					: 'Try a different keyword or check your spelling.'}
			</p>
		</div>
	);
};

export default EmptyState;
