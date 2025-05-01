
import React, { ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

const TerminalWindow = ({ children, title = "Terminal" }: TerminalWindowProps) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-white text-sm font-mono">{title}</div>
      </div>
      <div className="p-4 font-mono text-sm">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
