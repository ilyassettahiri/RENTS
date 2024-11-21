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

export function useGetReviews() {
  const url = endpoints.review.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const reviews = data?.data?.map(review => review.attributes) || [];

    // Log the reviews data
    console.log('reviews Data:', reviews);

    return {
      reviews,
      reviewsLoading: isLoading,
      reviewsError: error,
      reviewsValidating: isValidating,
      reviewsEmpty: !isLoading && !reviews.length,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetReview(reviewId) {
  const url = reviewId ? [endpoints.review.details, { params: { reviewId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const reviews = data?.data?.map(review => review.attributes) || [];

    // Log the reviews data
    console.log('reviews Data:', reviews);

    return {
      reviews,
      reviewsLoading: isLoading,
      reviewsError: error,
      reviewsValidating: isValidating,
      reviewsEmpty: !isLoading && !reviews.length,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchReviews(query) {
  const url = query ? [endpoints.review.search, { params: { query } }] : '';

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
