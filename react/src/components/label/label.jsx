/* eslint-disable react/prop-types */

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

// ----------------------------------------------------------------------

export const Label = forwardRef(
  ({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const colors = {
      default: theme.palette.grey[300],
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      error: theme.palette.error.main,
    };

    const variants = {
      soft: {
        backgroundColor: colors[color] || colors.default,
        color: theme.palette.getContrastText(colors[color] || colors.default),
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(0.5, 1),
      },
    };

    const iconStyles = {
      width: 16,
      height: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg, img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    };

    return (
      <Typography
        ref={ref}
        component="span"
        variant="body2"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...variants[variant],
          ...sx,
        }}
        {...other}
      >
        {startIcon && (
          <Box component="span" sx={{ mr: 0.75, ...iconStyles }}>
            {startIcon}
          </Box>
        )}

        {typeof children === 'string' ? sentenceCase(children) : children}

        {endIcon && (
          <Box component="span" sx={{ ml: 0.75, ...iconStyles }}>
            {endIcon}
          </Box>
        )}
      </Typography>
    );
  }
);

// ----------------------------------------------------------------------

function sentenceCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
