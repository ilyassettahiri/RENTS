/* eslint-disable react/prop-types */

import { useState } from "react";

import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Address from "components/Address";


export default function EditDialog({ onClose, ...other }) {


  const [address, setAddress] = useState({
    address: "",
    
    city: "",
    country: "",
    zip: "",
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append('data[attributes][address]', address.address);
  formData.append('data[attributes][city]', address.city);
  formData.append('data[attributes][country]', address.country);
  formData.append('data[attributes][zip]', address.zip);




  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...other}>
      <DialogTitle sx={{ typography: 'h3', pb: 3 }}>Shipping Address</DialogTitle>

      <DialogContent sx={{ py: 0 }}>
        <Stack spacing={2.5}>
          

        <Address address={address} onAddressChange={handleAddressChange} />



        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};
