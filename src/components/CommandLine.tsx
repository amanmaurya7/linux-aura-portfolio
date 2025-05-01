
import React, { useState, useEffect, useRef } from "react";
import TypingEffect from "./TypingEffect";

interface CommandLineProps {
  initialCommands?: string[];
  commandDelay?: number;
  typingSpeed?: number;
}

const CommandLine: React.FC<CommandLineProps> = ({
  initialCommands = [
    "cd portfolio",
    "ls -la",
    "cat welcome.txt",
    "chmod +x portfolio.sh",
    "./portfolio.sh"
  ],
  commandDelay = 1000,
  typingSpeed = 70
}) => {
  const [history, setHistory] = useState<{type: 'command' | 'output', text: string}[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [commandComplete, setCommandComplete] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Output responses for each command
  const commandResponses: Record<string, string[]> = {
    "cd portfolio": [""],
    "ls -la": [
      "drwxr-xr-x  5 aman  staff  160 May  1 12:34 .",
      "drwxr-xr-x  3 aman  staff   96 May  1 12:32 ..",
      "-rw-r--r--  1 aman  staff  390 May  1 12:33 .env",
      "drwxr-xr-x  8 aman  staff  256 May  1 12:33 .git",
      "-rw-r--r--  1 aman  staff   14 May  1 12:33 .gitignore",
      "-rw-r--r--  1 aman  staff  478 May  1 12:33 README.md",
      "drwxr-xr-x 12 aman  staff  384 May  1 12:33 assets",
      "drwxr-xr-x 24 aman  staff  768 May  1 12:33 components",
      "-rwxr-xr-x  1 aman  staff  854 May  1 12:33 portfolio.sh",
      "-rw-r--r--  1 aman  staff 2345 May  1 12:33 welcome.txt",
    ],
    "cat welcome.txt": [
      "---------------------------------------------",
      "| Welcome to Aman Maurya's Portfolio        |",
      "| Full Stack Developer | Problem Solver     |",
      "---------------------------------------------",
      "",
      "Hello! I'm a passionate developer with a keen",
      "interest in building scalable applications.",
      "Explore my portfolio using the navigation or",
      "continue with terminal commands.",
      "",
      "Type './portfolio.sh' to start the interactive",
      "portfolio experience!"
    ],
    "chmod +x portfolio.sh": [""],
    "./portfolio.sh": [
      "Initializing portfolio...",
      "Loading assets...",
      "Rendering components...",
      "Starting interactive session...",
      "Portfolio loaded successfully!"
    ]
  };

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Process and display initial commands
  useEffect(() => {
    if (currentCommandIndex >= initialCommands.length) return;
    
    const timer = setTimeout(() => {
      const command = initialCommands[currentCommandIndex];
      setHistory(prev => [...prev, { type: 'command', text: command }]);
      
      setCommandComplete(false);
      setShowPrompt(false);
      
      // Add response after command completes
      const responseTimer = setTimeout(() => {
        const response = commandResponses[command] || ["Command executed successfully."];
        response.forEach((line) => {
          setHistory(prev => [...prev, { type: 'output', text: line }]);
        });
        
        setCurrentCommandIndex(prev => prev + 1);
        setShowPrompt(true);
      }, command.length * typingSpeed + 300);
      
      return () => clearTimeout(responseTimer);
    }, (currentCommandIndex === 0 ? 500 : commandDelay));
    
    return () => clearTimeout(timer);
  }, [currentCommandIndex, initialCommands, commandDelay, typingSpeed]);
  
  return (
    <div className="font-mono text-sm">
      {history.map((entry, index) => (
        <div 
          key={index} 
          className={`console-line ${entry.type === 'output' ? 'command-output' : ''}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {entry.type === 'command' ? (
            <>
              <span className="command-prompt">aman@linux-portfolio:~$</span>
              <span>{entry.text}</span>
            </>
          ) : (
            entry.text
          )}
        </div>
      ))}
      
      {showPrompt && currentCommandIndex < initialCommands.length && (
        <div className="console-line flex items-center">
          <span className="command-prompt">aman@linux-portfolio:~$</span>
          <TypingEffect 
            text={initialCommands[currentCommandIndex]} 
            speed={typingSpeed} 
            onComplete={() => setCommandComplete(true)}
          />
        </div>
      )}
      
      {currentCommandIndex >= initialCommands.length && (
        <div className="console-line flex items-center">
          <span className="command-prompt">aman@linux-portfolio:~$</span>
          <span className="cursor"></span>
        </div>
      )}
      
      <div ref={bottomRef}></div>
    </div>
  );
};

export default CommandLine;
