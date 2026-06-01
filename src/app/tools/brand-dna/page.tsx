'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna, Shield, Target, Users, Megaphone,
  ChevronRight, ChevronLeft, Lock, Unlock, CheckCircle,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

// ─── Brand DNA Extraction Phases (Hidden Step Q&A) ───────────────────────────

interface Phase {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  questions: string[];
  outputLabels: string[];
}

const phases: Phase[] = [
  {
    id: 'identity',
    title: 'Identity',
    icon: Dna,
    description: 'Discover who you are at the core — before products, before marketing.',
    questions: [
      'Who are you beyond your product or service?',
      'What do you do that creates real change?',
      'Why did you start this — what moment made it unavoidable?',
      'What transformation do you create for people?',
      'What do you want to be known for in 10 years?',
      'What would people thank you for a decade from now?',
      'What is your superpower as a founder?',
    ],
    outputLabels: ['Founder Identity', 'Mission', 'Transformation Promise'],
  },
  {
    id: 'beliefs',
    title: 'Beliefs',
    icon: Shield,
    description: 'Uncover the convictions that separate you from everyone else.',
    questions: [
      'What do you believe that most people in your industry don\'t?',
      'What frustrates you most about your industry?',
      'What myths do people believe that you know are wrong?',
      'What truths do you constantly repeat to your team or audience?',
      'What do your competitors consistently get wrong?',
    ],
    outputLabels: ['Core Beliefs', 'Contrarian Views', 'Industry Myths Rejected'],
  },
  {
    id: 'personality',
    title: 'Personality',
    icon: Sparkles,
    description: 'Define how your brand feels, speaks, and shows up in the world.',
    questions: [
      'How should your brand feel when someone interacts with it?',
      'What should your brand never sound like?',
      'Is your brand bold, playful, serious, intellectual, or something else?',
      'Which archetype fits best: Protector, Builder, Rebel, Sage, or Creator?',
    ],
    outputLabels: ['Brand Voice', 'Tone', 'Communication Style'],
  },
  {
    id: 'audience',
    title: 'Audience',
    icon: Users,
    description: 'Understand the people you serve — their fears, desires, and dreams.',
    questions: [
      'Who is your ideal audience — describe them vividly?',
      'What keeps them awake at night?',
      'What do they fear most about their situation?',
      'What do they secretly want but won\'t say out loud?',
      'What transformation are they seeking?',
    ],
    outputLabels: ['Audience Avatar', 'Pain Points', 'Aspirations'],
  },
  {
    id: 'positioning',
    title: 'Positioning',
    icon: Target,
    description: 'Claim your space in the market — why you, why now.',
    questions: [
      'What category are you currently in?',
      'What category should you own?',
      'Why are you fundamentally different from alternatives?',
      'Why should customers choose you over everyone else?',
    ],
    outputLabels: ['Market Position', 'Unique Advantage'],
  },
  {
    id: 'messaging',
    title: 'Content & Messaging',
    icon: Megaphone,
    description: 'Build the messaging system that makes your brand unforgettable.',
    questions: [
      'What topics should you own in your space?',
      'What problems do you solve repeatedly for people?',
      'What frameworks or methods do you teach?',
    ],
    outputLabels: ['Content Pillars', 'Messaging Themes'],
  },
];

// ─── Brand DNA Extractor Component ──────────────────────────────────────────

function BrandDNAExtractor() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const phase = phases[currentPhase];

  const handleStart = () => {
    setIsStarted(true);
    setCurrentAnswers(new Array(phases[0].questions.length).fill(''));
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...currentAnswers];
    updated[index] = value;
    setCurrentAnswers(updated);
  };

  const handleNext = () => {
    const newAnswers = { ...answers, [phase.id]: currentAnswers };
    setAnswers(newAnswers);
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
      setCurrentAnswers(new Array(phases[currentPhase + 1].questions.length).fill(''));
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentPhase > 0) {
      setCurrentPhase(currentPhase - 1);
      setCurrentAnswers(answers[phases[currentPhase - 1].id] || []);
    }
  };

  const allAnswered = currentAnswers.every((a) => a.trim().length > 0);

  if (!isStarted) {
    return (
      <motion.div className="text-center py-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Lock size={48} className="mx-auto text-secondary mb-6" />
        <h3 className="text-2xl font-heading font-bold mb-4">Extract Your Brand DNA</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-2">
          Your Brand DNA is hidden behind a series of strategic questions.
          Answer each phase honestly — the deeper you go, the more powerful your brand blueprint becomes.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          6 phases &middot; {phases.reduce((sum, p) => sum + p.questions.length, 0)} questions &middot; 1 complete Brand DNA Blueprint
        </p>
        <button onClick={handleStart} className="btn-primary inline-flex items-center gap-2">
          <Unlock size={18} /> Begin Extraction
        </button>
      </motion.div>
    );
  }

  if (isComplete) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12">
        <div className="text-center mb-12">
          <CheckCircle size={48} className="mx-auto text-accent mb-4" />
          <h3 className="text-2xl font-heading font-bold mb-2">Your Brand DNA Blueprint</h3>
          <p className="text-gray-600 dark:text-gray-400">Based on your answers, here is your extracted brand identity.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((p) => (
            <div key={p.id} className="p-6 rounded-card bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 shadow-soft">
              <p.icon size={24} className="text-secondary mb-3" />
              <h4 className="font-heading font-semibold mb-3">{p.title}</h4>
              <div className="space-y-2">
                {p.outputLabels.map((label, i) => (
                  <div key={label}>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">{label}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{answers[p.id]?.[i] || 'Not provided'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-8">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {phases.map((p, i) => (
          <div key={p.id} className="flex-1">
            <div className={`h-2 rounded-full transition-colors ${
              i < currentPhase ? 'bg-accent' : i === currentPhase ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-700'
            }`} />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <phase.icon size={28} className="text-secondary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              Phase {currentPhase + 1} of {phases.length}
            </span>
          </div>
          <h3 className="text-xl font-heading font-bold mb-1">{phase.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">{phase.description}</p>

          <div className="space-y-6">
            {phase.questions.map((q, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{q}</label>
                <textarea
                  value={currentAnswers[i] || ''}
                  onChange={(e) => handleAnswerChange(i, e.target.value)}
                  className="w-full input-field min-h-[80px] resize-y"
                  placeholder="Type your answer..."
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentPhase === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-btn text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!allAnswered}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentPhase === phases.length - 1 ? 'Generate Blueprint' : 'Next Phase'}
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function BrandDNAPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Dna size={40} className="mx-auto text-secondary mb-4" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Extract Your Brand DNA
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              A strategic framework for extracting brand identity from any business.
              Answer the questions, unlock your blueprint. Powered by AMI.
            </p>
          </motion.div>
        </section>

        {/* Extractor */}
        <section className="section-padding max-w-3xl mx-auto">
          <BrandDNAExtractor />
        </section>
      </main>
      <Footer />
    </>
  );
}
