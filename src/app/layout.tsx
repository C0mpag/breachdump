import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileStickyFooter } from '@/components/MobileStickyFooter';
import { businessAddress, siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Lawn Mowing & Property Maintenance`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Lawn Mowing & Property Maintenance`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: ['/images/placeholder.svg'],
    locale: 'en_AU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Lawn Mowing & Property Maintenance`,
    description: siteConfig.description,
    images: ['/images/placeholder.svg']
  }
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  priceRange: siteConfig.priceRange,
  areaServed: siteConfig.areasServed,
  openingHours: siteConfig.openingHours,
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessAddress.street,
    addressLocality: businessAddress.suburb,
    postalCode: businessAddress.postcode,
    addressCountry: businessAddress.country
  },
  serviceType: [
    'Lawn mowing',
    'Hedge trimming',
    'Garden clean ups',
    'Green waste removal',
    'Property maintenance'
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en">
      <body className="pb-20 sm:pb-0">
        {gaId && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');`}
          </Script>
        )}
        <Script id="local-business" type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileStickyFooter />
      </body>
    </html>
  );
}
