import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import ContactMap from 'src/components/map';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const offices = {
  name: "Rents.ma",
  attributes: {
    address: "Centre Ville",
    city: "Casablanca",
    zip: "45000",
    country: "Morocco"
  }
};



export default function ContactInfo() {
  return (
    <Container  maxWidth={false}
      sx={{
        pt: { xs: 5, md: 5 },
        pb: { xs: 10, md: 15 },
                paddingLeft: { lg: '100px' },
        paddingRight: { lg: '100px' },
      }}
    >
      <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
        <Grid xs={12} md={6} lg={4}>
          <Typography
            variant="h2"
            sx={{
              mb: 5,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Get In Touch
          </Typography>

          <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:email" width={24} sx={{ mr: 1 }} /> Email
              </Stack>

              <Link color="inherit" variant="body2" href="mailto:contact@rents.ma">
                contact@rents.ma
              </Link>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:mobile" width={24} sx={{ mr: 1 }} /> Phone
              </Stack>

              <Typography variant="body2">+212 623228392</Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:location" width={24} sx={{ mr: 1 }} /> Address
              </Stack>

              <Typography variant="body2">
                City centre, Casablanca 45000
              </Typography>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed', width: 1 }} />

            <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Typography variant="overline">Follow Us</Typography>
              <Stack direction="row">
                  <IconButton color="primary">
                    <Iconify icon="mdi:facebook" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:instagram" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:tiktok" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:twitter" />
                  </IconButton>
                  <IconButton color="primary">
                    <Iconify icon="mdi:linkedin" />
                  </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} md={6} lg={7}>
          <ContactMap offices={offices} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    </Container>
  );
}
