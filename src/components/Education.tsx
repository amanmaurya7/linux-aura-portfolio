
import React from "react";
import TerminalWindow from "./TerminalWindow";
import { GraduationCap, Calendar, Award } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  courses?: string[];
}

const educations: Education[] = [
  {
    degree: "B.E. in Information Technology",
    institution: "University of Mumbai",
    period: "August 2023 - Present",
    grade: "Grade: 9.6/10",
    courses: ["OOPs", "DSA", "DBMS", "OS", "Software Engineering Principles", "Computer Networking"]
  },
  {
    degree: "Diploma in Information Technology",
    institution: "Thakur Polytechnic",
    period: "January 2021 - July 2023",
    grade: "Percentage: 90.21%"
  },
  {
    degree: "SSC",
    institution: "The G.M.E.S High School",
    period: "June 2010 - March 2020",
    grade: ""
  }
];

const Education: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="space-y-4">
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="card hover:border-terminal-amber/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-terminal-dark rounded-md">
                  <GraduationCap size={20} className="text-terminal-amber" />
                </div>
                <h3 className="text-terminal-amber font-semibold">{edu.degree}</h3>
              </div>

              <div className="mt-3 pl-12">
                <div className="text-terminal-text">{edu.institution}</div>

                <div className="flex items-center mt-1 text-sm text-terminal-text/70">
                  <Calendar size={14} className="mr-2" />
                  <span>{edu.period}</span>
                </div>

                {edu.grade && (
                  <div className="flex items-center mt-1 text-sm text-terminal-green">
                    <Award size={14} className="mr-2" />
                    <span>{edu.grade}</span>
                  </div>
                )}

                {edu.courses && edu.courses.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-terminal-text/70 text-xs mb-2">RELEVANT COURSEWORK:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-terminal-dark/70 rounded border border-terminal-amber/20 text-terminal-amber/80"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
