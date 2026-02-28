import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartWidgetProps {
  data: any[];
  dataKey: string;
  color?: string;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ data, dataKey, color = "#FF7A00" }) => {
  return (
    <div className="w-full h-full min-h-[100px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
          <XAxis dataKey="name" hide />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '12px' }}
            itemStyle={{ color: '#FF7A00' }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            fill={color} 
            fillOpacity={0.3} 
            strokeWidth={2}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
