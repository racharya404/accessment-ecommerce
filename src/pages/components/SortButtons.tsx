import SortDropdown from './Dropdown/PriceSortAndFilterDropdown';
import RatingSortDropdown from './Dropdown/RatingSortDropdown';

export default function SortButtons() {
    return (
        <div className="mt-4 z-0 flex justify-end gap-2">
            <SortDropdown />
            <RatingSortDropdown />
        </div>
    );
}
