
/* eslint-disable react/prop-types */


import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function DateRange({ value, onChange }) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        
            
            <DateRangePicker
              value={value}
              onChange={onChange}
            />
         
      </LocalizationProvider>
    );
  }
