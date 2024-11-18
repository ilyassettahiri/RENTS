'use client';


import PropTypes from 'prop-types';

import { useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import FeaturedPosts from 'src/sections/blog/travel/featured-posts';

import About from './about';
import AboutOurMission from './about-our-mission';

// ----------------------------------------------------------------------

export default function AboutView({ aboutData }) {



  const recentArticles = aboutData?.data?.recentarticles || [];
  const about = aboutData?.data?.about || {};



    const getFirstThreeParagraphs = (content) => {
      const paragraphs = content.match(/<p>.*?<\/p>/g);
      if (paragraphs && paragraphs.length > 3) {
        return {
          firstThree: paragraphs.slice(0, 1).join(''),
          secondThree: paragraphs.slice(1, 2).join(''),
          third: paragraphs.slice(2, 3).join(''),
          last: paragraphs.slice(3, 4).join(''),
        };
      }
      return {
        firstThree: content,
        secondThree: '',
        third: '',
        last: '',
      };
    };

    const aboutContent = useMemo(() => getFirstThreeParagraphs(about.attributes?.content || ''), [about]);


  return (
    <>
      <About about={{ ...about, attributes: { ...about.attributes, content: aboutContent.firstThree, secondContent: aboutContent.secondThree } }} />
      <AboutOurMission
        about={about}
        third={aboutContent.third}
        last={aboutContent.last}
        profilePicture={about.attributes?.profile_picture}
      />

            <Container>
              <Typography variant="h3" sx={{ my: 3 }}>  Latest Posts </Typography>

            </Container>
      <FeaturedPosts posts={recentArticles} Loading={isLoading} />



    </>
  );
}



AboutView.propTypes = {
  aboutData: PropTypes.object, // Expect an object or null
};
