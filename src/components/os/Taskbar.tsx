
import React, { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { Menu, Wifi, Battery, Volume2, Search, Maximize2, Minimize2, X, ChevronUp, Bell, Calendar as CalendarIcon, Power } from "lucide-react";
import { UserHomeIcon, ExperienceIcon, ProjectsIcon, SkillsIcon, EducationIcon, AwardsIcon, ContactIcon, TerminalIcon, BrowserIcon, SettingsIcon, CalculatorIcon } from "./icons/LinuxIcons";
import { appConfigs } from "@/config/apps";

const Taskbar = () => {
    const { windows, launchApp, focusWindow, activeWindowId, minimizeWindow, maximizeWindow, closeWindow } = useOS();
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const menuRef = React.useRef<HTMLDivElement>(null);
    const calendarRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLDivElement>(null);
    const startButtonRef = React.useRef<HTMLButtonElement>(null);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
                startButtonRef.current && !startButtonRef.current.contains(event.target as Node)) {
                setIsStartOpen(false);
            }
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
            if (controlRef.current && !controlRef.current.contains(event.target as Node)) {
                setIsControlCenterOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleStartMenu = () => {
        setIsStartOpen(!isStartOpen);
        setIsCalendarOpen(false);
        setIsControlCenterOpen(false);
        if (!isStartOpen) {
            setSearchQuery(""); // Reset search when opening
        }
    };

    const handleLaunch = (appName: string) => {
        const config = appConfigs[appName];
        if (config) {
            launchApp(config.component, config.props, config.title);
        } else {
            // Fallback for direct matches like "Terminal"
            launchApp(appName, {}, appName);
        }
        setIsStartOpen(false);
        setSearchQuery("");
    };

    const apps = [
        { id: "Profile", label: "About Me", icon: UserHomeIcon },
        { id: "Experience", label: "Experience", icon: ExperienceIcon },
        { id: "Projects", label: "Projects", icon: ProjectsIcon },
        { id: "Skills", label: "Skills", icon: SkillsIcon },
        { id: "Education", label: "Education", icon: EducationIcon },
        { id: "Awards", label: "Awards", icon: AwardsIcon },
        { id: "Contact", label: "Contact", icon: ContactIcon },
        { id: "Terminal", label: "Terminal", icon: TerminalIcon },
        { id: "Browser", label: "Browser", icon: BrowserIcon },
        { id: "Settings", label: "Settings", icon: SettingsIcon },
        { id: "Calculator", label: "Calculator", icon: CalculatorIcon },
    ];

    const filteredApps = apps.filter(app =>
        app.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Start Menu */}
            {isStartOpen && (
                <div
                    ref={menuRef}
                    className="absolute bottom-14 left-4 w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-[10000] flex flex-col overflow-hidden animate-slide-up origin-bottom-left"
                >
                    {/* Search Area */}
                    <div className="p-4 border-b border-white/5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Type to search..."
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-2.5 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-green-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Apps Grid */}
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">
                            {searchQuery ? "Search Results" : "All Applications"}
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                            {filteredApps.map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => handleLaunch(app.id)}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors group aspect-square"
                                >
                                    <div className="w-10 h-10 mb-2 transform group-hover:scale-110 transition-transform">
                                        <app.icon size={40} />
                                    </div>
                                    <span className="text-xs text-center text-gray-300 group-hover:text-white truncate w-full">
                                        {app.label}
                                    </span>
                                </button>
                            ))}
                            {filteredApps.length === 0 && (
                                <div className="col-span-4 text-center py-8 text-gray-500 text-sm">
                                    No apps found for "{searchQuery}"
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-800/50 border-t border-white/5 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                                AM
                            </div>
                            <div className="flex flex-col text-xs">
                                <span className="font-semibold text-white">Aman Maurya</span>
                                <span className="text-gray-400">Linux User</span>
                            </div>
                        </div>
                        <button className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-colors text-gray-400">
                            <Power size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Calendar Popup */}
            {isCalendarOpen && (
                <div
                    ref={calendarRef}
                    className="absolute bottom-14 right-4 w-80 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-[10000] p-4 animate-slide-up origin-bottom-right"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">
                            {time.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </h3>
                        <div className="flex space-x-1">
                            <button className="p-1 hover:bg-white/10 rounded"><ChevronUp size={16} className="text-gray-400 rotate-[-90deg]" /></button>
                            <button className="p-1 hover:bg-white/10 rounded"><ChevronUp size={16} className="text-gray-400 rotate-90" /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                            <div key={d} className="text-gray-500 font-medium py-1">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {Array.from({ length: 35 }, (_, i) => {
                            const day = i - 2; // Offset for demo
                            const isToday = day === time.getDate();
                            return (
                                <div
                                    key={i}
                                    className={`
                                        py-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors
                                        ${day <= 0 || day > 31 ? 'text-gray-700' : 'text-gray-300'}
                                        ${isToday ? 'bg-green-500 text-white font-bold hover:bg-green-600' : ''}
                                    `}
                                >
                                    {day > 0 && day <= 31 ? day : ''}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Control Center Popup */}
            {isControlCenterOpen && (
                <div
                    ref={controlRef}
                    className="absolute bottom-14 right-4 w-72 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-[10000] p-4 animate-slide-up origin-bottom-right"
                >
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-green-500 text-white transition-opacity hover:opacity-90">
                            <Wifi size={20} className="mb-1" />
                            <span className="text-xs font-medium">Wi-Fi</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-700/50 text-white hover:bg-gray-700 transition-colors">
                            <span className="font-bold mb-1">BT</span>
                            <span className="text-xs font-medium">Bluetooth</span>
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span className="flex items-center gap-2"><Volume2 size={14} /> Sound</span>
                            </div>
                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full w-[75%] bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-400">
                                <span className="flex items-center gap-2 max-w-full"> Brightness</span>
                            </div>
                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full w-[100%] bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Taskbar Bar */}
            <div className="absolute bottom-0 w-full h-12 bg-gray-900/80 backdrop-blur-md border-t border-white/10 flex items-center px-4 justify-between z-[9999]">
                {/* Start Button & Search */}
                <div className="flex items-center space-x-3">
                    <button
                        ref={startButtonRef}
                        onClick={toggleStartMenu}
                        className={`p-2 rounded-md transition-all duration-200 group relative ${isStartOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                        <Menu className={`${isStartOpen ? 'text-green-400' : 'text-white'} group-hover:text-green-400 transition-colors`} size={24} />
                    </button>

                    <div className="relative hidden md:block group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={isStartOpen ? searchQuery : ""}
                            onClick={() => !isStartOpen && setIsStartOpen(true)}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (!isStartOpen) setIsStartOpen(true);
                            }}
                            className="bg-gray-800 text-white pl-9 pr-4 py-1.5 rounded-full text-sm border border-gray-700 w-56 focus:outline-none focus:border-green-500 focus:w-64 transition-all"
                        />
                    </div>
                </div>

                {/* Active Windows / Pinned Apps */}
                <div className="flex-1 flex justify-center space-x-2 px-4">
                    {/* Show pinned apps or generic icons if no windows, but here we just show windows as requested for 'taskbar' feel */}
                    {windows.map((win) => {
                        const app = apps.find(a => a.id === win.component) || { icon: TerminalIcon }; // Fallback
                        return (
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
                                    relative p-2 rounded-md flex items-center justify-center transition-all duration-200 group
                                    ${activeWindowId === win.id && !win.minimized ? 'bg-white/10' : 'hover:bg-white/5'}
                                `}
                                title={win.title}
                            >
                                <app.icon size={24} className={`filter drop-shadow-lg ${win.minimized ? 'opacity-50 grayscale' : ''}`} />
                                {activeWindowId === win.id && !win.minimized && (
                                    <div className="absolute -bottom-[1px] w-1/2 h-0.5 bg-green-500 rounded-full"></div>
                                )}
                                <div className="absolute -bottom-[1px] w-1 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        );
                    })}
                </div>

                {/* System Tray */}
                <div className="flex items-center space-x-2 sm:space-x-3 text-white cursor-default">
                    <button
                        onClick={() => { setIsControlCenterOpen(!isControlCenterOpen); setIsCalendarOpen(false); setIsStartOpen(false); }}
                        className={`flex items-center space-x-2 px-2 py-1 rounded-md transition-colors ${isControlCenterOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                        <Wifi size={16} />
                        <Volume2 size={16} />
                        <Battery size={16} />
                    </button>

                    <button
                        onClick={() => { setIsCalendarOpen(!isCalendarOpen); setIsControlCenterOpen(false); setIsStartOpen(false); }}
                        className={`px-3 py-1 rounded-md text-xs font-medium text-right hover:bg-white/5 transition-colors ${isCalendarOpen ? 'bg-white/10' : ''}`}
                    >
                        <div className="font-bold leading-none">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        <div className="text-[10px] text-gray-400 leading-none mt-0.5">{time.toLocaleDateString()}</div>
                    </button>

                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block relative">
                        <Bell size={16} className="text-gray-300" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Taskbar;
