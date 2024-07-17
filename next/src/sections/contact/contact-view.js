'use client';

import { useState, useEffect } from "react";
import Divider from '@mui/material/Divider';
import CrudService from "src/services/cruds-service";
import ContactInfo from './contact-info';
import ContactForm from './contact-form';

export default function ContactView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getContacts();
        setData(response.data);
        console.log('Response data:', response.data); // Logging the response
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    })();
  }, []);

  return (
    <>
      <ContactInfo />
      <ContactForm />
      <Divider sx={{ mb: { xs: 6, md: 20 } }} />
    </>
  );
}
