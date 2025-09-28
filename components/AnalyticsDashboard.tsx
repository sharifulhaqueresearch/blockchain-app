
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Product, AnalyticsData } from '../types';

interface AnalyticsDashboardProps {
  product: Product;
}

const COLORS = ['#0ea5e9', '#34d399', '#f59e0b', '#8b5cf6', '#ec4899'];

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ product }) => {
  const analyticsData: AnalyticsData[] = useMemo(() => {
    const data: AnalyticsData[] = [];
    if(product.id === 'prod-001') {
      data.push({ name: 'Sourcing', value: 5 });
      data.push({ name: 'Processing', value: 2 });
      data.push({ name: 'Shipping', value: 10 });
      data.push({ name: 'Distribution', value: 2 });
    } else {
      data.push({ name: 'Components', value: 19 });
      data.push({ name: 'Assembly', value: 15 });
      data.push({ name: 'Distribution', value: 20 });
    }
    return data;
  }, [product]);

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 mt-8 shadow-lg">
      <h2 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Cycle Time (Days)</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#f1f5f9' }}
              cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
            />
            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]}>
                {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
