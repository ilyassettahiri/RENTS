'use client';

import PropTypes from 'prop-types';

import CompactLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <CompactLayout>{children}</CompactLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
