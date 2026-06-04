'use client';

import { useState, useEffect } from 'react';
import { getSpaces, bookSpace } from '@/lib/api';

interface StorageSpace {
  id: string;
  name: string;
  location: string;
  type: string;
  capacity: string;
  available: string;
  pricePerDay: number;
  temperature: string;
  rating: number;
  features: string[];
  image: string;
}

const typeColors: Record<string, string> = {
  'Cold Room': 'bg-blue-100 text-blue-700',
  'Freezer': 'bg-purple-100 text-purple-700',
  'Dry Storage': 'bg-yellow-100 text-yellow-700',
  'Climate Controlled': 'bg-green-100 text-green-700',
};

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<StorageSpace[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<StorageSpace | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'browse' | 'bookings'>('browse');
  const [loading, setLoading] = useState(true);

  // Booking form
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const types = ['All', 'Cold Room', 'Freezer', 'Dry Storage', 'Climate Controlled'];

  useEffect(() => {
    fetchSpaces();
  }, [selectedType]);

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      const res = await getSpaces({
        type: selectedType !== 'All' ? selectedType : undefined,
      });
      setSpaces(res.data.spaces);
    } catch (err) {
      console.error('Failed to fetch spaces:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (space: StorageSpace) => {
    setSelectedSpace(space);
    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    if (!selectedSpace || !startDate || !endDate) return;
    try {
      await bookSpace({
        spaceId: selectedSpace.id,
        startDate,
        endDate,
        quantity: parseInt(quantity) || 1,
      });
      setShowBookingModal(false);
      setBookingSuccess(`Successfully booked ${selectedSpace.name}!`);
      setStartDate('');
      setEndDate('');
      setQuantity('');
      setTimeout(() => setBookingSuccess(''), 3000);
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  const formatPrice = (price: number) => '₦' + price.toLocaleString();

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Success Alert */}
      {bookingSuccess && (
        <div className="fixed top-20 right-4 sm:right-6 bg-green-700 text-white px-5 py-3 rounded-lg shadow-lg z-50 text-sm">
          ✅ {bookingSuccess}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Storage Spaces</h1>
          <p className="text-sm text-gray-500 mt-1">Book cold rooms, freezers, and storage facilities</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[40px] ${
            activeTab === 'browse' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Browse Spaces
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors min-h-[40px] ${
            activeTab === 'bookings' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          My Bookings
        </button>
      </div>

      {activeTab === 'browse' ? (
        <>
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap min-h-[36px] ${
                  selectedType === type
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Spaces Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {spaces.map((space) => (
                <div key={space.id} className="card !p-4 sm:!p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[space.type] || 'bg-gray-100 text-gray-700'}`}>
                      {space.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-sm text-gray-600">{space.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{space.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">📍 {space.location}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Temperature</span>
                      <span className="font-medium text-blue-600">{space.temperature}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Available</span>
                      <span className="font-medium">{space.available} / {space.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price</span>
                      <span className="font-bold text-green-800">{formatPrice(space.pricePerDay)}/ton/day</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {space.features.map((f) => (
                      <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Capacity Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(parseInt(space.available) / parseInt(space.capacity)) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {Math.round((parseInt(space.available) / parseInt(space.capacity)) * 100)}% available
                    </p>
                  </div>

                  <button
                    onClick={() => handleBook(space)}
                    className="btn-primary w-full mt-4 min-h-[44px]"
                  >
                    Book Space
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Bookings Tab - responsive card view on mobile */
        <div className="card">
          {/* Desktop table */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Booking ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Space</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">BK-001</td>
                  <td className="py-3 px-4">Lagos Cold Hub A</td>
                  <td className="py-3 px-4 text-gray-600">2024-01-15 → 2024-01-22</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span></td>
                  <td className="py-3 px-4 text-right font-medium">₦35,000</td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">BK-002</td>
                  <td className="py-3 px-4">Kano Freezer Complex</td>
                  <td className="py-3 px-4 text-gray-600">2024-01-25 → 2024-02-01</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Upcoming</span></td>
                  <td className="py-3 px-4 text-right font-medium">₦49,000</td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">BK-003</td>
                  <td className="py-3 px-4">Oyo Dry Store</td>
                  <td className="py-3 px-4 text-gray-600">2024-01-01 → 2024-01-10</td>
                  <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Expired</span></td>
                  <td className="py-3 px-4 text-right font-medium">₦16,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="space-y-3 sm:hidden">
            <div className="p-3 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm">BK-001</p>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
              </div>
              <p className="text-sm text-gray-700">Lagos Cold Hub A</p>
              <p className="text-xs text-gray-500 mt-1">Jan 15 → Jan 22, 2024</p>
              <p className="text-sm font-bold text-green-800 mt-2">₦35,000</p>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm">BK-002</p>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Upcoming</span>
              </div>
              <p className="text-sm text-gray-700">Kano Freezer Complex</p>
              <p className="text-xs text-gray-500 mt-1">Jan 25 → Feb 1, 2024</p>
              <p className="text-sm font-bold text-green-800 mt-2">₦49,000</p>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm">BK-003</p>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Expired</span>
              </div>
              <p className="text-sm text-gray-700">Oyo Dry Store</p>
              <p className="text-xs text-gray-500 mt-1">Jan 1 → Jan 10, 2024</p>
              <p className="text-sm font-bold text-green-800 mt-2">₦16,000</p>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedSpace && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full sm:max-w-md p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Book Storage Space</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">{selectedSpace.name}</p>
                <p className="text-sm text-gray-500">{selectedSpace.location} • {selectedSpace.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (tons)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g., 5"
                  className="input-field"
                />
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Price per ton/day</p>
                <p className="text-xl font-bold text-green-800">{formatPrice(selectedSpace.pricePerDay)}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={confirmBooking} className="btn-primary flex-1 min-h-[44px]">
                Confirm Booking
              </button>
              <button onClick={() => setShowBookingModal(false)} className="btn-secondary flex-1 min-h-[44px]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

