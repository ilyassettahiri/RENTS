import MaintenanceView from 'src/sections/status/maintenance-view';
import Script from 'next/script';

export async function generateMetadata() {
  return {
    title: 'الصيانة - RENTS.ma | سنعود قريبًا',
    description: 'RENTS.ma يخضع حاليًا للصيانة. سنعود قريبًا بخدمات وميزات محسنة.',
    keywords: 'صيانة, صيانة RENTS.ma, الموقع تحت الصيانة, تحديثات منصة الإيجار',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/maintenance',
      title: 'الصيانة - RENTS.ma | سنعود قريبًا',
      description: 'موقعنا حاليًا تحت الصيانة. يرجى العودة لاحقًا للحصول على خدمات وميزات محسنة.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالصيانة إذا كانت متوفرة
          width: 1200,
          height: 630,
          alt: 'الصيانة - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'الصيانة - RENTS.ma | سنعود قريبًا',
      description: 'نحن حاليًا نعمل على تحسينات. يرجى العودة قريبًا!',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة خاصة بالصيانة إذا كانت متوفرة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/maintenance',
      languages: {
        en: 'https://rents.ma/en/maintenance',
        ar: 'https://rents.ma/ar/maintenance',
        fr: 'https://rents.ma/fr/maintenance',
      },
    },
  };
}

export default function MaintenancePage() {
  return (
    <>
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="maintenance-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: 'الصيانة - RENTS.ma',
            url: 'https://rents.ma/ar/maintenance',
            description: 'RENTS.ma يخضع حاليًا للصيانة. سنعود قريبًا بخدمات وميزات محسنة.',
          }),
        }}
      />
      {/* عرض محتوى الصيانة */}
      <MaintenanceView />
    </>
  );
}
