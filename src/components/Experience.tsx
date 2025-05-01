
import React, { useState } from "react";
import TerminalWindow from "./TerminalWindow";
import { Calendar, Briefcase, MapPin, ChevronRight, ChevronDown } from "lucide-react";

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "WeSee",
    position: "Frontend Developer Intern",
    period: "January 2025 – March 2025",
    location: "Tokyo, Japan (Remote)",
    description: [
      "Developed a high-performance F1-themed reaction time game using React & TypeScript, featuring frame-perfect video synchronization, optimized asset loading with cache busting, and responsive touch controls achieving sub-10ms input latency.",
      "Implemented progressive enhancement for seamless cross-device compatibility.",
      "Developed an interactive HTML5 Canvas-based Formula 1 circuit tracing game with touch/mouse controls, featuring adaptive difficulty levels, real-time accuracy calculation, and responsive design optimization for mobile devices, achieving 100% cross-browser compatibility."
    ]
  },
  {
    company: "Shiemvoltech Private Limited",
    position: "Software Development Intern",
    period: "December 2024 – March 2025",
    location: "Mumbai (Remote)",
    description: [
      "Developed a user-friendly employee management system that made it easier for admins to add team members, assign tasks, and track progress.",
      "Employees could seamlessly update their task statuses, ensuring smooth workflow management.",
      "Built a scalable full-stack application using Node.js, MongoDB, and React Native, focusing on secure authentication, efficient task tracking, and real-time updates to enhance team collaboration and productivity."
    ]
  },
  {
    company: "VG Simulations Pvt. Ltd",
    position: "Project Intern",
    period: "July 2022 – August 2022",
    location: "Mumbai",
    description: [
      "Gained proficiency in Blockchain technology, mastering SHA256, public/private networks, on-chain/off-chain transactions, PoS, and PoW.",
      "Enhanced Android app functionality by integrating APIs, demonstrating hands-on expertise in mobile application development."
    ]
  },
  {
    company: "GFG-TCET",
    position: "Technical Head",
    period: "March 2025 - Present",
    location: "Mumbai",
    description: [
      "Leading technical initiatives and providing strategic guidance for GFG-TCET activities.",
      "Mentoring team members on technical best practices and emerging technologies."
    ]
  },
  {
    company: "TCET Shastra-Coding Club",
    position: "Researcher",
    period: "October 2024 - April 2025",
    location: "Mumbai",
    description: [
      "Conducted research on emerging programming techniques and algorithms.",
      "Collaborated with team members to solve complex coding problems and develop innovative solutions."
    ]
  }
];

const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-8">Work Experience</h2>
        
        <TerminalWindow title="aman@linux:~/experience">
          <div className="space-y-4">
            <div className="console-line">
              <span className="command-prompt">aman@linux:~/experience$</span>
              <span className="text-terminal-amber"> cat work_history.log</span>
            </div>
            
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`card transition-all duration-300 ${
                    index === expandedIndex 
                      ? 'border-terminal-green/50 shadow-md shadow-terminal-green/10' 
                      : ''
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="flex items-center space-x-2">
                      <Briefcase size={18} className="text-terminal-green" />
                      <h3 className="text-terminal-green font-semibold">{exp.position}</h3>
                    </div>
                    <div className="text-terminal-text/70 text-sm">
                      {expandedIndex === index ? (
                        <ChevronDown size={16} className="text-terminal-amber" />
                      ) : (
                        <ChevronRight size={16} className="text-terminal-amber" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col mt-2 text-xs">
                    <div className="flex">
                      <div className="w-1/3 text-terminal-green">
                        {exp.company}
                      </div>
                      
                      <div className="w-1/3 flex items-center text-terminal-text/70">
                        <Calendar size={12} className="mr-1" />
                        <span>{exp.period}</span>
                      </div>
                      
                      <div className="w-1/3 flex items-center justify-end text-terminal-text/70">
                        <MapPin size={12} className="mr-1" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedIndex === index && (
                    <div className="mt-4 pl-4 border-l border-terminal-green/20 animate-fade-in">
                      <ul className="space-y-2 text-sm">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight size={14} className="text-terminal-green mr-2 mt-1 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="console-line">
              <span className="command-prompt">aman@linux:~/experience$</span>
              <span className="cursor"></span>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};

export default Experience;
