'use client';

import { motion } from 'framer-motion';
import { UserCircle, Rocket, Coins } from 'lucide-react';

const steps = [
  { icon: UserCircle, title: 'Choose Your Role', desc: 'Customer, Vendor, Driver, Investor, or Coach — pick what fits you.', color: '#6C2BD9' },
  { icon: Rocket, title: 'Set Up in Minutes', desc: 'Our guided onboarding gets you live fast with AMI-powered tools.', color: '#2563EB' },
  { icon: Coins, title: 'Start Earning', desc: 'Sell products, deliver orders, invest in businesses, or teach courses.', color: '#10B981' },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50 dark:bg-[#0c1222]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative text-center p-8 rounded-card bg-white dark:bg-card-dark shadow-soft"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${step.color}15` }}>
                <step.icon size={32} style={{ color: step.color }} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
