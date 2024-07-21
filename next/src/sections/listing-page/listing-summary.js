import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Markdown from 'src/components/markdown';
import Iconify from 'src/components/iconify';

import ContactMap from 'src/components/map';


const locationMap = [
  {
    address: 'marrakech',
    phoneNumber: 666666666,
    email: 'aa@gmail.com',
    latlng: [33, 65],
  },
];


export default function ListingSummary({ specifications, description, category }) {
  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h5">Specifications</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {specifications && renderSpecificationsByCategory(category, specifications)}
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={2}>
        <Typography variant="h5">Description</Typography>
        <Markdown content={description} />
      </Stack>


      <Stack spacing={3}>
        <Typography variant="h5">Location</Typography>

        <ContactMap offices={locationMap} sx={{ borderRadius: 2 }} />
      </Stack>


    </Stack>
  );
}

ListingSummary.propTypes = {
  specifications: PropTypes.object.isRequired, // Assuming specifications is an object with key-value pairs
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

function renderSpecificationsByCategory(category, specifications) {

  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;


  switch (category) {
    case 'billiards':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/billiards/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'activities':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/activities/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'apartments':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/apartments/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'audios':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/audios/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'boats':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/boats/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'boxings':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/boxings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'bureauxs':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/bureauxs/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'cameras':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/cameras/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'camions':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/camions/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'caravans':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/caravans/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'cars':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/cars/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'chargers':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/chargers/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'clothes':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/clothes/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'divings':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/divings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'drones':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/drones/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'eclairages':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/eclairages/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'electricaltools':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/electricaltools/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'engins':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/engins/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'footballs':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/footballs/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'furnitures':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/furnitures/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'gamings':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/gamings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'golfs':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/golfs/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'houseappliances':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/houseappliances/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'huntings':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/huntings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'jewelrys':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/jewelrys/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'ladders':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/ladders/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'laptops':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/laptops/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'lightings':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/lightings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'livres':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/livres/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'magasins':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/magasins/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'maisons':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/maisons/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'mechanicaltools':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/mechanicaltools/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'mobiliers':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/mobiliers/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'motos':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/motos/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'musculations':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/musculations/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'musicals':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/musicals/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'photographies':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/photographies/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'powertools':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/powertools/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'pressurewashers':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/pressurewashers/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'printers':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/printers/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'riads':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/riads/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'routers':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/routers/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'scooters':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/scooters/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'services':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/services/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'sonorisations':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/sonorisations/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'surfs':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/surfs/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'tablettes':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/tablettes/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'taxiaeroports':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/taxiaeroports/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'tennis':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/tennis/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'tentes':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/tentes/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'terrains':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/terrains/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'transportations':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/transportations/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'velos':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/velos/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'villas':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/villas/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

      default:
        return null; // Ensure a return value in the default case
  }
}

function formatLabel(label) {
  return label.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function OverviewItem({ icon, label, text = '-' }) {


  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">

        <img src={icon} alt={label} width={50} height={50} />

      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
