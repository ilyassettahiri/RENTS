
'use client';

import { useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";
import Divider from '@mui/material/Divider';

import MarkdownSkeleton from 'src/components/markdown/markdown-skeleton';

import Markdown from 'src/components/markdown';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import ContactInfo from './termcondition-info';

// ----------------------------------------------------------------------

export default function TermconditionView() {
  // Fetch term data using react-query
  const { data: termData, isLoading, error: termconditionError } = useQuery({
    queryKey: ['termconditions'],
    queryFn: () => CrudService.getTermconditions(),
    onError: (error) => {
      console.error('Failed to fetch terms and conditions:', error);
    },
  });

  // Memorize the data transformation
  const formattedData = useMemo(() => {
    if (!termData) return null;

    // Extract policy page data from the response
    return termData.data.policypage;
  }, [termData]);

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          mt: { xs: 4, md: 10 },
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >
        {isLoading ? (
          <MarkdownSkeleton /> // Placeholder while loading
        ) : (
          formattedData && <Markdown content={formattedData.attributes.content}  />
        )}
      </Container>

      {/* <ContactInfo /> */}
    </>
  );
}
