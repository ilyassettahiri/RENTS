import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function SearchKeyword({ searchKeyword, onChangeKeyword, sx, colorr, keywordCategoryMap, onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const autocompleteRef = useRef(null);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    onChangeKeyword(newInputValue);
  };

  const handleOptionSelect = (event, value) => {
    if (value) {
      const mappedCategory = keywordCategoryMap[value] || 'Uncategorized'; // Get the mapped category or default to 'Uncategorized'
      console.log('Selected Keyword:', value);  // Log the selected keyword
      console.log('Mapped Category:', mappedCategory);  // Log the mapped category

      onChangeKeyword(value);  // Call the onChangeKeyword with the selected value
      setInputValue(value);  // Update input value to selected value

      // Trigger search immediately after selecting an option
      onSearch({
        searchKeyword: value,
        searchCategories: mappedCategory
      });
    }
  };



  return (
    <Autocomplete
      ref={autocompleteRef}
      sx={{ width: 1, ...sx }}
      options={Object.keys(keywordCategoryMap)}
      getOptionLabel={(option) => option}
      value={searchKeyword}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      autoHighlight
      popupIcon={null}
      noOptionsText="No matches found"
      slotProps={{
        popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
        paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          placeholder="Que cherchez vous..."
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify width={24} icon="carbon:search" sx={{ color: colorr, mr: 1 }} />
              </InputAdornment>
            ),
            endAdornment: null,
            sx: {
              pb: 1,
              color: colorr,
              ...(colorr === 'white' && { backgroundColor: 'rgba(255, 255, 255, 0.12)' }),
            },
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const category = keywordCategoryMap[option] || 'Uncategorized';

        return (
          <Box
            component="li"
            {...props}
            onClick={() => handleOptionSelect(null, option)}
            key={option}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Iconify icon="carbon:tag" sx={{ mr: 1.5, color: 'primary.main' }} />
            <div>
              <Typography variant="body2" sx={{ fontWeight: 'fontWeightMedium' }}>
                {option}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Category: {category}
              </Typography>
            </div>
          </Box>
        );
      }}
    />
  );
}

SearchKeyword.propTypes = {
  searchKeyword: PropTypes.string,
  onChangeKeyword: PropTypes.func.isRequired,
  sx: PropTypes.object,
  colorr: PropTypes.string,
  keywordCategoryMap: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,

};
