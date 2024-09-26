import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';
import SoftTypography from "components/SoftTypography";

const OneSelect = ({ name, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (optionValue) => {
    setSelectedOption((prev) => (prev === optionValue ? '' : optionValue));
  };

  useEffect(() => {
    onChange({ value: selectedOption });
  }, [selectedOption, onChange]);

  const isChecked = (optionValue) => selectedOption === optionValue;

  return (
    <Box sx={{ display: 'flex', py: 5, px: 2 }}>
      <RadioGroup row value={selectedOption} name={name}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio sx={{ display: 'none' }} />}
            label={
              <Box
                onClick={() => handleOptionChange(option.value)}
                sx={{
                  border: 1,
                  borderColor: isChecked(option.value) ? '#1e90ff' : 'gray',
                  bgcolor: isChecked(option.value) ? '#1e90ff' : 'transparent',
                  px: 2,
                  py: 1.5,
                  m:0.3,
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
        ))}
      </RadioGroup>
    </Box>
  );
};

OneSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OneSelect;
