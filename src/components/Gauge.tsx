import React from 'react';

interface GaugeProps {
  value: number; // degrees, -180 to 180
  label: string;
  min?: number;
  max?: number;
}

export const Gauge: React.FC<GaugeProps> = ({ value, label, min = -180, max = 180 }) => {
  // Normalize value to 0-1 range for calculation
  const range = max - min;
  const normalizedValue = (value - min) / range;
  
  // SVG parameters
  const radius = 36;
  const strokeWidth = 6;
  const center = 50;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke dashoffset
  // We want the gauge to go from -135deg to +135deg (270deg total)
  const totalAngle = 270;
  const startAngle = 135; // Start at bottom left
  const offset = circumference - (normalizedValue * (totalAngle / 360) * circumference);
  
  // For the background track (270 degrees)
  const trackOffset = circumference - ((totalAngle / 360) * circumference);

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform rotate-90" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={trackOffset}
            strokeLinecap="butt"
            className="text-gray-200"
            transform={`rotate(${startAngle} ${center} ${center})`}
          />
          
          {/* Value Arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#FF7A00"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
            transform={`rotate(${startAngle} ${center} ${center})`}
          />
          
          {/* Ticks (Simplified) */}
          <line x1="50" y1="10" x2="50" y2="15" stroke="#999" strokeWidth="1" transform={`rotate(${startAngle} 50 50)`} />
          <line x1="50" y1="10" x2="50" y2="15" stroke="#999" strokeWidth="1" transform={`rotate(${startAngle + totalAngle} 50 50)`} />
        </svg>
        
        {/* Center Value */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-gray-800 font-mono">{value}</span>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute bottom-0 w-full flex justify-between px-2 text-[9px] text-gray-500 font-mono">
        <span>{min}°</span>
        <span>{max}°</span>
      </div>
      <div className="absolute top-0 right-0 text-xs font-bold text-gray-600">{label}</div>
    </div>
  );
};
