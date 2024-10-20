import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import Iconify from 'src/components/iconify';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ----------------------------------------------------------------------

export default function FilterTime({ departureDay, onChangeDepartureDay, minDate, maxDate, disabledDateRanges = [], sx }) {
  const shouldDisableDate = (date) => {
    if (!disabledDateRanges || disabledDateRanges.length === 0) {
      return false;
    }
    return disabledDateRanges.some(range => date >= range.start && date <= range.end);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        value={departureDay.map(date => date ? new Date(date) : null)}
        onChange={onChangeDepartureDay}
        minDate={minDate}
        maxDate={maxDate}
        shouldDisableDate={shouldDisableDate}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'standard',
            InputProps: {
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify width={24} icon="carbon:calendar" sx={{ color: 'text.disabled', mr: 1 }} />
                </InputAdornment>
              ),
            },
            sx: {
              [`& .${inputBaseClasses.input}`]: {
                py: 0,
                height: 52,
                typography: 'subtitle1',
              },
              ...sx,
            },
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
