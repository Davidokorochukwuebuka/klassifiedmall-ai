'use client';

import { useState, useRef, useEffect } from 'react';
import {
  COUNTRIES,
  CountryData,
  formatE164,
  stripNonDigits,
  removeLeadingZeros,
  validatePhoneLength,
  searchCountries,
  getDefaultCountry,
} from '@/lib/phone-utils';

interface PhoneInputProps {
  value: string;
  onChange: (e164: string) => void;
  defaultCountry?: string;
  error?: string;
  required?: boolean;
}

export default function PhoneInput({ value, onChange, defaultCountry = 'NG', error, required }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(
    COUNTRIES.find((c) => c.code === defaultCountry) || getDefaultCountry()
  );
  const [nationalNumber, setNationalNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update parent with E.164 value when country or number changes
  function handleNumberChange(rawInput: string) {
    const digitsOnly = stripNonDigits(rawInput);
    setNationalNumber(digitsOnly);

    if (digitsOnly.length > 0) {
      const cleaned = removeLeadingZeros(digitsOnly);
      const e164 = formatE164(selectedCountry.dialCode, cleaned);
      onChange(e164);

      // Validate length
      const err = validatePhoneLength(digitsOnly, selectedCountry);
      setValidationError(err);
    } else {
      onChange('');
      setValidationError(null);
    }
  }

  function handleCountrySelect(country: CountryData) {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch('');

    // Reformat with new country code
    if (nationalNumber.length > 0) {
      const cleaned = removeLeadingZeros(nationalNumber);
      const e164 = formatE164(country.dialCode, cleaned);
      onChange(e164);
      const err = validatePhoneLength(nationalNumber, country);
      setValidationError(err);
    }
  }

  const filteredCountries = searchCountries(search);
  const displayError = error || validationError;

  return (
    <div className="w-full">
      <div className="flex items-stretch">
        {/* Country selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-3 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors min-w-[90px]"
            aria-label="Select country code"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">+{selectedCountry.dialCode}</span>
            <span className="text-xs text-gray-400">▼</span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-64 overflow-hidden">
              {/* Search input */}
              <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-primary"
                  autoFocus
                />
              </div>

              {/* Country list */}
              <div className="overflow-y-auto max-h-48">
                {filteredCountries.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-500">No countries found</p>
                ) : (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        country.code === selectedCountry.code ? 'bg-green-50 dark:bg-green-900/20' : ''
                      }`}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="flex-1 text-sm text-gray-800 dark:text-gray-200">{country.name}</span>
                      <span className="text-sm text-gray-500">+{country.dialCode}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          type="tel"
          value={nationalNumber}
          onChange={(e) => handleNumberChange(e.target.value)}
          placeholder="Phone number"
          required={required}
          className={`flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-r-lg focus:outline-none focus:border-primary ${
            displayError ? 'border-red-400 focus:border-red-400' : ''
          }`}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>

      {/* Error message */}
      {displayError && (
        <p className="mt-1 text-xs text-red-500">{displayError}</p>
      )}

      {/* Helper text */}
      {!displayError && nationalNumber.length > 0 && (
        <p className="mt-1 text-xs text-gray-400">
          Format: +{selectedCountry.dialCode} {nationalNumber}
        </p>
      )}
    </div>
  );
}
