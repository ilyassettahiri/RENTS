'use client';

import { useState, useEffect } from "react";
import CrudService from "src/services/cruds-service";

import Team from '../components/listings/team/team';
import About from './about';
import OurClients from '../components/listings/our-clients';
import Testimonial from '../components/listings/testimonial/testimonial';
import AboutOurMission from './about-our-mission';
import LatestPosts from '../blog/travel/latest-posts';

// ----------------------------------------------------------------------

export default function AboutView() {
  const [data, setData] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [ourclients, setOurclients] = useState([]);
  const [about, setAbout] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getAbouts();
        const recentArticlesData = response.data.recentarticles;
        const ourclientsData = response.data.ourclients;
        const aboutData = response.data.about;

        console.log('about:', aboutData); // Logging the about data
        console.log('Our clients:', ourclientsData); // Logging the our clients

        setAbout(aboutData);
        setRecentArticles(recentArticlesData);
        setOurclients(ourclientsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    })();
  }, []);

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
  const aboutContent = getFirstThreeParagraphs(about.attributes?.content || '');

  console.log('First three paragraphs:', aboutContent.firstThree); // Log first three paragraphs
  console.log('Third paragraph:', aboutContent.third); // Log third paragraph
  console.log('last paragraph:', aboutContent.last); // Log third paragraph

  console.log('Second three paragraphs:', aboutContent.secondThree); // Log second three paragraphs

  return (
    <>
      <About about={{ ...about, attributes: { ...about.attributes, content: aboutContent.firstThree, secondContent: aboutContent.secondThree } }} />
      <AboutOurMission
        about={about}
        third={aboutContent.third}
        last={aboutContent.last}
        profilePicture={about.attributes?.profile_picture}
      />
      <OurClients brands={ourclients} />
      <LatestPosts posts={recentArticles.slice(0, 4)} />
    </>
  );
}
