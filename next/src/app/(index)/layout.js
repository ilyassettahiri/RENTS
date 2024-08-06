// src/app/(index)/layout.js
'use client';

import PropTypes from 'prop-types';
import MainLayout from 'src/layouts/main';
import { AuthContextProvider } from 'src/context/AuthContextProvider';

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <MainLayout headerOnDark>{children}</MainLayout>
    </AuthContextProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
