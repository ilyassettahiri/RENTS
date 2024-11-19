
'use client';

import { useState, useEffect, useMemo } from "react";
import CrudService from "src/services/cruds-service";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';

import PostSidebar from './common/post-sidebar';
import Posts from './travel/posts';
import PostSearchMobile from './common/post-search-mobile';
import FeaturedPosts from './travel/featured-posts';
import TrendingTopics from './travel/trending-topics';

export default function BlogView() {


  const { data: blogData, isLoading, error: blogError } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => CrudService.getBlogs(),
    onError: (error) => {
      console.error('Failed to fetch data:', error);
    },
  });

  const articles = useMemo(() => blogData?.data?.articles || [], [blogData]);
  const blogCategories = useMemo(() => blogData?.data?.blogcategories || [], [blogData]);


  const extractUniqueTags = (posts) => {
    const tags = posts.flatMap(post => post.attributes.tag);
    return [...new Set(tags)];
  };



  return (
    <>
      <PostSearchMobile />

      <FeaturedPosts posts={articles.slice(-5)} Loading={isLoading} />

      <TrendingTopics blogcategories={blogCategories} />

      <Container maxWidth={false}
        sx={{
          mt: { xs: 4, md: 10 },
          paddingLeft: { lg: '50px' },
          paddingRight: { lg: '50px' },
        }}
      >
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12} md={8}>
            <Posts posts={articles} Loading={isLoading} />
          </Grid>

          <Grid xs={12} md={4}>
            {articles && (
              <PostSidebar
                popularTags={extractUniqueTags(articles)}
                categories={blogCategories.map(category => ({
                  label: category.attributes.name.trim(),
                  path: `/category/${category.attributes.name.trim().toLowerCase()}`,
                }))}
                recentPosts={{ list: articles.slice(-4) }}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
