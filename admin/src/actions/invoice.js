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

export function useGetInvoices() {
  const url = endpoints.invoice.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const invoices = data?.data?.map(invoice => invoice.attributes) || [];

    // Log the invoices data
    console.log('invoices Data:', invoices);

    return {
      invoices,
      invoicesLoading: isLoading,
      invoicesError: error,
      invoicesValidating: isValidating,
      invoicesEmpty: !isLoading && !invoices.length,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetInvoice(invoiceId) {
  const url = invoiceId ? [endpoints.invoice.details, { params: { invoiceId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(() => {
    const invoice = data?.data?.attributes || [];

    // Log the invoices data
    console.log('invoices Data:', invoice);

    return {
      invoice,
      invoiceLoading: isLoading,
      invoiceError: error,
      invoiceValidating: isValidating,
      invoiceEmpty: !isLoading && !invoice.length,
    };
  }, [data?.data, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchInvoics(query) {
  const url = query ? [endpoints.invoice.search, { params: { query } }] : '';

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
