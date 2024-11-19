'use client';


import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useContext, useState, useMemo } from "react";

import Markdown from 'src/components/markdown';
import { alpha, useTheme } from '@mui/material/styles';
import { paths as getPaths } from 'src/routes/paths';
import { useTranslation } from 'react-i18next';

import { RouterLink } from 'src/routes/components';
import { fDate } from 'src/utils/format-time';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import PostTimeBlock from '../common/post-time-block';

export default function FeaturedPostItem({ post, largePost }) {
  const theme = useTheme();
  const { attributes } = post;

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);

  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${attributes.thumb}`}
        alt={attributes.title}
        ratio="1/1"
        overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${
          theme.palette.common.black
        } 75%)`}
      />
      <Stack
        spacing={1}
        sx={{
          p: 3,
          bottom: 0,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          ...(largePost && {
            p: { xs: 3, md: 5 },
          }),
        }}
      >
        <PostTimeBlock
          createdAt={fDate(attributes.created_at)}
          duration="8 minutes read"
          sx={{ color: 'inherit', opacity: 0.72 }}
        />
        <Link
          component={RouterLink}
          href={`${paths.travel.post}/${attributes.url}`}
          color="inherit"
        >
          <TextMaxLine
            sx={{
              typography: 'h6',
              ...(largePost && {
                typography: { xs: 'h6', md: 'h4' },
              }),
            }}
          >
            {attributes.title}
          </TextMaxLine>
        </Link>
        {largePost && <TextMaxLine sx={{ opacity: 0.48 }}>


        <Markdown content={attributes.content}  />





          </TextMaxLine>}
        <Stack direction="row" alignItems="center" sx={{ typography: 'body2', pt: 1.5 }}>
          <Avatar
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${attributes.author.picture}`}
            sx={{
              mr: 1,
              width: 32,
              height: 32,
              ...(largePost && {
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
              }),
            }}
          />
          {attributes.author.name}
        </Stack>
      </Stack>
    </Box>
  );
}

FeaturedPostItem.propTypes = {
  largePost: PropTypes.bool,
  post: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      content: PropTypes.string,
      author: PropTypes.shape({
        picture: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
