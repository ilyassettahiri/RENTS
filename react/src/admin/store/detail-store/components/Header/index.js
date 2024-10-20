
// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

// Image
const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic path for the image
const team1 = `${imagePath}/team-1.jpg`;

export {
  team1
};
 
 
 
 

function Header() {
  const { t } = useTranslation();

  const avatarStyles = {
    border: ({ borders: { borderWidth }, palette: { white } }) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: "pointer",
    position: "relative",
    ml: -1.5,

    "&:hover, &:focus": {
      zIndex: "10",
    },
  };

  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mt={0.5} pr={1}>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            Team members:
          </SoftTypography>
        </SoftBox>
        <SoftBox display="flex">
          <Tooltip title="Jessica Rowland" placement="top">
            <SoftAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Audrey Love" placement="top">
            <SoftAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Michael Lewis" placement="top">
            <SoftAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Lucia Linda" placement="top">
            <SoftAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
          <Tooltip title="Ronald Miller" placement="top">
            <SoftAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          </Tooltip>
        </SoftBox>
      </SoftBox>
      <SoftBox height="75%" alignSelf="flex-end">
        <Divider orientation="vertical" />
      </SoftBox>
      <SoftBox pl={1}>
        <SoftButton variant="outlined" color="dark" iconOnly>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}

export default Header;
