
import React, { useState } from "react";
import TerminalWindow from "./TerminalWindow";
import { Code, ExternalLink, ChevronRight, ChevronDown, Github, File } from "lucide-react";

interface Project {
  title: string;
  description: string[];
  technologies: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Kavach: A Quantum-Resistant Biometric Data System",
    description: [
      "Architected the system for a conceptual blockchain project focused on securing biometric data.",
      "Conducted a literature survey on quantum-resistant cryptography (CRYSTALS-Kyber/Dilithium) and privacy techniques like zk-SNARKs.",
      "Outlined a five-layer architecture using React.js, QANplatform, and IPFS to show how such a system could work in theory."
    ],
    technologies: ["React.js", "QANplatform", "IPFS", "CRYSTALS-Kyber", "CRYSTALS-Dilithium", "zk-SNARKs", "Blockchain"]
  },
  {
    title: "Placement Power Hub",
    description: [
      "Engineered a full-stack app for placement prep with DSA, aptitude, and interview tracking using React, TypeScript, Supabase, and PostgreSQL, enhanced by React Query and Recharts.",
      "Implemented Supabase Auth, Row Level Security, and Storage for secure, user-friendly data and file management."
    ],
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "React Query", "Recharts"],
    link: "https://placement-power-hub.vercel.app/"
  },
  {
    title: "Decentralized File Storage System",
    description: [
      "Built a decentralized file storage platform using React.js, Hardhat and IPFS, implementing end-to-end encryption for secure file management.",
      "Developed a scalable architecture with Pinata API integration for distributed file storage and automated file processing."
    ],
    technologies: ["React.js", "Hardhat", "IPFS", "Pinata API", "Ethereum", "Solidity"],
    link: "https://decendata.vercel.app/"
  }
];

const Projects: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="h-full w-full">
      <div className="space-y-4">
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`card transition-all duration-300 ${index === expandedIndex
                ? 'border-terminal-green/50 shadow-lg shadow-terminal-green/10'
                : ''
                } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center space-x-2">
                  <File size={18} className="text-terminal-purple" />
                  <h3 className="text-terminal-purple font-semibold">{project.title}</h3>
                </div>
                <div className="text-terminal-text/70">
                  {expandedIndex === index ? (
                    <ChevronDown size={16} className="text-terminal-amber" />
                  ) : (
                    <ChevronRight size={16} className="text-terminal-amber" />
                  )}
                </div>
              </div>

              {expandedIndex === index && (
                <div className="mt-4 pl-4 border-l border-terminal-purple/20 animate-fade-in">
                  <div className="space-y-3 text-sm">
                    {project.description.map((desc, i) => (
                      <p key={i} className="text-terminal-text/90">{desc}</p>
                    ))}

                    <div className="mt-3">
                      <h4 className="text-terminal-amber text-xs mb-2">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="skill-badge"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-terminal-green hover:text-terminal-green/80 transition-colors text-xs"
                        >
                          <Github size={14} />
                          <span>View Code</span>
                        </a>
                      )}

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-terminal-green hover:text-terminal-green/80 transition-colors text-xs"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
