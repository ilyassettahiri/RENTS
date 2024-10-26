'use client';

import { useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import CrudService from "src/services/cruds-service";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import FeaturedPosts from 'src/sections/blog/travel/featured-posts';

import Team from '../components/listings/team/team';
import About from './about';
import OurClients from '../components/listings/our-clients';
import Testimonial from '../components/listings/testimonial/testimonial';
import AboutOurMission from './about-our-mission';

// ----------------------------------------------------------------------

export default function AboutView() {
  // Use React Query to fetch data
  const { data: aboutData, isLoading, error: aboutError } = useQuery({
    queryKey: ['about'],
    queryFn: CrudService.getAbouts,
    onError: (error) => {
      console.error('Failed to fetch data:', error);
    },
  });

  // Memoize extracted data
  const recentArticles = useMemo(() => aboutData?.data?.recentarticles || [], [aboutData]);
  const ourclients = useMemo(() => aboutData?.data?.ourclients || [], [aboutData]);
  const about = useMemo(() => aboutData?.data?.about || {}, [aboutData]);

  // Function to extract the first three paragraphs from the content
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

  // Extract the first three paragraphs from the about content
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

      {/* <OurClients brands={ourclients} /> */}

    </>
  );
}
