'use client';

import PropTypes from 'prop-types';

import AuthLayout from 'src/layouts/auth/background';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <AuthLayout>{children}</AuthLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
