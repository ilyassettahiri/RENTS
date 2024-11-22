import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetStores() {
  const url = endpoints.store.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const stores = data?.data?.map(store => store.attributes) || [];

    // Log the stores data
    console.log('stores Data:', stores);

    return {
      stores,
      storesLoading: isLoading,
      storesError: error,
      storesValidating: isValidating,
      storesEmpty: !isLoading && !stores.length,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetStore(storeId) {
  const url = storeId ? [endpoints.store.details, { params: { storeId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const store = data?.data?.attributes || [];

    // Log the stores data
    console.log('stores Data:', store);

    return {
      store,
      storeLoading: isLoading,
      storeError: error,
      storeValidating: isValidating,
      storeEmpty: !isLoading && !store.length,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchStores(query) {
  const url = query ? [endpoints.store.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
