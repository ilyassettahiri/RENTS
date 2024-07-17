import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FilterType from './filter-type';
import FilterLevel from './filter-level';
import FilterPrice from './filter-price';
import FilterBenefits from './filter-benefits';
import FilterTime from './filter-time';

const defaultValues = {
  filterType: [],
  filterLevel: [],
  filterBenefits: [],
  filterTime: [],
  filterPrice: [0, 2000],
};

export default function FilterDialog({ open, onClose, onFilterPriceChange, onResetFilters }) {
  const [filters, setFilters] = useState(defaultValues);
  const [departureDay, setDepartureDay] = useState([null, null]);

  const handleChangeDepartureDay = useCallback((newValue) => {
    setDepartureDay(newValue);
  }, []);

  const handleChangeJobType = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      setFilters({
        ...filters,
        filterType: typeof value === 'string' ? value.split(',') : value,
      });
    },
    [filters]
  );

  const handleChangeJobLevel = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      setFilters({
        ...filters,
        filterLevel: typeof value === 'string' ? value.split(',') : value,
      });
    },
    [filters]
  );

  const handleChangeJobBenefits = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      setFilters({
        ...filters,
        filterBenefits: typeof value === 'string' ? value.split(',') : value,
      });
    },
    [filters]
  );

  const handleChangePrice = useCallback(
    (event, newValue) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterPrice: newValue,
      }));
    },
    []
  );

  const onReset = () => {
    setFilters(defaultValues);
    onResetFilters(); // Call the reset filters handler

  };

  const onSubmit = () => {
    onFilterPriceChange(filters.filterPrice); // Pass the price filter to the parent component
    onClose(); // Close the dialog after submitting the filter
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ typography: 'h3', pb: 3 }}>Filter</DialogTitle>

      <DialogContent sx={{ py: 0 }}>
        <Stack spacing={2.5}>

            <FilterType filterType={filters.filterType} onChangeJobType={handleChangeJobType} />


            <FilterLevel filterLevel={filters.filterLevel} onChangeJobType={handleChangeJobLevel} />


            <FilterPrice filterPrice={filters.filterPrice} onChangePrice={handleChangePrice} />


            <FilterBenefits filterBenefits={filters.filterBenefits} onChangeJobBenefits={handleChangeJobBenefits} />


            <FilterTime departureDay={departureDay} onChangeDepartureDay={handleChangeDepartureDay} />

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" onClick={onReset} color="inherit">
          Clear All
        </Button>
        <Button color="inherit" onClick={onSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FilterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilterPriceChange: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,

};
