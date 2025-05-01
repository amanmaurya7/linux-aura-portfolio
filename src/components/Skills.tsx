
import React from "react";
import TerminalWindow from "./TerminalWindow";
import { Code, Database, Server, Monitor, Cloud } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code,
    skills: ["Java", "TypeScript", "JavaScript", "HTML", "CSS", "SQL"]
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "MongoDB"]
  },
  {
    title: "Libraries & Frameworks",
    icon: Monitor,
    skills: ["ReactJS", "React Native", "Expo", "Playwright", "Tailwind CSS"]
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: ["AWS", "Docker"]
  },
  {
    title: "Tools & Others",
    icon: Server,
    skills: ["Linux", "Jenkins", "Git", "JIRA", "Blockchain"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-8">Technical Skills</h2>
        
        <TerminalWindow title="aman@linux-portfolio:~/skills">
          <div className="space-y-4">
            <div className="console-line">
              <span className="command-prompt">aman@linux-portfolio:~/skills$</span>
              <span className="text-terminal-amber">./list_skills.sh --format=detailed</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {skillCategories.map((category, index) => (
                <div 
                  key={index} 
                  className="card animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-terminal-dark rounded-md">
                      <category.icon size={20} className="text-terminal-cyan" />
                    </div>
                    <h3 className="text-terminal-cyan font-semibold">{category.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 ml-2">
                    {category.skills.map((skill, i) => (
                      <div 
                        key={i} 
                        className="skill-badge hover:border-terminal-cyan transition-colors"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-terminal-dark/50 border border-terminal-green/20 rounded-md p-4 animate-fade-in" style={{animationDelay: "1s"}}>
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 rounded-full bg-terminal-green mr-2"></div>
                <h3 className="text-terminal-green font-semibold">Skill Progression</h3>
              </div>
              
              <div className="space-y-4 pl-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>ReactJS</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                    <div className="h-full bg-terminal-green" style={{width: "90%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Java</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                    <div className="h-full bg-terminal-green" style={{width: "85%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>TypeScript</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                    <div className="h-full bg-terminal-green" style={{width: "80%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>AWS</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                    <div className="h-full bg-terminal-green" style={{width: "75%"}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>MongoDB</span>
                    <span>70%</span>
                  </div>
                  <div className="h-2 bg-terminal-dark rounded-full overflow-hidden">
                    <div className="h-full bg-terminal-green" style={{width: "70%"}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="console-line">
              <span className="command-prompt">aman@linux-portfolio:~/skills$</span>
              <span className="cursor"></span>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};

export default Skills;
