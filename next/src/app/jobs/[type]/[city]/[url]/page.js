import JobPageView from 'src/sections/job-page/job-page-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { url } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${url}`, // Customize the title as needed
  };
}


const JobPage = ({ params }) => <JobPageView params={params} />;

JobPage.propTypes = {
  params: PropTypes.shape({
    // Add the necessary params validation
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobPage;
