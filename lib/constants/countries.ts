import { getCountryFlag } from "@/lib/utils/country-flags";

export interface Country {
  code: string;
  iso: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: "+52", iso: "mx", name: "México", flag: "🇲🇽" },
  { code: "+54", iso: "ar", name: "Argentina", flag: "🇦🇷" },
  { code: "+57", iso: "co", name: "Colombia", flag: "🇨🇴" },
  { code: "+34", iso: "es", name: "España", flag: "🇪🇸" },
  { code: "+1", iso: "us", name: "USA", flag: "🇺🇸" },
  { code: "+56", iso: "cl", name: "Chile", flag: "🇨🇱" },
  { code: "+51", iso: "pe", name: "Perú", flag: "🇵🇪" },
  { code: "+593", iso: "ec", name: "Ecuador", flag: "🇪🇨" },
  { code: "+502", iso: "gt", name: "Guatemala", flag: "🇬🇹" },
  { code: "+503", iso: "sv", name: "El Salvador", flag: "🇸🇻" },
  { code: "+504", iso: "hn", name: "Honduras", flag: "🇭🇳" },
  { code: "+505", iso: "ni", name: "Nicaragua", flag: "🇳🇮" },
  { code: "+506", iso: "cr", name: "Costa Rica", flag: "🇨🇷" },
  { code: "+507", iso: "pa", name: "Panamá", flag: "🇵🇦" },
  { code: "+591", iso: "bo", name: "Bolivia", flag: "🇧🇴" },
  { code: "+595", iso: "py", name: "Paraguay", flag: "🇵🇾" },
  { code: "+598", iso: "uy", name: "Uruguay", flag: "🇺🇾" },
  { code: "+58", iso: "ve", name: "Venezuela", flag: "🇻🇪" },
  { code: "+55", iso: "br", name: "Brasil", flag: "🇧🇷" },
  { code: "+44", iso: "gb", name: "UK", flag: "🇬🇧" },
  { code: "+33", iso: "fr", name: "France", flag: "🇫🇷" },
];
