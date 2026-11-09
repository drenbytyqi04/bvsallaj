/** Central business data. Values in [brackets] / null must be confirmed by the owner. */
export const site = {
  name: "BV-Sallaj Boden & Innenausbau",
  shortName: "BV-Sallaj",
  owners: "B. & V. Sallaj",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://bv-sallajbodeninnenausbau.de").replace(/\/$/, ""),
  phone: "+49 176 84504026",
  phoneHref: "tel:+4917684504026",
  phone2: "+49 176 84525401",
  phone2Href: "tel:+4917684525401",
  whatsapp: "4917684504026" as string | null,
  email: null as string | null,
  street: "Nickelstraße 20",
  zip: "52249",
  city: "Eschweiler",
  country: "DE",
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { days: ["Saturday"], opens: "08:00", closes: "13:00" },
  ],
  rating: { value: "5,0", valueNum: 5, count: 6 },
  reviewsUrl: "https://www.google.com/maps/search/?api=1&query=BV-Sallaj+Boden+%26+Innenausbau+Eschweiler",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Nickelstra%C3%9Fe+20%2C+52249+Eschweiler",
  mapsEmbed: "https://www.google.com/maps?q=Nickelstra%C3%9Fe+20,+52249+Eschweiler&z=11&output=embed",
  cities: ["Eschweiler", "Aachen", "Stolberg", "Düren"],
} as const;

export const SERVICE_SLUGS = ["bodenbelaege", "fliesen", "malerarbeiten", "trockenbau", "renovierung"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
