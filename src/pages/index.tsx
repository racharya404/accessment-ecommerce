import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Product } from '../types/product';
import { appendProducts, setHasMore } from '../store/productSlice';
import { RootState } from '../store';
import CartHeader from './components/CartHeader';
import SortButtons from './components/SortButtons';
import ProductCard from './components/ProductCard';

interface HomeProps {
  products: Product[];
  totalCount: number;
}

export default function Home({ products, totalCount }: HomeProps) {
  const dispatch = useDispatch();
  const { filteredProducts, hasMore, sortBy, sortDirection, ratingFilter, priceRange } = useSelector((state: RootState) => state.products);
  const loader = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;
    try {
      const limit = 10;
      const offset = filteredProducts.length;
      const query = new URLSearchParams({
        _start: `${offset}`,
        _limit: `${limit}`,
        ...(sortBy && { _sort: sortBy }),
        ...(sortDirection && { _order: sortDirection }),
        ...(ratingFilter && { rating_gte: `${ratingFilter}` }),
        ...(priceRange.from !== null && { price_gte: `${priceRange.from}` }),
        ...(priceRange.to !== null && { price_lte: `${priceRange.to}` }),
      });
      const res = await axios.get(`http://localhost:8000/products?${query.toString()}`);
      const newProducts: Product[] = res.data;
      dispatch(appendProducts(newProducts));
      const moreProductsAvailable = newProducts.length === limit;
      dispatch(setHasMore(moreProductsAvailable));
    } catch (error) {
      console.error('Error loading more products:', error);
    }
  }, [dispatch, hasMore, filteredProducts.length, sortBy, sortDirection, ratingFilter, priceRange]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('Intersection observed, loading more...');
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>E-commerce Product Listing</title>
        <meta name="description" content="Browse our amazing products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CartHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="pt-40 md:pt-14 pb-4">
          <SortButtons />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center">No products available in this range.</p>
          )}
        </div>
        <div ref={loader} className="h-10 mt-4 text-center">
          {hasMore ? 'Loading more...' : 'No more products'}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`http://localhost:8000/products?_limit=0`);
  const products: Product[] = res.data;
  const totalCount = parseInt(res.headers['x-total-count'] || '0');
  return {
    props: {
      products,
      totalCount,
    },
  };
};
