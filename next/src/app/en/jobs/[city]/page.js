import JobsListViewCity from 'src/sections/jobs-list/jobs-list-view-city';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;


  return {
    title: `Jobs in ${city} - Find Employment Opportunities on RENTS.ma`,
    description: `Explore the latest job opportunities in ${city} on RENTS.ma. Discover positions across various industries and connect with top employers in ${city}. Start your job search today!`,
  };
}


const JobsPageCity = ({ params }) => <JobsListViewCity params={params} />;

JobsPageCity.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageCity;
