
import React from "react";
import { Terminal, FolderOpen, Settings, Monitor, FileText, RefreshCw, Info, Copy, Clipboard } from "lucide-react";

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    onAction: (action: string) => void;
}

const DesktopContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onAction }) => {
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose]);

    // Adjust position to keep menu on screen
    const adjustedX = Math.min(x, window.innerWidth - 220);
    const adjustedY = Math.min(y, window.innerHeight - 350);

    const menuGroups = [
        [
            { label: "Open Terminal Here", icon: Terminal, action: "terminal" },
            { label: "Open File Manager", icon: FolderOpen, action: "filemanager" },
        ],
        [
            { label: "New File", icon: FileText, action: "newfile" },
            { label: "New Folder", icon: FolderOpen, action: "newfolder" },
        ],
        [
            { label: "Paste", icon: Clipboard, action: "paste" },
            { label: "Copy Path", icon: Copy, action: "copypath" },
        ],
        [
            { label: "Change Background...", icon: Monitor, action: "settings-background" },
            { label: "Display Settings", icon: Settings, action: "settings" },
        ],
        [
            { label: "System Monitor", icon: Monitor, action: "sysmonitor" },
            { label: "Refresh Desktop", icon: RefreshCw, action: "refresh" },
            { label: "About This System", icon: Info, action: "about" },
        ],
    ];

    return (
        <div
            ref={menuRef}
            className="fixed z-[20000] animate-scale-up"
            style={{ left: adjustedX, top: adjustedY }}
        >
            <div className="bg-[#1e1e2e]/95 backdrop-blur-xl rounded-lg border border-[#313244] shadow-2xl overflow-hidden min-w-[200px] py-1">
                {menuGroups.map((group, gi) => (
                    <React.Fragment key={gi}>
                        {gi > 0 && <div className="h-px bg-[#313244] my-1" />}
                        {group.map((item) => (
                            <button
                                key={item.action}
                                onClick={() => {
                                    onAction(item.action);
                                    onClose();
                                }}
                                className="w-full flex items-center px-3 py-1.5 text-xs text-gray-300 hover:bg-[#89b4fa]/20 hover:text-white transition-colors"
                            >
                                <item.icon size={14} className="mr-2.5 text-gray-500" />
                                {item.label}
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DesktopContextMenu;
