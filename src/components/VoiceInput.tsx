'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { processVoice } from '../lib/api';

/**
 * Voice Input Component — Uses Web Speech API for voice-to-text.
 * Works in Chrome, Edge, Safari. Sends transcribed text to AI assistant.
 * Also supports voice navigation commands and AI voice processing via Bedrock.
 */

interface VoiceResponse {
  intent: string;
  action: any;
  responseText: string;
  executed: boolean;
}

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onNavigate?: (route: string) => void;
  placeholder?: string;
}

// Navigation commands that the voice assistant understands
const NAV_COMMANDS: Record<string, string> = {
  'go to dashboard': '/dashboard',
  'open dashboard': '/dashboard',
  'go to products': '/products',
  'show products': '/products',
  'go to cart': '/cart',
  'open cart': '/cart',
  'go to orders': '/orders',
  'show orders': '/orders',
  'go to wallet': '/wallet',
  'open wallet': '/wallet',
  'go to community': '/community',
  'open community': '/community',
  'go to hailing': '/hail',
  'book a rider': '/hail',
  'hail a rider': '/hail',
  'go to spaces': '/spaces',
  'book storage': '/spaces',
  'go to settings': '/settings/profile',
  'open settings': '/settings/profile',
  'go to notifications': '/notifications',
  'show notifications': '/notifications',
  'go home': '/',
  'go to home': '/',
  'sign out': '/auth/signin',
  'log out': '/auth/signin',
};

// Format intent strings for display (e.g. "create_listing" → "Create Listing")
function formatIntent(intent: string): string {
  return intent
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function VoiceInput({ onTranscript, onNavigate, placeholder = 'Tap to speak...' }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceResponse, setVoiceResponse] = useState<VoiceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    setIsSupported(
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
    );
  }, []);

  // Clear the voice response display after a delay
  useEffect(() => {
    if (voiceResponse) {
      const timer = setTimeout(() => {
        setVoiceResponse(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [voiceResponse]);

  // Clear error after a delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const sendToVoiceEndpoint = useCallback(async (text: string) => {
    try {
      setIsProcessing(true);
      setError(null);

      const response = await processVoice(undefined, text, undefined);
      const data = response?.data || response;

      if (data && data.intent) {
        setVoiceResponse({
          intent: data.intent,
          action: data.action,
          responseText: data.responseText || '',
          executed: data.executed ?? false,
        });
      }

      // Also pass transcript to parent for display purposes
      onTranscript(text);
    } catch (err: any) {
      setError(err?.message || 'Failed to process voice command');
      // Still pass the transcript to the parent as fallback
      onTranscript(text);
    } finally {
      setIsProcessing(false);
    }
  }, [onTranscript]);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceResponse(null);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const current = event.results[event.results.length - 1];
      const text = current[0].transcript;
      setTranscript(text);

      if (current.isFinal) {
        setIsListening(false);

        // Check for navigation commands first
        const lowerText = text.toLowerCase().trim();
        const navRoute = NAV_COMMANDS[lowerText];

        if (navRoute && onNavigate) {
          onNavigate(navRoute);
          setTranscript(`Navigating to ${navRoute}...`);
          setTimeout(() => setTranscript(''), 2000);
        } else {
          // Send to AI voice endpoint for intent parsing and action execution
          sendToVoiceEndpoint(text);
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTranscript('');
      setError('Voice recognition failed. Please try again.');
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  }, [isSupported, onNavigate, sendToVoiceEndpoint]);

  if (!isSupported) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Voice input button and live transcript */}
      <div className="flex items-center gap-2">
        <button
          onClick={startListening}
          disabled={isListening || isProcessing}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : isProcessing
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary'
          }`}
          aria-label={isListening ? 'Listening...' : 'Start voice input'}
        >
          {isListening ? (
            <>
              <MicOff size={16} className="animate-pulse" />
              <span>Listening...</span>
            </>
          ) : isProcessing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Mic size={16} />
              <span>{placeholder}</span>
            </>
          )}
        </button>

        {transcript && !voiceResponse && (
          <span className="text-xs text-gray-500 italic max-w-[200px] truncate">
            &quot;{transcript}&quot;
          </span>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs">
          <XCircle size={14} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Voice response display */}
      {voiceResponse && (
        <div className="flex flex-col gap-1.5 px-3 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm">
          {/* Intent badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800/50 px-2 py-0.5 rounded-full">
              {formatIntent(voiceResponse.intent)}
            </span>
            {voiceResponse.executed ? (
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <CheckCircle size={12} />
                Executed
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                <AlertCircle size={12} />
                Not executed
              </span>
            )}
          </div>

          {/* Response text */}
          {voiceResponse.responseText && (
            <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
              {voiceResponse.responseText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
