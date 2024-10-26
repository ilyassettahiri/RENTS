/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Analytics application components
import SocialItem from "admin/analytics/components/SocialItem";

function Social() {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6">Social</SoftTypography>
        <Tooltip title="See how much traffic do you get from social media" placement="bottom">
          <SoftButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </SoftButton>
        </Tooltip>
      </SoftBox>
      <SoftBox p={2}>
        <SocialItem
          icon={{ color: "facebook", component: <FacebookIcon /> }}
          title="Facebook"
          percentage={0}
        />
        <SocialItem
          icon={{ color: "twitter", component: <TwitterIcon /> }}
          title="Facebook"
          percentage={0}
        />
        <SocialItem
          icon={{ color: "reddit", component: <RedditIcon /> }}
          title="Search"
          percentage={0}
        />
        <SocialItem
          icon={{ color: "youtube", component: <YouTubeIcon /> }}
          title="Youtube"
          percentage={0}
        />
        <SocialItem
          icon={{ color: "instagram", component: <InstagramIcon /> }}
          title="Instagram"
          percentage={0}
        />
      </SoftBox>
    </Card>
  );
}

export default Social;
