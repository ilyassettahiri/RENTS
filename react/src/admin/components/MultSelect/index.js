import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import SoftTypography from "components/SoftTypography";

const MultSelect = ({ name, options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const updateSelectedOptions = (optionValue) => {
    setSelectedOptions((prev) => {
      const newSelected = prev.includes(optionValue)
        ? prev.filter((value) => value !== optionValue)
        : [...prev, optionValue];
      return newSelected;
    });
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const isChecked = (optionValue) => selectedOptions.includes(optionValue);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', py: 5, px: 2 }}>
      {options.map((option) => (
        <Box key={option.value} sx={{ maxWidth: '100%' }}
        onClick={() => updateSelectedOptions(option.value)}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(option.value)}
                onChange={() => updateSelectedOptions(option.value)}
                sx={{ display: 'none' }}
              />
            }
            label={
              <Box
                sx={{
                  border: 1,
                  borderColor: isChecked(option.value) ? '#1e90ff' : 'gray',
                  bgcolor: isChecked(option.value) ? '#1e90ff' : 'transparent',
                  px: 2,
                  py: 1.5,
                  m:0.5,

                  borderRadius: 2,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 'small',
                  textAlign: 'center',
                }}
              >

                  <SoftTypography component="label" variant="caption"  textTransform="capitalize"
                  color={isChecked(option.value) ? 'white' : 'inherit'}
                  >

                    {option.label}


                  </SoftTypography>

              </Box>
            }
          />
        </Box>
      ))}
    </Box>
  );
};

MultSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultSelect;
