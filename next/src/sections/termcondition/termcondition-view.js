
'use client';


import PropTypes from 'prop-types';


import { useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";
import Divider from '@mui/material/Divider';

import MarkdownSkeleton from 'src/components/markdown/markdown-skeleton';

import Markdown from 'src/components/markdown';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import ContactInfo from 'src/sections/contact/contact-info';

// ----------------------------------------------------------------------

export default function TermconditionView({ termData }) {


  const privacyContent = termData.data.policypage.attributes.content;


  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          mt: { xs: 4, md: 10 },
          paddingLeft: { lg: '50px' },
          paddingRight: { lg: '50px' },
        }}
      >

          <Markdown content={privacyContent}  />

      </Container>

       <ContactInfo />
    </>
  );
}





TermconditionView.propTypes = {
  termData: PropTypes.object, // Expect an object or null
};
