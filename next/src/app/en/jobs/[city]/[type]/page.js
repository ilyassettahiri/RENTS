import JobsListViewType from 'src/sections/jobs-list/jobs-list-view-type';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export async function generateMetadata({ params }) {
  const { city, type } = params;


  return {
    title: `${type} Jobs in ${city} - Opportunities on RENTS.ma`,
    description: `Find top ${type} job openings in ${city} on RENTS.ma. Browse positions tailored to your skills and connect with reputable employers in ${city} to advance your career.`,
  };
}


const JobsPageType = ({ params }) => <JobsListViewType params={params} />;

JobsPageType.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobsPageType;
