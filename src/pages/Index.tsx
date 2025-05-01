
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Awards from "../components/Awards";
import Contact from "../components/Contact";
import Terminal from "../components/Terminal";
import { ChevronDown } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  const scrollToContent = () => {
    const profileSection = document.getElementById('profile');
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text">
      {/* Loading Screen */}
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-terminal-bg z-50">
          <div className="text-center px-4">
            <div className="text-terminal-green text-2xl sm:text-4xl font-bold mb-6 animate-pulse font-display">
              Loading Portfolio...
            </div>
            <div className="w-64 h-2 bg-terminal-dark rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-terminal-green animate-loading"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Main Content */}
          <div className="scanline"></div>
          
          <Navbar />
          
          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 sm:pt-0">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 grad-text font-display">
                  Aman Maurya
                </h1>
                <div className="text-lg md:text-2xl mb-6 text-terminal-text/80 font-light">
                  <span className="text-terminal-green">Software Developer</span> | Building Scalable Solutions
                </div>
              </div>
              
              <div className="max-w-3xl mx-auto h-[60vh]">
                <ScrollArea className="h-full">
                  <Terminal onComplete={handleBootComplete} />
                </ScrollArea>
              </div>
              
              {bootComplete && (
                <div 
                  className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 text-terminal-text/75 flex flex-col items-center animate-fade-in cursor-pointer hover:text-terminal-green transition-colors duration-300"
                  onClick={scrollToContent}
                >
                  <div className="mb-2 text-sm sm:text-base font-display tracking-wider">Scroll to explore</div>
                  <ChevronDown size={24} className="animate-bounce text-terminal-green" />
                </div>
              )}
            </div>
          </section>
          
          {bootComplete && (
            <>
              <Profile 
                name="Aman Maurya"
                title="Software Developer"
                location="Mumbai, Maharashtra, India"
                email="amanmaurya.me@gmail.com"
                photo="https://media.licdn.com/dms/image/v2/D4D03AQHqG1e7wGimPA/profile-displayphoto-shrink_800_800/B4DZXtmuK6G4Ac-/0/1743448106192?e=1751500800&v=beta&t=QUQY6E_lhuVpPM4RRZe4Riwscr1IPNA57RUEQq7Te8I"
                linkedIn="https://www.linkedin.com/in/amanmaurya-me/"
                github="https://github.com/amanmaurya7"
                resume="https://drive.google.com/file/d/1IUvCaLDExGS29Dhd3i1AOXY_smeX5Uwn/view?usp=drive_link"
              />
              
              <Experience />
              
              <Projects />
              
              <Skills />
              
              <Education />
              
              <Awards />
              
              <Contact 
                email="amanmaurya.me@gmail.com"
                location="Mumbai, Maharashtra, India"
                linkedin="https://www.linkedin.com/in/amanmaurya-me/"
                github="https://github.com/amanmaurya7"
              />
              
              <footer className="py-8 border-t border-terminal-green/20">
                <div className="container mx-auto px-4 text-center text-terminal-text/60 text-sm">
                  <p>© {new Date().getFullYear()} Aman Maurya. All rights reserved.</p>
                </div>
              </footer>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
