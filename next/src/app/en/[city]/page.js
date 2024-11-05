import HomeViewCity from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

// Dynamically generate metadata based on `params`
export async function generateMetadata({ params }) {
  const { city } = params;

  // Set the title dynamically based on the `url` param
  return {
    title: `${city}`, // Customize the title as needed
  };
}

const HomeCityPage = ({ params }) => <HomeViewCity routeParams={params} />;

HomeCityPage.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,


  }).isRequired,
};

export default HomeCityPage;
