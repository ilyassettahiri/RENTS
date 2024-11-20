import VerifyView from 'src/sections/auth/verify-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Verify',
};

export default function VerifyPage() {
  return <VerifyView />;
}
