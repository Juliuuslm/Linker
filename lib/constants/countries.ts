export interface Country {
  code: string;
  iso: string;
  name: string;
}

export const COUNTRIES: Country[] = [
  { code: "+52", iso: "mx", name: "México" },
  { code: "+54", iso: "ar", name: "Argentina" },
  { code: "+57", iso: "co", name: "Colombia" },
  { code: "+34", iso: "es", name: "España" },
  { code: "+1", iso: "us", name: "USA" },
  { code: "+56", iso: "cl", name: "Chile" },
  { code: "+51", iso: "pe", name: "Perú" },
  { code: "+593", iso: "ec", name: "Ecuador" },
  { code: "+502", iso: "gt", name: "Guatemala" },
  { code: "+503", iso: "sv", name: "El Salvador" },
  { code: "+504", iso: "hn", name: "Honduras" },
  { code: "+505", iso: "ni", name: "Nicaragua" },
  { code: "+506", iso: "cr", name: "Costa Rica" },
  { code: "+507", iso: "pa", name: "Panamá" },
  { code: "+591", iso: "bo", name: "Bolivia" },
  { code: "+595", iso: "py", name: "Paraguay" },
  { code: "+598", iso: "uy", name: "Uruguay" },
  { code: "+58", iso: "ve", name: "Venezuela" },
  { code: "+55", iso: "br", name: "Brasil" },
  { code: "+44", iso: "gb", name: "UK" },
  { code: "+33", iso: "fr", name: "France" },
];
