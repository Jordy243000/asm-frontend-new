export const officesByCountry = [
  {
    id: "cd",
    country: "République Démocratique du Congo",
    flag: "🇨🇩",
    mapPosition: { top: "65%", left: "63%" },
    offices: [
      {
        id: "kinshasa",
        city: "Kinshasa",
        address:
          "Immeuble KIYO YA SITA, Boulevard du 30 Juin, 8-9ème niveau",
        email: "support@africansm-rdc.com",
      },
      {
        id: "lubumbashi",
        city: "Lubumbashi",
        address:
          "Local L09, N° 535, Avenue Kasa-Vubu, Commune de Lubumbashi",
        email: "Haut.katanga@africansm-rdc.com",
      },
      {
        id: "matadi",
        city: "Matadi",
        address:
          "Route Kinkanda, n°3452 Q/ ville haute, C/Matadi - Kongo Central",
        email: "Kongo.central@africansm-rdc.com",
      },
    ],
  },
  {
    id: "za",
    country: "Afrique du Sud",
    flag: "🇿🇦",
    mapPosition: { top: "80%", left: "60%" },
    offices: [
      {
        id: "cape-town",
        city: "Cape Town",
        address:
          "Unit 7, Ground floor, Canal Edge 1, Tyger Waterfront, Bellville",
        email: "info@padsconsultingsa.co.za",
      },
    ],
  },
  {
    id: "tz",
    country: "Tanzanie",
    flag: "🇹🇿",
    mapPosition: { top: "70%", left: "62%" },
    offices: [
      {
        id: "dar-es-salaam",
        city: "Dar es Salaam",
        address:
          "N° M.A.3 Amverton Towers, Plot N° 1127, Chole Road, Masaki, Dar es Salaam",
        email: "agmmarwa@gmail.com",
      },
    ],
  },
  {
    id: "ke",
    country: "Kenya",
    flag: "🇰🇪",
    mapPosition: { top: "54%", left: "62%" },
    offices: [
      {
        id: "mombasa",
        city: "Mombasa",
        address:
          "6C, 6ème étage, Zaki Plaza, Links Road, Nyali (Mombasa)",
        email: "Almertrading.kenya@gmail.com",
      },
    ],
  },
  {
    id: "in",
    country: "Inde",
    flag: "🇮🇳",
    mapPosition: { top: "47%", left: "67%" },
    offices: [
      {
        id: "rajkot",
        city: "Rajkot",
        address:
          "South Block, 7ème étage, Bureau N°702, Twin Star Near R.K. Prime, RS N°26/2 Plot",
        email: null,
      },
    ],
  },
];

export function getCountryMapMarkers() {
  return officesByCountry.map((group) => ({
    id: group.id,
    country: group.country,
    flag: group.flag,
    mapPosition: group.mapPosition,
    cities: group.offices.map((office) => office.city),
    offices: group.offices,
  }));
}
