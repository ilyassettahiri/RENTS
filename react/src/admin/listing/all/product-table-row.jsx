/* eslint-disable react/prop-types */



import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
import  Image  from 'components/image';
import SoftTypography from "components/SoftTypography";
import { NavLink } from "react-router-dom";

import { fCurrency } from 'utils/format-number';
import { fTime, fDate } from 'utils/format-time';

import { Label } from 'components/label';

// ----------------------------------------------------------------------

export function RenderCellPrice({ params }) {
  return fCurrency(params.row.price);
}

// ----------------------------------------------------------------------

export function RenderCellPublish({ params }) {
  return (
    <Label variant="soft" color={(params.row.status === 'active' && 'info') || 'default'}>
      {params.row.status}
    </Label>
  );
}

// ----------------------------------------------------------------------

export function RenderCellCreatedAt({ params }) {
  return (
    <Stack spacing={0.5}>
      <Box component="span">{fDate(params.row.createdAt)}</Box>
      
      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {fTime(params.row.createdAt)}
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function RenderCellStock({ params }) {
  return (
    <Stack justifyContent="center" sx={{ typography: 'caption', color: 'text.secondary' }}>
      <LinearProgress
        value={(params.row.available * 100) / params.row.quantity}
        variant="determinate"
        color={
          (params.row.inventoryType === 'out of stock' && 'error') ||
          (params.row.inventoryType === 'low stock' && 'warning') ||
          'success'
        }
        sx={{ mb: 1, width: 1, height: 6, maxWidth: 80 }}
      />
      {!!params.row.available && params.row.available} {params.row.inventoryType}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function RenderCellProduct({ params, onViewRow }) {

  const imageUrl = `${process.env.REACT_APP_IMAGE_LISTING_SMALL}${params.row.picture}`;

  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Image
        src={imageUrl}
        alt={params.row.title}
        ratio="1/1"
        sx={{ width: 64, height: 64, mr: 2, borderRadius: '10px' }}
      />
      

      <ListItemText
        disableTypography
        primary={
          
          <SoftTypography onClick={onViewRow} variant="button" fontWeight="medium" component={NavLink}  to={onViewRow}>
            {params.row.title}
          </SoftTypography>
        }
        secondary={
          

          <SoftTypography variant="caption"  >
          {params.row.category}
          </SoftTypography>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}


export function RenderCellCollection({ params, onViewRow }) {

  const imageUrl = `${process.env.REACT_APP_IMAGE_COLLECTION}${params.row.picture}`;

  return (
    <Stack direction="row" alignItems="center" sx={{ py: 2, width: 1 }}>
      <Image
        src={imageUrl}
        alt={params.row.title}
        ratio="1/1"
        sx={{ width: 64, height: 64, mr: 2, borderRadius: '10px' }}
      />
      

      <ListItemText
        disableTypography
        primary={
          
          <SoftTypography onClick={onViewRow} variant="button" fontWeight="medium" component={NavLink}  to={onViewRow}>
            {params.row.title}
          </SoftTypography>
        }
        secondary={
          

          <SoftTypography variant="caption"  >
          {params.row.category}
          </SoftTypography>
        }
        sx={{ display: 'flex', flexDirection: 'column' }}
      />
    </Stack>
  );
}
