// client-analytics.js (Client Component)
"use client";

import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function ClientAnalytics() {
  return <GoogleAnalytics trackPageViews />;
}
