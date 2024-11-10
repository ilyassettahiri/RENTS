import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { paths as getPaths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// Function to extract the first <p> paragraph from the content and add "see more" if it exceeds 255 characters
const getFirstParagraph = (content) => {
  const match = content.match(/<p>.*?<\/p>/);
  const firstParagraph = match ? match[0] : content;
  if (firstParagraph.length > 100) {
    return `${firstParagraph.substring(0, 100)}...`;
  }
  return firstParagraph;
};

// ----------------------------------------------------------------------

export default function LandingPostItemCarousel({ post }) {
  const theme = useTheme();

  const { locale } = useRouter(); // Get the current language
  const paths = getPaths(locale);

  return (
    <Stack sx={{ position: 'relative' }}>
      <Stack
        sx={{
          width: 1,
          height: 1,
          zIndex: 9,
          textAlign: 'center',
          position: 'absolute',
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
          <Typography variant="body2" sx={{ color: 'primary.main' }}>
            {fDate(post.attributes.created_at)}
          </Typography>

          <Typography variant="h3" sx={{ mt: 1, mb: 5 }}>
            {post.attributes.title}
          </Typography>

          <Typography
            sx={{ opacity: 0.72, mb: 10 }}
            dangerouslySetInnerHTML={{ __html: getFirstParagraph(post.attributes.content) }}
          />

          <Fab component={RouterLink} href={`${paths.travel.post}/${post.attributes.url}`}>
            <Iconify icon="carbon:chevron-right" />
          </Fab>
        </Box>
      </Stack>

      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${post.attributes.thumb}`}
        alt={post.attributes.title}
        overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${theme.palette.common.black} 75%)`}
        sx={{
          width: 1,
          height: { xs: 720, md: 960 },
        }}
      />
    </Stack>
  );
}

LandingPostItemCarousel.propTypes = {
  post: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired, // Ensure the url attribute is included
    }).isRequired,
  }).isRequired,
};
