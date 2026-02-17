import React from 'react';
import { WindowState } from '@/types/os';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, ChevronRight } from 'lucide-react';

interface AppContainerProps {
    children: React.ReactNode;
    window: WindowState;
}

const AppContainer: React.FC<AppContainerProps> = ({ children, window }) => {
    const isTerminal = window.component === 'Terminal';

    // If terminal, it handles its own output (although we might want to standardize even Terminal windows eventually, 
    // but for now let's keep the raw terminal feel for the actual Terminal app)
    if (isTerminal) return <div className="h-full w-full bg-[#1E1E1E]">{children}</div>;

    return (
        <div className="flex flex-col h-full bg-[#1E1E1E] text-gray-200 font-sans">
            {/* Toolbar / Navigation Bar */}
            <div className="h-12 bg-[#333] border-b border-[#111] flex items-center px-4 space-x-4 shadow-md z-10">

                {/* Navigation Buttons */}
                <div className="flex items-center space-x-2">
                    <button className="p-1.5 rounded-md hover:bg-[#444] text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-[#444] text-gray-500 transition-colors cursor-not-allowed">
                        <ArrowRight size={18} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-[#444] text-gray-400 hover:text-white transition-colors">
                        <RotateCw size={18} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-[#444] text-gray-400 hover:text-white transition-colors ml-1">
                        <Home size={18} />
                    </button>
                </div>

                {/* Address Bar / Breadcrumbs */}
                <div className="flex-1 bg-[#222] h-8 rounded-md border border-[#444] flex items-center px-3 text-sm text-gray-300">
                    <span className="text-gray-500 mr-2">
                        <Search size={14} />
                    </span>
                    <div className="flex items-center space-x-1">
                        <span className="hover:underline cursor-pointer text-gray-400">Home</span>
                        <ChevronRight size={14} className="text-gray-600" />
                        <span className="font-medium text-gray-200">{window.title}</span>
                    </div>
                </div>

                {/* Right Actions (Menu/Options placeholder) */}
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-80"></div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto bg-[#1E1E1E] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {/* Inner Content Padding Wrapper - mimics a standardized page layout */}
                <div className="p-6 md:p-8 max-w-7xl mx-auto w-full animate-fade-in">
                    {children}
                </div>
            </div>

            {/* Status Bar (Optional, common in Linux apps like VS Code or File Managers) */}
            <div className="h-6 bg-[#252526] border-t border-[#333] flex items-center px-3 text-xs text-gray-500 select-none">
                <span className="mr-4">Ready</span>
                <span className="flex-1"></span>
                <span>Linux Aura OS</span>
            </div>
        </div>
    );
};

export default AppContainer;
