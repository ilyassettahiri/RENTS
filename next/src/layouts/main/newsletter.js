import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function Newsletter({ sx, ...other }) {

  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.neutral', ...sx }} {...other}>
      <Container>
        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: 'column', md: 'row' }}
        >
          <Stack
            spacing={3}
            alignItems="center"
            direction={{ xs: 'column', md: 'row' }}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >


            <Stack spacing={1}>
              <Typography variant="h4">{t('signUpForNewsletter')}</Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('receiveDiscount')}
              </Typography>
            </Stack>
          </Stack>

          <TextField
            fullWidth
            hiddenLabel
            placeholder={t('enterYourEmail')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="large"
                    color="primary"
                    variant="contained"
                    sx={{
                      height: 54,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    {t('signUp')}
                  </Button>
                </InputAdornment>
              ),
              sx: { pr: 0 },
            }}
            sx={{ maxWidth: 466 }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

Newsletter.propTypes = {
  sx: PropTypes.object,
};
