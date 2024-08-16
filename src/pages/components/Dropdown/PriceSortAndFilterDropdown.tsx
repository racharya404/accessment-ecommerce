import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange, sortProducts } from '@/store/productSlice';
import { RootState } from '@/store';

export default function SortDropdown() {
    const dispatch = useDispatch();
    const { sortDirection } = useSelector((state: RootState) => state.products);

    const [minPrice, setMinPrice] = useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();
    const [isOpen, setIsOpen] = useState(false);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const direction = event.target.value as 'asc' | 'desc';
        dispatch(sortProducts({ attribute: 'price', direction }));
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleApply = () => {
        dispatch(setPriceRange({ from: minPrice || null, to: maxPrice || null }));
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <button
                onClick={toggleDropdown}
                className="h-12 border w-full max-w-xs border-gray-300 text-gray-900 pl-4 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50"
            >
                Sort by price
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-md bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">Sort By</h3>
                        <select
                            value={sortDirection}
                            onChange={handleSortChange}
                            className="w-full h-12 border border-gray-300 text-gray-900 pl-3 text-base font-normal leading-7 rounded-full mb-4 focus:outline-none bg-white"
                        >
                            <option value="asc">Low to High</option>
                            <option value="desc">High to Low</option>
                        </select>
                        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                        <div className="flex-row mb-4">
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                placeholder="Min Price"
                                className="w-40 h-12 border mb-2 border-gray-300 text-gray-900 pl-4 text-base font-normal leading-7 rounded-full focus:outline-none bg-white"
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                placeholder="Max Price"
                                className="w-40 h-12 border border-gray-300 text-gray-900 pl-4 text-base font-normal leading-7 rounded-full focus:outline-none bg-white"
                            />
                            <div className="py-2">
                                <button
                                    onClick={handleApply}
                                    className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
