
import PropTypes from "prop-types";

// @mui material components
import TableCell from "@mui/material/TableCell";

// Soft UI Dashboard PRO React components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';

function SalesTableCell({ title, content, image, noBorder, ...rest }) {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="30%" sx={{ border: noBorder && 0 }}>
        <SoftBox display="flex" alignItems="center" width="max-content">
          <SoftBox component="img" src={`${process.env.REACT_APP_IMAGE_LISTING_SMALL}${image}`}  alt={content} width="1.5rem" height="auto" />{" "}
          <SoftBox display="flex" flexDirection="column" ml={3}>
            <SoftTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}:
            </SoftTypography>
            <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {content}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
        <SoftBox display="flex" flexDirection="column">
          <SoftTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}:
          </SoftTypography>
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {content}
          </SoftTypography>
        </SoftBox>
      </TableCell>
    );
  }

  return template;
}

// settings default values for the props of SalesTableCell
SalesTableCell.defaultProps = {
  image: "",
  noBorder: false,
};

// Typechecking props for the SalesTableCell
SalesTableCell.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool,
};

export default SalesTableCell;
