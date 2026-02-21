
import React, { useState } from "react";
import { initialFileSystem } from "@/lib/initialFs";
import { FileSystemNode, DirectoryNode, FileNode } from "@/types/os";
import { useOS } from "@/context/OSContext";
import { appConfigs } from "@/config/apps";
import {
    Folder, FileText, Home, HardDrive, ChevronRight, ArrowLeft, ArrowRight,
    Search, Grid, List, Star, Clock, Download, Trash2, MoreVertical
} from "lucide-react";

const FileManagerApp = () => {
    const { launchApp } = useOS();
    const [currentPath, setCurrentPath] = useState<string[]>(["home", "aman"]);
    const [history, setHistory] = useState<string[][]>([["home", "aman"]]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const resolveNode = (path: string[]): FileSystemNode | null => {
        let current: FileSystemNode = initialFileSystem;
        for (const segment of path) {
            if (current.type !== 'directory') return null;
            const dir = current as DirectoryNode;
            if (dir.children && dir.children[segment]) {
                current = dir.children[segment];
            } else {
                return null;
            }
        }
        return current;
    };

    const navigateTo = (newPath: string[]) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newPath);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(newPath);
        setSelectedFile(null);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(history[historyIndex - 1]);
            setSelectedFile(null);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setCurrentPath(history[historyIndex + 1]);
            setSelectedFile(null);
        }
    };

    const goUp = () => {
        if (currentPath.length > 0) {
            navigateTo(currentPath.slice(0, -1));
        }
    };

    const handleItemDoubleClick = (name: string, node: FileSystemNode) => {
        if (node.type === "directory") {
            navigateTo([...currentPath, name]);
        } else {
            const file = node as FileNode;
            if (file.component) {
                const config = appConfigs[file.component];
                if (config) {
                    launchApp(config.component, config.props, config.title);
                }
            } else {
                // Open in text editor
                launchApp("TextEditor", { fileName: file.name, content: file.content }, file.name);
            }
        }
    };

    const currentNode = resolveNode(currentPath);
    const items = currentNode && currentNode.type === "directory"
        ? Object.entries((currentNode as DirectoryNode).children || {})
        : [];

    const filteredItems = items.filter(([name]) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort: directories first, then files
    const sortedItems = filteredItems.sort(([, a], [, b]) => {
        if (a.type === "directory" && b.type !== "directory") return -1;
        if (a.type !== "directory" && b.type === "directory") return 1;
        return 0;
    });

    const getFileIcon = (name: string, type: string) => {
        if (type === "directory") {
            return <Folder size={viewMode === "grid" ? 48 : 18} className="text-yellow-400" fill="currentColor" />;
        }
        const ext = name.split(".").pop()?.toLowerCase();
        const colors: Record<string, string> = {
            md: "text-blue-400",
            json: "text-yellow-300",
            txt: "text-gray-300",
            ts: "text-blue-500",
            tsx: "text-blue-400",
            js: "text-yellow-400",
            py: "text-green-400",
        };
        return <FileText size={viewMode === "grid" ? 48 : 18} className={colors[ext || ""] || "text-gray-400"} />;
    };

    const getPathDisplay = () => {
        if (currentPath.length === 0) return "/";
        return "/" + currentPath.join("/");
    };

    const sidebarItems = [
        { label: "Home", icon: Home, path: ["home", "aman"] },
        { label: "Desktop", icon: HardDrive, path: ["home", "aman"] },
        { label: "Documents", icon: Folder, path: ["home", "aman"] },
        { label: "Downloads", icon: Download, path: ["home", "aman"] },
        { label: "Root", icon: HardDrive, path: [] },
    ];

    return (
        <div className="flex h-full bg-[#1e1e2e] text-gray-200 font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-52 bg-[#181825] border-r border-[#313244] flex flex-col shrink-0">
                <div className="p-3">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            type="text"
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#313244] pl-8 pr-3 py-1.5 rounded-md text-xs text-gray-200 border-none focus:outline-none focus:ring-1 focus:ring-[#89b4fa] transition-all placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="px-3 py-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Places</span>
                </div>

                <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigateTo(item.path)}
                            className={`flex items-center w-full px-2 py-1.5 rounded-md text-sm transition-colors ${JSON.stringify(currentPath) === JSON.stringify(item.path)
                                    ? "bg-[#89b4fa]/20 text-[#89b4fa]"
                                    : "hover:bg-[#313244] text-gray-400"
                                }`}
                        >
                            <item.icon size={16} className="mr-2.5 shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Sidebar footer - Storage info */}
                <div className="p-3 border-t border-[#313244]">
                    <div className="text-[10px] text-gray-500 mb-1.5">Filesystem Capacity</div>
                    <div className="h-1.5 bg-[#313244] rounded-full overflow-hidden">
                        <div className="h-full w-[42%] bg-[#89b4fa] rounded-full"></div>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">856 GB free of 2 TB</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="h-10 bg-[#181825] border-b border-[#313244] flex items-center px-3 gap-2 shrink-0">
                    <button
                        onClick={goBack}
                        disabled={historyIndex <= 0}
                        className="p-1 rounded hover:bg-[#313244] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowLeft size={16} className="text-gray-400" />
                    </button>
                    <button
                        onClick={goForward}
                        disabled={historyIndex >= history.length - 1}
                        className="p-1 rounded hover:bg-[#313244] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowRight size={16} className="text-gray-400" />
                    </button>

                    {/* Breadcrumbs */}
                    <div className="flex-1 flex items-center bg-[#313244] rounded-md px-3 py-1 text-sm mx-2">
                        <button onClick={() => navigateTo([])} className="text-gray-400 hover:text-white transition-colors">
                            /
                        </button>
                        {currentPath.map((segment, i) => (
                            <React.Fragment key={i}>
                                <ChevronRight size={12} className="text-gray-600 mx-1" />
                                <button
                                    onClick={() => navigateTo(currentPath.slice(0, i + 1))}
                                    className={`hover:text-white transition-colors ${i === currentPath.length - 1 ? "text-white font-medium" : "text-gray-400"
                                        }`}
                                >
                                    {segment}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* View mode toggle */}
                    <div className="flex items-center gap-1 bg-[#313244] rounded-md p-0.5">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1 rounded ${viewMode === "grid" ? "bg-[#45475a] text-white" : "text-gray-500 hover:text-gray-300"} transition-colors`}
                        >
                            <Grid size={14} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1 rounded ${viewMode === "list" ? "bg-[#45475a] text-white" : "text-gray-500 hover:text-gray-300"} transition-colors`}
                        >
                            <List size={14} />
                        </button>
                    </div>
                </div>

                {/* File list */}
                <div className="flex-1 overflow-auto p-4">
                    {sortedItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <Folder size={64} className="mb-4 opacity-30" />
                            <p className="text-sm">This folder is empty</p>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                            {sortedItems.map(([name, node]) => (
                                <div
                                    key={name}
                                    className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all group select-none ${selectedFile === name
                                            ? "bg-[#89b4fa]/20 ring-1 ring-[#89b4fa]/50"
                                            : "hover:bg-[#313244]"
                                        }`}
                                    onClick={() => setSelectedFile(name)}
                                    onDoubleClick={() => handleItemDoubleClick(name, node)}
                                >
                                    <div className="mb-2 group-hover:scale-105 transition-transform">
                                        {getFileIcon(name, node.type)}
                                    </div>
                                    <span className="text-xs text-center truncate w-full leading-tight">
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-0.5">
                            {/* List header */}
                            <div className="flex items-center px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 border-b border-[#313244]">
                                <span className="flex-1">Name</span>
                                <span className="w-24 text-right">Size</span>
                                <span className="w-32 text-right">Modified</span>
                            </div>
                            {sortedItems.map(([name, node]) => (
                                <div
                                    key={name}
                                    className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-all ${selectedFile === name
                                            ? "bg-[#89b4fa]/20 ring-1 ring-[#89b4fa]/50"
                                            : "hover:bg-[#313244]"
                                        }`}
                                    onClick={() => setSelectedFile(name)}
                                    onDoubleClick={() => handleItemDoubleClick(name, node)}
                                >
                                    <div className="mr-3">{getFileIcon(name, node.type)}</div>
                                    <span className="flex-1 text-sm truncate">{name}</span>
                                    <span className="w-24 text-right text-xs text-gray-500">
                                        {node.type === "file" ? "4 KB" : "--"}
                                    </span>
                                    <span className="w-32 text-right text-xs text-gray-500">
                                        Feb 21, 2026
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status bar */}
                <div className="h-6 bg-[#181825] border-t border-[#313244] flex items-center px-3 text-[10px] text-gray-500 shrink-0">
                    <span>{sortedItems.length} item{sortedItems.length !== 1 ? "s" : ""}</span>
                    <span className="flex-1"></span>
                    <span>{getPathDisplay()}</span>
                </div>
            </div>
        </div>
    );
};

export default FileManagerApp;
