export function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Borne Kébè",
          "image": "https://www.xn--borne-kb-80ai.com/logo.png",
          "description": "Location de photobooths haut de gamme",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rue saint michel 5",
            "addressLocality": "Bruxelles",
            "postalCode": "1000",
            "addressCountry": "BE"
          },
          "priceRange": "€€€",
          "telephone": "+32488952150"
        })
      }}
    />
  )
} 