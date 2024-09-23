import PropTypes from 'prop-types';
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

function BillingInformation({ billing }) {
  const { t } = useTranslation();

  return (
    <>
      <SoftTypography variant="h6" fontWeight="medium">
        {t('Billing Information')}
      </SoftTypography>
      <SoftBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}
        mt={2}
      >
        <SoftBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
          <SoftBox mb={2}>
            <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {billing.name || t('No Name Available')}
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
            <SoftTypography variant="caption" color="text">
              {t('Email Address')}:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium">
                {billing.email || t('No Email Available')}
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
            <SoftTypography variant="caption" color="text">
              {t('Phone')}:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium">
                {billing.phone || t('No Phone Available')}
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
            <SoftTypography variant="caption" color="text">
              {t('Address')}:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium">
                {billing.address || t('No Address Available')}
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftTypography variant="caption" color="text">
            {t('City')}:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {billing.city || t('No City Available')}
            </SoftTypography>
          </SoftTypography>
          <SoftTypography variant="caption" color="text">
            {t('Country')}:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {billing.country || t('No Country Available')}
            </SoftTypography>
          </SoftTypography>
          <SoftTypography variant="caption" color="text">
            {t('Zip Code')}:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {billing.zip || t('No Zip Available')}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </>
  );
}

BillingInformation.propTypes = {
  billing: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    zip: PropTypes.string,
  }).isRequired,
};

export default BillingInformation;
