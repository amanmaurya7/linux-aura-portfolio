
import React, { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { Menu, Wifi, Battery, Volume2, Search, Maximize2, Minimize2, X, ChevronUp, Bell, Calendar as CalendarIcon, Power } from "lucide-react";
import { appConfigs } from "@/config/apps";

const Taskbar = () => {
    const { windows, launchApp, focusWindow, activeWindowId, closeWindow, minimizeWindow, maximizeWindow } = useOS();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleStartMenu = () => {
        // For now, launch Terminal as the default start action or simulate a menu later
        const config = appConfigs["Terminal"];
        launchApp(config.component, config.props, config.title);
    };

    return (
        <div className="absolute bottom-0 w-full h-12 bg-gray-900/80 backdrop-blur-md border-t border-white/10 flex items-center px-4 justify-between z-[9999]">
            {/* Start Button */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleStartMenu}
                    className="p-2 hover:bg-white/10 rounded-md transition-colors group relative"
                >
                    <Menu className="text-white group-hover:text-green-400 transition-colors" size={20} />
                </button>
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-800 text-white pl-8 pr-4 py-1.5 rounded-full text-sm border border-gray-700 w-48 focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>
            </div>

            {/* Application Icons / Open Windows */}
            <div className="flex-1 flex justify-start space-x-2 px-4 overflow-x-auto no-scrollbar">
                {windows.map((win) => (
                    <button
                        key={win.id}
                        onClick={() => {
                            if (activeWindowId === win.id && !win.minimized) {
                                minimizeWindow(win.id);
                            } else {
                                win.minimized ? maximizeWindow(win.id) : focusWindow(win.id);
                            }
                        }}
                        className={`
                            px-4 py-1.5 rounded-md flex items-center space-x-2 text-sm transition-all duration-200 border-b-2 max-w-[160px]
                            ${activeWindowId === win.id ? 'bg-white/10 border-green-500 text-white shadow-inner' : 'hover:bg-white/5 border-transparent text-gray-400'}
                        `}
                    >
                        <span className="truncate">{win.title}</span>
                    </button>
                ))}
            </div>

            {/* System Tray */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-white text-xs font-medium cursor-default">
                <div className="flex items-center space-x-2 sm:space-x-3 px-2">
                    <Wifi size={16} className="text-gray-300 hover:text-white transition-colors" />
                    <Volume2 size={16} className="text-gray-300 hover:text-white transition-colors" />
                    <Battery size={16} className="text-gray-300 hover:text-white transition-colors" />
                </div>
                <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
                <div className="flex flex-col items-end leading-none min-w-[60px]">
                    <span className="font-bold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="text-[10px] text-gray-400 hidden sm:block">{time.toLocaleDateString()}</span>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                    <Bell size={16} className="text-gray-300" />
                </button>
            </div>
        </div>
    );
};

export default Taskbar;
