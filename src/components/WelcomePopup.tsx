'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, MessageCircle } from 'lucide-react';
import { SUPPORTED_LANGUAGES, detectBrowserLanguage, setLanguagePreference, getLanguageByCode } from '@/lib/language';

const WELCOME_DISMISSED_KEY = 'kl_welcome_dismissed';

interface WelcomePopupProps {
  onStartOnboarding?: () => void;
}

export default function WelcomePopup({ onStartOnboarding }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [detectedLang, setDetectedLang] = useState('en');
  const [selectedLang, setSelectedLang] = useState('en');
  const [showLangPicker, setShowLangPicker] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem(WELCOME_DISMISSED_KEY);
    if (!dismissed) {
      const lang = detectBrowserLanguage();
      setDetectedLang(lang);
      setSelectedLang(lang);
      // Show after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  function handleDismiss() {
    setIsVisible(false);
    localStorage.setItem(WELCOME_DISMISSED_KEY, 'true');
  }

  function handleGetStarted() {
    setLanguagePreference(selectedLang);
    handleDismiss();
    if (onStartOnboarding) onStartOnboarding();
  }

  const langData = getLanguageByCode(detectedLang);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏪</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Welcome to KlASSIFIED! 👋
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Africa&apos;s marketplace for food, groceries, logistics & more
              </p>
            </div>

            {/* Language detection */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-primary" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Detected: <strong>{langData.flag} {langData.nativeName}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setShowLangPicker(!showLangPicker)}
                  className="text-xs text-primary hover:underline"
                >
                  Change
                </button>
              </div>

              {showLangPicker && (
                <div className="mt-3 grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLang(lang.code); setShowLangPicker(false); }}
                      className={`text-left text-xs px-3 py-2 rounded-lg border transition-colors ${
                        selectedLang === lang.code
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                      }`}
                    >
                      {lang.flag} {lang.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleGetStarted}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:shadow-lg transition-shadow"
              >
                Get Started 🚀
              </button>
              <button
                onClick={handleDismiss}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                I&apos;ll explore on my own
              </button>
            </div>

            {/* AI assistant hint */}
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <MessageCircle size={12} />
              AMI, your AI assistant, is always available to help
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
