'use client';

import { useState, useEffect } from "react";
import ContactInfo from './contact-info';
import ContactForm from './contact-form';
import CrudService from "src/services/cruds-service";
import Divider from '@mui/material/Divider';

export default function ContactView() {





  const [data, setData] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getContacts();

        setData(response.data);

        console.log('Response data:', response.data); // Logging the response


      } catch (error) {
        console.error('Failed to fetch Home:', error);
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
