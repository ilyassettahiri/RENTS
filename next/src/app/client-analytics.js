"use client";


import { GoogleAnalytics } from 'nextjs-google-analytics';

export default function ClientAnalytics() {
  return <GoogleAnalytics trackPageViews gaMeasurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />;
}
