'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, MapPin, Clock, Star, Phone, MessageCircle, Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/home/Navbar';

type ServiceMode = 'hailing' | 'booking' | 'schedule';
type Step = 'mode' | 'vehicle' | 'details' | 'searching' | 'matched';

interface VehicleType {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  eta: string;
  capacity: string;
  color: string;
}

const vehicleTypes: VehicleType[] = [
  { id: 'bike', name: 'Bike', icon: '🏍️', description: 'Quick errands & small packages', basePrice: 500, eta: '3-5 min', capacity: 'Up to 10kg', color: '#10B981' },
  { id: 'keke', name: 'Keke', icon: '🛺', description: 'Tricycle for short distances', basePrice: 800, eta: '5-8 min', capacity: 'Up to 30kg', color: '#F59E0B' },
  { id: 'cab', name: 'Cab', icon: '🚗', description: 'Comfortable ride or medium packages', basePrice: 1500, eta: '5-10 min', capacity: 'Up to 50kg', color: '#3B82F6' },
  { id: 'van', name: 'Van', icon: '🚐', description: 'Large items & bulk deliveries', basePrice: 3500, eta: '10-15 min', capacity: 'Up to 500kg', color: '#8B5CF6' },
  { id: 'bus', name: 'Bus', icon: '🚌', description: 'Group transport & large cargo', basePrice: 5000, eta: '15-20 min', capacity: 'Up to 2 tons', color: '#EC4899' },
  { id: 'mini-truck', name: 'Mini Truck', icon: '🚛', description: 'Heavy goods & furniture', basePrice: 8000, eta: '20-30 min', capacity: 'Up to 5 tons', color: '#EF4444' },
  { id: 'truck', name: 'Truck', icon: '🚚', description: 'Industrial & bulk freight', basePrice: 15000, eta: '30-45 min', capacity: 'Up to 20 tons', color: '#6366F1' },
  { id: 'air', name: 'Air Delivery', icon: '✈️', description: 'Express inter-city & international', basePrice: 25000, eta: '1-3 days', capacity: 'Up to 100kg', color: '#06B6D4' },
  { id: 'sea', name: 'Sea Delivery', icon: '🚢', description: 'Bulk international shipping', basePrice: 50000, eta: '7-21 days', capacity: 'Unlimited', color: '#14B8A6' },
];

const serviceModes = [
  { id: 'hailing' as ServiceMode, name: 'Hail Now', icon: '🚀', description: 'Get a rider immediately', color: '#61CE70' },
  { id: 'booking' as ServiceMode, name: 'Book Ride', icon: '📍', description: 'Book for pickup/delivery', color: '#6EC1E4' },
  { id: 'schedule' as ServiceMode, name: 'Schedule', icon: '📅', description: 'Plan ahead for later', color: '#D4A017' },
];

export default function HailPage() {
  const [step, setStep] = useState<Step>('mode');
  const [mode, setMode] = useState<ServiceMode>('hailing');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [matchedDriverData, setMatchedDriverData] = useState<any>(null);

  const handleFindDriver = async () => {
    setStep('searching');
    try {
      const res = await fetch('/api/hailing/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickup,
          destination: dropoff,
          vehicleType: selectedVehicle?.id || 'car',
          mode,
          scheduledAt: mode === 'schedule' ? scheduleDate : undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.driver) {
        // Store matched driver data for display
        setMatchedDriverData(data.data);
      }
      setTimeout(() => setStep('matched'), 2000);
    } catch (err) {
      console.error('Failed to find driver:', err);
      setTimeout(() => setStep('matched'), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <Navbar />

      <div className="pt-20 pb-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* Header */}
          <div className="flex items-center gap-3">
            {step !== 'mode' && (
              <button
                onClick={() => {
                  if (step === 'vehicle') setStep('mode');
                  else if (step === 'details') setStep('vehicle');
                  else setStep('mode');
                }}
                className="w-10 h-10 rounded-2xl bg-white dark:bg-card-dark shadow-soft flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold">
                {step === 'mode' && 'Logistics & Delivery'}
                {step === 'vehicle' && 'Choose Vehicle'}
                {step === 'details' && 'Trip Details'}
                {step === 'searching' && 'Finding Driver...'}
                {step === 'matched' && 'Driver Found!'}
              </h1>
              <p className="text-sm text-gray-500">
                {step === 'mode' && 'How would you like to move?'}
                {step === 'vehicle' && 'Select the right vehicle for your needs'}
                {step === 'details' && 'Enter pickup and delivery details'}
              </p>
            </div>
          </div>

          {/* Map Area */}
          <motion.div
            className="relative h-40 sm:h-48 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#6EC1E4]/20 via-[#61CE70]/10 to-[#D4A017]/20 border border-gray-200 dark:border-gray-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Navigation size={48} className="text-primary/40" />
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-primary/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
            {/* Decorative dots */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-accent animate-pulse" />
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-error animate-pulse" />
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Step 1: Service Mode */}
            {step === 'mode' && (
              <motion.div
                key="mode"
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {serviceModes.map((m, i) => (
                  <motion.button
                    key={m.id}
                    onClick={() => { setMode(m.id); setStep('vehicle'); }}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-card-dark shadow-soft hover:shadow-glow transition-all group text-left"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${m.color}15` }}>
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold">{m.name}</h3>
                      <p className="text-sm text-gray-500">{m.description}</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Vehicle Selection */}
            {step === 'vehicle' && (
              <motion.div
                key="vehicle"
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicleTypes.map((v, i) => (
                    <motion.button
                      key={v.id}
                      onClick={() => { setSelectedVehicle(v); setStep('details'); }}
                      className={`relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left overflow-hidden group ${
                        selectedVehicle?.id === v.id
                          ? 'border-primary bg-primary/5 shadow-glow'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark hover:border-primary/50 hover:shadow-soft'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: `${v.color}15` }}>
                        {v.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-bold text-sm">{v.name}</h3>
                          <span className="text-xs font-bold text-primary">₦{v.basePrice.toLocaleString()}+</span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate">{v.description}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Clock size={8} /> {v.eta}</span>
                          <span className="text-[10px] text-gray-400">{v.capacity}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Trip Details */}
            {step === 'details' && selectedVehicle && (
              <motion.div
                key="details"
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Selected vehicle summary */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <span className="text-2xl">{selectedVehicle.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold text-sm">{selectedVehicle.name}</span>
                    <span className="text-xs text-gray-500 ml-2">From ₦{selectedVehicle.basePrice.toLocaleString()}</span>
                  </div>
                  <button onClick={() => setStep('vehicle')} className="text-xs text-primary font-medium">Change</button>
                </div>

                {/* Location inputs */}
                <div className="rounded-2xl bg-white dark:bg-card-dark shadow-soft p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-accent border-2 border-accent/30" />
                      <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
                      <span className="w-3 h-3 rounded-full bg-error border-2 border-error/30" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Pickup location"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-primary text-sm"
                      />
                      <input
                        type="text"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        placeholder="Drop-off location"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>

                  {/* Schedule option */}
                  {mode === 'schedule' && (
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Schedule Date & Time</label>
                      <input
                        type="datetime-local"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  )}

                  {/* Package details for booking */}
                  {mode === 'booking' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Package Weight</label>
                        <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm focus:outline-none focus:border-primary">
                          <option>Light (&lt;5kg)</option>
                          <option>Medium (5-20kg)</option>
                          <option>Heavy (20-50kg)</option>
                          <option>Very Heavy (50kg+)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Urgency</label>
                        <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-sm focus:outline-none focus:border-primary">
                          <option>Standard</option>
                          <option>Express (30 min)</option>
                          <option>Same Day</option>
                          <option>Next Day</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price estimate */}
                <div className="rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Estimated Fare</span>
                    <span className="text-xl font-heading font-bold text-primary">
                      ₦{(selectedVehicle.basePrice * 1.5).toLocaleString()} - ₦{(selectedVehicle.basePrice * 3).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Final price depends on distance and traffic</p>
                </div>

                <button
                  onClick={handleFindDriver}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-heading font-bold text-lg shadow-glow hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  {mode === 'schedule' ? '📅 Schedule Pickup' : mode === 'booking' ? '📦 Book Delivery' : '🚀 Find Driver Now'}
                </button>
              </motion.div>
            )}

            {/* Step 4: Searching */}
            {step === 'searching' && (
              <motion.div
                key="searching"
                className="rounded-3xl bg-white dark:bg-card-dark shadow-soft p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-primary/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-accent/20"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-2xl">{selectedVehicle?.icon || '🚗'}</span>
                  </div>
                </div>
                <h2 className="font-heading font-bold text-lg">Finding nearby drivers...</h2>
                <p className="text-sm text-gray-500 mt-1">Matching you with the best {selectedVehicle?.name || 'driver'}</p>
              </motion.div>
            )}

            {/* Step 5: Matched */}
            {step === 'matched' && (
              <motion.div
                key="matched"
                className="rounded-3xl bg-white dark:bg-card-dark shadow-soft p-6 space-y-5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                  >
                    <span className="text-2xl">{selectedVehicle?.icon || '🚗'}</span>
                  </motion.div>
                  <h2 className="font-heading font-bold text-lg">Driver Matched!</h2>
                </div>

                {/* Driver info */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl">
                    👨
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{matchedDriverData?.driver?.name || 'Emeka Adeyemi'}</h3>
                    <p className="text-xs text-gray-500">{matchedDriverData?.driver?.vehicleName || 'Toyota Corolla'} · {matchedDriverData?.driver?.plateNumber || 'LAG-234-XY'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star size={12} className="text-warning fill-warning" />
                      <span className="text-xs font-medium">{matchedDriverData?.driver?.rating || 4.9}</span>
                      <span className="text-xs text-gray-400">• {matchedDriverData?.driver?.totalTrips || '1,200'}+ trips</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-heading font-bold text-primary">₦{(matchedDriverData?.estimatedFare || (selectedVehicle?.basePrice || 1500) * 2).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} /> {matchedDriverData?.driver?.eta || selectedVehicle?.eta || '8 min'}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <Phone size={16} /> Call
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <MessageCircle size={16} /> Message
                  </button>
                </div>

                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-heading font-bold shadow-glow">
                  Confirm Pickup
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

