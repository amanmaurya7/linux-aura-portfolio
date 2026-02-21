
import React, { useState, useEffect } from "react";
import { Cpu, HardDrive, MemoryStick, Activity, Wifi, Server, Thermometer, Zap } from "lucide-react";

interface ProcessInfo {
    pid: number;
    name: string;
    user: string;
    cpu: number;
    mem: number;
    status: string;
}

const SystemMonitorApp = () => {
    const [activeTab, setActiveTab] = useState<"processes" | "resources" | "filesystems">("resources");
    const [cpuHistory, setCpuHistory] = useState<number[]>(Array(30).fill(0));
    const [memUsage, setMemUsage] = useState(42);
    const [swapUsage, setSwapUsage] = useState(12);
    const [cpuUsage, setCpuUsage] = useState(23);
    const [cpuTemp, setCpuTemp] = useState(52);
    const [networkDown, setNetworkDown] = useState(0);
    const [networkUp, setNetworkUp] = useState(0);
    const [uptime, setUptime] = useState(0);

    const [processes] = useState<ProcessInfo[]>([
        { pid: 1, name: "systemd", user: "root", cpu: 0.1, mem: 0.3, status: "S" },
        { pid: 234, name: "Xorg", user: "root", cpu: 3.2, mem: 1.8, status: "S" },
        { pid: 456, name: "gnome-shell", user: "aman", cpu: 5.4, mem: 4.2, status: "S" },
        { pid: 567, name: "firefox", user: "aman", cpu: 12.3, mem: 8.7, status: "S" },
        { pid: 678, name: "code", user: "aman", cpu: 8.1, mem: 6.3, status: "S" },
        { pid: 789, name: "node", user: "aman", cpu: 4.5, mem: 3.1, status: "S" },
        { pid: 890, name: "pulseaudio", user: "aman", cpu: 0.8, mem: 0.5, status: "S" },
        { pid: 901, name: "NetworkManager", user: "root", cpu: 0.2, mem: 0.4, status: "S" },
        { pid: 1011, name: "docker", user: "root", cpu: 2.1, mem: 2.8, status: "S" },
        { pid: 1122, name: "postgres", user: "postgres", cpu: 1.4, mem: 1.9, status: "S" },
        { pid: 1233, name: "snapd", user: "root", cpu: 0.0, mem: 0.6, status: "S" },
        { pid: 1344, name: "cron", user: "root", cpu: 0.0, mem: 0.1, status: "S" },
        { pid: 1455, name: "dbus-daemon", user: "messagebus", cpu: 0.1, mem: 0.2, status: "S" },
        { pid: 1566, name: "gnome-terminal", user: "aman", cpu: 1.2, mem: 1.0, status: "S" },
        { pid: 1677, name: "nautilus", user: "aman", cpu: 0.9, mem: 1.5, status: "S" },
    ]);

    const [sortBy, setSortBy] = useState<"cpu" | "mem" | "pid">("cpu");

    useEffect(() => {
        const interval = setInterval(() => {
            const newCpu = Math.max(5, Math.min(95, cpuUsage + (Math.random() - 0.5) * 15));
            setCpuUsage(Math.round(newCpu));
            setCpuHistory(prev => [...prev.slice(1), newCpu]);
            setMemUsage(prev => Math.max(30, Math.min(80, prev + (Math.random() - 0.5) * 3)));
            setSwapUsage(prev => Math.max(5, Math.min(40, prev + (Math.random() - 0.5) * 2)));
            setCpuTemp(prev => Math.max(45, Math.min(78, prev + (Math.random() - 0.5) * 4)));
            setNetworkDown(Math.round(Math.random() * 5000 + 500));
            setNetworkUp(Math.round(Math.random() * 1200 + 100));
            setUptime(prev => prev + 1);
        }, 1500);

        return () => clearInterval(interval);
    }, [cpuUsage]);

    const formatUptime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    const sortedProcesses = [...processes].sort((a, b) => {
        if (sortBy === "cpu") return b.cpu - a.cpu;
        if (sortBy === "mem") return b.mem - a.mem;
        return a.pid - b.pid;
    });

    const getCpuColor = () => {
        if (cpuUsage > 80) return { bar: "#f38ba8", glow: "rgba(243, 139, 168, 0.3)" };
        if (cpuUsage > 50) return { bar: "#fab387", glow: "rgba(250, 179, 135, 0.3)" };
        return { bar: "#a6e3a1", glow: "rgba(166, 227, 161, 0.3)" };
    };

    const tabs = [
        { id: "processes" as const, label: "Processes" },
        { id: "resources" as const, label: "Resources" },
        { id: "filesystems" as const, label: "File Systems" },
    ];

    return (
        <div className="flex flex-col h-full bg-[#1e1e2e] text-gray-200 font-mono overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center bg-[#181825] border-b border-[#313244] px-4 shrink-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2.5 text-sm transition-colors relative ${activeTab === tab.id
                                ? "text-[#cdd6f4] font-medium"
                                : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#89b4fa] rounded-full" />
                        )}
                    </button>
                ))}
                <div className="flex-1" />
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Activity size={12} className="text-green-400 animate-pulse" />
                    <span>Uptime: {formatUptime(uptime + 14423)}</span>
                </div>
            </div>

            {activeTab === "resources" && (
                <div className="flex-1 overflow-auto p-4 space-y-4">
                    {/* CPU Section */}
                    <div className="bg-[#181825] rounded-xl p-4 border border-[#313244]">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Cpu size={18} className="text-[#89b4fa]" />
                                <span className="font-semibold text-sm">CPU Usage</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <Thermometer size={14} className={cpuTemp > 70 ? "text-red-400" : "text-orange-400"} />
                                    <span className="text-xs text-gray-400">{cpuTemp}°C</span>
                                </div>
                                <span className="text-2xl font-bold" style={{ color: getCpuColor().bar }}>{cpuUsage}%</span>
                            </div>
                        </div>

                        {/* CPU Graph */}
                        <div className="relative h-24 bg-[#11111b] rounded-lg overflow-hidden border border-[#313244]">
                            {/* Grid lines */}
                            {[25, 50, 75].map((line) => (
                                <div
                                    key={line}
                                    className="absolute w-full border-t border-[#313244]/50"
                                    style={{ top: `${100 - line}%` }}
                                >
                                    <span className="absolute right-1 -top-2.5 text-[8px] text-gray-600">{line}%</span>
                                </div>
                            ))}
                            {/* Graph area */}
                            <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${cpuHistory.length} 100`} preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={getCpuColor().bar} stopOpacity="0.4" />
                                        <stop offset="100%" stopColor={getCpuColor().bar} stopOpacity="0.05" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={`M0,${100 - cpuHistory[0]} ${cpuHistory.map((v, i) => `L${i},${100 - v}`).join(" ")} L${cpuHistory.length - 1},100 L0,100 Z`}
                                    fill="url(#cpuGrad)"
                                />
                                <path
                                    d={`M0,${100 - cpuHistory[0]} ${cpuHistory.map((v, i) => `L${i},${100 - v}`).join(" ")}`}
                                    fill="none"
                                    stroke={getCpuColor().bar}
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>

                        {/* CPU cores mini bars */}
                        <div className="grid grid-cols-4 gap-2 mt-3">
                            {[0, 1, 2, 3, 4, 5, 6, 7].map((core) => {
                                const usage = Math.max(5, Math.min(95, cpuUsage + (Math.random() - 0.5) * 30));
                                return (
                                    <div key={core} className="flex items-center gap-2">
                                        <span className="text-[9px] text-gray-500 w-6">C{core}</span>
                                        <div className="flex-1 h-1.5 bg-[#313244] rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{
                                                    width: `${usage}%`,
                                                    backgroundColor: usage > 80 ? "#f38ba8" : usage > 50 ? "#fab387" : "#a6e3a1",
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Memory & Swap */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#181825] rounded-xl p-4 border border-[#313244]">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <MemoryStick size={18} className="text-[#cba6f7]" />
                                    <span className="font-semibold text-sm">Memory</span>
                                </div>
                                <span className="text-lg font-bold text-[#cba6f7]">{Math.round(memUsage)}%</span>
                            </div>
                            <div className="h-3 bg-[#313244] rounded-full overflow-hidden mb-2">
                                <div
                                    className="h-full bg-[#cba6f7] rounded-full transition-all duration-1000"
                                    style={{ width: `${memUsage}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500">
                                <span>{(memUsage / 100 * 64).toFixed(1)} GB / 64 GB</span>
                                <span>DDR5-5600</span>
                            </div>
                        </div>

                        <div className="bg-[#181825] rounded-xl p-4 border border-[#313244]">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Zap size={18} className="text-[#f9e2af]" />
                                    <span className="font-semibold text-sm">Swap</span>
                                </div>
                                <span className="text-lg font-bold text-[#f9e2af]">{Math.round(swapUsage)}%</span>
                            </div>
                            <div className="h-3 bg-[#313244] rounded-full overflow-hidden mb-2">
                                <div
                                    className="h-full bg-[#f9e2af] rounded-full transition-all duration-1000"
                                    style={{ width: `${swapUsage}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500">
                                <span>{(swapUsage / 100 * 16).toFixed(1)} GB / 16 GB</span>
                                <span>zswap enabled</span>
                            </div>
                        </div>
                    </div>

                    {/* Network */}
                    <div className="bg-[#181825] rounded-xl p-4 border border-[#313244]">
                        <div className="flex items-center gap-2 mb-3">
                            <Wifi size={18} className="text-[#94e2d5]" />
                            <span className="font-semibold text-sm">Network (wlp3s0)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[10px] text-gray-500 mb-1">↓ Receiving</div>
                                <div className="text-lg font-bold text-[#94e2d5]">
                                    {networkDown > 1000 ? `${(networkDown / 1000).toFixed(1)} MB/s` : `${networkDown} KB/s`}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 mb-1">↑ Sending</div>
                                <div className="text-lg font-bold text-[#f5c2e7]">
                                    {networkUp > 1000 ? `${(networkUp / 1000).toFixed(1)} MB/s` : `${networkUp} KB/s`}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disk */}
                    <div className="bg-[#181825] rounded-xl p-4 border border-[#313244]">
                        <div className="flex items-center gap-2 mb-3">
                            <HardDrive size={18} className="text-[#89dceb]" />
                            <span className="font-semibold text-sm">Disk Activity (nvme0n1)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-[10px] text-gray-500 mb-1">Read</div>
                                <div className="text-sm font-bold text-[#89dceb]">{(Math.random() * 200 + 10).toFixed(0)} MB/s</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 mb-1">Write</div>
                                <div className="text-sm font-bold text-[#74c7ec]">{(Math.random() * 100 + 5).toFixed(0)} MB/s</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "processes" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Process table header */}
                    <div className="flex items-center px-4 py-2 bg-[#181825] border-b border-[#313244] text-[10px] font-semibold uppercase tracking-wider text-gray-500 shrink-0">
                        <span className="w-16 cursor-pointer hover:text-white" onClick={() => setSortBy("pid")}>
                            PID {sortBy === "pid" && "▼"}
                        </span>
                        <span className="flex-1">Process Name</span>
                        <span className="w-20">User</span>
                        <span className="w-16 text-right cursor-pointer hover:text-white" onClick={() => setSortBy("cpu")}>
                            CPU% {sortBy === "cpu" && "▼"}
                        </span>
                        <span className="w-16 text-right cursor-pointer hover:text-white" onClick={() => setSortBy("mem")}>
                            MEM% {sortBy === "mem" && "▼"}
                        </span>
                        <span className="w-12 text-center">Status</span>
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedProcesses.map((proc) => (
                            <div
                                key={proc.pid}
                                className="flex items-center px-4 py-1.5 text-xs hover:bg-[#313244]/50 border-b border-[#313244]/30 transition-colors cursor-default"
                            >
                                <span className="w-16 text-gray-500 font-mono">{proc.pid}</span>
                                <span className="flex-1 text-gray-200 font-medium">{proc.name}</span>
                                <span className="w-20 text-gray-400">{proc.user}</span>
                                <span className={`w-16 text-right font-mono ${proc.cpu > 5 ? "text-[#fab387]" : "text-gray-400"}`}>
                                    {(proc.cpu + Math.random() * 2 - 1).toFixed(1)}
                                </span>
                                <span className={`w-16 text-right font-mono ${proc.mem > 5 ? "text-[#cba6f7]" : "text-gray-400"}`}>
                                    {proc.mem.toFixed(1)}
                                </span>
                                <span className="w-12 text-center">
                                    <span className={`inline-block w-2 h-2 rounded-full ${proc.status === "S" ? "bg-green-500" : "bg-yellow-500"}`} />
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="h-6 bg-[#181825] border-t border-[#313244] flex items-center px-4 text-[10px] text-gray-500 shrink-0">
                        <span>{processes.length} processes</span>
                        <span className="flex-1" />
                        <span>Load Average: 1.24, 0.98, 0.76</span>
                    </div>
                </div>
            )}

            {activeTab === "filesystems" && (
                <div className="flex-1 overflow-auto p-4">
                    <div className="bg-[#181825] rounded-xl border border-[#313244] overflow-hidden">
                        <div className="flex items-center px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 border-b border-[#313244]">
                            <span className="w-24">Device</span>
                            <span className="flex-1">Mount Point</span>
                            <span className="w-16">Type</span>
                            <span className="w-20 text-right">Total</span>
                            <span className="w-20 text-right">Available</span>
                            <span className="w-20 text-right">Used</span>
                            <span className="w-32 text-center">Usage</span>
                        </div>
                        {[
                            { device: "/dev/nvme0n1p2", mount: "/", type: "ext4", total: "1.8T", avail: "856G", used: "944G", percent: 52 },
                            { device: "/dev/nvme0n1p1", mount: "/boot/efi", type: "vfat", total: "512M", avail: "480M", used: "32M", percent: 6 },
                            { device: "tmpfs", mount: "/tmp", type: "tmpfs", total: "32G", avail: "31.2G", used: "832M", percent: 3 },
                            { device: "/dev/sda1", mount: "/mnt/data", type: "ext4", total: "4T", avail: "2.1T", used: "1.9T", percent: 47 },
                        ].map((fs, i) => (
                            <div key={i} className="flex items-center px-4 py-2.5 text-xs border-b border-[#313244]/30 last:border-0 hover:bg-[#313244]/30 transition-colors">
                                <span className="w-24 text-gray-400 font-mono text-[10px]">{fs.device}</span>
                                <span className="flex-1 text-gray-200">{fs.mount}</span>
                                <span className="w-16 text-gray-500">{fs.type}</span>
                                <span className="w-20 text-right text-gray-400">{fs.total}</span>
                                <span className="w-20 text-right text-green-400">{fs.avail}</span>
                                <span className="w-20 text-right text-gray-400">{fs.used}</span>
                                <span className="w-32 flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-[#313244] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${fs.percent}%`,
                                                backgroundColor: fs.percent > 80 ? "#f38ba8" : fs.percent > 60 ? "#fab387" : "#a6e3a1",
                                            }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-gray-500 w-8 text-right">{fs.percent}%</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemMonitorApp;
