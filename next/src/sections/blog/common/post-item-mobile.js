import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { fDate } from 'src/utils/format-time';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import PostTimeBlock from './post-time-block';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

export default function PostItemMobile({ post, onSiderbar }) {
  const { attributes } = post;
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={attributes.title}
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${attributes.thumb}`}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />
      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit"
          component={RouterLink}
          href={`${paths.travel.post}/${attributes.url}`}

          >
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>
            {attributes.title}
          </TextMaxLine>
        </Link>
        <PostTimeBlock createdAt={fDate(attributes.created_at)} duration="8 minutes read" />
      </Stack>
    </Stack>
  );
}

PostItemMobile.propTypes = {
  onSiderbar: PropTypes.bool,
  post: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string,
      thumb: PropTypes.string,
      created_at: PropTypes.string,
      actor: PropTypes.string,
      actor_thumb: PropTypes.string,
      content: PropTypes.string,
    }),
  }),
};
