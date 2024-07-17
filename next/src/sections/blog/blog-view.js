
'use client';

import { useState, useEffect } from "react";
import CrudService from "src/services/cruds-service";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import PostSidebar from './common/post-sidebar';
import Posts from './travel/posts';
import PostSearchMobile from './common/post-search-mobile';
import FeaturedPosts from './travel/featured-posts';
import TrendingTopics from './travel/trending-topics';

export default function BlogView() {
  const [articles, setArticles] = useState(null);
  const [blogCategories, setBlogCategories] = useState([]);



  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getBlogs();

        const blogCategoriesData = response.data.blogcategories;

        setArticles(response.data.articles);
        setBlogCategories(blogCategoriesData);


        console.log('Blog categories:', blogCategoriesData); // Logging the blog categories

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    })();
  }, []);


  const extractUniqueTags = (posts) => {
    const tags = posts.flatMap(post => post.attributes.tag);
    return [...new Set(tags)];
  };



  return (
    <>
      <PostSearchMobile />

      {articles && <FeaturedPosts posts={articles.slice(-5)} />}

      <TrendingTopics blogcategories={blogCategories} />

      <Container maxWidth={false}
        sx={{
          mt: { xs: 4, md: 10 },
          paddingLeft: { lg: '100px' },
          paddingRight: { lg: '100px' },
        }}
      >
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12} md={8}>
            {articles && <Posts posts={articles} />}
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
