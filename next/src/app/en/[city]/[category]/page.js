import HomeViewCategory from 'src/sections/home/home-view-category';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

// Dynamically generate metadata based on `params`
export async function generateMetadata({ routeParams }) {
  const { category } = routeParams;

  // Set the title dynamically based on the `url` param
  return {
    title: `${category}`, // Customize the title as needed
  };
}

const HomeCategoryPage = ({ routeParams }) => <HomeViewCategory params={routeParams} />;

HomeCategoryPage.propTypes = {
  routeParams: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

  }).isRequired,
};

export default HomeCategoryPage;
