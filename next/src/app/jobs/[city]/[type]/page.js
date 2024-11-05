import JobsListViewType from 'src/sections/jobs-list/jobs-list-view-type';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { type } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${type}`, // Customize the title as needed
  };
}


const JobsPageType = ({ params }) => <JobsListViewType routeParams={params} />;

JobsPageType.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageType;
