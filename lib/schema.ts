const BASE_URL = 'https://cek-group.com';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'CEK Group',
    alternateName: 'CEK Engineering & Design',
    description:
      'Engineered Integrity. Absolute Precision. Executive oversight for high-value infrastructure and long-term asset preservation.',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 120,
      height: 40,
    },
    foundingDate: '1994',
    founder: {
      '@id': `${BASE_URL}/#founder`,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+961-70-434-922',
      contactType: 'customer service',
      email: 'elie@cek-group.com',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://linkedin.com/company/cek-group',
      'https://twitter.com/cekgroup',
      'https://instagram.com/cekgroup',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Build Management',
            description:
              'Comprehensive project management from concept to completion, ensuring quality and timeline adherence.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Facility Management',
            description:
              'Long-term maintenance and optimization of built assets to maximize lifespan and performance.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Civil Construction',
            description:
              'Handling the most demanding structural challenges across diverse build frameworks.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Structural Analysis',
            description:
              'Deep forensic analysis of existing structures to ensure longevity and safety.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Industrial Design',
            description:
              'Specialized engineering for manufacturing plants and heavy-load processing facilities.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sustainable Assets',
            description:
              'Green engineering solutions that reduce environmental impact while maintaining structural integrity.',
          },
        },
      ],
    },
    knowsAbout: [
      'Civil Engineering',
      'Structural Engineering',
      'Construction Management',
      'Facility Management',
      'Infrastructure Development',
      'Commercial Construction',
      'Industrial Design',
      'Sustainable Engineering',
    ],
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Lebanon' },
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '150',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'CEK Group',
    url: BASE_URL,
    description:
      'Engineering & Design Excellence — Engineered Integrity. Absolute Precision.',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'CEK Group',
    image: `${BASE_URL}/og-image.jpg`,
    url: BASE_URL,
    telephone: '+961-70-434-922',
    email: 'elie@cek-group.com',
    description:
      'Engineered Integrity. Absolute Precision. Executive oversight for high-value infrastructure and long-term asset preservation. Established 1994.',
    foundingDate: '1994',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.8938,
      longitude: 35.5018,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Lebanon' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Build Management' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Facility Management' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Civil Construction' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Structural Analysis' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Industrial Design' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Sustainable Assets' },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '150',
    },
    sameAs: [
      'https://linkedin.com/company/cek-group',
      'https://twitter.com/cekgroup',
    ],
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#founder`,
    name: 'Elie Khoury',
    jobTitle: 'Founder & Civil Engineer',
    description:
      'Under Elie\'s direction, CEK has overseen over $2B in asset value, specializing in high-complexity structural engineering and long-term facility preservation for the world\'s most demanding environments.',
    image: `${BASE_URL}/founder.jpg`,
    worksFor: {
      '@id': `${BASE_URL}/#organization`,
    },
    url: BASE_URL,
    knowsAbout: [
      'Civil Engineering',
      'Structural Engineering',
      'Construction Management',
      'Facility Management',
    ],
  };
}
