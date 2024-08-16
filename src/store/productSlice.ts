import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

interface PriceRange {
  from: number | null;
  to: number | null;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  sortBy: 'price' | 'rating' | null;
  sortDirection: 'asc' | 'desc';
  ratingFilter: number | null;
  page: number;
  hasMore: boolean;
  minPrice: number;
  maxPrice: number;
  priceRange: PriceRange;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  sortBy: null,
  sortDirection: 'asc',
  ratingFilter: null,
  page: 1,
  hasMore: true,
  minPrice: 0,
  maxPrice: Infinity,
  priceRange: { from: null, to: null },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    appendProducts(state, action: PayloadAction<Product[]>) {
      state.products = [...state.products, ...action.payload];
      state.filteredProducts = state.products.filter(product => {
        const isWithinRange =
          (state.priceRange.from === null || product.price >= state.priceRange.from) &&
          (state.priceRange.to === null || product.price <= state.priceRange.to);
        return isWithinRange;
      });
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    filterProducts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
    },
    sortProducts: (state, action: PayloadAction<{ attribute: 'price' | 'rating'; direction: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.attribute;
      state.sortDirection = action.payload.direction;
      state.products = state.products.slice().sort((a, b) => {
        if (a[action.payload.attribute] < b[action.payload.attribute]) return action.payload.direction === 'asc' ? -1 : 1;
        if (a[action.payload.attribute] > b[action.payload.attribute]) return action.payload.direction === 'asc' ? 1 : -1;
        return 0;
      });
      state.filteredProducts = state.products.filter(product =>
        product.price >= state.minPrice && product.price <= state.maxPrice
      );
    },
    filterByRating: (state, action: PayloadAction<number>) => {
      state.ratingFilter = action.payload;
      state.filteredProducts = state.products.filter(product =>
        product.rating >= action.payload
      );
    },
    setPriceRange(state, action: PayloadAction<PriceRange>) {
      state.priceRange = action.payload;
      state.filteredProducts = state.products.filter(product => {
        const isWithinRange =
          (action.payload.from === null || product.price >= action.payload.from) &&
          (action.payload.to === null || product.price <= action.payload.to);
        return isWithinRange;
      });
    },
  },
});

export const { appendProducts, setHasMore, filterByRating, setPriceRange, filterProducts, sortProducts } = productSlice.actions;
export default productSlice.reducer;
