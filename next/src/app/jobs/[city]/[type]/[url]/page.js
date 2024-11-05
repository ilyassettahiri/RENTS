import JobPageView from 'src/sections/job-page/job-page-view';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { city, type } = params;


  return {
    title: `${type} Job in ${city} - Apply on RENTS.ma`,
    description: `Discover this ${type} job opportunity in ${city} on RENTS.ma. View all job details, requirements, and connect with the hiring company to take the next step in your career.`,
  };
}


const JobPage = ({ params }) => <JobPageView params={params} />;

JobPage.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,


  }).isRequired,
};

export default JobPage;
