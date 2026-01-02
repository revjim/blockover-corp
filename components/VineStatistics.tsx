"use client";

import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts';

interface Order {
  id: string;
  orderNumber: string;
  orderDate: string | null;
  orderType: string | null;
  asin: string;
  productName: string;
  estimatedValue: string | null;
  computedFmv: string | null;
  userFmv: string | null;
  userNotes: string | null;
  isCancelled: boolean;
}

interface VineStatisticsProps {
  orders: Order[];
}

const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'];

export default function VineStatistics({ orders }: VineStatisticsProps) {
  // Calculate statistics
  const totalOrders = orders.length;
  const cancelledOrders = orders.filter(o => o.isCancelled).length;
  const activeOrders = totalOrders - cancelledOrders;

  const totalAmazonValue = orders.reduce((sum, order) => {
    return sum + (order.estimatedValue ? parseFloat(order.estimatedValue) : 0);
  }, 0);

  const totalZTV = orders.reduce((sum, order) => {
    return sum + (order.computedFmv ? parseFloat(order.computedFmv) : 0);
  }, 0);

  const totalUserFmv = orders.reduce((sum, order) => {
    return sum + (order.userFmv ? parseFloat(order.userFmv) : 0);
  }, 0);

  const avgAmazonValue = totalOrders > 0 ? totalAmazonValue / totalOrders : 0;
  const avgZTV = totalOrders > 0 ? totalZTV / totalOrders : 0;
  const avgUserFmv = totalOrders > 0 ? totalUserFmv / totalOrders : 0;

  // Status distribution for pie chart
  const statusData = [
    { name: 'Active', value: activeOrders, color: '#10b981' },
    { name: 'Cancelled', value: cancelledOrders, color: '#ef4444' }
  ];

  // Value distribution by month
  const monthlyData = orders.reduce((acc: any, order) => {
    if (!order.orderDate) return acc;
    const date = new Date(order.orderDate);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

    if (!acc[monthYear]) {
      acc[monthYear] = { month: monthYear, value: 0, count: 0 };
    }

    acc[monthYear].value += order.computedFmv ? parseFloat(order.computedFmv) : 0;
    acc[monthYear].count += 1;

    return acc;
  }, {});

  const monthlyChartData = Object.values(monthlyData);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 mb-6">
      {/* Total Orders Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 backdrop-blur-sm p-4">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-purple-500/10 blur-xl"></div>
        <div className="relative">
          <p className="text-xs font-medium text-gray-400">Total Orders</p>
          <p className="mt-1 text-2xl font-bold text-white">{totalOrders}</p>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-green-400">↑ {activeOrders} active</span>
            <span className="mx-1.5 text-gray-500">•</span>
            <span className="text-red-400">{cancelledOrders} cancelled</span>
          </div>
        </div>
      </div>

      {/* Total Value Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 backdrop-blur-sm p-4">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-cyan-500/10 blur-xl"></div>
        <div className="relative">
          <p className="text-xs font-medium text-gray-400">Total ZTV</p>
          <p className="mt-1 text-2xl font-bold text-white">${totalZTV.toFixed(2)}</p>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-400">Avg: ${avgZTV.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Amazon ETV Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20 backdrop-blur-sm p-4">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-amber-500/10 blur-xl"></div>
        <div className="relative">
          <p className="text-xs font-medium text-gray-400">Total Amazon ETV</p>
          <p className="mt-1 text-2xl font-bold text-white">${totalAmazonValue.toFixed(2)}</p>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-400">Avg: ${avgAmazonValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* User FMV Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 backdrop-blur-sm p-4">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-500/10 blur-xl"></div>
        <div className="relative">
          <p className="text-xs font-medium text-gray-400">Total Your FMV</p>
          <p className="mt-1 text-2xl font-bold text-white">${totalUserFmv.toFixed(2)}</p>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-400">Avg: ${avgUserFmv.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Monthly Value Chart - spans full width */}
      {monthlyChartData.length > 0 && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm p-4 lg:col-span-2 xl:col-span-4">
          <div className="relative">
            <p className="text-xs font-medium text-gray-400 mb-3">Value Trend (All Months)</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyChartData}>
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: '11px' }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: '11px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem'
                  }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: any) => `$${parseFloat(value).toFixed(2)}`}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
