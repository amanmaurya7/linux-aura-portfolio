
import React, { useEffect, useState } from "react";
import TerminalWindow from "./TerminalWindow";
import TypingEffect from "./TypingEffect";
import { Github, Linkedin, Mail, MapPin, User, Terminal, ExternalLink } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

interface ProfileProps {
  name: string;
  title: string;
  location: string;
  email: string;
  photo: string;
  linkedIn: string;
  github: string;
  resume: string;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  title,
  location,
  email,
  photo,
  linkedIn,
  github,
  resume
}) => {
  const [showContent, setShowContent] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Terminal Info */}
          <div className="order-2 md:order-1">
            <TerminalWindow title="aman@linux-portfolio:~/about">
              {!showContent ? (
                <div className="space-y-3">
                  <div className="text-terminal-green">Loading user data...</div>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="console-line">
                    <TypingEffect 
                      text="cat user_info.json" 
                      speed={50} 
                      className="text-terminal-amber"
                      onComplete={() => setLoadingComplete(true)}
                    />
                  </div>
                  
                  {loadingComplete && (
                    <div className="bg-terminal-dark/50 border border-terminal-green/20 rounded-md p-4 my-3 font-mono text-sm overflow-x-auto animate-fade-in">
                      <pre className="whitespace-pre-wrap text-terminal-text break-all">
{`{
  "name": "${name}",
  "profession": "${title}",
  "location": "${location}",
  "contact": {
    "email": "${email}"
  },
  "links": {
    "linkedin": "${linkedIn}",
    "github": "${github}",
    "resume": "${resume}"
  },
  "bio": "I am eager to connect with like-minded professionals and explore opportunities where I can contribute my technical skills, passion for learning, and drive for excellence. Let's connect and discuss how we can collaborate to drive innovation and achieve remarkable results."
}`}
                      </pre>
                    </div>
                  )}
                  
                  {loadingComplete && (
                    <div className="console-line animate-fade-in" style={{animationDelay: "0.5s"}}>
                      <span className="command-prompt">aman@linux-portfolio:~/about$</span>
                      <span className="cursor"></span>
                    </div>
                  )}
                </div>
              )}
            </TerminalWindow>
            
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <a 
                href={`mailto:${email}`} 
                className="btn flex items-center gap-2"
                aria-label="Email"
              >
                <Mail size={16} />
                <span>Contact</span>
              </a>
              <a 
                href={linkedIn} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn flex items-center gap-2"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn flex items-center gap-2"
                aria-label="GitHub"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a 
                href={resume} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn flex items-center gap-2"
                aria-label="Resume"
              >
                <ExternalLink size={16} />
                <span>Resume</span>
              </a>
            </div>
          </div>
          
          {/* Profile Image and Info */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-terminal-green/30 p-1 bg-terminal-dark relative">
                {!imageError ? (
                  <img 
                    src={photo} 
                    alt={name} 
                    className="w-full h-full object-cover rounded-full"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-terminal-dark rounded-full text-4xl font-bold text-terminal-green">
                    {name.split(' ').map(word => word[0]).join('')}
                  </div>
                )}
                <div className="absolute inset-0 rounded-full border-2 border-terminal-green/20 animate-pulse"></div>
              </div>
              
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-terminal-dark px-4 py-2 rounded-full border border-terminal-green/30 flex items-center space-x-2 whitespace-nowrap">
                <Terminal size={16} className="text-terminal-green" />
                <span className="text-sm font-semibold text-terminal-green">{name}</span>
              </div>
              
              <div className="absolute -right-2 top-4 bg-terminal-dark px-3 py-1 rounded-full border border-terminal-green/30 flex items-center space-x-1 animate-float">
                <User size={14} className="text-terminal-cyan" />
                <span className="text-xs text-terminal-cyan">{isMobile ? title.slice(0, 12) + '...' : title}</span>
              </div>
              
              <div className="absolute -left-2 top-2/3 bg-terminal-dark px-3 py-1 rounded-full border border-terminal-green/30 flex items-center space-x-1 animate-float" style={{animationDelay: "1s"}}>
                <MapPin size={14} className="text-terminal-purple" />
                <span className="text-xs text-terminal-purple">{isMobile ? 'Mumbai' : location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
