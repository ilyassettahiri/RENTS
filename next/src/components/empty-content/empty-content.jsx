import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

export function EmptyContent({
  sx,
  imgUrl,
  action,
  filled,
  slotProps,
  description,
  title = 'No data',
  ...other
}) {
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 3,
        height: 1,
        ...(filled && {
          borderRadius: 2,
        }),
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        alt="empty content"
        src={imgUrl ?? `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_UR}/empty/ic-content.svg`}
        sx={{ width: 1, maxWidth: 160, ...slotProps?.img }}
      />

      {title && (
        <Typography
          variant="h6"
          component="span"
          sx={{
            mt: 1,
            textAlign: 'center',
            ...slotProps?.title,
            color: 'text.disabled',
          }}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            textAlign: 'center',
            color: 'text.disabled',
            ...slotProps?.description,
          }}
        >
          {description}
        </Typography>
      )}

      {action && action}
    </Stack>
  );
}

EmptyContent.propTypes = {
  sx: PropTypes.object,
  imgUrl: PropTypes.string,
  action: PropTypes.node,
  filled: PropTypes.bool,
  slotProps: PropTypes.shape({
    img: PropTypes.object,
    title: PropTypes.object,
    description: PropTypes.object,
  }),
  description: PropTypes.string,
  title: PropTypes.string,
};
