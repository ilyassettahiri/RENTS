/* eslint-disable react/prop-types */

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import { Iconify } from 'components/iconify';
import dayjs from 'dayjs';

// ----------------------------------------------------------------------

export default function DateRange({ value, onChange, minDate = dayjs(), maxDate, disabledDateRanges = [], sx }) {
  // Function to disable specific dates in the picker
  const shouldDisableDate = (date) => {
    if (!disabledDateRanges || disabledDateRanges.length === 0) {
      return false;
    }
    return disabledDateRanges.some((range) => dayjs(date).isBetween(range.start, range.end, 'day', '[]'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        shouldDisableDate={shouldDisableDate}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:calendar-outline" />
                </InputAdornment>
              ),
              
            },
            sx: {
              [`& .${inputBaseClasses.input}`]: {
                py: 0.5,
                height: 38,
                
                
              },
              [`& .MuiOutlinedInput-notchedOutline`]: {
                border: 'none', // Removes the border
              },
              ...sx,
            },
          },
        }}
        
        sx={{
          [`& .MuiInputLabel-root`]: { // Target the label root class
            fontSize: '17px', 
            fontWeight: '600',
          },
        }}
      />
    </LocalizationProvider>
  );
}
