
import React, { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import Window from "./Window";
import Taskbar from "./Taskbar";
import AppContainer from "./AppContainer"; // New component
import { File, Folder, Terminal, Monitor, Code, User, Briefcase, Mail, Award, BookOpen } from "lucide-react";
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

const Desktop = () => {
    const { windows, launchApp } = useOS();

    // Desktop Icons
    const icons = [
        { label: "About Me", icon: User, app: "Profile" },
        { label: "Experience", icon: Briefcase, app: "Experience" },
        { label: "Projects", icon: Code, app: "Projects" },
        { label: "Skills", icon: Monitor, app: "Skills" },
        { label: "Education", icon: BookOpen, app: "Education" },
        { label: "Awards", icon: Award, app: "Awards" },
        { label: "Contact", icon: Mail, app: "Contact" },
        { label: "Terminal", icon: Terminal, app: "Terminal" },
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
        <div className="h-screen w-screen relative overflow-hidden font-sans select-none bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
            {/* Overlay to darken background slightly for better readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

            {/* Desktop Icons Grid */}
            <div className="absolute top-8 left-8 grid grid-cols-1 gap-8 w-24 z-10">
                {icons.map((icon) => (
                    <div
                        key={icon.label}
                        className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
                        onDoubleClick={() => handleLaunch(icon.app)}
                    >
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-2 group-hover:bg-white/20 transition-colors shadow-lg backdrop-blur-md border border-white/10 relative">
                            {/* Shine effect */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            <icon.icon className="text-white drop-shadow-lg" size={32} />
                        </div>
                        <span className="text-white text-xs sm:text-sm text-center font-medium drop-shadow-md bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5 truncate w-[110%] group-hover:bg-black/70 transition-colors">{icon.label}</span>
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
