'use client';


import PropTypes from 'prop-types';

import { useMemo } from "react";

import Divider from '@mui/material/Divider';
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";
import ContactInfo from 'src/sections/contact/contact-info';
import ContactForm from 'src/sections/contact/contact-form';

export default function ContactView({ contactData }) {
  // Fetch contacts data using React Query
  console.log('Contact Data:', contactData);

  // Use memoization to process the data
  const contactInfo = useMemo(() => contactData || {}, [contactData]);


  return (
    <>
      <ContactInfo />
      <ContactForm />
      <Divider sx={{ mb: { xs: 6, md: 20 } }} />
    </>
  );
}



ContactView.propTypes = {
  contactData: PropTypes.object, // Expect an object or null
};
