import PropTypes from 'prop-types';


import CountrySelect from 'src/components/country-select';

// ----------------------------------------------------------------------


const cities = [


  { label: 'Casablanca' },
  { label: 'Marrakech' },
  { label: 'Fes' },
  { label: 'Sale' },
  { label: 'Marrakesh' },
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
  { label: 'Hoceima' },
  { label: 'Fnideq' },
  { label: 'Ouarzazate' },
  { label: 'Tiznit' },
  { label: 'Suq Sebt Oulad Nama' },
  { label: 'Azrou' },
  { label: 'Lahraouyine' },
  { label: 'Ben Slimane' },
  { label: 'Midelt' },
  { label: 'Jerada' },
  { label: 'Skhirat' },
  { label: 'Souk Larbaa' },
  { label: 'Ain Harrouda' },
  { label: 'Boujad' },
  { label: 'Kasbat Tadla' },
  { label: 'Sidi Bennour' },
  { label: 'Martil' },
  { label: 'Lqliaa' },
  { label: 'Cape Bojador' },
  { label: 'Azemmour' },
  { label: 'Mdiq' },
  { label: 'Tinghir' },
  { label: 'Al Aaroui' },
  { label: 'Chefchaouen' },
  { label: 'MRirt' },
  { label: 'Zagora' },
  { label: 'El Aioun Sidi Mellouk' },
  { label: 'Lamkansa' },
  { label: 'Smara' },
  { label: 'Taounate' },
  { label: 'Bin AnÅŸÄr' },
  { label: 'Sidi Yahya El Gharb' },
  { label: 'Zaio' },
  { label: 'Amalou Ighriben' },
  { label: 'Asilah' },
  { label: 'Azilal' },
  { label: 'Mechra Bel Ksiri' },
  { label: 'El Hajeb' },
  { label: 'Bouznika' },
  { label: 'Imzouren' },
  { label: 'Tahla' },
  { label: 'BouiZazarene Ihaddadene' },
  { label: 'Ain El Aouda' },
  { label: 'Bouarfa' },
  { label: 'Arfoud' },
  { label: 'Demnate' },
  { label: 'Sidi Slimane Echcharraa' },
  { label: 'Zaouiat Cheikh' },
  { label: 'Ain Taoujdate' },
  { label: 'Echemmaia' },
  { label: 'Aourir' },
  { label: 'Sabaa Aiyoun' },
  { label: 'Oulad Ayad' },
  { label: 'Ben Ahmed' },
  { label: 'Tabounte' },
  { label: 'Jorf El Melha' },
  { label: 'Missour' },
  { label: 'Laattaouia' },
  { label: 'Er-Rich' },
  { label: 'Segangan' },
  { label: 'Rissani' },
  { label: 'Sidi Taibi' },
  { label: 'Sidi Ifni' },
  { label: 'Ait Ourir' },
  { label: 'Ahfir' },
  { label: 'El Ksiba' },
  { label: 'El Gara' },
  { label: 'Drarga' },
  { label: 'Imintanoute' },
  { label: 'Goulmima' },
  { label: 'Karia Ba Mohamed' },
  { label: 'Mehdya' },
  { label: 'El Borouj' },
  { label: 'Bouhdila' },
  { label: 'Chichaoua' },
  { label: 'Bni Bouayach' },
  { label: 'Oulad Berhil' },
  { label: 'Jmaat Shaim' },
  { label: 'Bir Jdid' },
  { label: 'Tata' },
  { label: 'Boujniba' },
  { label: 'Temsia' },
  { label: 'Mediouna' },
  { label: 'Kalaat M Gouna' },
  { label: 'Sebt Gzoula' },
  { label: 'Outat El Haj' },
  { label: 'Imouzzer Kandar' },
  { label: 'Ain Bni Mathar' },
  { label: 'Bouskoura' },
  { label: 'Agourai' },
  { label: 'Midar' },
  { label: 'Lalla Mimouna' },
  { label: 'Ribat El Kheir' },
  { label: 'Moulay Driss Zerhoun' },
  { label: 'Figuig' },
  { label: 'Boumia' },
  { label: 'Tamallalt' },
  { label: 'Nouaceur' },
  { label: 'Rommani' },
  { label: 'Jorf' },
  { label: 'Ifran' },
  { label: 'Bouizakarn' },
  { label: 'Oulad Mbarek' },
  { label: 'Afourar' },
  { label: 'Zmamra' },
  { label: 'Ait Ishaq' },
  { label: 'Tit Mellil' },
  { label: 'Assa' },
  { label: 'Bhalil' },
  { label: 'Targuist' },
  { label: 'Beni Yakhlef' },
  { label: 'El Menzel' },
  { label: 'Aguelmous' },
  { label: 'Sid LMokhtar' },
  { label: 'Boumalne Dades' },
  { label: 'Farkhana' },
  { label: 'Oulad Abbou' },
  { label: 'Amizmiz' },
  { label: 'Boulanouare' },
  { label: 'Ben Taieb' },
  { label: 'Ouled Frej' },
  { label: 'Driouch' },
  { label: 'Deroua' },
  { label: 'Hattane' },
  { label: 'El Marsa' },
  { label: 'Tamanar' },
  { label: 'Ait Iaaza' },
  { label: 'Sidi Allal El Bahraoui' },
  { label: 'Dar Ould Zidouh' },
  { label: 'Sid Zouine' },
  { label: 'Boudnib' },
  { label: 'Foum Zguid' },
  { label: 'Tissa' },
  { label: 'Jaadar' },
  { label: 'Oulmes' },
  { label: 'Bouknadel' },
  { label: 'Harhoura' },
  { label: 'El Guerdan' },
  { label: 'Selouane' },
  { label: 'Maaziz' },
  { label: 'Oulad MRah' },
  { label: 'Loudaya' },
  { label: 'Massa' },
  { label: 'Aklim' },
  { label: 'Ouaouizert' },
  { label: 'Bni Drar' },
  { label: 'El Kbab' },
  { label: 'Oued Amlil' },
  { label: 'Sidi Rahel Chatai' },
  { label: 'Guigou' },
  { label: 'Agdz' },
  { label: 'Khnichet' },
  { label: 'Karia' },
  { label: 'Sidi Ahmed' },
  { label: 'Zag' },
  { label: 'Oulad Yaich' },
  { label: 'Tinjdad' },
  { label: 'Ouad Laou' },
  { label: 'Tighassaline' },
  { label: 'Tounfit' },
  { label: 'Bni Tadjite' },
  { label: 'Bouanane' },
  { label: 'Oulad Hriz Sahel' },
  { label: 'Talsint' },
  { label: 'Taghjijt' },
  { label: 'Boulemane' },
  { label: 'Zirara' },
  { label: 'Taouima' },
  { label: 'Tahannaout' },
  { label: 'Bradia' },
  { label: 'Moulay Abdallah' },
  { label: 'Sidi Rahal' },
  { label: 'Tameslouht' },
  { label: 'Aghbala' },
  { label: 'El Ouatia' },
  { label: 'Tendrara' },
  { label: 'Taznakht' },
  { label: 'Fam El Hisn' },
  { label: 'Akka' },
  { label: 'Dar Gueddari' },
  { label: 'Itzer' },
  { label: 'Taliouine' },
  { label: 'Oualidia' },
  { label: 'Aoulouz' },
  { label: 'Moulay Bousselham' },
  { label: 'Tarfaya' },
  { label: 'Ghafsai' },
  { label: 'Foum Jamaa' },
  { label: 'Ain Leuh' },
  { label: 'Moulay Bouazza' },
  { label: 'Kariat Arkmane' },
  { label: 'Kehf Nsour' },
  { label: 'Sidi Bou Othmane' },
  { label: 'Oulad Tayeb' },
  { label: 'Had Kourt' },
  { label: 'Bab Berrad' },
  { label: 'Loulad' },
  { label: 'Zaida' },
  { label: 'Tafrawt' },
  { label: 'Khemis Sahel' },
  { label: 'Ait Baha' },
  { label: 'Biougra' },
  { label: 'Dar Bni Karrich' },
  { label: 'El Hanchane' },
  { label: 'Sidi Jaber' },
  { label: 'Irherm' },
  { label: 'Debdou' },
  { label: 'Ras Kebdana' },
  { label: 'Laaounate' },
  { label: 'Hadj Kaddour' },
  { label: 'Skhour Rhamna' },
  { label: 'Bzou' },
  { label: 'Ain Cheggag' },
  { label: 'Bouderbala' },
  { label: 'Sidi Smail' },
  { label: 'Oulad Zbair' },
  { label: 'Bni Chiker' },
  { label: 'Lakhsas' },
  { label: 'Talmest' },
  { label: 'Aknoul' },
  { label: 'Tiztoutine' },
  { label: 'Bab Taza' },
  { label: 'Imouzzer Marmoucha' },
  { label: 'Gourrama' },
  { label: 'Ajdir' },
  { label: 'Mhaya' },
  { label: 'Oulad Ghadbane' },
  { label: 'Zrarda' },
  { label: 'Zoumi' },
  { label: 'Ain Karma' },
  { label: 'Thar Essouk' },
  { label: 'Lagouira' },
  { label: 'Ras El Ain' },
  { label: 'Sidi Ali Ben Hamdouche' },
  { label: 'Sebt Jahjouh' },
  { label: 'Tiddas' },
  { label: 'Zaouiat Bougrin' },
  { label: 'Tafersit' },
  { label: 'Touissit' },
  { label: 'Saidia' },
  { label: 'Lalla Takerkoust' },
  { label: 'Skhinate' },
  { label: 'Moulay Brahim' },
  { label: 'Soualem' },
  { label: 'Gueznaia' },
  { label: 'Moulay Yacoub' },
  { label: 'Sidi Allal Tazi' },
  { label: 'Laakarta' },
  { label: 'Alnif' },
  { label: 'Dar El Kebdani' },
  { label: 'Jebha' },
  { label: 'Ain Erreggada' },
  { label: 'Sidi Addi' },
  { label: 'Skoura' },
  { label: 'Smimou' },
  { label: 'Ain Jemaa' },
  { label: 'Timahdite' },
  { label: 'Ait Daoud' },
  { label: 'Souk El Had' },
  { label: 'Had Bouhssoussen' },
  { label: 'Oulad Said' },
  { label: 'Arbaoua' },
  { label: 'Ain Dorij' },
  { label: 'Madagh' },
  { label: 'Tighza' },
  { label: 'Matmata' },
  { label: 'Kerouna' },
  { label: 'Kassita' },
  { label: 'Bni Hadifa' },
  { label: 'Oued El Heimar' },
  { label: 'Kerrouchen' },
  { label: 'Tainaste' },
  { label: 'Guisser' },
  { label: 'Sidi Boubker' },
  { label: 'Tamassint' },
  { label: 'Assahrij' },
  { label: 'Aghbalou Nssardane' },
  { label: 'Tizi Ouasli' },
  { label: 'Moqrisset' },
  { label: 'Sebt Lamaarif' },
  { label: 'Issaguen' },
  { label: 'Bouguedra' },
  { label: 'Brikcha' },
  { label: 'Ighoud' },
  { label: 'Ajdir, Taza' },
  { label: 'Oulad Amrane' },
  { label: 'Kettara' },
  { label: 'Aoufous' },
  { label: 'Tafetachte' },
  { label: 'Naima' },
  { label: 'Tnin Sidi Lyamani' },
  { label: 'Karia' },
  { label: 'NZalat Bni Amar' },
  { label: 'Ahrara' },
  { label: 'Sidi Abdallah Ghiat' },
  { label: 'Sidi Bouzid' },
  { label: 'Ounagha' }



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