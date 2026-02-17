
import React, { useRef, useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { Folder, FileText, ChevronRight, Download, Link2, Monitor, Cpu } from "lucide-react";
import { WindowState } from "@/types/os";

import Profile from "../Profile";
import Experience from "../Experience";
import Projects from "../Projects";
import Skills from "../Skills";
import Education from "../Education";
import Awards from "../Awards";
import Contact from "../Contact";
import TerminalApp from "./apps/TerminalApp";

import photo from "../../../assets/IMG_1172.jpg";

const componentMap: any = {
    Profile: Profile,
    Experience: Experience,
    Projects: Projects,
    Skills: Skills,
    Education: Education,
    Awards: Awards,
    Contact: Contact,
    Terminal: TerminalApp
};

interface AppContainerProps {
    children: React.ReactNode;
    window: WindowState;
}

const AppContainer: React.FC<AppContainerProps> = ({ children, window }) => {
    // Determine the type of container based on the app
    const isTerminal = window.component === 'Terminal';
    const isProfile = window.component === 'Profile';

    // If terminal, just render it as is (black box)
    if (isTerminal) return <div className="h-full w-full bg-black">{children}</div>;

    // For other apps, wrap them in a "File Manager" or "Document Viewer" looking container
    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-200 font-sans">
            {/* Toolbar */}
            <div className="h-10 bg-[#2d2d2d] border-b border-[#1a1a1a] flex items-center px-4 space-x-4 text-sm select-none">
                <div className="flex space-x-2 text-gray-400">
                    <button className="hover:text-white transition-colors"><ChevronRight className="transform rotate-180" size={16} /></button>
                    <button className="hover:text-white transition-colors"><ChevronRight size={16} /></button>
                </div>
                <div className="flex-1 bg-[#1e1e1e] rounded px-3 py-1 flex items-center text-gray-400 text-xs font-mono border border-gray-600">
                    <span className="text-green-500 mr-2">aman@linux:</span>
                    <span>~/{window.title.toLowerCase().replace(/\s/g, '_')}</span>
                </div>
                <div className="flex space-x-3 text-gray-400">
                    <Monitor size={16} className="cursor-pointer hover:text-white" />
                    <Cpu size={16} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            {/* Main Content Area with sidebar maybe? */}
            <div className="flex-1 overflow-auto bg-[#1e1e1e] relative">
                {/* We need to ensure the transparent backgrounds of the original components don't look weird */}
                {/* The original components have dark backgrounds, so they should blend in reasonably well. */}
                <div className="p-0 h-full">
                    {children}
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] flex items-center px-4 text-xs text-white justify-between select-none">
                <div className="flex space-x-4">
                    <span>READY</span>
                    <span>Thinking...</span>
                </div>
                <div className="flex space-x-4">
                    <span>Ln 1, Col 1</span>
                    <span>UTF-8</span>
                    <span>TypeScript React</span>
                </div>
            </div>
        </div>
    );
};

export default AppContainer;
