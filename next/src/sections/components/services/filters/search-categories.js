import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from 'react-i18next';


import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------





export default function SearchCategories({ searchCategories, onChangeCategory, colorr,categories, placeholder, icon }) {

  const { t } = useTranslation();

  return (
    <Autocomplete
      sx={{ width: 1 }}
      options={categories}
      getOptionLabel={(option) => option}
      value={searchCategories}
      onChange={(event, value) => onChangeCategory(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  width={24}
                  icon={icon}

                  sx={{ color: colorr, mr: 1 }}
                />
              </InputAdornment>
            ),
            sx: { pb: 1, color: colorr,
              ...(colorr === 'white' && { backgroundColor: 'rgba(255, 255, 255, 0.12)' }), // Apply background color only if 'colorr' is white

             },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option}>

          {t(option)}
        </li>
      )}
    />
  );
}

SearchCategories.propTypes = {
  searchCategories: PropTypes.string,
  onChangeCategory: PropTypes.func,
  colorr: PropTypes.string,
  placeholder: PropTypes.string,

  categories: PropTypes.array,


  icon: PropTypes.string,


};
