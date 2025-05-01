
import React, { useState } from "react";
import TerminalWindow from "./TerminalWindow";
import { Mail, Send, Linkedin, Github, MapPin } from "lucide-react";

interface ContactProps {
  email: string;
  location: string;
  linkedin: string;
  github: string;
}

const Contact: React.FC<ContactProps> = ({
  email,
  location,
  linkedin,
  github
}) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      setErrorMessage("Please fill all fields");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    
    // Simulate form submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-8">Contact Me</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <TerminalWindow title="aman@linux:~/contact">
            <div className="space-y-4">
              <div className="console-line">
                <span className="command-prompt">aman@linux:~/contact$</span>
                <span className="text-terminal-amber">cat contact_info.txt</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 hover:text-terminal-green transition-colors">
                  <div className="p-2 bg-terminal-dark rounded-md">
                    <Mail size={18} />
                  </div>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                
                <div className="flex items-center space-x-3 hover:text-terminal-green transition-colors">
                  <div className="p-2 bg-terminal-dark rounded-md">
                    <MapPin size={18} />
                  </div>
                  <span>{location}</span>
                </div>
                
                <div className="flex items-center space-x-3 hover:text-terminal-green transition-colors">
                  <div className="p-2 bg-terminal-dark rounded-md">
                    <Linkedin size={18} />
                  </div>
                  <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {linkedin.replace("https://www.", "")}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3 hover:text-terminal-green transition-colors">
                  <div className="p-2 bg-terminal-dark rounded-md">
                    <Github size={18} />
                  </div>
                  <a 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {github.replace("https://", "")}
                  </a>
                </div>
              </div>
              
              <div className="console-line">
                <span className="command-prompt">aman@linux:~/contact$</span>
                <span className="cursor"></span>
              </div>
            </div>
          </TerminalWindow>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
