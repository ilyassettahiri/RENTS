import HomeViewType from 'src/sections/home/home-view-city';
import PropTypes from 'prop-types';

import Script from 'next/script';

export async function generateMetadata({ params }) {
  const { city, category, type } = params;


  return {
    title: `Find ${type} for Rent in ${city} - RENTS.ma`,
    description: `Explore top listings for ${type} rentals in ${city} on RENTS.ma. Find quality options and trusted providers to meet your needs in ${city}.`,
  };
}

const HomeTypePage = ({ params }) => <HomeViewType params={params} />;

HomeTypePage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

  }).isRequired,
};

export default HomeTypePage;
