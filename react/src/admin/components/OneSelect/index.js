import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';

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
                  borderColor: isChecked(option.value) ? 'skyblue' : 'gray',
                  bgcolor: isChecked(option.value) ? 'skyblue' : 'transparent',
                  color: isChecked(option.value) ? 'black' : 'inherit',
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 'small',
                  textAlign: 'center',
                }}
              >
                {option.label}
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
