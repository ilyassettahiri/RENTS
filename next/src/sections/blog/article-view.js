'use client';
import { useState, useEffect } from "react";
import CrudService from "src/services/cruds-service";

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostTags from './common/post-tags';
import PostAuthor from './common/post-author';
import PostSidebar from './common/post-sidebar';
import PostHero from './travel/post-hero';
import PostSocialsShare from './common/post-socials-share';
import LatestPosts from './travel/latest-posts';

export default function ArticleView({ params }) {
  const { url } = params;

  const [data, setData] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getArticle(url);
        const articleData = response.data.article;
        const recentArticlesData = response.data.recentarticles;
        const blogCategoriesData = response.data.blogcategories;

        // Insert images into the content
        if (articleData.attributes.content && articleData.attributes.images) {
          let contentWithImages = articleData.attributes.content;
          articleData.attributes.images.forEach((image, index) => {
            const imgTag = `<img src="${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image.url}" alt="${image.caption}" />`;
            contentWithImages = contentWithImages.replace(`<!-- img ${index + 1} here -->`, imgTag);
          });
          articleData.attributes.content = contentWithImages;
        }

        setData(articleData);
        setRecentArticles(recentArticlesData);
        setBlogCategories(blogCategoriesData);

        console.log('Article data:', articleData); // Logging the article data
        console.log('Recent articles:', recentArticlesData); // Logging the recent articles
        console.log('Blog categories:', blogCategoriesData); // Logging the blog categories
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    })();
  }, [url]);

  if (!data) {
    return <div>Loading...</div>; // Add a loading state
  }

  const { attributes } = data;
  const { title, author, tag: tags, content, category, created_at } = attributes;

  return (
    <>
      <PostHero post={data} />

      <Container>
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: paths.travel.posts },
            { name: title },
          ]}
        />
      </Container>

      <Divider sx={{ mb: { xs: 6, md: 10 } }} />

      <Container>
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12} md={8}>
            <Markdown content={content} firstLetter />

            <PostTags tags={tags} />

            <PostSocialsShare />

            <Divider sx={{ mt: 8 }} />

            <PostAuthor author={author} />
          </Grid>

          <Grid xs={12} md={4}>
            <PostSidebar
              popularTags={tags}
              author={{ name: author.name, avatarUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${author.picture}` }}
              categories={blogCategories.map(category => ({
                label: category.attributes.name.trim(),
                path: `/category/${category.attributes.name.trim().toLowerCase()}`,
              }))}
              recentPosts={{ list: recentArticles }}
            />
          </Grid>
        </Grid>
      </Container>

      <LatestPosts posts={recentArticles.slice(0, 4)} />
    </>
  );
}
