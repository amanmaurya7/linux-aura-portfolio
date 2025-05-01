
import React from "react";
import TerminalWindow from "./TerminalWindow";
import { Award, Trophy, Star, Medal } from "lucide-react";

interface AchievementItem {
  title: string;
  date?: string;
  icon: "award" | "trophy" | "star" | "medal";
}

const achievements: AchievementItem[] = [
  { title: "6x Hackathons", icon: "trophy" },
  { title: "Technical Head at TCET – Shastra GFG", icon: "award" },
  { title: "Researcher at TCET – Shastra Coding Club", icon: "star" },
  { title: "Technical Head at ISTE", icon: "award" },
  { title: "Acknowledged as a Problem-Solver on Leetcode", icon: "medal" },
  { title: "Attained a 5-star rating in Java Proficiency on Hackerrank", icon: "star" },
  { title: "Speaker at Solana HackerHouse Mumbai 2023", date: "September 2023", icon: "trophy" },
  { title: "Winner of Techno-Fest (Final Year Project), Thakur Polytechnic", date: "April 2023", icon: "trophy" },
  { title: "Best Student Award, IT Department, Thakur Polytechnic", date: "April 2023", icon: "award" },
  { title: "Qualified for Round 2 of National Engineering Olympiads", date: "November 2021", icon: "medal" },
  { title: "Campus Ambassador at National Engineering Olympiads", date: "December 2021", icon: "star" }
];

// Fixed the typing issue by using LucideIcon type
const iconComponents = {
  award: Award,
  trophy: Trophy,
  star: Star,
  medal: Medal
};

const getRandomDelay = () => {
  return Math.random() * 0.5;
};

const Awards: React.FC = () => {
  return (
    <section id="awards" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-8">Awards & Achievements</h2>
        
        <TerminalWindow title="aman@linux:~/achievements">
          <div className="space-y-4">
            <div className="console-line">
              <span className="command-prompt">aman@linux:~/achievements$</span>
              <span className="text-terminal-amber">find . -name "award_*.txt" | xargs cat</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((item, index) => {
                const IconComponent = iconComponents[item.icon];
                const iconColors = {
                  trophy: "text-terminal-amber",
                  award: "text-terminal-purple",
                  star: "text-terminal-cyan",
                  medal: "text-terminal-green"
                };
                
                return (
                  <div
                    key={index}
                    className="card hover:border-terminal-amber/50 transition-all duration-300 animate-fade-in flex items-start"
                    style={{ animationDelay: `${getRandomDelay()}s` }}
                  >
                    <div className={`p-2 bg-terminal-dark rounded-md mr-3 ${iconColors[item.icon]}`}>
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <div className="text-terminal-text text-sm">{item.title}</div>
                      {item.date && (
                        <div className="text-terminal-text/50 text-xs mt-1">{item.date}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="console-line">
              <span className="command-prompt">aman@linux:~/achievements$</span>
              <span className="cursor"></span>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};

export default Awards;
