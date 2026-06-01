'use client';

import { useState, useEffect } from 'react';
import { getOrders } from '@/lib/api';

interface Order {
  id: string;
  product: string;
  quantity: string;
  buyer: string;
  seller: string;
  status: string;
  amount: number;
  date: string;
  deliveryDate: string;
  trackingId: string | null;
}

const statusColors: Record<string, string> = {
  Pending: 'bg-gray-100 text-gray-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const statusFilters = ['All', 'Pending', 'Processing', 'In Transit', 'Delivered', 'Cancelled'];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState({ total: 0, pending: 0, processing: 0, inTransit: 0, delivered: 0, cancelled: 0 });
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, searchQuery]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders({
        status: statusFilter !== 'All' ? statusFilter : undefined,
        search: searchQuery || undefined,
      });
      setOrders(res.data.orders);
      setSummary(res.data.summary);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => '₦' + amount.toLocaleString();

  const orderCounts: Record<string, number> = {
    All: summary.total,
    Pending: summary.pending,
    Processing: summary.processing,
    'In Transit': summary.inTransit,
    Delivered: summary.delivered,
    Cancelled: summary.cancelled,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage all your orders</p>
        </div>
        <button className="btn-primary w-fit min-h-[44px]">+ Create Order</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="card !p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{summary.total}</p>
          <p className="text-xs sm:text-sm text-gray-500">Total Orders</p>
        </div>
        <div className="card !p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-blue-600">{summary.inTransit}</p>
          <p className="text-xs sm:text-sm text-gray-500">In Transit</p>
        </div>
        <div className="card !p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-green-600">{summary.delivered}</p>
          <p className="text-xs sm:text-sm text-gray-500">Delivered</p>
        </div>
        <div className="card !p-4 text-center">
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{summary.processing}</p>
          <p className="text-xs sm:text-sm text-gray-500">Processing</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card !p-4 sm:!p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field flex-1"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-h-[36px] ${
                statusFilter === status
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status} ({orderCounts[status] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Orders - Table on desktop, Cards on mobile */}
      {loading ? (
        <div className="card animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="card overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Buyer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-800">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-gray-800">{order.product}</p>
                          <p className="text-xs text-gray-500">{order.quantity}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{order.buyer}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || ''}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-800">{formatAmount(order.amount)}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-green-700 hover:text-green-800 font-medium text-sm min-h-[44px] min-w-[44px]"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card List */}
          <div className="space-y-3 md:hidden">
            {orders.map((order) => (
              <div
                key={order.id}
                className="card !p-4 cursor-pointer active:bg-gray-50"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || ''}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-700">{order.product}</p>
                    <p className="text-xs text-gray-500">{order.quantity} • {order.buyer}</p>
                  </div>
                  <p className="font-bold text-green-800 text-sm">{formatAmount(order.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && orders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-t-xl sm:rounded-xl shadow-xl w-full sm:max-w-md p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 text-xl min-w-[44px] min-h-[44px] flex items-center justify-center">✕</button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Order ID</span>
                <span className="font-medium text-sm">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Product</span>
                <span className="font-medium text-sm">{selectedOrder.product} ({selectedOrder.quantity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Buyer</span>
                <span className="font-medium text-sm">{selectedOrder.buyer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Seller</span>
                <span className="font-medium text-sm">{selectedOrder.seller}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Amount</span>
                <span className="font-bold text-green-800">{formatAmount(selectedOrder.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Order Date</span>
                <span className="font-medium text-sm">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Delivery Date</span>
                <span className="font-medium text-sm">{selectedOrder.deliveryDate}</span>
              </div>
              {selectedOrder.trackingId && (
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Tracking ID</span>
                  <span className="font-medium text-sm text-blue-600">{selectedOrder.trackingId}</span>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setSelectedOrder(null)} className="btn-primary flex-1 min-h-[44px]">
                Track Order
              </button>
              <button onClick={() => setSelectedOrder(null)} className="btn-secondary flex-1 min-h-[44px]">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
