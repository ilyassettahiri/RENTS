'use client';

import { useMemo } from "react";
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import GeneralArticleSkeleton from 'src/sections/blog/travel/general-article-skeleton';


import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PostHeroSkeleton from 'src/sections/blog/travel/post-hero-skeleton';

import PostTags from './common/post-tags';
import PostAuthor from './common/post-author';
import PostSidebar from './common/post-sidebar';

import PostHero from './travel/post-hero';
import PostSocialsShare from './common/post-socials-share';
import LatestPosts from './travel/latest-posts';

export default function ArticleView({ params }) {
  const { url } = params;

  // Fetch article data using useQuery
  const { data: articleData, isLoading, error: articleError } = useQuery({
    queryKey: ['article', url],
    queryFn: () => CrudService.getArticle(url),
    onError: (error) => {
      console.error('Failed to fetch article:', error);
    },
  });

  // Memorize and format the fetched data
  const formattedData = useMemo(() => {
    if (!articleData) return null;

    const article = articleData.data.article;
    const recentArticles = articleData.data.recentarticles;
    const blogCategories = articleData.data.blogcategories;



    // Insert images into the content
    if (article.attributes.content && article.attributes.images) {
      let contentWithImages = article.attributes.content;
      article.attributes.images.forEach((image, index) => {
        const imgTag = `<img src="${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${image.url}" alt="${image.caption}" />`;
        contentWithImages = contentWithImages.replace(`<!-- img ${index + 1} here -->`, imgTag);
      });
      article.attributes.content = contentWithImages;
    }

    return { article, recentArticles, blogCategories };
  }, [articleData]);




  return (
    <>
      {isLoading ? (
        <PostHeroSkeleton />
      ) : (
        <PostHero post={formattedData?.article} />
      )}

      {/* Main Content */}
      {isLoading ? (
        <GeneralArticleSkeleton />
      ) : (
        <>
          <Container>
            <CustomBreadcrumbs
              sx={{ my: 3 }}
              links={[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: paths.travel.posts },
                { name: formattedData.article.attributes.title },
              ]}
            />
          </Container>

          <Divider sx={{ mb: { xs: 6, md: 10 } }} />

          <Container>
            <Grid container spacing={{ md: 8 }}>
              <Grid xs={12} md={8}>
                <Markdown content={formattedData.article.attributes.content} firstLetter />
                <PostTags tags={formattedData.article.attributes.tag} />
                <PostSocialsShare />
                <Divider sx={{ mt: 8 }} />
                <PostAuthor author={formattedData.article.attributes.author} />
              </Grid>

              <Grid xs={12} md={4}>
                <PostSidebar
                  popularTags={formattedData.article.attributes.tag}
                  author={{
                    name: formattedData.article.attributes.author.name,
                    avatarUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${formattedData.article.attributes.author.picture}`,
                  }}
                  categories={formattedData.blogCategories.map((category) => ({
                    label: category.attributes.name.trim(),
                    path: `/category/${category.attributes.name.trim().toLowerCase()}`,
                  }))}
                  recentPosts={{ list: formattedData.recentArticles }}
                />
              </Grid>
            </Grid>
          </Container>

          <LatestPosts posts={formattedData.recentArticles.slice(0, 4)} />
        </>
      )}
    </>
  );

}

ArticleView.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
