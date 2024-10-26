

// @mui material components
import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Analytics application components
import PagesHeaderCell from "admin/analytics/components/PagesHeaderCell";
import PagesBodyCell from "admin/analytics/components/PagesBodyCell";

function Pages() {
  const { t } = useTranslation();

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6">Pages</SoftTypography>
        <Tooltip title="Data is based from sessions and is 100% accurate" placement="left">
          <SoftButton variant="outlined" color="success" size="small" circular iconOnly>
            <Icon sx={{ fontWeight: "bold" }}>done</Icon>
          </SoftButton>
        </Tooltip>
      </SoftBox>
      <SoftBox py={1} px={2}>
        <TableContainer sx={{ boxShadow: "none" }}>
          <Table>
            <SoftBox component="thead">
              <TableRow>
                <PagesHeaderCell>page</PagesHeaderCell>
                <PagesHeaderCell>pages view</PagesHeaderCell>
                <PagesHeaderCell>avg. time</PagesHeaderCell>
                
              </TableRow>
            </SoftBox>
            <TableBody>
              <PagesBodyCell rows={["1. /", 0, "00:00"]} />
              <PagesBodyCell rows={["2. /", 0, "00:00"]} />
              <PagesBodyCell rows={["3. /", 0, "00:00"]} />
              <PagesBodyCell rows={["4. /", "0", "00:00"]} />
              <PagesBodyCell rows={["5. /", "0", "00:00"]} />
              <PagesBodyCell
                rows={["6. /", "0", "00:00"]}
              />
              <PagesBodyCell
                rows={["7. /", "0", "00:00"]}
                noBorder
              />
            </TableBody>
          </Table>
        </TableContainer>
      </SoftBox>
    </Card>
  );
}

export default Pages;
