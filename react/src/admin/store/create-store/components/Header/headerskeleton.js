import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import Skeleton from "@mui/material/Skeleton";

function Headerskeleton() {
  return (
    <SoftBox position="relative">
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        height="24rem"
        borderRadius="xl"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </SoftBox>

      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -5,
          mx: 3,
          pt: 1,
          px: 1,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <SoftBox position="relative" display="inline-block">
              <Skeleton variant="circular" width={70} height={70} />
            </SoftBox>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Headerskeleton;
