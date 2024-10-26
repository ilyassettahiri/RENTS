'use client';


import { useMemo } from "react";

import Divider from '@mui/material/Divider';
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";
import ContactInfo from 'src/sections/contact/contact-info';
import ContactForm from './contact-form';

export default function ContactView() {
  // Fetch contacts data using React Query
  const { data: contactData, isLoading, error: contactError } = useQuery({
    queryKey: ['contacts'],
    queryFn: CrudService.getContacts,
    onError: (error) => {
      console.error('Failed to fetch contacts:', error);
    },
  });


  const contactInfo = useMemo(() => contactData?.data || {}, [contactData]);


  return (
    <>
      <ContactInfo />
      <ContactForm />
      <Divider sx={{ mb: { xs: 6, md: 20 } }} />
    </>
  );
}
