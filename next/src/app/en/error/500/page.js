import View500 from 'src/sections/error/500-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: '500 Internal Server Error',
};

export default function Page500() {
  return <View500 />;
}
