'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, getLanguagePreference, setLanguagePreference, getLanguageByCode } from '@/lib/language';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(() => getLanguagePreference());

  function handleSelect(code: string) {
    setCurrent(code);
    setLanguagePreference(code);
    setIsOpen(false);
    // In a full implementation, this would trigger re-render of translated content
  }

  const currentLang = getLanguageByCode(current);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Change language"
      >
        <Globe size={14} />
        <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                lang.code === current ? 'bg-primary/5 text-primary font-medium' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
