'use client';

import { useState, useEffect } from "react";
import CrudService from "src/services/cruds-service";
import Divider from '@mui/material/Divider';
import Markdown from 'src/components/markdown';



import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import ContactInfo from './privacy-info';




export default function PrivacyView() {





  const [termdata, setTermdata] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getTermconditions();



        setTermdata(response.data.policypage);

        console.log('Response data:', response.data.policypage); // Logging the response


      } catch (error) {
        console.error('Failed to fetch Home:', error);
      }
    })();
  }, []);




  return (
    <>


    <Container maxWidth={false}
        sx={{
          mt: { xs: 4, md: 10 },
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}>

      {termdata && <Markdown content={termdata.attributes.privacy} firstLetter />}


    </Container>


      <ContactInfo />


    </>
  );
}
