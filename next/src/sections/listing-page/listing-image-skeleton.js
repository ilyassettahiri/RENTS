import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

export default function ListingImageSkeleton({ ...other }) {
  return (
    <Card {...other}>
      <Box
        sx={{
          gap: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
          mb: { xs: 5, md: 5 },
        }}
      >
        <Skeleton variant="rectangular" sx={{ width: 1, height: 240 }} />

        <Box
          sx={{
            gap: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            position: 'relative',
          }}
        >
          <Skeleton variant="rectangular" sx={{ width: 1, height: 120 }} />
          <Skeleton variant="rectangular" sx={{ width: 1, height: 120 }} />
          <Skeleton variant="rectangular" sx={{ width: 1, height: 120 }} />

          <Box
            sx={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Skeleton variant="rectangular" sx={{ width: 1, height: 120 }} />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
              }}
            >
              <Skeleton variant="text" sx={{ height: 40, width: 60 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
