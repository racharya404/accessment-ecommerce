// components/PriceRangeDropdown.tsx
import { setPriceRange } from '@/store/productSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const PriceRangeDropdown = () => {
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const dispatch = useDispatch();

    const handleApply = () => {
        dispatch(setPriceRange({ from: minPrice || null, to: maxPrice || null }));
    };

    return (
        <div className="relative inline-block text-left">
            <button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                Filter by Price Range
            </button>

            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <div className="px-4 py-2">
                        <label className="block text-sm font-medium text-gray-700">Min Price</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            placeholder="e.g. 100"
                        />
                    </div>
                    <div className="px-4 py-2">
                        <label className="block text-sm font-medium text-gray-700">Max Price</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                            placeholder="e.g. 1000"
                        />
                    </div>
                    <div className="px-4 py-2">
                        <button
                            onClick={handleApply}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceRangeDropdown;
