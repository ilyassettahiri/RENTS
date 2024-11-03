import PropTypes from 'prop-types';


import CountrySelect from 'src/components/country-select';

// ----------------------------------------------------------------------


const cities = [
  { label: 'Casablanca' },
  { label: 'Marrakech' },
  { label: 'Fes' },
  { label: 'Sale' },
  { label: 'Tangier' },
  { label: 'Rabat' },
  { label: 'Meknes' },
  { label: 'Oujda' },
  { label: 'Kenitra' },
  { label: 'Agadir' },
  { label: 'Tetouan' },
  { label: 'Safi' },
  { label: 'Temara' },
  { label: 'Inzegan' },
  { label: 'Mohammedia' },
  { label: 'Laayoune' },
  { label: 'Khouribga' },
  { label: 'Beni Mellal' },
  { label: 'El Jadida' },
  { label: 'Taza' },
  { label: 'Taghazout' },
  { label: 'Ait Melloul' },
  { label: 'Nador' },
  { label: 'Settat' },
  { label: 'Ksar El Kbir' },
  { label: 'Larache' },
  { label: 'Khemisset' },
  { label: 'Guelmim' },
  { label: 'Berrechid' },
  { label: 'Wad Zam' },
  { label: 'Fkih Ben Saleh' },
  { label: 'Taourirt' },
  { label: 'Berkane' },
  { label: 'Sidi Slimane' },
  { label: 'Errachidia' },
  { label: 'Sidi Kacem' },
  { label: 'Khenifra' },
  { label: 'Tifelt' },
  { label: 'Essaouira' },
  { label: 'Taroudant' },
  { label: 'El Kelaa des Sraghna' },
  { label: 'Oulad Teima' },
  { label: 'Youssoufia' },
  { label: 'Sefrou' },
  { label: 'Ben Guerir' },
  { label: 'Tan-Tan' },
  { label: 'Ouazzane' },
  { label: 'Guercif' },
  { label: 'Dakhla' },
  { label: 'Hoceima' }
];



export default function SearchLocation({ searchLocation, onChangeLocation, sx }) {
  return (
    <CountrySelect
      fullWidth
      hiddenLabel
      placeholder="Locations"
      value={searchLocation}
      onChange={(event, newValue) => onChangeLocation(newValue)}
      options={cities.map((option) => option.label)}
      getOptionLabel={(option) => option}
      sx={sx}
    />
  );
}

SearchLocation.propTypes = {
  searchLocation: PropTypes.string,
  onChangeLocation: PropTypes.func,
  sx: PropTypes.object,
};
