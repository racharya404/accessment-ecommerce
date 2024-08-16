import { addToCart } from '@/store/cartSlice';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={product.image} alt={product.title} className="w-full h-48 object-cover" height={80} width={80}
                placeholder='blur'
                blurDataURL='/blur-image.webp'
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.description.slice(0, 100)}...</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-yellow-500">★ {product.rating.toFixed(1)}</span>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}