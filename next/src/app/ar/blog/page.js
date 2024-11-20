import BlogView from 'src/sections/blog/blog-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'المدونة - RENTS.ma | اكتشف النصائح والرؤى حول الإيجارات في المغرب',
    description: 'تصفح مدونة RENTS.ma للحصول على آخر التحديثات والنصائح والرؤى حول استئجار السيارات والعقارات والمزيد في المغرب.',
    keywords: 'مدونة الإيجارات, نصائح RENTS.ma, رؤى حول الإيجارات في المغرب, أدلة الإيجار, مدونة RENTS.ma',
    openGraph: {
      type: 'website',
      locale: 'ar_MA',
      url: 'https://rents.ma/ar/blog',
      title: 'المدونة - RENTS.ma | اكتشف النصائح والرؤى حول الإيجارات في المغرب',
      description: 'ابق على اطلاع مع مدونة RENTS.ma. اكتشف الأدلة المفيدة ونصائح الإيجار وآخر التحديثات حول سوق الإيجارات في المغرب.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للمدونة إذا كانت متاحة
          width: 1200,
          height: 630,
          alt: 'المدونة - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'المدونة - RENTS.ma | اكتشف النصائح والرؤى حول الإيجارات في المغرب',
      description: 'تصفح الأدلة والنصائح المفيدة حول الإيجارات في المغرب مع مدونة RENTS.ma.',
      image: '/favicon/android-chrome-512x512.png', // استبدل بصورة مخصصة للمدونة إذا كانت متاحة
    },
    alternates: {
      canonical: 'https://rents.ma/ar/blog',
      languages: {
        en: 'https://rents.ma/en/blog',
        ar: 'https://rents.ma/ar/blog',
        fr: 'https://rents.ma/fr/blog',
      },
    },
  };
}

export default function BlogPage() {
  return (
    <>
      {/* البيانات المنظمة الخاصة بالصفحة */}
      <Script
        type="application/ld+json"
        id="blog-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: 'مدونة RENTS.ma',
            url: 'https://rents.ma/ar/blog',
            description: 'اكتشف النصائح والرؤى وآخر التحديثات حول الإيجارات للسيارات والعقارات والمزيد في المغرب مع مدونة RENTS.ma.',
            blogPost: {
              "@type": "BlogPosting",
              headline: 'اكتشف أفضل النصائح حول الإيجار في المغرب',
              alternativeHeadline: 'نصائح ورؤى حول الإيجارات في المغرب',
              author: {
                "@type": "Organization",
                name: 'RENTS.ma',
              },
              publisher: {
                "@type": "Organization",
                name: 'RENTS.ma',
                logo: {
                  "@type": "ImageObject",
                  url: 'https://rents.ma/favicon/android-chrome-192x192.png',
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": 'https://rents.ma/ar/blog',
              },
            },
          }),
        }}
      />
      {/* عرض محتوى المدونة */}
      <BlogView />
    </>
  );
}
