import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import PostTimeBlock from '../common/post-time-block';

export default function PostItem({ post }) {
  const { attributes } = post;

  return (
    <Stack spacing={2.5}>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${attributes.thumb}`}
        alt={attributes.title}
        ratio="1/1"
        sx={{ borderRadius: 2 }}
      />
      <Stack spacing={1}>
        <PostTimeBlock createdAt={fDate(attributes.created_at)} duration="8 minutes read" />
        <Link component={RouterLink} href={`${paths.travel.post}/${attributes.url}`} color="inherit">
          <TextMaxLine variant="h5" persistent>
            {attributes.title}
          </TextMaxLine>
        </Link>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
        <Avatar src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${attributes.author.picture}`} sx={{ mr: 1 }} />
        {attributes.author.name}
      </Stack>
    </Stack>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author: PropTypes.shape({
        picture: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
