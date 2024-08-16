import { filterProducts } from '@/store/productSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            dispatch(filterProducts(value));
        }, 200);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <form className="relative mx-auto flex w-full max-w-4xl items-center justify-between rounded-md border shadow-lg">
            <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                name="search"
                className="h-14 w-full rounded-md py-4 pr-40 pl-12 outline-none focus:ring-2"
                placeholder="Product Name"
            />
            <button
                type="submit"
                className="absolute right-0 mr-1 inline-flex h-12 items-center justify-center rounded-lg bg-gray-900 px-10 font-medium text-white focus:ring-4 hover:bg-gray-700"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBar
