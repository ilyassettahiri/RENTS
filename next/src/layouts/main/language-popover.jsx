'use client';


import PropTypes from 'prop-types';


import { m } from 'framer-motion';
import { useCallback } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { useTranslate } from 'src/locales';

import { varHover } from 'src/components/animate';
import { FlagIcon } from 'src/components/iconifyy';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { useSettingsContext } from 'src/components/settings/context';

// ----------------------------------------------------------------------

export function LanguagePopover({ data = [], sx, ...other }) {
  const popover = usePopover();
  const settings = useSettingsContext();
  const { onChangeLang, currentLang } = useTranslate();

  const handleChangeLang = useCallback(
    (newLang) => {
      onChangeLang(newLang);

      settings.onUpdate('themeDirection', newLang === 'ar' ? 'rtl' : 'ltr');

      popover.onClose();
    },
    [onChangeLang, popover, settings]
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          p: 0,
          width: 40,
          height: 40,
          ...(popover.open && { bgcolor: 'action.selected' }),
          ...sx,
        }}
        {...other}
      >
        <FlagIcon code={currentLang.countryCode} />
      </IconButton>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList sx={{ width: 160, minHeight: 72 }}>
          {data?.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => handleChangeLang(option.value)}
            >
              <FlagIcon code={option.countryCode} />
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}


// PropTypes validation
LanguagePopover.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
  })), // 'data' should be an array of objects with specific properties
  sx: PropTypes.object,    // 'sx' should be an object
};
