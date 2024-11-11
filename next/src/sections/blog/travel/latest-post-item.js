import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { paths as getPaths } from 'src/routes/paths';
import { useTranslation } from 'react-i18next';

import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import PostTimeBlock from '../common/post-time-block';

// ----------------------------------------------------------------------

export default function LatestPostItem({ post }) {
  const { attributes } = post;
  const { author } = attributes;

  const { i18n } = useTranslation();
  const paths = getPaths(i18n.language);

  return (
    <Stack spacing={2.5}>
      <Image src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${attributes.thumb}`} alt={attributes.title} ratio="1/1" sx={{ borderRadius: 2 }} />

      <Stack spacing={1}>
        <PostTimeBlock createdAt={fDate(attributes.created_at)} duration="8 minutes read" />

        <Link component={RouterLink} href={`${paths.travel.post}/${attributes.url}`} color="inherit">
          <TextMaxLine variant="h6" persistent>
            {attributes.title}
          </TextMaxLine>
        </Link>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <Avatar src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${author.picture}`} sx={{ width: 32, height: 32 }} />
        <Typography variant="body2">{author.name}</Typography>
      </Stack>
    </Stack>
  );
}

LatestPostItem.propTypes = {
  post: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
