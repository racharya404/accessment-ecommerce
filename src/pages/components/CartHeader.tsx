import { RootState } from '@/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

export default function CartHeader() {
    const { items, total } = useSelector((state: RootState) => state.cart);

    return (
        <header className="z-50 fixed top-0 left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                <Link href="/">
                    <h1 className="text-2xl font-bold mb-2 sm:mb-0">E-commerce Store</h1>
                </Link>
                <div className=" sm:w-auto w-full">
                    <SearchBar />
                </div>
                <div className='mt-2 sm:mt-0 flex sm:justify-between md:justify-normal'>
                    <span className="block sm:inline mr-4">Cart: {items.length}</span>
                    <span className="block sm:inline">Total: ${total.toFixed(2)}</span>
                </div>
            </div>
        </header>
    );
}
