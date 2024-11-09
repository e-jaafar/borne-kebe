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
        "description": "Location de photobooths haut de gamme pour vos événements professionnels et privés",
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
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "50.8503",
            "longitude": "4.3517"
          },
          "geoRadius": "100000"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services de Photobooth",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Location Photobooth Mariage",
                "description": "Service de photobooth personnalisé pour mariages"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Location Photobooth Entreprise",
                "description": "Service de photobooth pour événements professionnels"
              }
            }
          ]
        }
      },
      {
        "@type": "Service",
        "name": "Location de Photobooth",
        "provider": {
          "@id": "https://www.xn--borne-kb-80ai.com/#organization"
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Forfait Essentiel",
            "description": "Photobooth avec 100 impressions max, reconnaissance faciale et livraison numérique",
            "price": "300",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2024-12-31",
            "itemOffered": {
              "@type": "Service",
              "serviceType": "Location de photobooth",
              "serviceOutput": "Photos imprimées et numériques"
            }
          },
          {
            "@type": "Offer",
            "name": "Forfait Premium",
            "description": "Photobooth avec 300 impressions max, reconnaissance faciale et réduction photographe de 5%",
            "price": "450",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2024-12-31",
            "itemOffered": {
              "@type": "Service",
              "serviceType": "Location de photobooth",
              "serviceOutput": "Photos imprimées et numériques"
            }
          },
          {
            "@type": "Offer",
            "name": "Forfait VIP",
            "description": "Photobooth avec 650 impressions max, reconnaissance faciale et réduction photographe de 10%",
            "price": "650",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2024-12-31",
            "itemOffered": {
              "@type": "Service",
              "serviceType": "Location de photobooth",
              "serviceOutput": "Photos imprimées et numériques"
            }
          }
        ]
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Marie D."
        },
        "reviewBody": "Borne Kébè a transformé notre mariage en une expérience inoubliable. La qualité des photos est exceptionnelle et le service est irréprochable !",
        "itemReviewed": {
          "@id": "https://www.xn--borne-kb-80ai.com/#organization"
        }
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Pierre L."
        },
        "reviewBody": "Parfait pour nos événements d'entreprise. L'équipe est professionnelle et la technologie est vraiment innovante. Nos collaborateurs ont adoré !",
        "itemReviewed": {
          "@id": "https://www.xn--borne-kb-80ai.com/#organization"
        }
      },
      {
        "@type": "AggregateRating",
        "itemReviewed": {
          "@id": "https://www.xn--borne-kb-80ai.com/#organization"
        },
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "150",
        "reviewCount": "150"
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
          },
          {
            "@type": "Question",
            "name": "Proposez-vous des accessoires pour les photos ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Oui, nous fournissons une large sélection d'accessoires amusants et élégants adaptés à votre événement."
            }
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.xn--borne-kb-80ai.com/#website",
        "url": "https://www.xn--borne-kb-80ai.com",
        "name": "Borne Kébè - Location Photobooth Bruxelles",
        "description": "Location de photobooths professionnels pour mariages, événements d'entreprise et fêtes privées à Bruxelles. Service premium, photos instantanées et personnalisation complète.",
        "keywords": [
          "location photobooth",
          "borne photo Bruxelles",
          "photobooth mariage",
          "animation photo événement",
          "location borne photo entreprise"
        ],
        "publisher": {
          "@id": "https://www.xn--borne-kb-80ai.com/#organization"
        },
        "inLanguage": "fr-BE"
      },
      {
        "@type": "ImageObject",
        "@id": "https://www.xn--borne-kb-80ai.com/#primaryimage",
        "url": "https://www.xn--borne-kb-80ai.com/og-image.jpg",
        "width": 1200,
        "height": 630,
        "caption": "Photobooth Borne Kébè en action"
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