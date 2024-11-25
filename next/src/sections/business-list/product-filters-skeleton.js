import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function ProductFiltersSkeleton() {
  return (
    <Box
      sx={{
        width: 280, // Fixed width to match the ProductFilters component
        flexShrink: 0,
        display: { xs: 'none', md: 'block' }
      }}
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        {/* Placeholder for Ratings */}
        <Skeleton variant="text" sx={{ height: 24, width: '60%' }} />
        <Skeleton variant="rectangular" sx={{ height: 40, width: '100%' }} />

        {/* Placeholder for Genders */}
        <Skeleton variant="text" sx={{ height: 24, width: '60%' }} />
        <Skeleton variant="rectangular" sx={{ height: 40, width: '100%' }} />

        {/* Placeholder for Categories */}
        <Skeleton variant="text" sx={{ height: 24, width: '60%' }} />
        <Skeleton variant="rectangular" sx={{ height: 40, width: '100%' }} />
      </Stack>
    </Box>
  );
}

export default ProductFiltersSkeleton;
