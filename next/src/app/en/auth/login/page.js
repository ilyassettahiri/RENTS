import LoginView from 'src/sections/auth/login-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return <LoginView />;
}
