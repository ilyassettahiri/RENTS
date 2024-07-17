'use client';

import { useState, useEffect, useCallback } from "react";
import CrudService from "src/services/cruds-service";


import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';


import Iconify from 'src/components/iconify';

import PlanHeader from './pricing-header';
import PlanContentMobile from './pricing-content-mobile';
import PlanContentDesktop from './pricing-content-desktop';

// ----------------------------------------------------------------------

export default function Pricing02View() {









  const mdUp = useResponsive('up', 'md');

  return (
    <Container maxWidth={false}
      sx={{
        minHeight: 1,
        pt: { xs: 13, md: 16 },
        pb: { xs: 10, md: 15 },
                paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >

    </Container>
  );
}
