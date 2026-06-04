/**
 * Multi-language support utilities.
 * Requirement 3.2: Language detection, preference storage, and supported languages.
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

const LANG_KEY = 'kl_language';

/**
 * Detect user's preferred language from browser settings.
 */
export function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language?.split('-')[0] || 'en';
  const supported = SUPPORTED_LANGUAGES.find(l => l.code === browserLang);
  return supported ? supported.code : 'en';
}

/**
 * Get stored language preference, or detect from browser.
 */
export function getLanguagePreference(): string {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem(LANG_KEY) || detectBrowserLanguage();
}

/**
 * Save language preference.
 */
export function setLanguagePreference(code: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANG_KEY, code);
}

/**
 * Get language data by code.
 */
export function getLanguageByCode(code: string): Language {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
}
