import Head from 'next/head';

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  canonical,
  geoTargets,
  publishedTime,
  modifiedTime,
  type = 'article',
  author = 'Smart Tech India',
  siteName = 'Smart Tech India',
  twitterHandle = '@smarttechindia'
}) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Article Specific Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {geoTargets && geoTargets.map((location, index) => (
        <meta key={index} property="article:section" content={location} />
      ))}
      
      {/* Geo-targeting Meta Tags */}
      {geoTargets && geoTargets.map((location, index) => (
        <meta key={index} name="geo.region" content={location} />
      ))}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
