import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

function OrderSummary({ summary }) {
  const { t } = useTranslation();

  // Calculate the number of reservation days
  const reservationStartDate = summary.reservationstart ? new Date(summary.reservationstart) : null;
  const reservationEndDate = summary.reservationsend ? new Date(summary.reservationsend) : null;
  
  const numberOfDays = reservationStartDate && reservationEndDate 
    ? Math.ceil((reservationEndDate - reservationStartDate) / (1000 * 60 * 60 * 24)) 
    : 0;

  // Price calculations
  const productPrice = summary.price ? parseFloat(summary.price) : 0;
  const vatAmount = (productPrice * 0.2).toFixed(2); // 20% VAT
  const totalPrice = (productPrice + parseFloat(vatAmount)).toFixed(2);

  return (
    <>
      <SoftBox mb={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          {t('Order Summary')}
        </SoftTypography>
      </SoftBox>

      

      <SoftBox display="flex" justifyContent="space-between" mb={0.5}>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          {t('Price per Day')}:
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body2" fontWeight="medium">
            {summary.price ? `$${productPrice.toFixed(2)}` : t('No Price Available')}
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <SoftBox display="flex" justifyContent="space-between" mb={0.5}>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          {t('Number of Days')}:
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body2" fontWeight="medium" color="info">
            {numberOfDays || t('No Reservation Dates Available')}
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <SoftBox display="flex" justifyContent="space-between" mb={0.5}>
        <SoftTypography variant="button" fontWeight="regular" color="text">
          {t('VAT (20%')}) :
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body2" fontWeight="medium">
            ${vatAmount}
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <SoftBox display="flex" justifyContent="space-between" mt={3}>
        <SoftTypography variant="body1" fontWeight="light" color="text">
          {t('Total')}:
        </SoftTypography>
        <SoftBox ml={1}>
          <SoftTypography variant="body1" fontWeight="medium" color="info">
            ${totalPrice}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </>
  );
}

OrderSummary.propTypes = {
  summary: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.string,
    status: PropTypes.string,
    reservationstart: PropTypes.string,
    reservationsend: PropTypes.string,
  }).isRequired,
};

export default OrderSummary;
