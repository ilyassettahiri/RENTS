import HomeViewCity from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';
import Script from 'next/script';


export async function generateMetadata({ params }) {
  const { city } = params;


  return {
    title: `Explore ${city} Rentals - Cars, Equipment, and More on RENTS.ma`,
    description: `Explore a wide range of rental options in ${city} on RENTS.ma. Find everything from vehicles, tools, electronics, and more, all available for rent.`,
  };

}

const HomeCityPage = ({ params }) => <HomeViewCity params={params} />;

HomeCityPage.propTypes = {
  params: PropTypes.shape({

    city: PropTypes.string.isRequired,


  }).isRequired,
};

export default HomeCityPage;
