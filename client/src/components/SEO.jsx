import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from '../../content/config.json';

const SEO = ({ title, description, url, image, type = 'website' }) => {
  const siteTitle = config.seo?.title || 'Portfolio';
  const siteDescription = config.seo?.description || 'Personal Portfolio';

  const currentTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentDescription = description || siteDescription;

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
