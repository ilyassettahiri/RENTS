import ContactView from 'src/sections/contact/contact-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export async function generateMetadata() {
  return {
    title: 'Contactez-nous - RENTS.ma | Prenez Contact avec Nous',
    description: 'Vous avez des questions ou besoin d’aide ? Contactez RENTS.ma pour toute demande concernant les locations, les annonces ou le support.',
    keywords: 'Contactez RENTS.ma, Support client, Demandes de location, Prendre contact avec RENTS.ma, Aide et assistance',
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: 'https://rents.ma/fr/contact-us',
      title: 'Contactez-nous - RENTS.ma | Prenez Contact avec Nous',
      description: 'Contactez RENTS.ma pour toute question concernant les locations, l’assistance pour les annonces ou toute autre demande.',
      images: [
        {
          url: '/favicon/android-chrome-512x512.png', // Replace with a contact-specific or generic image
          width: 1200,
          height: 630,
          alt: 'Contactez-nous - RENTS.ma',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contactez-nous - RENTS.ma | Prenez Contact avec Nous',
      description: 'Contactez RENTS.ma pour toute assistance ou demande. Nous sommes là pour vous aider !',
      image: '/favicon/android-chrome-512x512.png', // Replace with a contact-specific or generic image
    },
    alternates: {
      canonical: 'https://rents.ma/fr/contact-us',
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
            name: 'Contactez-nous - RENTS.ma',
            url: 'https://rents.ma/fr/contact-us',
            description: 'Vous avez des questions ou besoin d’aide ? Contactez RENTS.ma pour toute demande concernant les locations, les annonces ou le support.',
            contactPoint: {
              "@type": "ContactPoint",
              telephone: '+212-123-456-789', // Replace with your actual contact number
              contactType: 'Service Client',
              areaServed: 'MA',
              availableLanguage: ['Français', 'Anglais', 'Arabe'],
            },
          }),
        }}
      />
      {/* Render Contact Content */}
      <ContactView />
    </>
  );
}
