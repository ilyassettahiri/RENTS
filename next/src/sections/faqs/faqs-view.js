'use client';

import { useState, useEffect, useCallback } from "react";
import CrudService from "src/services/cruds-service";

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import SupportNav from './faqs-nav';
import SupportHero from './faqs-hero';
import SupportContent from './faqs-content';

// ----------------------------------------------------------------------

export default function FaqsView() {
  const [faqSubjects, setFaqSubjects] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState('');
  const mobileOpen = useBoolean();

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getFaqs();
        const faqSubjectsData = response.faqsubjects;
        const faqsData = response.faqs;
        setFaqSubjects(faqSubjectsData);
        setFaqs(faqsData);



        // Create topics array from fetched data
        const topicsData = faqSubjectsData.map(subject => ({
          title: subject.attributes.name,
          icon: `${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}${subject.attributes.picture}`,
          content: <SupportContent contents={faqsData.filter(faq => faq.relationships.faqsubject.data.id === subject.id)} />
        }));


        setTopics(topicsData);
        setTopic(topicsData[0]?.title); // Set the first topic as default
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    })();
  }, []);

  const handleChangeTopic = useCallback((event, newValue) => {
    setTopic(newValue);
  }, []);

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  return (
    <>
      <SupportHero />

      <Stack
        alignItems="flex-end"
        sx={{
          py: 1.5,
          px: 2.5,
          display: { md: 'none' },
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <IconButton onClick={mobileOpen.onTrue}>
          <Iconify icon="carbon:menu" />
        </IconButton>
      </Stack>

      <Container>
        <Typography variant="h3" sx={{ py: { xs: 3, md: 10 } }}>
          Frequently Asked Questions
        </Typography>

        <Stack direction="row" sx={{ pb: { xs: 10, md: 15 } }}>
          <SupportNav
            data={topics}
            topic={topic}
            open={mobileOpen.value}
            onChangeTopic={handleChangeTopic}
            onClose={mobileOpen.onFalse}
          />

          {topics.map((item) => item.title === topic && <div key={item.title}>{item.content}</div>)}
        </Stack>
      </Container>
    </>
  );
}
