import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import { varHover, varTranHover } from 'src/components/animate';

export default function TrendingTopicItem({ topic }) {
  const theme = useTheme();

  return (
    <Box
      component={m.div}
      whileHover="hover"
      variants={varHover(1)}
      transition={varTranHover()}
      sx={{ px: 1.5, cursor: 'pointer' }}
    >
      <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
        <Stack
          spacing={0.5}
          sx={{
            py: 3,
            width: 1,
            zIndex: 9,
            bottom: 0,
            textAlign: 'center',
            position: 'absolute',
            color: 'common.white',
          }}
        >
          <m.div variants={varHover(1.05)} transition={varTranHover()}>
            <Typography variant="h6">{topic.name}</Typography>
          </m.div>

          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {topic.article_count} posts
          </Typography>
        </Stack>

        <m.div variants={varHover(1.25)} transition={varTranHover()}>
          <Image
            alt={topic.name}

            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${topic.thumb}`}
            ratio="4/3"
            overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${
              theme.palette.common.black
            } 75%)`}
          />
        </m.div>
      </Box>
    </Box>
  );
}

TrendingTopicItem.propTypes = {
  topic: PropTypes.shape({
    name: PropTypes.string,
    thumb: PropTypes.string,
    article_count: PropTypes.number,
  }),
};
