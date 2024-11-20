import JobsView from 'src/sections/jobs-list/jobs-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Jobs in Morocco - Find Employment Opportunities on RENTS.ma',
  description: 'Explore a wide range of job opportunities across Morocco on RENTS.ma. Discover positions in various industries and connect with top employers nationwide. Start your job search today!',

};

export default function JobsPage() {
  return <JobsView />;
}
