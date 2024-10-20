import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import PropTypes from 'prop-types'; // Import PropTypes

import { SearchNotFound } from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export function ChatNavSearchResults({ query, results, onClickResult }) {
  const totalResults = results.length;

  const notFound = !totalResults && !!query;

  const renderNotFound = (
    <SearchNotFound
      query={query}
      sx={{
        p: 3,
        mx: 'auto',
        width: `calc(100% - 40px)`,
        bgcolor: 'background.neutral',
      }}
    />
  );

  const renderResults = (
    <nav>
      <Box component="ul">
        {results.map((result) => (
          <Box key={result.id} component="li" sx={{ display: 'flex' }}>
            <ListItemButton
              onClick={() => onClickResult(result)}
              sx={{ gap: 2, py: 1.5, px: 2.5, typography: 'subtitle2' }}
            >
              <Avatar alt={result.name} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${result.avatarUrl}`}  />
              {result.name}
            </ListItemButton>
          </Box>
        ))}
      </Box>
    </nav>
  );

  return (
    <>
      <Typography variant="h6" sx={{ px: 2.5, mb: 2 }}>
        Contacts ({totalResults})
      </Typography>

      {notFound ? renderNotFound : renderResults}
    </>
  );
}

// Define prop types
ChatNavSearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickResult: PropTypes.func.isRequired,
};
