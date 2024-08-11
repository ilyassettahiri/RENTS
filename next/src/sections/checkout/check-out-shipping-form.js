import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function TravelCheckOutShippingForm() {
  return (
    <Stack spacing={5}>
      <div>


        <Stack spacing={2.5}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <RHFTextField name="billingAddress.name" label="Name" />
            <RHFTextField name="billingAddress.email" label="Email" />
          </Stack>
          <RHFTextField name="billingAddress.fullAddress" label="Full Address" />
          <RHFTextField name="billingAddress.fullAddress2" label="Full Address2" />
        </Stack>
      </div>


    </Stack>
  );
}


