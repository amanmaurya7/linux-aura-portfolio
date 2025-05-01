
import React, { useEffect, useState, useRef } from "react";
import TerminalWindow from "./TerminalWindow";
import CommandLine from "./CommandLine";
import TypingEffect from "./TypingEffect";

interface TerminalProps {
  onComplete?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onComplete }) => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showCommandLine, setShowCommandLine] = useState(false);
  const terminalContentRef = useRef<HTMLDivElement>(null);

  const bootMessages = [
    "Initializing system...",
    "Loading kernel modules...",
    "Starting system services...",
    "Mounting file systems...",
    "Initializing network interfaces...",
    "Starting window manager...",
    "Welcome to Linux Portfolio v1.0",
    "Type 'help' for available commands"
  ];

  // Function to scroll to bottom of terminal
  const scrollToBottom = () => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setBootComplete(true);
      scrollToBottom();
      
      const commandTimer = setTimeout(() => {
        setShowCommandLine(true);
        scrollToBottom();
        if (onComplete) {
          onComplete();
        }
      }, 1000);
      
      return () => clearTimeout(commandTimer);
    }, 2500);
    
    return () => clearTimeout(bootTimer);
  }, [onComplete]);

  return (
    <TerminalWindow 
      title="boot@linux-portfolio:~" 
      className="h-full"
      contentRef={terminalContentRef}
    >
      <div className="space-y-2">
        {!bootComplete ? (
          <>
            {bootMessages.map((message, index) => (
              <div 
                key={index} 
                className="console-line" 
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <TypingEffect 
                  text={message} 
                  speed={20} 
                  cursor={false}
                  startDelay={index * 300}
                  className={index === bootMessages.length - 1 ? "text-terminal-green" : ""}
                />
              </div>
            ))}
            <div className="progress-bar mt-4">
              <div className="progress-fill"></div>
            </div>
          </>
        ) : showCommandLine ? (
          <CommandLine onCommandComplete={scrollToBottom} />
        ) : (
          <div className="text-terminal-green animate-fade-in">System ready.</div>
        )}
      </div>
    </TerminalWindow>
  );
};

export default Terminal;
