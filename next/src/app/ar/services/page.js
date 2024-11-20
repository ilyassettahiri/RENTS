import ServicesView from 'src/sections/services-list/services-list-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'الخدمات في المغرب - مقدمو الخدمات الموثوقون على RENTS.ma',
  description:
    'اكتشف مجموعة واسعة من الخدمات المهنية عبر المغرب على RENTS.ma. من صيانة المنزل إلى العناية الشخصية، تواصل مع مقدمي الخدمات الموثوقين لتلبية احتياجاتك في جميع أنحاء البلاد.',
  keywords: 'الخدمات المهنية في المغرب، خدمات صيانة المنزل، خدمات العناية الشخصية، مقدمو خدمات موثوقون في المغرب، الخدمات على RENTS.ma',
  openGraph: {
    type: 'website',
    locale: 'ar_MA',
    url: 'https://rents.ma/ar/services',
    title: 'الخدمات في المغرب - مقدمو الخدمات الموثوقون على RENTS.ma',
    description:
      'استكشف خدمات مهنية موثوقة في المغرب. تواصل مع مقدمي خدمات موثوقين لصيانة المنزل، العناية الشخصية، والمزيد.',
    images: [
      {
        url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالخدمات أو صورة عامة
        width: 1200,
        height: 630,
        alt: 'الخدمات في المغرب - مقدمو الخدمات الموثوقون على RENTS.ma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الخدمات في المغرب - مقدمو الخدمات الموثوقون على RENTS.ma',
    description:
      'اكتشف خدمات مهنية عبر المغرب. تواصل مع مقدمي خدمات موثوقين لصيانة المنزل، العناية الشخصية، والمزيد.',
    image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالخدمات أو صورة عامة
  },
  alternates: {
    canonical: 'https://rents.ma/ar/services',
    languages: {
      en: 'https://rents.ma/en/services',
      ar: 'https://rents.ma/ar/services',
      fr: 'https://rents.ma/fr/services',
    },
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="services-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'الخدمات في المغرب | RENTS.ma',
            url: 'https://rents.ma/ar/services',
            description:
              'استكشف خدمات مهنية موثوقة في المغرب. تواصل مع مقدمي خدمات لصيانة المنزل، العناية الشخصية، والمزيد.',
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: 'خدمات صيانة المنزل',
                  url: 'https://rents.ma/ar/services/home-maintenance',
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: 'خدمات العناية الشخصية',
                  url: 'https://rents.ma/ar/services/personal-care',
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: 'خدمات التنظيف',
                  url: 'https://rents.ma/ar/services/cleaning',
                },
              ],
            },
          }),
        }}
      />
      {/* Render Services Content */}
      <ServicesView />
    </>
  );
}
