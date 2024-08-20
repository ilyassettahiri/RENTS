'use client';

import { forwardRef } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { Icon, disableCache } from '@iconify/react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';

import { iconifyClasses } from './classes';

// ----------------------------------------------------------------------

export const Iconify = forwardRef(({ className, width = 20, sx, ...other }, ref) => {
  const baseStyles = {
    width,
    height: width,
    flexShrink: 0,
    display: 'inline-flex',
  };

  const renderFallback = (
    <Box
      component="span"
      className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
      sx={{ ...baseStyles, ...sx }}
    />
  );

  return (
    <NoSsr fallback={renderFallback}>
      <Box
        ref={ref}
        component={Icon}
        className={iconifyClasses.root.concat(className ? ` ${className}` : '')}
        sx={{ ...baseStyles, ...sx }}
        {...other}
      />
    </NoSsr>
  );
});

// PropTypes validation
Iconify.propTypes = {
  className: PropTypes.string, // 'className' should be a string
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 'width' can be a string or a number
  sx: PropTypes.object, // 'sx' should be an object
};

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache('local');
