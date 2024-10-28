import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Markdown from 'src/components/markdown';
import Iconify from 'src/components/iconify';





export default function ListingSummary({ specifications, description, category }) {


  const { t } = useTranslation();

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h5"> {t('Specifications')}</Typography>
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

        <Markdown content={description} />
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
    case 'billiard':
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

    case 'audio':
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

    case 'boxing':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/boxings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'offices':
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

    case 'trucks':
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

    case 'diving':
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

    case 'eclairage':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/eclairages/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'electrical-tools':
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

    case 'football':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/footballs/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'furniture':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/furnitures/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'gaming':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/gamings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'golf':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/golfs/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'home-appliances':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/houseappliances/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'hunting':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/huntings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'jewelry':
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

    case 'lighting':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/lightings/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'books':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/livres/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'shops':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/magasins/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'houses':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/maisons/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'mechanical-tools':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/mechanicaltools/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'mobilier':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/mobiliers/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'motorcycles':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/motos/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'gym':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/musculations/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'musical':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/musicals/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'photography':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/photographies/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'power-tools':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/powertools/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'pressure-washers':
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


    case 'jobs':
        return Object.entries(specifications).map(([key, value]) => (
          <OverviewItem
            key={key}
            icon={`${imageBaseUrl}/categoryicons/jobs/${key}.svg`}
            label={formatLabel(key)}
            text={value}
          />
        ));

    case 'sound-systems':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/sonorisations/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'surf':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/surfs/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'tablets':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/tablettes/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'airport-taxis':
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

    case 'tents':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/tentes/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'lands':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/terrains/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'transportation':
      return Object.entries(specifications).map(([key, value]) => (
        <OverviewItem
          key={key}
          icon={`${imageBaseUrl}/categoryicons/transportations/${key}.svg`}
          label={formatLabel(key)}
          text={value}
        />
      ));

    case 'bicycles':
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

  const { t } = useTranslation();


  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">

        <img src={icon} alt={label} width={50} height={50} />

      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t(label)}
        </Typography>
        <Typography>{t(text)} </Typography>
      </Stack>
    </Stack>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
