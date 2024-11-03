import HomeViewCity from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

// Dynamically generate metadata based on `params`
export async function generateMetadata({ params }) {
  const { category } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${category}`, // Customize the title as needed
  };
}

const HomeCityPage = ({ params }) => <HomeViewCity params={params} />;

HomeCityPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

  }).isRequired,
};

export default HomeCityPage;
