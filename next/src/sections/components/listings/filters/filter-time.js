import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import { useTranslation } from 'react-i18next';

import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FilterTime({
  departureDay,
  onChangeDepartureDay,
  minDate,
  maxDate,
  disabledDateRanges = [],
  sx,
}) {
  const shouldDisableDate = (date) => {
    if (!disabledDateRanges || disabledDateRanges.length === 0) {
      return false;
    }
    return disabledDateRanges.some((range) => date >= range.start && date <= range.end);
  };
  const { t } = useTranslation();

  const localeText = {
    start: t('StartDate'),
    end: t('EndDate'),
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        value={departureDay.map((date) => (date ? new Date(date) : null))}
        onChange={onChangeDepartureDay}
        minDate={minDate}
        maxDate={maxDate}
        shouldDisableDate={shouldDisableDate}
        localeText={localeText}

        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',

            sx: {
              [`& .${inputBaseClasses.input}`]: {
                py: 0.5,
                height: 52,
                typography: 'subtitle1',
              },
              [`& .MuiOutlinedInput-notchedOutline`]: {
                border: 'none', // Removes the border
              },
              ...sx,
            },
          },


        }}


        sx={{
          [`& .MuiInputLabel-root`]: { // Target the input labels for start and end dates
            typography: 'subtitle1',
          },
        }}
      />
    </LocalizationProvider>
  );
}

FilterTime.propTypes = {
  departureDay: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeDepartureDay: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabledDateRanges: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  sx: PropTypes.object,
};
