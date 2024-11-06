export function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Borne Kébè",
          "image": "https://www.borne-kébé.com/logo.png",
          "description": "Location de photobooths haut de gamme",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rue saint michel 5",
            "addressLocality": "Bruxelles",
            "postalCode": "1000",
            "addressCountry": "BE"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 50.8503,
            "longitude": 4.3517
          },
          "priceRange": "€€€",
          "telephone": "+32488952150"
        })
      }}
    />
  )
} 