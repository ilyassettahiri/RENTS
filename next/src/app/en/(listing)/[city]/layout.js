'use client';

import PropTypes from 'prop-types';

import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <MainLayout headerOnDark headerColor="black">{children}</MainLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
