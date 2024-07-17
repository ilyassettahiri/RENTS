import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import TextMaxLine from 'src/components/text-max-line';

// Function to extract the first <p> paragraph from the content and add "see more" if it exceeds 255 characters
const getFirstParagraph = (content) => {
  const match = content.match(/<p>.*?<\/p>/);
  const firstParagraph = match ? match[0] : content;
  if (firstParagraph.length > 100) {
    return firstParagraph.substring(0, 100) + '...';
  }
  return firstParagraph;
};

// ----------------------------------------------------------------------

export default function LandingPostItem({ post }) {
  return (
    <div>
      <Typography variant="caption" sx={{ color: 'primary.main' }}>
        {fDate(post.attributes.created_at)}
      </Typography>

      <Link component={RouterLink} href={`${paths.travel.post}/${post.attributes.url}`} sx={{ color: 'common.white' }}>
        <TextMaxLine variant="h5" sx={{ mt: 1, mb: 2 }}>
          {post.attributes.title}
        </TextMaxLine>
      </Link>

      <Typography
        variant="body2"
        sx={{ color: 'text.secondary' }}
        dangerouslySetInnerHTML={{ __html: getFirstParagraph(post.attributes.content) }}
      />

      <Divider sx={{ borderStyle: 'dashed', mt: 3 }} />
    </div>
  );
}

LandingPostItem.propTypes = {
  post: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      created_at: PropTypes.string,
      url: PropTypes.string, // Ensure the url attribute is included
    }).isRequired,
  }).isRequired,
};
