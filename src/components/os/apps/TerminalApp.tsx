
import React, { useState, useEffect, useRef } from "react";
import { useOS } from "@/context/OSContext";
import { initialFileSystem } from "@/lib/initialFs";
import { FileSystemNode, DirectoryNode, FileNode } from "@/types/os";
import { appConfigs } from "@/config/apps";

const TerminalApp = () => {
    const { launchApp } = useOS();
    const [history, setHistory] = useState<string[]>(["Welcome to Linux Aura OS v1.0", "Type 'help' for available commands."]);
    const [input, setInput] = useState("");
    const [currentPath, setCurrentPath] = useState<string[]>(["home", "aman"]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        inputRef.current?.focus();
    }, [history]);

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

    const handleCommand = (cmd: string) => {
        const parts = cmd.trim().split(" ");
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        const newHistory = [...history, `aman@linux:~/${currentPath.slice(1).join('/')}$ ${cmd}`];

        switch (command) {
            case "help":
                setHistory([...newHistory,
                    "Available commands:",
                    "  help     - Show this help message",
                    "  ls       - List directory contents",
                    "  cd <dir> - Change directory",
                    "  cat <file> - Display file content",
                    "  clear    - Clear terminal",
                    "  open <app> - Launch an application (e.g., 'open Profile')",
                    "  whoami   - Display current user",
                    "  date     - Display current date/time"
                ]);
                break;
            case "cls":
            case "clear":
                setHistory([]);
                break;
            case "ls": {
                const node = resolveNode(currentPath);
                if (node && node.type === 'directory') {
                    const dir = node as DirectoryNode;
                    const items = Object.keys(dir.children || {}).map(name => {
                        const child = dir.children[name];
                        return child.type === 'directory' ? `<DIR> ${name}` : name;
                    });
                    setHistory([...newHistory, items.join("  ")]);
                } else {
                    setHistory([...newHistory, "Error: Current path is invalid."]);
                }
                break;
            }
            case "cd": {
                if (args.length === 0) {
                    setCurrentPath(["home", "aman"]);
                    setHistory([...newHistory]);
                    return;
                }

                const target = args[0];
                if (target === "..") {
                    if (currentPath.length > 0) {
                        setCurrentPath(currentPath.slice(0, -1));
                    }
                    setHistory([...newHistory]);
                } else {
                    const node = resolveNode([...currentPath, target]);
                    if (node && node.type === 'directory') {
                        setCurrentPath([...currentPath, target]);
                        setHistory([...newHistory]);
                    } else {
                        setHistory([...newHistory, `cd: ${target}: No such directory`]);
                    }
                }
                break;
            }
            case "cat": {
                if (args.length === 0) {
                    setHistory([...newHistory, "Usage: cat <filename>"]);
                    break;
                }
                const filename = args[0];
                const node = resolveNode([...currentPath, filename]);
                if (node && node.type === 'file') {
                    const file = node as FileNode;
                    setHistory([...newHistory, file.content]);
                } else {
                    setHistory([...newHistory, `cat: ${filename}: No such file`]);
                }
                break;
            }
            case "whoami":
                setHistory([...newHistory, "aman"]);
                break;
            case "date":
                setHistory([...newHistory, new Date().toString()]);
                break;
            case "open": {
                const target = args[0];
                if (!target) {
                    setHistory([...newHistory, "Usage: open <app_name> or <file>"]);
                    break;
                }

                // Check if target is a configured app name
                const config = appConfigs[target] || appConfigs[target.charAt(0).toUpperCase() + target.slice(1)];
                if (config) {
                    launchApp(target, config.props, config.title);
                    setHistory([...newHistory, `Launching ${target}...`]);
                    break;
                }

                // Check file system
                const node = resolveNode([...currentPath, target]);
                if (node && node.type === 'file') {
                    const file = node as FileNode;
                    if (file.component) {
                        // Look up config for the component name stored in file
                        const fileParams = appConfigs[file.component];
                        launchApp(file.component, fileParams ? fileParams.props : {}, fileParams ? fileParams.title : file.name);
                        setHistory([...newHistory, `Launching ${file.name}...`]);
                        break;
                    }
                }

                setHistory([...newHistory, `App or file not found: ${target}`]);
                break;
            }
            default:
                if (command !== "") {
                    setHistory([...newHistory, `Command not found: ${command}`]);
                } else {
                    setHistory([...newHistory]);
                }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <div
            className="h-full bg-black text-green-500 font-mono p-4 overflow-auto text-sm"
            ref={containerRef}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
            ))}
            <div className="flex items-center">
                <span className="mr-2 text-blue-400">aman@linux:~/{currentPath.length > 1 ? currentPath.slice(1).join('/') : ''}$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none flex-1 text-green-500 w-full"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default TerminalApp;
