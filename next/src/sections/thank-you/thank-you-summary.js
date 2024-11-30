import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import ProductPriceSample from 'src/sections/store/common/product-price-sample';

import Iconify from 'src/components/iconify';
import ThankYouInfo from './thank-you-info';

// ----------------------------------------------------------------------

// Helper function to calculate the difference in days between two dates
function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  return diffDays;
}

export default function ThankYouSummary({ tour }) {


  const totalDays = calculateDays(tour.attributes.startdate, tour.attributes.enddate);
  const totalPrice = totalDays * tour.attributes.price;


  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >

      <ThankYouInfo tour={tour} />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <LineItem icon="carbon:calendar" label="Departure day" value={fDate(tour.attributes.startdate)}  />

      <LineItem icon="carbon:events" label="Guests" value="2 guest" />

      <Divider sx={{ borderStyle: 'dashed' }} />

      <LineItem icon="carbon:cube" label="Full name" value={tour.attributes.name} />

      <LineItem icon="carbon:calendar" label="Booking days" value={`${totalDays} days`} />

      <LineItem icon="carbon:receipt" label="Total" value={totalPrice} isPrice/>

      <LineItem icon="carbon:purchase" label="Payment method" value="Paypal" />
    </Stack>
  );
}

ThankYouSummary.propTypes = {
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
// ----------------------------------------------------------------------

function LineItem({ icon, label, value, isPrice }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ typography: 'body2', color: 'text.secondary' }}
    >
      <Iconify icon={icon} width={24} sx={{ mr: 1 }} /> {label}
      <Typography
        variant="subtitle2"
        sx={{ color: 'text.primary', flexGrow: 1, textAlign: 'right' }}
      >


                  {isPrice ? (
                    <ProductPriceSample price={value} />
                  ) : (
                    value
                  )}


      </Typography>
    </Stack>
  );
}


LineItem.defaultProps = {
  isPrice: false,

};

LineItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  value: PropTypes.string,
  isPrice: PropTypes.bool,

};
