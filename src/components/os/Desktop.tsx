
import React, { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import Window from "./Window";
import Taskbar from "./Taskbar";
import AppContainer from "./AppContainer"; // New component
import { UserHomeIcon, ExperienceIcon, ProjectsIcon, SkillsIcon, EducationIcon, AwardsIcon, ContactIcon, TerminalIcon, BrowserIcon, SettingsIcon, CalculatorIcon } from "./icons/LinuxIcons";
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
    Calculator: CalculatorApp
};

const Desktop = () => {
    const { windows, launchApp, wallpaper } = useOS();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        const handleResize = () => checkMobile();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    return (
        <div className="h-screen w-screen relative overflow-hidden font-sans select-none bg-cover bg-center" style={{ backgroundImage: `url('${wallpaper}')` }}>
            {/* Overlay to darken background slightly for better readability */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

            {/* Desktop Icons Grid */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bottom-16 flex flex-col flex-wrap content-start items-start gap-2 sm:gap-4 p-2 z-0 max-w-full overflow-x-auto scrollbar-hide mask-fade-right">
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

            <Taskbar />
        </div>
    );
};

export default Desktop;
