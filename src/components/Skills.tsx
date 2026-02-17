
import React from "react";
import TerminalWindow from "./TerminalWindow";
import { Code, Database, Server, Monitor, Cloud, LucideIcon } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: LucideIcon;
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
    <div className="h-full w-full">
      <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default Skills;
