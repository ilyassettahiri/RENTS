import HomeViewCategory from 'src/sections/home/home-view-category';
import PropTypes from 'prop-types';


export async function generateMetadata({ params }) {
  const { city, category } = params;


  return {
    title: `Find ${category} for Rent in ${city} - RENTS.ma`,
    description: `Discover top ${category} rental options in ${city} on RENTS.ma. From quality listings to trusted providers, find the best rentals available in ${city}.`,
  };
}

const HomeCategoryPage = ({ params }) => <HomeViewCategory params={params} />;

HomeCategoryPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,


  }).isRequired,
};

export default HomeCategoryPage;
