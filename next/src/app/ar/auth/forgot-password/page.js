import ForgotPasswordView from 'src/sections/auth/forgot-password-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
