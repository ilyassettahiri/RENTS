import JobsListViewCity from 'src/sections/jobs-list/jobs-list-view-city';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${city}`, // Customize the title as needed
  };
}


const JobsPageCity = ({ params }) => <JobsListViewCity routeParams={params} />;

JobsPageCity.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageCity;
