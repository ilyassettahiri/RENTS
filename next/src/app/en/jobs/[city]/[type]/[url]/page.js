
import axios from 'axios';
import Script from 'next/script';

import JobPageView from 'src/sections/job-page/job-page-view';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { city, type } = params;


  return {
    title: `${type} Job in ${city} - Apply on RENTS.ma`,
    description: `Discover this ${type} job opportunity in ${city} on RENTS.ma. View all job details, requirements, and connect with the hiring company to take the next step in your career.`,
  };
}






export default async function JobPage({ params }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const jobEndpoint = `${API_URL}/jobs/${params.url}`;

  try {
    // Fetch job data server-side
    const response = await axios.get(jobEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const jobData = response.data;

    // Pass fetched data to JobPageView
    return <JobPageView params={params} jobData={jobData} />;
  } catch (error) {
    console.error('Error fetching job data:', error);

    // Pass null to JobPageView in case of an error
    return <JobPageView params={params} jobData={null} />;
  }
}

JobPage.propTypes = {
  params: PropTypes.shape({
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
