import ContactView from 'src/sections/contact/contact-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'تواصل معنا - RENTS.ma | تواصل مع فريقنا',
    description: 'لديك أسئلة أو تحتاج إلى مساعدة؟ تواصل مع فريق RENTS.ma اليوم للاستفسارات حول الإيجارات أو القوائم أو الدعم.',
    keywords: 'تواصل مع RENTS.ma, دعم العملاء, استفسارات الإيجار, اتصل بـ RENTS.ma, المساعدة والدعم',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/contact-us',
      title: 'تواصل معنا - RENTS.ma | تواصل مع فريقنا',
      description: 'تواصل مع فريق RENTS.ma لأي استفسارات تتعلق بالإيجارات أو القوائم أو الدعم.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'تواصل معنا - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'تواصل معنا - RENTS.ma | تواصل مع فريقنا',
      description: 'تواصل مع فريق RENTS.ma لأي استفسارات أو دعم. نحن هنا لمساعدتك!',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/contact-us',
      languages: {
        en: 'https://rents.ma/en/contact-us',
        ar: 'https://rents.ma/ar/contact-us',
        fr: 'https://rents.ma/fr/contact-us',
      },
    },
  };
}

export default function ContactPage() {
  return (
    <>
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="contact-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: 'تواصل معنا - RENTS.ma',
            url: 'https://rents.ma/ar/contact-us',
            description: 'لديك أسئلة أو تحتاج إلى مساعدة؟ تواصل مع فريق RENTS.ma للاستفسارات حول الإيجارات أو القوائم أو الدعم.',
            contactPoint: {
              "@type": "ContactPoint",
              telephone: '+212-123-456-789', // استبدل برقم هاتفك الفعلي
              contactType: 'خدمة العملاء',
              areaServed: 'MA',
              availableLanguage: ['العربية', 'الفرنسية', 'الإنجليزية'],
            },
          }),
        }}
      />
      {/* عرض محتوى التواصل */}
      <ContactView />
    </>
  );
}
