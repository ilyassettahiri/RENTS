import JobsListViewType from 'src/sections/jobs-list/jobs-list-view-type';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${url}`, // Customize the title as needed
  };
}


const JobsPageType = ({ params }) => <JobsListViewType params={params} />;

JobsPageType.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageType;
