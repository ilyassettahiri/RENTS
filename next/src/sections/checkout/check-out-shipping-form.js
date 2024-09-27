import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';

import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function TravelCheckOutShippingForm() {

  const { t } = useTranslation();


  return (
    <Stack spacing={5}>
      <div>


        <Stack spacing={2.5}>
          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
            <RHFTextField name="billingAddress.name" label={t('FirstName')} />
            <RHFTextField name="billingAddress.lastName" label={t('LastName')}  />

          </Stack>
          <RHFTextField name="billingAddress.fullAddress" label="Full Address" />


          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>
              <RHFTextField name="billingAddress.city" label={t('City')}/>

              <RHFTextField name="billingAddress.zipCode" label={t('ZipCode')} />
          </Stack>

          <Stack spacing={{ xs: 2.5, md: 2 }} direction={{ xs: 'column', md: 'row' }}>

            <RHFTextField name="billingAddress.email" label="Email" />

            <RHFTextField name="billingAddress.phoneNumber" label={t('PhoneNumber')} />
          </Stack>

        </Stack>
      </div>


    </Stack>
  );
}


