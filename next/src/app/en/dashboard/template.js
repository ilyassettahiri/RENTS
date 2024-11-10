'use client';

import PropTypes from 'prop-types';

import AccountLayout from 'src/layouts/account';

// ----------------------------------------------------------------------

export default function Template({ children }) {
  return <AccountLayout>{children}</AccountLayout>;
}

Template.propTypes = {
  children: PropTypes.node,
};
