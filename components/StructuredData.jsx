import Head from 'next/head';

export default function StructuredData({
  type = 'LocalBusiness',
  name = 'Smart Tech India',
  areaServed = [],
  products = [],
  address = {
    '@type': 'PostalAddress',
    addressLocality: 'India',
    addressCountry: 'IN'
  },
  contactPoint = {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    areaServed: 'IN'
  },
  // Article specific props
  articleTitle,
  articleDescription,
  articleImage,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor = 'Smart Tech India'
}) {
  const generateStructuredData = () => {
    if (type === 'LocalBusiness') {
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: name,
        address: address,
        contactPoint: contactPoint,
        areaServed: areaServed.map(area => ({
          '@type': 'City',
          name: area
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Smart Home Products',
          itemListElement: products.map(product => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: product
            }
          }))
        }
      };
    }
    
    if (type === 'Article') {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleTitle,
        description: articleDescription,
        image: articleImage,
        author: {
          '@type': 'Organization',
          name: articleAuthor
        },
        publisher: {
          '@type': 'Organization',
          name: 'Smart Tech India',
          logo: {
            '@type': 'ImageObject',
            url: 'https://yourdomain.com/logo.png'
          }
        },
        datePublished: articlePublishedTime,
        dateModified: articleModifiedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://yourdomain.com/blog'
        }
      };
    }
    
    return null;
  };

  const structuredData = generateStructuredData();
  
  if (!structuredData) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Head>
  );
}
