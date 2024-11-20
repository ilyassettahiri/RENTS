import ContactView from 'src/sections/contact/contact-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Contact Us - RENTS.ma | Get in Touch with Us',
    description: 'Have questions or need assistance? Contact RENTS.ma today for inquiries about rentals, listings, or support.',
    keywords: 'Contact RENTS.ma, Customer support, Rental inquiries, Get in touch with RENTS.ma, Help and support',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://rents.ma/en/contact-us',
      title: 'Contact Us - RENTS.ma | Get in Touch with Us',
      description: 'Reach out to RENTS.ma for any rental-related questions, listing assistance, or support inquiries.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a contact-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Contact Us - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact Us - RENTS.ma | Get in Touch with Us',
      description: 'Connect with RENTS.ma for any inquiries or support. We’re here to help!',
      image: '/favicon/android-chrome-512x512.png', // Replace with a contact-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/en/contact-us',
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
      {/* Page-Specific Structured Data */}
      <Script
        type="application/ld+json"
        id="contact-page-structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: 'Contact Us - RENTS.ma',
            url: 'https://rents.ma/en/contact-us',
            description: 'Have questions or need assistance? Contact RENTS.ma for inquiries about rentals, listings, or support.',
            contactPoint: {
              "@type": "ContactPoint",
              telephone: '+212-123-456-789', // Replace with your actual contact number
              contactType: 'Customer Service',
              areaServed: 'MA',
              availableLanguage: ['English', 'French', 'Arabic'],
            },
          }),
        }}
      />
      {/* Render Contact Content */}
      <ContactView />
    </>
  );



}
