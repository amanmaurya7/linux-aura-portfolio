
import React, { useState, useEffect, useCallback } from "react";
import { useOS } from "@/context/OSContext";
import Window from "./Window";
import Taskbar from "./Taskbar";
import AppContainer from "./AppContainer";
import DesktopContextMenu from "./DesktopContextMenu";
import { NotificationToast, Notification } from "./NotificationSystem";
import { UserHomeIcon, ExperienceIcon, ProjectsIcon, SkillsIcon, EducationIcon, AwardsIcon, ContactIcon, TerminalIcon, BrowserIcon, SettingsIcon, CalculatorIcon, FileManagerIcon, SystemMonitorIcon, TextEditorIcon } from "./icons/LinuxIcons";
import { appConfigs } from "@/config/apps";

// Apps
import Profile from "../Profile";
import Experience from "../Experience";
import Projects from "../Projects";
import Skills from "../Skills";
import Education from "../Education";
import Awards from "../Awards";
import Contact from "../Contact";
import TerminalApp from "./apps/TerminalApp";
import BrowserApp from "./apps/BrowserApp";
import SettingsApp from "./apps/SettingsApp";
import CalculatorApp from "./apps/CalculatorApp";
import FileManagerApp from "./apps/FileManagerApp";
import SystemMonitorApp from "./apps/SystemMonitorApp";
import TextEditorApp from "./apps/TextEditorApp";

const componentMap: any = {
    Profile: Profile,
    Experience: Experience,
    Projects: Projects,
    Skills: Skills,
    Education: Education,
    Awards: Awards,
    Contact: Contact,
    Terminal: TerminalApp,
    Browser: BrowserApp,
    Settings: SettingsApp,
    Calculator: CalculatorApp,
    FileManager: FileManagerApp,
    SystemMonitor: SystemMonitorApp,
    TextEditor: TextEditorApp,
};

const Desktop = () => {
    const { windows, launchApp, wallpaper } = useOS();
    const [isMobile, setIsMobile] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [toastNotifications, setToastNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        const handleResize = () => checkMobile();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Show welcome notification after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            addNotification({
                title: "Welcome to Linux Aura OS",
                body: "Double-click desktop icons or right-click for options. Try the Terminal!",
                type: "info",
            });
        }, 2000);

        const timer2 = setTimeout(() => {
            addNotification({
                title: "System Update Available",
                body: "Linux Aura OS 2.1.0 is available. Go to Settings → About to update.",
                type: "warning",
            });
        }, 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Super+E = File Manager
            if (e.metaKey && e.key === 'e') {
                e.preventDefault();
                handleLaunch("FileManager");
            }
            // Ctrl+Alt+T = Terminal
            if (e.ctrlKey && e.altKey && e.key === 't') {
                e.preventDefault();
                handleLaunch("Terminal");
            }
            // Ctrl+Alt+Delete = System Monitor
            if (e.ctrlKey && e.altKey && e.key === 'Delete') {
                e.preventDefault();
                handleLaunch("SystemMonitor");
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const addNotification = useCallback((notif: Omit<Notification, "id" | "timestamp">) => {
        const newNotif: Notification = {
            ...notif,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
        };
        setNotifications(prev => [newNotif, ...prev]);
        setToastNotifications(prev => [...prev, newNotif]);
    }, []);

    // Desktop Icons
    const icons = [
        { label: "About Me", icon: UserHomeIcon, app: "Profile" },
        { label: "Experience", icon: ExperienceIcon, app: "Experience" },
        { label: "Projects", icon: ProjectsIcon, app: "Projects" },
        { label: "Skills", icon: SkillsIcon, app: "Skills" },
        { label: "Education", icon: EducationIcon, app: "Education" },
        { label: "Awards", icon: AwardsIcon, app: "Awards" },
        { label: "Contact", icon: ContactIcon, app: "Contact" },
        { label: "Terminal", icon: TerminalIcon, app: "Terminal" },
        { label: "Files", icon: FileManagerIcon, app: "FileManager" },
        { label: "System Monitor", icon: SystemMonitorIcon, app: "SystemMonitor" },
        { label: "Text Editor", icon: TextEditorIcon, app: "TextEditor" },
        { label: "Browser", icon: BrowserIcon, app: "Browser" },
        { label: "Settings", icon: SettingsIcon, app: "Settings" },
        { label: "Calculator", icon: CalculatorIcon, app: "Calculator" },
    ];

    const handleLaunch = (appName: string) => {
        const config = appConfigs[appName];
        if (config) {
            launchApp(config.component, config.props, config.title);
        } else {
            launchApp(appName, {}, appName);
        }
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleContextAction = (action: string) => {
        switch (action) {
            case "terminal":
                handleLaunch("Terminal");
                break;
            case "filemanager":
                handleLaunch("FileManager");
                break;
            case "sysmonitor":
                handleLaunch("SystemMonitor");
                break;
            case "newfile":
                handleLaunch("TextEditor");
                break;
            case "settings":
            case "settings-background":
                handleLaunch("Settings");
                break;
            case "about":
                handleLaunch("Settings");
                break;
            case "refresh":
                addNotification({ title: "Desktop Refreshed", body: "All desktop icons have been refreshed.", type: "success" });
                break;
            case "copypath":
                navigator.clipboard.writeText("/home/aman/Desktop");
                addNotification({ title: "Copied", body: "Path copied to clipboard: /home/aman/Desktop", type: "success" });
                break;
        }
    };

    return (
        <div
            className="h-screen w-screen relative overflow-hidden font-sans select-none bg-cover bg-center"
            style={{ backgroundImage: `url('${wallpaper}')` }}
            onContextMenu={handleContextMenu}
        >
            {/* Overlay to darken background slightly for better readability */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

            {/* Desktop Icons Grid */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bottom-16 flex flex-col flex-wrap content-start items-start gap-1 sm:gap-2 p-2 z-0 max-w-full overflow-x-auto scrollbar-hide mask-fade-right">
                {icons.map((icon) => (
                    <div
                        key={icon.label}
                        className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer active:scale-95 w-20 h-24 sm:w-24 sm:h-28 shrink-0 select-none"
                        onDoubleClick={() => !isMobile && handleLaunch(icon.app)}
                        onClick={() => isMobile && handleLaunch(icon.app)}
                    >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center mb-2 shadow-lg backdrop-blur-sm border border-white/10 relative group-hover:border-white/30 transition-all">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            <icon.icon className="text-white drop-shadow-md" size={28} />
                        </div>
                        <span className="text-white text-[10px] sm:text-xs text-center font-medium drop-shadow-md px-1 rounded-sm line-clamp-2 leading-tight select-none bg-black/20 sm:bg-transparent rounded">
                            {icon.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Windows Layer */}
            {windows.map((win) => {
                const Cop = componentMap[win.component];
                return (
                    <Window key={win.id} window={win}>
                        <div className="h-full w-full bg-transparent p-0 m-0 overflow-hidden">
                            <AppContainer window={win}>
                                {Cop ? <Cop {...win.props} /> : <div className="p-4 text-red-500">App not found: {win.component}</div>}
                            </AppContainer>
                        </div>
                    </Window>
                );
            })}

            {/* Context Menu */}
            {contextMenu && (
                <DesktopContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                    onAction={handleContextAction}
                />
            )}

            {/* Toast Notifications */}
            <div className="fixed top-4 right-4 z-[30000] flex flex-col items-end">
                {toastNotifications.map((notif) => (
                    <NotificationToast
                        key={notif.id}
                        notification={notif}
                        onDismiss={() => setToastNotifications(prev => prev.filter(n => n.id !== notif.id))}
                    />
                ))}
            </div>

            <Taskbar
                notifications={notifications}
                onClearNotifications={() => setNotifications([])}
                onDismissNotification={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
            />
        </div>
    );
};

export default Desktop;
