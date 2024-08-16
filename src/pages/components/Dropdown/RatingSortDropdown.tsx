import { useDispatch, useSelector } from 'react-redux';
import { filterByRating } from '@/store/productSlice';
import { RootState } from '@/store';
import { useState, useEffect } from 'react';

export default function SortDropdown() {
    const dispatch = useDispatch();
    const { ratingFilter } = useSelector((state: RootState) => state.products);
    const [selectedOption, setSelectedOption] = useState<string>('Sort by Ratings (1 and above)');

    useEffect(() => {
        setSelectedOption(`Sort by Ratings (${ratingFilter} and above)`);
    }, [ratingFilter]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value);
        setSelectedOption(e.target.options[e.target.selectedIndex].text);
        dispatch(filterByRating(value));
    };

    return (
        <div className="relative w-auto max-w-xs">
            <svg className="absolute top-1/2 -translate-y-1/2 left-4 z-10" width="20" height="20"
                viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
                    stroke="black" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <select
                id="SortByRatings"
                onChange={handleSortChange}
                className="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
            >
                <option value="5">Sort by Ratings (5)</option>
                <option value="4">Sort by Ratings (4 and above)</option>
                <option value="3">Sort by Ratings (3 and above)</option>
                <option value="2">Sort by Ratings (2 and above)</option>
                <option value="1">Sort by Ratings (1 and above)</option>
            </select>
            <svg className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-10" width="16" height="16"
                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}
