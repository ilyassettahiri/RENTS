import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';

// ----------------------------------------------------------------------

const StyledButtonSkeleton = styled((props) => (
  <CardActionArea sx={{ borderRadius: 1 }}>
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));

// ----------------------------------------------------------------------

export default function FaqGeneraleSkeleton() {
  return (
    <>
      {/* Mobile menu toggle skeleton */}
      <Stack
        alignItems="flex-end"
        sx={{
          py: 1.5,
          px: 2.5,
          display: { md: 'none' },
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Skeleton variant="circular">
          <IconButton>
            <Skeleton variant="circular" width={24} height={24} />
          </IconButton>
        </Skeleton>
      </Stack>

      {/* Hero and main content skeleton */}
      <Container>
        <Typography variant="h3" sx={{ py: { xs: 3, md: 10 } }}>
          <Skeleton width={300} />
        </Typography>

        <Stack direction="row" sx={{ pb: { xs: 10, md: 15 } }}>
          {/* Navigation skeleton */}
          <Drawer
            variant="permanent"
            PaperProps={{
              sx: {
                width: 280,
                position: 'unset',
                bgcolor: 'background.default',
              },
            }}
          >
            <Skeleton variant="rectangular" width={280} height={56} />
            <Tabs orientation="vertical">
              {[...Array(5)].map((_, index) => (
                <Tab
                  key={index}
                  label={<Skeleton width={100} />}
                  icon={<Skeleton variant="circular" width={28} height={28} />}
                />
              ))}
            </Tabs>
          </Drawer>

          {/* Content skeleton */}
          <Box sx={{ pl: { md: 10 }, flexGrow: 1 }}>
            {[...Array(3)].map((_, index) => (
              <Accordion key={index}>
                <AccordionSummary>
                  <Skeleton width="100%" height={40} />
                </AccordionSummary>
                <AccordionDetails>
                  <Skeleton width="100%" height={30} />
                  <Skeleton width="100%" height={30} />
                  <Skeleton width="80%" height={30} />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Stack>
      </Container>
    </>
  );
}
