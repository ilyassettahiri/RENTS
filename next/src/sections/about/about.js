import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { fShortenNumber } from 'src/utils/format-number';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import CountUp from 'src/components/count-up';

const StyledSection = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(10),
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    right: 0,
    width: '75%',
    left: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    width: '50%',
  },
}));

// Function to extract the first three paragraphs from the content
const getFirstThreeParagraphs = (content) => {
  const paragraphs = content.match(/<p>.*?<\/p>/g);
  if (paragraphs && paragraphs.length > 3) {
    return {
      firstThree: paragraphs.slice(0, 3).join(''),
      third: paragraphs[2],
      secondThree: paragraphs.slice(3, 6).join(''),
    };
  }
  return {
    firstThree: content,
    third: '',
    secondThree: '',
  };
};

// ----------------------------------------------------------------------

export default function About({ about }) {
  const { title, content, job, successful_hiring, partner, employee, large_picture, secondContent } = about.attributes;

  const { firstThree, third } = getFirstThreeParagraphs(content);

  return (
    <Container
      maxWidth={false}
      sx={{
        pt: 5,
        pb: { xs: 5, md: 10 },
        paddingLeft: { lg: '50px' },
        paddingRight: { lg: '50px' },
      }}
    >
      <Typography
        paragraph
        variant="overline"
        sx={{ color: 'primary.main', textAlign: { xs: 'center', md: 'left' } }}
      >
        About us
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        sx={{
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Grid xs={12} md={6} lg={5}>
          <Typography variant="h4">{title}</Typography>
        </Grid>

        <Grid xs={12} md={6} lg={6} sx={{ color: 'text.secondary' }}>
          <Stack spacing={{ xs: 3, md: 10 }} direction={{ xs: 'column', md: 'row' }}>
            <Typography dangerouslySetInnerHTML={{ __html: firstThree }} />
            <Typography dangerouslySetInnerHTML={{ __html: secondContent }} />
          </Stack>
        </Grid>
      </Grid>

      <Section
        large_picture={large_picture}
        job={job}
        successful_hiring={successful_hiring}
        partner={partner}
        employee={employee}
        third={third}
      />
    </Container>
  );
}

About.propTypes = {
  about: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      job: PropTypes.number.isRequired,
      successful_hiring: PropTypes.number.isRequired,
      partner: PropTypes.number.isRequired,
      employee: PropTypes.number.isRequired,
      large_picture: PropTypes.string.isRequired,
      secondContent: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

// ----------------------------------------------------------------------

function Section({ large_picture, job, successful_hiring, partner, employee, third }) {
  return (
    <StyledSection>
      <Stack
        sx={{
          py: 10,
          zIndex: 9,
          ml: 'auto',
          position: 'relative',
          px: { xs: 2.5, md: 10 },
          width: { md: 0.75, lg: 0.5 },
        }}
      >
        <Stack
          sx={{
            mb: 5,
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2" paragraph>
            Our numbers
          </Typography>
          <Typography sx={{ opacity: 0.72 }} dangerouslySetInnerHTML={{ __html: third }} />
        </Stack>

        <Box
          sx={{
            gap: 5,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <StatItem name="Jobs" number={job} />
          <StatItem name="Successful Hiring" number={successful_hiring} />
          <StatItem name="Partners" number={partner} />
          <StatItem name="Employee" number={employee} />
        </Box>
      </Stack>

      <StyledOverlay />

      <Box sx={{ position: 'absolute', width: 1, height: 1, top: 0 }}>
        <Image
          alt="career about"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${large_picture}`}
          sx={{ width: 1, height: 1 }}
        />
      </Box>
    </StyledSection>
  );
}

Section.propTypes = {
  large_picture: PropTypes.string.isRequired,
  job: PropTypes.number.isRequired,
  successful_hiring: PropTypes.number.isRequired,
  partner: PropTypes.number.isRequired,
  employee: PropTypes.number.isRequired,
  third: PropTypes.string.isRequired,
};

function StatItem({ name, number }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h2" sx={{ color: 'primary.main' }}>
        <CountUp
          start={number / 5}
          end={number}
          formattingFn={(newValue) => fShortenNumber(newValue)}
        />
        <Typography variant="h3" component="span" sx={{ verticalAlign: 'top', ml: 0.5 }}>
          +
        </Typography>
      </Typography>
      <Typography variant="body2" sx={{ color: 'grey.500' }}>
        {name}
      </Typography>
    </Stack>
  );
}

StatItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
