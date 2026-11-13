/** Central business data. Values in [brackets] / null must be confirmed by the owner. */
export const site = {
  name: "BV-Sallaj Boden & Innenausbau",
  shortName: "BV-Sallaj",
  owners: "Besart Sallaj und Valmir Sallaj",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.bv-sallajbodeninnenausbau.de").replace(/\/$/, ""),
  phone: "+49 176 84504026",
  phoneHref: "tel:+4917684504026",
  phone2: "+49 176 84525401",
  phone2Href: "tel:+4917684525401",
  whatsapp: "4917684504026" as string | null,
  email: "fussbodenbaubv@gmail.com" as string | null,
  // Web3Forms access key – public by design (only allows sending to the registered inbox)
  web3formsKey: "93fa042e-3694-43ec-9b42-112c8404fcb4",
  street: "Nickelstraße 20",
  zip: "52249",
  city: "Eschweiler",
  country: "DE",
  // from the Google Maps Plus Code R6FQ+5P Eschweiler (9F28R6FQ+5P)
  geo: { lat: 50.822937, lng: 6.239313 },
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { days: ["Saturday"], opens: "08:00", closes: "13:00" },
  ],
  rating: { value: "5,0", valueNum: 5, count: 6 },
  reviewsUrl: "https://www.google.com/maps/search/?api=1&query=BV-Sallaj+Boden+%26+Innenausbau+Eschweiler",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nickelstra%C3%9Fe+20%2C+52249+Eschweiler",
  mapsEmbed: "https://www.google.com/maps?q=Nickelstra%C3%9Fe+20,+52249+Eschweiler&z=15&output=embed",
  cities: ["Eschweiler", "Aachen", "Stolberg", "Düren"],
} as const;

/** Local landing pages: /[locale]/bodenleger/[slug]/ */
export const CITIES = [
  { slug: "eschweiler", name: "Eschweiler" },
  { slug: "aachen", name: "Aachen" },
  { slug: "stolberg", name: "Stolberg" },
  { slug: "dueren", name: "Düren" },
] as const;
export type CitySlug = (typeof CITIES)[number]["slug"];

export const SERVICE_SLUGS = ["bodenbelaege", "fliesen", "malerarbeiten", "trockenbau", "renovierung"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
