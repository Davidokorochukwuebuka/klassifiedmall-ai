'use client';



interface OnboardingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onStartOnboarding: () => void;
  detectedLanguage?: string;
}

export default function OnboardingPopup({
  isOpen,
  onClose,
  onStartOnboarding,
  detectedLanguage = 'English',
}: OnboardingPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 animate-in fade-in zoom-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to KlASSIFIED Mall!
          </h2>
          <p className="text-gray-600 mb-2">
            I&apos;m your AI assistant. I&apos;ll guide you through setting up your
            account step by step.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Detected language: <span className="font-medium">{detectedLanguage}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={onStartOnboarding}
              className="btn-primary w-full text-lg py-3"
            >
              Start Guided Setup
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm"
            >
              I&apos;ll explore on my own
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

