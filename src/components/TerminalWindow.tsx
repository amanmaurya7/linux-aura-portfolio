
import React, { ReactNode } from "react";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
  fullScreen?: boolean;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  title = "aman@linux-portfolio:~",
  className = "",
  fullScreen = false
}) => {
  return (
    <div className={`terminal-window ${fullScreen ? 'w-full h-full' : ''} ${className}`}>
      <div className="terminal-header">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-amber" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <div className="flex items-center text-xs text-terminal-text/70">
          <TerminalIcon size={12} className="mr-2 text-terminal-green" />
          {title}
        </div>
        <div className="ml-auto flex space-x-3">
          <Minus size={14} className="text-terminal-text/50 hover:text-terminal-text cursor-pointer" />
          <Square size={14} className="text-terminal-text/50 hover:text-terminal-text cursor-pointer" />
          <X size={14} className="text-terminal-text/50 hover:text-terminal-text cursor-pointer" />
        </div>
      </div>
      <div className="terminal-content">
        {children}
      </div>
      <div className="scanline"></div>
    </div>
  );
};

export default TerminalWindow;
