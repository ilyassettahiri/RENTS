
import axios from 'axios';


import TermconditionView from 'src/sections/termcondition/termcondition-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Terms of Service',
};

export default async function TermconditionPage() {




  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const termconditionsEndpoint = `${API_URL}/termconditions`;

  try {

    const response = await axios.get(termconditionsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });


    const termData = response.data;
    return <TermconditionView termData={termData} />;
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);


    return <TermconditionView termData={null} />;
  }




}
