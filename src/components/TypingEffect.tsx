
import React, { useState, useEffect, useRef } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
  cursor?: boolean;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 50,
  className = "",
  onComplete,
  startDelay = 0,
  cursor = true
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    
    return () => clearTimeout(startTimeout);
  }, [startDelay]);
  
  useEffect(() => {
    if (!started) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, speed, text, onComplete, started]);

  return (
    <span className={className}>
      {displayText}
      {cursor && currentIndex < text.length && (
        <span className="animate-cursor-blink">█</span>
      )}
    </span>
  );
};

export default TypingEffect;
