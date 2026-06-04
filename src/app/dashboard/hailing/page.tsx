'use client';

import { useState } from 'react';
import { getDrivers, bookDriver } from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  vehicleType: string;
  rating: number;
  trips: number;
  distance: string;
  eta: string;
  price: number;
  available: boolean;
  phone: string;
  licensePlate: string;
}

export default function HailingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [cargoType, setCargoType] = useState('');
  const [weight, setWeight] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchDone, setSearchDone] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!pickup || !destination) return;
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await getDrivers({ location: pickup });
      setDrivers(res.data.drivers);
      setSearchDone(true);
      setSelectedDriver(null);
      setBookingConfirmed(false);
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (driver: Driver) => {
    try {
      await bookDriver({
        driverId: driver.id,
        pickup,
        destination,
        cargoType,
        weight,
      });
      setSelectedDriver(driver);
      setBookingConfirmed(true);
      setTimeout(() => setBookingConfirmed(false), 4000);
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  const formatPrice = (price: number) => '₦' + price.toLocaleString();

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Hail a Driver</h1>
        <p className="text-sm text-gray-500 mt-1">Find nearby drivers for your cargo delivery needs</p>
      </div>

      {/* Booking Confirmation */}
      {bookingConfirmed && selectedDriver && (
        <div className="fixed top-20 right-4 sm:right-6 bg-green-700 text-white px-5 py-4 rounded-lg shadow-lg z-50 max-w-sm">
          <p className="font-medium">✅ Booking Confirmed!</p>
          <p className="text-sm mt-1 text-green-100">
            {selectedDriver.name} will arrive in {selectedDriver.eta}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card !p-4 sm:!p-6 space-y-4">
            <h2 className="font-semibold text-gray-800">Delivery Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="e.g., Mile 12 Market, Lagos"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Ikeja, Lagos"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Type</label>
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                className="input-field"
              >
                <option value="">Select cargo type</option>
                <option value="perishable">Perishable Goods</option>
                <option value="dry">Dry Goods</option>
                <option value="frozen">Frozen Items</option>
                <option value="livestock">Livestock</option>
                <option value="equipment">Farm Equipment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 500kg"
                className="input-field"
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={!pickup || !destination || loading}
              className="btn-primary w-full min-h-[44px] disabled:opacity-50"
            >
              {loading ? '🔄 Searching...' : '🔍 Find Drivers'}
            </button>
          </div>

          {/* Active Booking */}
          {selectedDriver && (
            <div className="card !p-4 border-green-200 bg-green-50">
              <h3 className="font-semibold text-green-800 mb-3">Active Booking</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver</span>
                  <span className="font-medium">{selectedDriver.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-medium">{selectedDriver.vehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plate</span>
                  <span className="font-medium">{selectedDriver.licensePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA</span>
                  <span className="font-medium text-green-700">{selectedDriver.eta}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-bold text-green-800">{formatPrice(selectedDriver.price)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDriver(null)}
                className="mt-4 w-full px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors min-h-[44px]"
              >
                Cancel Booking
              </button>
            </div>
          )}
        </div>

        {/* Map Placeholder & Drivers */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map Placeholder */}
          <div className="card !p-0 h-48 sm:h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-16 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-20 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-16 right-8 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400"></div>
            </div>
            <div className="text-center z-10">
              <span className="text-4xl sm:text-5xl">🗺️</span>
              <p className="text-gray-600 mt-2 font-medium text-sm sm:text-base">Live Map View</p>
              <p className="text-xs sm:text-sm text-gray-400">
                {searchDone ? `Showing drivers near ${pickup}` : 'Enter locations to see nearby drivers'}
              </p>
            </div>
          </div>

          {/* Available Drivers */}
          {searchDone && (
            <div className="space-y-3">
              <h2 className="font-semibold text-gray-800">Available Drivers ({drivers.length})</h2>
              {drivers.map((driver) => (
                <div key={driver.id} className={`card !p-4 ${!driver.available ? 'opacity-50' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
                        🚛
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">{driver.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{driver.vehicle}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-yellow-500 text-xs">★ {driver.rating}</span>
                          <span className="text-xs text-gray-400">• {driver.trips} trips</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 mt-2 sm:mt-0">
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500">Distance</p>
                        <p className="text-xs sm:text-sm font-medium">{driver.distance}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500">ETA</p>
                        <p className="text-xs sm:text-sm font-medium text-green-700">{driver.eta}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500">Price</p>
                        <p className="text-xs sm:text-sm font-bold text-green-800">{formatPrice(driver.price)}</p>
                      </div>
                      <button
                        onClick={() => handleBook(driver)}
                        disabled={!driver.available}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[60px] ${
                          driver.available
                            ? 'bg-green-700 text-white hover:bg-green-800'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {driver.available ? 'Book' : 'Busy'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!searchDone && (
            <div className="card text-center py-8">
              <span className="text-4xl">🚚</span>
              <p className="text-gray-500 mt-3 text-sm sm:text-base">Enter your pickup and destination to find available drivers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

