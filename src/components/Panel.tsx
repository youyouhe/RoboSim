import React from 'react';
import { cn } from '@/src/lib/utils';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({ title, children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "relative bg-[#F5F5F5] border border-gray-300 p-4 rounded-sm shadow-sm flex flex-col",
        className
      )}
      {...props}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gray-800" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gray-800" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gray-800" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gray-800" />

      {title && (
        <div className="mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 font-sans border-b border-gray-300 pb-1 inline-block pr-4">
            {title}
          </h3>
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};
