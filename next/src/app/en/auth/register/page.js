import RegisterView from 'src/sections/auth/register-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return <RegisterView />;
}
