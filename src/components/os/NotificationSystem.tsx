
import React, { useState, useEffect } from "react";
import { X, Bell, Terminal, Settings, Info, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

export interface Notification {
    id: string;
    title: string;
    body: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: Date;
    icon?: React.ElementType;
    read?: boolean;
}

interface NotificationCenterProps {
    notifications: Notification[];
    onDismiss: (id: string) => void;
    onClearAll: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const NotificationToast: React.FC<{
    notification: Notification;
    onDismiss: () => void;
}> = ({ notification, onDismiss }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onDismiss, 300);
        }, 5000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const getTypeStyles = () => {
        switch (notification.type) {
            case "success": return { icon: CheckCircle, color: "text-green-400", border: "border-green-500/30" };
            case "warning": return { icon: AlertTriangle, color: "text-yellow-400", border: "border-yellow-500/30" };
            case "error": return { icon: AlertCircle, color: "text-red-400", border: "border-red-500/30" };
            default: return { icon: Info, color: "text-blue-400", border: "border-blue-500/30" };
        }
    };

    const styles = getTypeStyles();
    const Icon = notification.icon || styles.icon;

    return (
        <div
            className={`
                bg-[#1e1e2e]/95 backdrop-blur-xl rounded-lg border ${styles.border} shadow-2xl
                p-3 mb-2 flex items-start gap-3 min-w-[300px] max-w-[380px]
                transition-all duration-300 cursor-pointer
                ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
            `}
            onClick={onDismiss}
        >
            <Icon size={18} className={`${styles.color} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{notification.title}</div>
                <div className="text-xs text-gray-400 mt-0.5 line-clamp-2">{notification.body}</div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onDismiss(); }} className="p-0.5 hover:bg-white/10 rounded transition-colors shrink-0">
                <X size={12} className="text-gray-500" />
            </button>
        </div>
    );
};

const NotificationCenter: React.FC<NotificationCenterProps> = ({
    notifications,
    onDismiss,
    onClearAll,
    isOpen,
    onClose,
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClick);
        }
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diff < 60) return "Just now";
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div
            ref={ref}
            className="absolute bottom-14 right-2 sm:right-4 w-80 sm:w-96 max-h-[60vh] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl z-[10000] flex flex-col overflow-hidden animate-slide-up"
        >
            <div className="flex items-center justify-between p-4 border-b border-[#313244]">
                <div className="flex items-center gap-2">
                    <Bell size={16} className="text-gray-400" />
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    {notifications.length > 0 && (
                        <span className="bg-[#89b4fa] text-[#1e1e2e] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </div>
                {notifications.length > 0 && (
                    <button
                        onClick={onClearAll}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <Bell size={32} className="mb-3 opacity-30" />
                        <p className="text-sm">No notifications</p>
                    </div>
                ) : (
                    <div className="p-2 space-y-1">
                        {notifications.map((notif) => {
                            const styles = (() => {
                                switch (notif.type) {
                                    case "success": return { icon: CheckCircle, color: "text-green-400" };
                                    case "warning": return { icon: AlertTriangle, color: "text-yellow-400" };
                                    case "error": return { icon: AlertCircle, color: "text-red-400" };
                                    default: return { icon: Info, color: "text-blue-400" };
                                }
                            })();
                            const Icon = notif.icon || styles.icon;

                            return (
                                <div
                                    key={notif.id}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#313244]/50 transition-colors group cursor-default"
                                >
                                    <Icon size={16} className={`${styles.color} shrink-0 mt-0.5`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-white truncate">{notif.title}</span>
                                            <span className="text-[10px] text-gray-500 shrink-0 ml-2">{formatTime(notif.timestamp)}</span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{notif.body}</p>
                                    </div>
                                    <button
                                        onClick={() => onDismiss(notif.id)}
                                        className="p-0.5 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded transition-all shrink-0"
                                    >
                                        <X size={12} className="text-gray-500" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export { NotificationToast, NotificationCenter };
