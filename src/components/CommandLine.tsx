
import React, { useState, useEffect } from 'react';

const CommandLine = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process the command
    let response = "Command not recognized. Try 'help' for available commands.";
    
    if (command.toLowerCase() === 'help') {
      response = "Available commands: about, skills, projects, contact, clear";
    } else if (command.toLowerCase() === 'about') {
      response = "I'm a developer passionate about creating elegant solutions through code.";
    } else if (command.toLowerCase() === 'skills') {
      response = "Proficient in: JavaScript, TypeScript, React, Node.js, Python, Linux";
    } else if (command.toLowerCase() === 'projects') {
      response = "Check out my projects section for a showcase of my work.";
    } else if (command.toLowerCase() === 'contact') {
      response = "Email: example@mail.com | GitHub: github.com/username";
    } else if (command.toLowerCase() === 'clear') {
      setOutput([]);
      setCommand('');
      return;
    }

    // Update output
    setOutput([...output, `$ ${command}`, response]);
    setCommand('');
  };

  return (
    <div className="bg-black text-white font-mono p-4 rounded-lg shadow-lg max-h-[500px] overflow-auto">
      <div className="mb-2">
        <span className="text-gray-400">Type 'help' for available commands</span>
      </div>
      <div className="mb-4">
        {output.map((line, index) => (
          <div key={index} className={line.startsWith('$') ? 'text-green-500' : 'text-[#00aeff]'}>
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex">
        <span className="text-green-500 mr-2">$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="bg-transparent outline-none flex-1"
          autoFocus
        />
      </form>
    </div>
  );
};

export default CommandLine;
