
import React, { ReactNode } from "react";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className={`terminal-window ${fullScreen ? 'w-full h-full' : ''} ${className} overflow-hidden`}>
      <div className="terminal-header">
        <div className={`flex space-x-2 ${isMobile ? 'mr-1' : 'mr-4'}`}>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-terminal-red" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-terminal-amber" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-terminal-green" />
        </div>
        <div className={`flex items-center text-xs text-terminal-text/70 ${isMobile ? 'text-[10px] max-w-[140px] truncate' : ''}`}>
          <TerminalIcon size={isMobile ? 10 : 12} className="mr-1 text-terminal-green" />
          {title}
        </div>
        <div className="ml-auto flex space-x-2">
          <Minus size={isMobile ? 10 : 14} className="text-terminal-text/50 hover:text-terminal-text cursor-pointer" />
          <Square size={isMobile ? 10 : 14} className="text-terminal-text/50 hover:text-terminal-text cursor-pointer" />
          <X size={isMobile ? 10 : 14} className="text-terminal-text/50 hover:text-terminal-text cursor-pointer" />
        </div>
      </div>
      <div className="terminal-content overflow-x-auto">
        {children}
      </div>
      <div className="scanline"></div>
    </div>
  );
};

export default TerminalWindow;
