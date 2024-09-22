import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'; // Use Chip to replace Label
import Popover from '@mui/material/Popover'; // Use Popover from MUI
import MenuIcon from '@mui/icons-material/Menu'; // Example icon replacement
import PrintIcon from '@mui/icons-material/Print';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import EditIcon from '@mui/icons-material/Edit';

import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom'; // React Router for navigation

// Assuming a utility function for date formatting is present
import { format, parseISO } from 'date-fns';
// ----------------------------------------------------------------------

export function ListingDetailsToolbar({
  status,
  backLink,
  createdAt,
  listingNumber,
  title,
  clickEditHandler,
  clickAddHandler,
  clickOpenHandler

}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();


 


  const open = Boolean(anchorEl);

  return (
    <>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: { xs: 3, md: 5 } }}>
        <Stack spacing={1} direction="row" alignItems="flex-start">
          {/* Use Link from react-router-dom for navigation */}
          <IconButton component={Link} to={backLink}>
            <ArrowBackIcon color="secondary"/>
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4"> Listing #{listingNumber} </Typography>
              <Chip
                label={status}
                color={
                  (status === 'completed' && 'success') ||
                  (status === 'pending' && 'warning') ||
                  (status === 'cancelled' && 'error') ||
                  'default'
                }
                variant="outlined"
              />
            </Stack>

            <Typography variant="body2" color="secondary" >
             
            {format(parseISO(createdAt), 'd MMM, h:mm a')}
            </Typography>
          </Stack>

          <IconButton
            
            onClick={clickOpenHandler}
          >
            <VisibilityIcon color="secondary"/>
          </IconButton>
        </Stack>

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          

          <SoftButton    variant="gradient" type="submit" onClick={clickAddHandler} color="info">

                            
                {t(title)} 

          </SoftButton>


          <SoftButton   variant="outlined" color="white" type="submit" onClick={clickEditHandler}  >
          
                {t('Edit')} 
          
            
          </SoftButton>



          
        </Stack>
      </Stack>

      
    </>
  );
}

ListingDetailsToolbar.propTypes = {
  status: PropTypes.string.isRequired,
  backLink: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,

  clickAddHandler: PropTypes.func.isRequired,
  clickOpenHandler: PropTypes.func.isRequired,
  clickEditHandler: PropTypes.func.isRequired,


  listingNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  statusOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChangeStatus: PropTypes.func.isRequired,
};
