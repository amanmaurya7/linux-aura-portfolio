
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WindowState } from '@/types/os';
import { v4 as uuidv4 } from 'uuid';

interface OSContextType {
    windows: WindowState[];
    activeWindowId: string | null;
    launchApp: (component: string, props?: any, title?: string) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    isBooting: boolean;
    setBootComplete: () => void;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    isLocked: boolean;
    setIsLocked: (value: boolean) => void;
    wallpaper: string;
    setWallpaper: (url: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: { children: ReactNode }) => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [isBooting, setIsBooting] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const [wallpaper, setWallpaper] = useState("https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1974");

    const setBootComplete = () => setIsBooting(false);
    const login = () => {
        setIsLoggedIn(true);
        setIsLocked(false);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setWindows([]); // Close all windows on logout
    };

    const launchApp = (component: string, props: any = {}, title: string = 'Application') => {
        const id = uuidv4();
        const newWindow: WindowState = {
            id,
            title: title || component,
            component,
            props,
            minimized: false,
            maximized: false,
            position: { x: 200 + windows.length * 40, y: 50 + windows.length * 40 },
            size: { width: 900, height: 600 },
            zIndex: windows.length + 1,
        };
        setWindows([...windows, newWindow]);
        setActiveWindowId(id);
    };

    const closeWindow = (id: string) => {
        setWindows(windows.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(windows.length > 1 ? windows[windows.length - 2].id : null);
        }
    };

    const minimizeWindow = (id: string) => {
        setWindows(
            windows.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w))
        );
    };

    const maximizeWindow = (id: string) => {
        setWindows(
            windows.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
        );
    };

    const focusWindow = (id: string) => {
        setActiveWindowId(id);
        setWindows((prev) => {
            const w = prev.find((x) => x.id === id);
            if (!w) return prev;
            const others = prev.filter((x) => x.id !== id);
            return [...others, { ...w, zIndex: prev.length + 1 }];
        });
    };

    return (
        <OSContext.Provider
            value={{
                windows,
                activeWindowId,
                launchApp,
                closeWindow,
                minimizeWindow,
                maximizeWindow,
                focusWindow,
                isBooting,
                setBootComplete,
                isLoggedIn,
                login,
                logout,
                isLocked,
                setIsLocked,
                wallpaper,
                setWallpaper
            }}
        >
            {children}
        </OSContext.Provider>
    );
};

export const useOS = () => {
    const context = useContext(OSContext);
    if (!context) {
        throw new Error('useOS must be used within an OSProvider');
    }
    return context;
};
