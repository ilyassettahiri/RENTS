
import PropTypes from "prop-types";

// @mui material components
import TableCell from "@mui/material/TableCell";

// Soft UI Dashboard PRO React components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import  Image  from 'components/image';


function SalesTableCell({ title, content, image, noBorder, ...rest }) {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="60%" sx={{ border: noBorder && 0 }}>
        




        <SoftBox display="flex" alignItems="center">
      
          <SoftBox mx={2} width="2.5rem" >
            <Image
              src={`${process.env.REACT_APP_IMAGE_LISTING_SMALL}${image}`}
             
              ratio="1/1"
              width="100%"
              sx={{ borderRadius: '6px' }}
              
            />
          </SoftBox>
          <SoftTypography variant="button" fontWeight="medium" 
              sx={{
                whiteSpace: 'nowrap',      // Keep text on one line
                overflow: 'hidden',        // Hide overflow
                textOverflow: 'ellipsis',  // Add "..." when text overflows
                maxWidth: '200px',         // Set a max width to control where the ellipsis appears (adjust as needed)
              }}
          >
          {content}
          </SoftTypography>
        </SoftBox>


        
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
        <SoftBox display="flex" flexDirection="column">
          
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
