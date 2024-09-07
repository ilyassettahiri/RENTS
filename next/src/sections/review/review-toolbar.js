

import { useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useAuthDialog from 'src/hooks/use-authdialog';

import FormControl from '@mui/material/FormControl';
import Select, { selectClasses } from '@mui/material/Select';
import LoginDialog from 'src/sections/auth/login-dialog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Popular' },
];

// ----------------------------------------------------------------------

export default function ReviewToolbar({ sort, totalReviews, onOpenReview, onChangeSort }) {

  const { t } = useTranslation();


  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();

  const handleWriteReviewClick = () => {
    requireAuth(onOpenReview); // This ensures authentication is required before opening the review form
  };

  return (

      <>

        <Stack
          spacing={5}
          alignItems={{ md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          sx={{ mb: 5 }}
        >
          <Typography variant="h4" sx={{ width: 1 }}>
            {totalReviews} {t('Reviews')}
          </Typography>

          <Stack direction="row" spacing={2} flexShrink={0} alignItems="center">
            <FormControl
              hiddenLabel
              sx={{
                [`& .${selectClasses.select}`]: {
                  py: 1.75,
                },
              }}
            >
              <Select value={sort} onChange={onChangeSort}>
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button size="large" variant="contained" color="primary" onClick={handleWriteReviewClick}>
            {t('WriteaReview')}
            </Button>
          </Stack>
        </Stack>
        <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

      </>


  );
}

ReviewToolbar.propTypes = {
  onChangeSort: PropTypes.func,
  onOpenReview: PropTypes.func,
  sort: PropTypes.string,
  totalReviews: PropTypes.number,
};
