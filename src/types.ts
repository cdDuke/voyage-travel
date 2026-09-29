import type { Continent } from './data/tours';

export type DaysFilter = 'any' | 'short' | 'mid' | 'long';
export type SortKey = 'popular' | 'priceAsc' | 'priceDesc' | 'rating' | 'days';

export type Filters = {
  continent: 'all' | Continent;
  maxPrice: number;
  days: DaysFilter;
  sort: SortKey;
  favsOnly: boolean;
};

export const PRICE_MAX = 4000;

export const defaultFilters: Filters = {
  continent: 'all',
  maxPrice: PRICE_MAX,
  days: 'any',
  sort: 'popular',
  favsOnly: false,
};
