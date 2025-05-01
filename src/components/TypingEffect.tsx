
import React, { useState, useEffect, useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // On mobile devices, type faster to improve user experience
  const adjustedSpeed = isMobile ? Math.max(15, speed * 0.6) : speed;
  
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
        
        // Scroll to the bottom smoothly when new text is added
        if (containerRef.current) {
          const parentElement = containerRef.current.closest('.terminal-content');
          if (parentElement) {
            parentElement.scrollTop = parentElement.scrollHeight;
          }
        }
      }, adjustedSpeed);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, adjustedSpeed, text, onComplete, started]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
      {cursor && currentIndex < text.length && (
        <span className={`animate-cursor-blink ${isMobile ? 'text-xs' : ''}`}>█</span>
      )}
    </span>
  );
};

export default TypingEffect;
