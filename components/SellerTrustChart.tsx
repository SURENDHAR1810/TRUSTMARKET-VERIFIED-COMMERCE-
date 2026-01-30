import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Seller } from '../types';

interface SellerTrustChartProps {
  data: Seller['trustHistory'];
}

const SellerTrustChart: React.FC<SellerTrustChartProps> = ({ data }) => {
  return (
    <div className="w-full h-40 bg-white rounded-lg p-2 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-2 px-2">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Seller Trust Trend</h4>
        <span className="text-xs font-bold text-green-600">Excellent</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#94a3b8'}}
          />
          <YAxis 
            hide 
            domain={[60, 100]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '6px', border: 'none', color: '#fff' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
            cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorScore)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerTrustChart;