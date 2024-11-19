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


const offices = [
  {
    name: 'Rents.ma',
    address: 'Centre Villa , Casablanca , Morocco 45000',
    latlng: [33.5731, -7.5898], // Latitude and longitude for Casablanca, Morocco
  },
];


export default function ContactInfo() {
  return (
    <Container  maxWidth={false}
      sx={{
        pt: { xs: 5, md: 5 },
        pb: { xs: 10, md: 15 },
                paddingLeft: { lg: '50px' },
        paddingRight: { lg: '50px' },
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

              <Link color="inherit" variant="body2" href="mailto:hello@example.com">
                hello@example.com
              </Link>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:mobile" width={24} sx={{ mr: 1 }} /> Phone
              </Stack>

              <Typography variant="body2">(907) 555-0101</Typography>
            </Stack>

            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
                <Iconify icon="carbon:location" width={24} sx={{ mr: 1 }} /> Address
              </Stack>

              <Typography variant="body2">
                3891 Ranchview Dr. Richardson, California 62639
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
