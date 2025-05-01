
import { useState, useEffect, useRef } from 'react';
import TypingEffect from './TypingEffect';

interface TerminalProps {
  onComplete?: () => void;
  preventAutoScroll?: boolean;
}

const Terminal = ({ onComplete, preventAutoScroll }: TerminalProps) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showPortfolioOutput, setShowPortfolioOutput] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTypingComplete && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTypingComplete, showPortfolioOutput]);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    setTimeout(() => {
      setShowPortfolioOutput(true);
      if (onComplete) {
        onComplete();
      }
    }, 500);
  };

  return (
    <div className="bg-gray-900 text-white font-mono p-4 rounded-md shadow-lg overflow-auto max-h-[500px] w-full">
      <div className="mb-2 flex items-center">
        <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
        <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
        <span className="flex-1 text-center text-sm text-gray-400">Terminal</span>
      </div>
      <div className="text-sm">
        <p>Last login: {new Date().toLocaleString()}</p>
        <div className="flex">
          <span className="text-green-500 mr-2">aman@linux:~$</span>
          <TypingEffect 
            text="./portfolio.sh" 
            speed={100} 
            onComplete={handleTypingComplete} 
          />
        </div>
        
        {isTypingComplete && (
          <div ref={outputRef}>
            <p className="text-[#00aeff]">Portfolio loaded successfully!</p>
            <p className="text-gray-400 mt-2">Initializing portfolio...</p>
            <p className="text-gray-400 ml-4">► Checking system compatibility</p>
            <p className="text-gray-400 ml-4">► Reading configuration files</p>
            <p className="text-gray-400 ml-4">► Establishing secure connection</p>
            
            <p className="text-gray-400 mt-2">Loading assets...</p>
            <p className="text-gray-400 ml-4">► Images: <span className="text-[#00aeff]">Complete</span></p>
            <p className="text-gray-400 ml-4">► Styling components: <span className="text-[#00aeff]">Complete</span></p>
            <p className="text-gray-400 ml-4">► Scripts: <span className="text-[#00aeff]">Complete</span></p>

            <p className="text-gray-400 mt-2">Rendering components...</p>
            <p className="text-gray-400 ml-4">► Header: <span className="text-[#00aeff]">Loaded</span></p>
            <p className="text-gray-400 ml-4">► Projects: <span className="text-[#00aeff]">Loaded</span></p>
            <p className="text-gray-400 ml-4">► Experience: <span className="text-[#00aeff]">Loaded</span></p>
            <p className="text-gray-400 ml-4">► Contact: <span className="text-[#00aeff]">Loaded</span></p>
            
            <p className="text-[#00aeff] mt-2">Starting interactive session...</p>
            <p className="text-gray-400 ml-4">► Environment: Production</p>
            <p className="text-gray-400 ml-4">► Status: <span className="text-green-500">Online</span></p>
            <p className="text-gray-400 ml-4">► Ready for user interaction</p>
            
            <div className="flex mt-2">
              <span className="text-green-500 mr-2">aman@linux:~$</span>
              <span className="animate-pulse">▌</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
