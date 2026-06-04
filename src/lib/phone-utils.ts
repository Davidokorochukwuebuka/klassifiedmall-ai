/**
 * Phone number utilities — E.164 formatting, country data, validation.
 * Full global country list with dial codes and flags.
 */

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  minDigits: number;
  maxDigits: number;
}

export const COUNTRIES: CountryData[] = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '234', minDigits: 7, maxDigits: 11 },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '1', minDigits: 10, maxDigits: 10 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '44', minDigits: 10, maxDigits: 10 },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', dialCode: '233', minDigits: 9, maxDigits: 9 },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '27', minDigits: 9, maxDigits: 9 },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '254', minDigits: 9, maxDigits: 9 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '1', minDigits: 10, maxDigits: 10 },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '91', minDigits: 10, maxDigits: 10 },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', dialCode: '93', minDigits: 9, maxDigits: 9 },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', dialCode: '355', minDigits: 9, maxDigits: 9 },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', dialCode: '213', minDigits: 9, maxDigits: 9 },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', dialCode: '244', minDigits: 9, maxDigits: 9 },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '54', minDigits: 10, maxDigits: 10 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '61', minDigits: 9, maxDigits: 9 },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', dialCode: '43', minDigits: 10, maxDigits: 11 },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', dialCode: '973', minDigits: 8, maxDigits: 8 },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', dialCode: '880', minDigits: 10, maxDigits: 10 },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', dialCode: '32', minDigits: 9, maxDigits: 9 },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', dialCode: '229', minDigits: 8, maxDigits: 8 },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', dialCode: '267', minDigits: 7, maxDigits: 8 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '55', minDigits: 10, maxDigits: 11 },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dialCode: '226', minDigits: 8, maxDigits: 8 },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', dialCode: '257', minDigits: 8, maxDigits: 8 },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', dialCode: '855', minDigits: 8, maxDigits: 9 },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', dialCode: '237', minDigits: 9, maxDigits: 9 },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', dialCode: '236', minDigits: 8, maxDigits: 8 },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', dialCode: '235', minDigits: 8, maxDigits: 8 },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '56', minDigits: 9, maxDigits: 9 },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '86', minDigits: 11, maxDigits: 11 },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '57', minDigits: 10, maxDigits: 10 },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', dialCode: '269', minDigits: 7, maxDigits: 7 },
  { code: 'CG', name: 'Congo', flag: '🇨🇬', dialCode: '242', minDigits: 9, maxDigits: 9 },
  { code: 'CD', name: 'DR Congo', flag: '🇨🇩', dialCode: '243', minDigits: 9, maxDigits: 9 },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', dialCode: '506', minDigits: 8, maxDigits: 8 },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', dialCode: '225', minDigits: 10, maxDigits: 10 },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', dialCode: '385', minDigits: 9, maxDigits: 9 },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', dialCode: '53', minDigits: 8, maxDigits: 8 },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', dialCode: '420', minDigits: 9, maxDigits: 9 },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', dialCode: '45', minDigits: 8, maxDigits: 8 },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', dialCode: '253', minDigits: 8, maxDigits: 8 },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', dialCode: '593', minDigits: 9, maxDigits: 9 },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '20', minDigits: 10, maxDigits: 10 },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', dialCode: '240', minDigits: 9, maxDigits: 9 },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', dialCode: '291', minDigits: 7, maxDigits: 7 },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', dialCode: '251', minDigits: 9, maxDigits: 9 },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', dialCode: '358', minDigits: 9, maxDigits: 10 },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '33', minDigits: 9, maxDigits: 9 },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '241', minDigits: 7, maxDigits: 8 },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', dialCode: '220', minDigits: 7, maxDigits: 7 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '49', minDigits: 10, maxDigits: 11 },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', dialCode: '30', minDigits: 10, maxDigits: 10 },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', dialCode: '224', minDigits: 9, maxDigits: 9 },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', dialCode: '245', minDigits: 7, maxDigits: 7 },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', dialCode: '852', minDigits: 8, maxDigits: 8 },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', dialCode: '36', minDigits: 9, maxDigits: 9 },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '62', minDigits: 9, maxDigits: 12 },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', dialCode: '98', minDigits: 10, maxDigits: 10 },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', dialCode: '964', minDigits: 10, maxDigits: 10 },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', dialCode: '353', minDigits: 9, maxDigits: 9 },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', dialCode: '972', minDigits: 9, maxDigits: 9 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '39', minDigits: 9, maxDigits: 10 },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', dialCode: '1876', minDigits: 7, maxDigits: 7 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '81', minDigits: 10, maxDigits: 10 },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', dialCode: '962', minDigits: 9, maxDigits: 9 },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', dialCode: '965', minDigits: 8, maxDigits: 8 },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', dialCode: '231', minDigits: 7, maxDigits: 8 },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', dialCode: '218', minDigits: 9, maxDigits: 9 },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', dialCode: '261', minDigits: 9, maxDigits: 9 },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', dialCode: '265', minDigits: 8, maxDigits: 9 },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '60', minDigits: 9, maxDigits: 10 },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '223', minDigits: 8, maxDigits: 8 },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', dialCode: '222', minDigits: 8, maxDigits: 8 },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', dialCode: '230', minDigits: 8, maxDigits: 8 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '52', minDigits: 10, maxDigits: 10 },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', dialCode: '212', minDigits: 9, maxDigits: 9 },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', dialCode: '258', minDigits: 9, maxDigits: 9 },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', dialCode: '95', minDigits: 8, maxDigits: 10 },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', dialCode: '264', minDigits: 9, maxDigits: 9 },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', dialCode: '977', minDigits: 10, maxDigits: 10 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '31', minDigits: 9, maxDigits: 9 },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '64', minDigits: 8, maxDigits: 10 },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', dialCode: '227', minDigits: 8, maxDigits: 8 },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '47', minDigits: 8, maxDigits: 8 },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', dialCode: '968', minDigits: 8, maxDigits: 8 },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '92', minDigits: 10, maxDigits: 10 },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', dialCode: '507', minDigits: 8, maxDigits: 8 },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', dialCode: '675', minDigits: 8, maxDigits: 8 },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', dialCode: '51', minDigits: 9, maxDigits: 9 },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '63', minDigits: 10, maxDigits: 10 },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '48', minDigits: 9, maxDigits: 9 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '351', minDigits: 9, maxDigits: 9 },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', dialCode: '974', minDigits: 8, maxDigits: 8 },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', dialCode: '40', minDigits: 9, maxDigits: 9 },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '7', minDigits: 10, maxDigits: 10 },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', dialCode: '250', minDigits: 9, maxDigits: 9 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '966', minDigits: 9, maxDigits: 9 },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', dialCode: '221', minDigits: 9, maxDigits: 9 },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', dialCode: '381', minDigits: 9, maxDigits: 9 },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', dialCode: '232', minDigits: 8, maxDigits: 8 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '65', minDigits: 8, maxDigits: 8 },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', dialCode: '252', minDigits: 7, maxDigits: 8 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '82', minDigits: 9, maxDigits: 10 },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', dialCode: '211', minDigits: 9, maxDigits: 9 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '34', minDigits: 9, maxDigits: 9 },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dialCode: '94', minDigits: 9, maxDigits: 9 },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', dialCode: '249', minDigits: 9, maxDigits: 9 },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '46', minDigits: 9, maxDigits: 10 },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '41', minDigits: 9, maxDigits: 9 },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', dialCode: '886', minDigits: 9, maxDigits: 9 },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dialCode: '255', minDigits: 9, maxDigits: 9 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '66', minDigits: 9, maxDigits: 9 },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', dialCode: '228', minDigits: 8, maxDigits: 8 },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', dialCode: '216', minDigits: 8, maxDigits: 8 },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', dialCode: '90', minDigits: 10, maxDigits: 10 },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', dialCode: '256', minDigits: 9, maxDigits: 9 },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '380', minDigits: 9, maxDigits: 9 },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', dialCode: '971', minDigits: 9, maxDigits: 9 },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', dialCode: '598', minDigits: 8, maxDigits: 8 },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', dialCode: '58', minDigits: 10, maxDigits: 10 },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '84', minDigits: 9, maxDigits: 10 },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', dialCode: '967', minDigits: 9, maxDigits: 9 },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', dialCode: '260', minDigits: 9, maxDigits: 9 },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', dialCode: '263', minDigits: 9, maxDigits: 9 },
];

export function stripNonDigits(input: string): string {
  return input.replace(/\D/g, '');
}

export function removeLeadingZeros(nationalNumber: string): string {
  return nationalNumber.replace(/^0+/, '');
}

export function formatE164(dialCode: string, nationalNumber: string): string {
  const cleanDialCode = stripNonDigits(dialCode);
  const cleanNational = removeLeadingZeros(stripNonDigits(nationalNumber));
  return `+${cleanDialCode}${cleanNational}`;
}

export function parseE164(e164: string): { dialCode: string; nationalNumber: string } | null {
  if (!e164 || !e164.startsWith('+')) return null;
  const digits = e164.slice(1);
  const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
  for (const country of sortedCountries) {
    if (digits.startsWith(country.dialCode)) {
      return { dialCode: country.dialCode, nationalNumber: digits.slice(country.dialCode.length) };
    }
  }
  return digits.length > 3 ? { dialCode: digits.slice(0, 3), nationalNumber: digits.slice(3) } : null;
}

export function validatePhoneLength(nationalNumber: string, country: CountryData): string | null {
  const clean = removeLeadingZeros(stripNonDigits(nationalNumber));
  if (clean.length === 0) return 'Phone number is required';
  if (clean.length < country.minDigits) return `Phone number must be at least ${country.minDigits} digits for ${country.name}`;
  if (clean.length > country.maxDigits) return `Phone number must be at most ${country.maxDigits} digits for ${country.name}`;
  return null;
}

export function searchCountries(query: string): CountryData[] {
  if (!query.trim()) return COUNTRIES;
  const q = query.toLowerCase().trim();
  return COUNTRIES.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.dialCode.includes(q));
}

export function getCountryByCode(code: string): CountryData | undefined {
  return COUNTRIES.find(c => c.code === code);
}

export function getDefaultCountry(): CountryData {
  return COUNTRIES[0];
}
