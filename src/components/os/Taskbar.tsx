
import React, { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { Menu, Wifi, Battery, Volume2, Search, ChevronUp, Bell, Power, Lock, LogOut } from "lucide-react";
import { UserHomeIcon, ExperienceIcon, ProjectsIcon, SkillsIcon, EducationIcon, AwardsIcon, ContactIcon, TerminalIcon, BrowserIcon, SettingsIcon, CalculatorIcon, FileManagerIcon, SystemMonitorIcon, TextEditorIcon } from "./icons/LinuxIcons";
import { appConfigs } from "@/config/apps";
import { NotificationCenter, Notification } from "./NotificationSystem";

interface TaskbarProps {
    notifications?: Notification[];
    onClearNotifications?: () => void;
    onDismissNotification?: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
    notifications = [],
    onClearNotifications = () => { },
    onDismissNotification = () => { },
}) => {
    const { windows, launchApp, focusWindow, activeWindowId, minimizeWindow, maximizeWindow, closeWindow, logout, setIsLocked } = useOS();
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showPowerMenu, setShowPowerMenu] = useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const calendarRef = React.useRef<HTMLDivElement>(null);
    const controlRef = React.useRef<HTMLDivElement>(null);
    const startButtonRef = React.useRef<HTMLButtonElement>(null);
    const powerMenuRef = React.useRef<HTMLDivElement>(null);

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
                startButtonRef.current && !startButtonRef.current.contains(event.target as Node)) {
                setIsStartOpen(false);
                setShowPowerMenu(false);
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

    const closeAllMenus = () => {
        setIsStartOpen(false);
        setIsCalendarOpen(false);
        setIsControlCenterOpen(false);
        setIsNotificationOpen(false);
        setShowPowerMenu(false);
    };

    const toggleStartMenu = () => {
        const opening = !isStartOpen;
        closeAllMenus();
        setIsStartOpen(opening);
        if (opening) {
            setSearchQuery("");
        }
    };

    const handleLaunch = (appName: string) => {
        const config = appConfigs[appName];
        if (config) {
            launchApp(config.component, config.props, config.title);
        } else {
            launchApp(appName, {}, appName);
        }
        setIsStartOpen(false);
        setSearchQuery("");
    };

    const apps = [
        { id: "Profile", label: "About Me", icon: UserHomeIcon, category: "Portfolio" },
        { id: "Experience", label: "Experience", icon: ExperienceIcon, category: "Portfolio" },
        { id: "Projects", label: "Projects", icon: ProjectsIcon, category: "Portfolio" },
        { id: "Skills", label: "Skills", icon: SkillsIcon, category: "Portfolio" },
        { id: "Education", label: "Education", icon: EducationIcon, category: "Portfolio" },
        { id: "Awards", label: "Awards", icon: AwardsIcon, category: "Portfolio" },
        { id: "Contact", label: "Contact", icon: ContactIcon, category: "Portfolio" },
        { id: "Terminal", label: "Terminal", icon: TerminalIcon, category: "System" },
        { id: "FileManager", label: "Files", icon: FileManagerIcon, category: "System" },
        { id: "SystemMonitor", label: "System Monitor", icon: SystemMonitorIcon, category: "System" },
        { id: "TextEditor", label: "Text Editor", icon: TextEditorIcon, category: "Utilities" },
        { id: "Browser", label: "Browser", icon: BrowserIcon, category: "Internet" },
        { id: "Settings", label: "Settings", icon: SettingsIcon, category: "System" },
        { id: "Calculator", label: "Calculator", icon: CalculatorIcon, category: "Utilities" },
    ];

    const filteredApps = apps.filter(app =>
        app.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group apps by category when not searching
    const groupedApps = !searchQuery ? filteredApps.reduce((acc, app) => {
        if (!acc[app.category]) acc[app.category] = [];
        acc[app.category].push(app);
        return acc;
    }, {} as Record<string, typeof apps>) : null;

    // Calendar generation
    const generateCalendar = () => {
        const year = time.getFullYear();
        const month = time.getMonth();
        const today = time.getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const days: { day: number; current: boolean; today: boolean }[] = [];

        // Previous month days
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({ day: daysInPrevMonth - i, current: false, today: false });
        }
        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
            days.push({ day: d, current: true, today: d === today });
        }
        // Next month days
        const remaining = 42 - days.length;
        for (let d = 1; d <= remaining; d++) {
            days.push({ day: d, current: false, today: false });
        }

        return days;
    };

    return (
        <>
            {/* Start Menu */}
            {isStartOpen && (
                <div
                    ref={menuRef}
                    className="absolute bottom-14 left-2 right-2 sm:right-auto sm:left-4 sm:w-[420px] h-[520px] max-h-[65vh] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl z-[10000] flex flex-col overflow-hidden animate-slide-up origin-bottom-left"
                >
                    {/* Search Area */}
                    <div className="p-4 border-b border-[#313244]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Type to search applications..."
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#313244] text-[#cdd6f4] pl-10 pr-4 py-2.5 rounded-lg text-sm border border-[#45475a] focus:outline-none focus:border-[#89b4fa]/50 transition-colors placeholder-[#6c7086]"
                            />
                        </div>
                    </div>

                    {/* Apps Grid */}
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#45475a]">
                        {searchQuery ? (
                            <>
                                <h3 className="text-[10px] font-semibold text-[#6c7086] uppercase tracking-wider mb-3 px-1">
                                    Search Results
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {filteredApps.map((app) => (
                                        <button
                                            key={app.id}
                                            onClick={() => handleLaunch(app.id)}
                                            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-[#313244] transition-colors group aspect-square"
                                        >
                                            <div className="w-10 h-10 mb-2 transform group-hover:scale-110 transition-transform">
                                                <app.icon size={40} />
                                            </div>
                                            <span className="text-xs text-center text-[#a6adc8] group-hover:text-[#cdd6f4] truncate w-full">
                                                {app.label}
                                            </span>
                                        </button>
                                    ))}
                                    {filteredApps.length === 0 && (
                                        <div className="col-span-3 sm:col-span-4 text-center py-8 text-[#6c7086] text-sm">
                                            No apps found for "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            Object.entries(groupedApps || {}).map(([category, categoryApps]) => (
                                <div key={category} className="mb-4">
                                    <h3 className="text-[10px] font-semibold text-[#6c7086] uppercase tracking-wider mb-2 px-1">
                                        {category}
                                    </h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {categoryApps.map((app) => (
                                            <button
                                                key={app.id}
                                                onClick={() => handleLaunch(app.id)}
                                                className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-[#313244] transition-colors group"
                                            >
                                                <div className="w-10 h-10 mb-1.5 transform group-hover:scale-110 transition-transform">
                                                    <app.icon size={40} />
                                                </div>
                                                <span className="text-[10px] text-center text-[#a6adc8] group-hover:text-[#cdd6f4] truncate w-full leading-tight">
                                                    {app.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-[#181825] border-t border-[#313244] flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#a6e3a1] to-[#89b4fa] flex items-center justify-center text-xs font-bold text-[#1e1e2e] uppercase">
                                AM
                            </div>
                            <div className="flex flex-col text-xs">
                                <span className="font-semibold text-[#cdd6f4]">Aman Maurya</span>
                                <span className="text-[#6c7086] text-[10px]">aman@linux-aura</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => { closeAllMenus(); setIsLocked(true); }}
                                className="p-2 hover:bg-[#313244] rounded-md transition-colors text-[#6c7086] hover:text-[#cdd6f4]"
                                title="Lock Screen"
                            >
                                <Lock size={16} />
                            </button>
                            <button
                                onClick={() => { closeAllMenus(); logout(); }}
                                className="p-2 hover:bg-[#313244] rounded-md transition-colors text-[#6c7086] hover:text-[#cdd6f4]"
                                title="Log Out"
                            >
                                <LogOut size={16} />
                            </button>
                            <button
                                onClick={() => setShowPowerMenu(!showPowerMenu)}
                                className="p-2 hover:bg-[#f38ba8]/20 hover:text-[#f38ba8] rounded-md transition-colors text-[#6c7086]"
                                title="Power"
                            >
                                <Power size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Power sub-menu */}
                    {showPowerMenu && (
                        <div ref={powerMenuRef} className="absolute bottom-16 right-4 bg-[#1e1e2e] border border-[#313244] rounded-lg shadow-xl p-1 min-w-[160px] animate-scale-up z-10">
                            <button onClick={() => { closeAllMenus(); logout(); }} className="w-full flex items-center px-3 py-2 text-xs rounded-md hover:bg-[#313244] text-[#cdd6f4] transition-colors">
                                <LogOut size={14} className="mr-2 text-[#6c7086]" /> Log Out
                            </button>
                            <button className="w-full flex items-center px-3 py-2 text-xs rounded-md hover:bg-[#313244] text-[#cdd6f4] transition-colors">
                                <Power size={14} className="mr-2 text-[#f9e2af]" /> Restart
                            </button>
                            <button className="w-full flex items-center px-3 py-2 text-xs rounded-md hover:bg-[#f38ba8]/10 text-[#f38ba8] transition-colors">
                                <Power size={14} className="mr-2" /> Shut Down
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Calendar Popup */}
            {isCalendarOpen && (
                <div
                    ref={calendarRef}
                    className="absolute bottom-14 right-2 sm:right-4 w-72 sm:w-80 bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl z-[10000] p-4 animate-slide-up origin-bottom-right"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-[#cdd6f4]">
                            {time.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </h3>
                        <div className="flex space-x-1">
                            <button className="p-1 hover:bg-[#313244] rounded"><ChevronUp size={16} className="text-[#6c7086] rotate-[-90deg]" /></button>
                            <button className="p-1 hover:bg-[#313244] rounded"><ChevronUp size={16} className="text-[#6c7086] rotate-90" /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <div key={d} className="text-[#6c7086] font-medium py-1">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {generateCalendar().map((day, i) => (
                            <div
                                key={i}
                                className={`
                                    py-1.5 rounded-full cursor-pointer hover:bg-[#313244] transition-colors
                                    ${!day.current ? 'text-[#45475a]' : 'text-[#a6adc8]'}
                                    ${day.today ? 'bg-[#89b4fa] text-[#1e1e2e] font-bold hover:bg-[#89b4fa]/80' : ''}
                                `}
                            >
                                {day.day}
                            </div>
                        ))}
                    </div>

                    {/* Clock display */}
                    <div className="mt-4 pt-3 border-t border-[#313244] text-center">
                        <div className="text-2xl font-bold text-[#cdd6f4] font-mono">
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div className="text-[10px] text-[#6c7086] mt-1">
                            {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                </div>
            )}

            {/* Control Center Popup */}
            {isControlCenterOpen && (
                <div
                    ref={controlRef}
                    className="absolute bottom-14 right-2 sm:right-4 w-72 bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl z-[10000] p-4 animate-slide-up origin-bottom-right"
                >
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#89b4fa] text-[#1e1e2e] transition-opacity hover:opacity-90">
                            <Wifi size={20} className="mb-1" />
                            <span className="text-xs font-medium">Wi-Fi</span>
                            <span className="text-[9px] opacity-70">Connected</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] transition-colors">
                            <span className="font-bold mb-1">BT</span>
                            <span className="text-xs font-medium">Bluetooth</span>
                            <span className="text-[9px] text-[#6c7086]">Off</span>
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-[#a6adc8]">
                                <span className="flex items-center gap-2"><Volume2 size={14} /> Sound</span>
                                <span className="text-[10px] text-[#6c7086]">75%</span>
                            </div>
                            <div className="h-1.5 bg-[#313244] rounded-full overflow-hidden">
                                <div className="h-full w-[75%] bg-[#cdd6f4] rounded-full transition-all"></div>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-[#a6adc8]">
                                <span className="flex items-center gap-2">☀️ Brightness</span>
                                <span className="text-[10px] text-[#6c7086]">100%</span>
                            </div>
                            <div className="h-1.5 bg-[#313244] rounded-full overflow-hidden">
                                <div className="h-full w-[100%] bg-[#f9e2af] rounded-full transition-all"></div>
                            </div>
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="mt-4 pt-3 border-t border-[#313244] grid grid-cols-3 gap-2">
                        <button className="flex flex-col items-center p-2 rounded-lg hover:bg-[#313244] text-[#a6adc8] transition-colors">
                            <span className="text-sm">🌙</span>
                            <span className="text-[9px] mt-0.5">Night Light</span>
                        </button>
                        <button className="flex flex-col items-center p-2 rounded-lg hover:bg-[#313244] text-[#a6adc8] transition-colors">
                            <span className="text-sm">✈️</span>
                            <span className="text-[9px] mt-0.5">Airplane</span>
                        </button>
                        <button
                            onClick={() => { closeAllMenus(); handleLaunch("Settings"); }}
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-[#313244] text-[#a6adc8] transition-colors"
                        >
                            <span className="text-sm">⚙️</span>
                            <span className="text-[9px] mt-0.5">Settings</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Notification Center */}
            <NotificationCenter
                notifications={notifications}
                onDismiss={onDismissNotification}
                onClearAll={onClearNotifications}
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />

            {/* Taskbar Bar */}
            <div className="absolute bottom-0 w-full h-12 bg-[#181825]/90 backdrop-blur-md border-t border-[#313244] flex items-center px-2 sm:px-4 justify-between z-[9999]">
                {/* Start Button & Search */}
                <div className="flex items-center space-x-3 shrink-0">
                    <button
                        ref={startButtonRef}
                        onClick={toggleStartMenu}
                        className={`p-2 rounded-md transition-all duration-200 group relative ${isStartOpen ? 'bg-[#313244]' : 'hover:bg-[#313244]/50'}`}
                    >
                        <Menu className={`${isStartOpen ? 'text-[#89b4fa]' : 'text-[#cdd6f4]'} group-hover:text-[#89b4fa] transition-colors`} size={24} />
                    </button>

                    <div className="relative hidden md:block group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c7086] group-focus-within:text-[#89b4fa] transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={isStartOpen ? searchQuery : ""}
                            onClick={() => !isStartOpen && setIsStartOpen(true)}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                if (!isStartOpen) setIsStartOpen(true);
                            }}
                            className="bg-[#313244] text-[#cdd6f4] pl-9 pr-4 py-1.5 rounded-full text-sm border border-[#45475a] w-56 focus:outline-none focus:border-[#89b4fa] focus:w-64 transition-all placeholder-[#6c7086]"
                        />
                    </div>
                </div>

                {/* Active Windows / Pinned Apps */}
                <div className="flex-1 flex justify-center space-x-1 px-2 overflow-x-auto scrollbar-hide mask-fade-sides">
                    {windows.map((win) => {
                        const app = apps.find(a => a.id === win.component) || { icon: TerminalIcon };
                        return (
                            <button
                                key={win.id}
                                onClick={() => {
                                    if (activeWindowId === win.id && !win.minimized) {
                                        minimizeWindow(win.id);
                                    } else if (win.minimized) {
                                        // Restore from minimized
                                        focusWindow(win.id);
                                    } else {
                                        focusWindow(win.id);
                                    }
                                }}
                                className={`
                                    relative p-2 rounded-md flex items-center justify-center transition-all duration-200 group shrink-0
                                    ${activeWindowId === win.id && !win.minimized ? 'bg-[#313244]' : 'hover:bg-[#313244]/50'}
                                `}
                                title={win.title}
                            >
                                <app.icon size={24} className={`filter drop-shadow-lg ${win.minimized ? 'opacity-50 grayscale' : ''}`} />
                                {activeWindowId === win.id && !win.minimized && (
                                    <div className="absolute -bottom-[1px] w-1/2 h-0.5 bg-[#89b4fa] rounded-full"></div>
                                )}
                                {!win.minimized && activeWindowId !== win.id && (
                                    <div className="absolute -bottom-[1px] w-1 h-0.5 bg-[#6c7086] rounded-full"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* System Tray */}
                <div className="flex items-center space-x-1 sm:space-x-2 text-[#cdd6f4] cursor-default shrink-0">
                    <button
                        onClick={() => {
                            const opening = !isControlCenterOpen;
                            closeAllMenus();
                            setIsControlCenterOpen(opening);
                        }}
                        className={`flex items-center space-x-2 px-2 py-1 rounded-md transition-colors ${isControlCenterOpen ? 'bg-[#313244]' : 'hover:bg-[#313244]/50'}`}
                    >
                        <Wifi size={14} className="text-[#89b4fa]" />
                        <Volume2 size={14} />
                        <Battery size={14} className="text-[#a6e3a1]" />
                    </button>

                    <button
                        onClick={() => {
                            const opening = !isCalendarOpen;
                            closeAllMenus();
                            setIsCalendarOpen(opening);
                        }}
                        className={`px-3 py-1 rounded-md text-xs font-medium text-right hover:bg-[#313244]/50 transition-colors ${isCalendarOpen ? 'bg-[#313244]' : ''}`}
                    >
                        <div className="font-bold leading-none text-[#cdd6f4]">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        <div className="text-[10px] text-[#6c7086] leading-none mt-0.5">{time.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                    </button>

                    <button
                        onClick={() => {
                            const opening = !isNotificationOpen;
                            closeAllMenus();
                            setIsNotificationOpen(opening);
                        }}
                        className={`p-2 hover:bg-[#313244]/50 rounded-full transition-colors hidden sm:block relative ${isNotificationOpen ? 'bg-[#313244]' : ''}`}
                    >
                        <Bell size={16} className="text-[#a6adc8]" />
                        {notifications.length > 0 && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#f38ba8] rounded-full border-2 border-[#181825] animate-pulse"></span>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Taskbar;
