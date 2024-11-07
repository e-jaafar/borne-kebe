export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.xn--borne-kb-80ai.com/#organization",
        "name": "Borne Kébè",
        "url": "https://www.xn--borne-kb-80ai.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.xn--borne-kb-80ai.com/logo.png"
        },
        "image": "https://www.xn--borne-kb-80ai.com/og-image.jpg",
        "description": "Location de photobooths haut de gamme pour vos événements",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rue saint michel 5",
          "addressLocality": "Bruxelles",
          "postalCode": "1000",
          "addressCountry": "BE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "50.8503",
          "longitude": "4.3517"
        },
        "telephone": "+32488952150",
        "email": "alchimistelab@hotmail.com",
        "priceRange": "€€€",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services de Photobooth",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Forfait Essentiel",
                "description": "Location de photobooth avec 100 impressions",
                "price": "300",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Forfait Premium",
                "description": "Location de photobooth avec 300 impressions",
                "price": "450",
                "priceCurrency": "EUR"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Forfait VIP",
                "description": "Location de photobooth avec 650 impressions",
                "price": "650",
                "priceCurrency": "EUR"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.xn--borne-kb-80ai.com/#website",
        "url": "https://www.xn--borne-kb-80ai.com",
        "name": "Borne Kébè",
        "publisher": {
          "@id": "https://www.xn--borne-kb-80ai.com/#organization"
        },
        "inLanguage": "fr-BE",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.xn--borne-kb-80ai.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Combien de temps dure la location d'un photobooth ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "La durée standard de location est de 4 heures, mais elle peut être prolongée selon vos besoins."
            }
          },
          {
            "@type": "Question",
            "name": "Les photos sont-elles disponibles en format numérique ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, toutes les photos sont disponibles en format numérique et peuvent être téléchargées instantanément."
            }
          }
        ]
      },
      {
        "@type": "AggregateRating",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "@id": "https://www.xn--borne-kb-80ai.com/#organization"
        },
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "150",
        "reviewCount": "150"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
} 