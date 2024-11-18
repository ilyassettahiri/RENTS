'use client';

import { useMemo } from "react";
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import { paths as getPaths } from 'src/routes/paths';

import GeneralArticleSkeleton from 'src/sections/blog/travel/general-article-skeleton';


import Markdown from 'src/components/markdown';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PostHeroSkeleton from 'src/sections/blog/travel/post-hero-skeleton';
import FeaturedPosts from './travel/featured-posts';

import PostTags from './common/post-tags';
import PostAuthor from './common/post-author';
import PostSidebar from './common/post-sidebar';

import PostHero from './travel/post-hero';
import PostSocialsShare from './common/post-socials-share';

export default function ArticleView({ params, articleData }) {


  const { url } = params;

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);





  const { article, recentarticles: recentArticles, blogcategories: blogCategories } = articleData.data;



  return (
    <>

     <PostHero post={article} />




        <>
          <Container>
            <CustomBreadcrumbs
              sx={{ my: 3 }}
              links={[
                { name: 'Home', href: '/' },
                { name: 'Blog', href: paths.travel.posts },
                { name: article.attributes.title },
              ]}
            />
          </Container>

          <Divider sx={{ mb: { xs: 6, md: 5 } }} />

          <Container>
            <Grid container spacing={{ md: 8 }}>
              <Grid xs={12} md={8}>
                <Markdown content={article.attributes.content}  />
                <PostTags tags={article.attributes.tag} />
                <PostSocialsShare />
                <Divider sx={{ mt: 8 }} />
                <PostAuthor author={article.attributes.author}/>
              </Grid>

              <Grid xs={12} md={4}>
                <PostSidebar
                  popularTags={article.attributes.tag}
                  author={{
                    name: article.attributes.author.name,
                    avatarUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${article.attributes.author.picture}`,
                  }}
                  categories={blogCategories.map((category) => ({
                    label: category.attributes.name.trim(),
                    path: `/category/${category.attributes.name.trim().toLowerCase()}`,
                  }))}
                  recentPosts={{ list: recentArticles }}
                />
              </Grid>
            </Grid>








          </Container>

            <Container>
              <Typography variant="h3" sx={{ my: 3 }}>  Recommended for you              </Typography>

            </Container>

            <FeaturedPosts posts={recentArticles}  />



        </>

    </>
  );

}

ArticleView.propTypes = {
  params: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  articleData: PropTypes.object, // Expect article data or null
};
