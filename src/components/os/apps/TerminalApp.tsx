
import React, { useState, useEffect, useRef } from "react";
import { useOS } from "@/context/OSContext";
import { initialFileSystem } from "@/lib/initialFs";
import { FileSystemNode, DirectoryNode, FileNode } from "@/types/os";
import { appConfigs } from "@/config/apps";

const NEOFETCH_ART = [
    "          \x1b[36m.-/+oossssoo+/-.\x1b[0m",
    "      \x1b[36m`:+ssssssssssssssssss+:`\x1b[0m",
    "    \x1b[36m-+ssssssssssssssssssyyssss+-\x1b[0m",
    "  \x1b[36m.ossssssssssssssssssd\x1b[33mMMMNy\x1b[36msssso.\x1b[0m",
    " \x1b[36m/sssssssssss\x1b[33mhdmmNNmmyNMMMMh\x1b[36mssssss/\x1b[0m",
    "\x1b[36m+sssssssss\x1b[33mhm\x1b[36myd\x1b[33mMMMMMMMNddddy\x1b[36mssssssss+\x1b[0m",
    "\x1b[36m/ssssssss\x1b[33mhNMMM\x1b[36myh\x1b[33mhyyyyhmNMMMNh\x1b[36mssssssss/\x1b[0m",
    "\x1b[36m.ssssssss\x1b[33mdMMMNh\x1b[36mssssssssss\x1b[33mhNMMMd\x1b[36mssssssss.\x1b[0m",
    "\x1b[36m+ssss\x1b[33mhhhyNMMNy\x1b[36mssssssssssss\x1b[33myNMMMy\x1b[36msssssss+\x1b[0m",
    "\x1b[36moss\x1b[33myNMMMNyMMh\x1b[36mssssssssssssss\x1b[33mhmmmh\x1b[36mssssssso\x1b[0m",
    "\x1b[36moss\x1b[33myNMMMNyMMh\x1b[36msssssssssssssssmh\x1b[36mssssssso\x1b[0m",
    "\x1b[36m+ssss\x1b[33mhhhyNMMNy\x1b[36mssssssssssss\x1b[33myNMMMy\x1b[36msssssss+\x1b[0m",
    "\x1b[36m.ssssssss\x1b[33mdMMMNh\x1b[36mssssssssss\x1b[33mhNMMMd\x1b[36mssssssss.\x1b[0m",
    "\x1b[36m/ssssssss\x1b[33mhNMMM\x1b[36myh\x1b[33mhyyyyhdNMMMNh\x1b[36mssssssss/\x1b[0m",
    "\x1b[36m+sssssssss\x1b[33mdm\x1b[36myd\x1b[33mMMMMMMMMddddy\x1b[36mssssssss+\x1b[0m",
    " \x1b[36m/sssssssssss\x1b[33mhdmNNNNmyNMMMMh\x1b[36mssssss/\x1b[0m",
    "  \x1b[36m.ossssssssssssssssssd\x1b[33mMMMNy\x1b[36msssso.\x1b[0m",
    "    \x1b[36m-+sssssssssssssssss\x1b[36myysssss+-\x1b[0m",
    "      \x1b[36m`:+ssssssssssssssssss+:`\x1b[0m",
    "          \x1b[36m.-/+oossssoo+/-.\x1b[0m",
];

const NEOFETCH_INFO = [
    "\x1b[1;36maman@linux-aura\x1b[0m",
    "\x1b[36m-----------------\x1b[0m",
    "\x1b[1;36mOS:\x1b[0m Linux Aura OS 2.0.4 x86_64",
    "\x1b[1;36mHost:\x1b[0m Portfolio Machine",
    "\x1b[1;36mKernel:\x1b[0m 6.8.0-31-generic",
    "\x1b[1;36mUptime:\x1b[0m 4 hours, 12 mins",
    "\x1b[1;36mPackages:\x1b[0m 2847 (apt), 42 (snap)",
    "\x1b[1;36mShell:\x1b[0m bash 5.2.15",
    "\x1b[1;36mResolution:\x1b[0m 3840x2160",
    "\x1b[1;36mDE:\x1b[0m GNOME 46.2",
    "\x1b[1;36mWM:\x1b[0m Mutter",
    "\x1b[1;36mWM Theme:\x1b[0m Catppuccin-Mocha",
    "\x1b[1;36mTheme:\x1b[0m Adw-dark [GTK3]",
    "\x1b[1;36mIcons:\x1b[0m Papirus-Dark",
    "\x1b[1;36mTerminal:\x1b[0m linux-aura-terminal",
    "\x1b[1;36mCPU:\x1b[0m Intel i9-14900K (24) @ 5.80GHz",
    "\x1b[1;36mGPU:\x1b[0m NVIDIA RTX 4090",
    "\x1b[1;36mMemory:\x1b[0m 27614MiB / 65536MiB",
    "",
    "\x1b[30m███\x1b[31m███\x1b[32m███\x1b[33m███\x1b[34m███\x1b[35m███\x1b[36m███\x1b[37m███\x1b[0m",
];

const TerminalApp = () => {
    const { launchApp } = useOS();
    const [history, setHistory] = useState<string[]>(["Welcome to Linux Aura OS v2.0", "Type 'help' for available commands.", ""]);
    const [input, setInput] = useState("");
    const [currentPath, setCurrentPath] = useState<string[]>(["home", "aman"]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
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

    const getPrompt = () => {
        const path = currentPath.length > 1 ? currentPath.slice(1).join('/') : '';
        return `\x1b[1;32maman@linux-aura\x1b[0m:\x1b[1;34m~/${path}\x1b[0m$ `;
    };

    const handleCommand = (cmd: string) => {
        const parts = cmd.trim().split(/\s+/);
        const command = parts[0]?.toLowerCase() || "";
        const args = parts.slice(1);

        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        const newHistory = [...history, `${getPrompt()}${cmd}`];

        switch (command) {
            case "help":
                setHistory([...newHistory,
                    "\x1b[1;33m📋 Available commands:\x1b[0m",
                    "",
                    "  \x1b[1;36mNavigation:\x1b[0m",
                    "    ls          - List directory contents",
                    "    ls -la      - List with details",
                    "    cd <dir>    - Change directory",
                    "    pwd         - Print working directory",
                    "    tree        - Show directory tree",
                    "",
                    "  \x1b[1;36mFile Operations:\x1b[0m",
                    "    cat <file>  - Display file content",
                    "    touch <f>   - Create empty file",
                    "    mkdir <d>   - Create directory",
                    "    rm <file>   - Remove file (simulated)",
                    "    cp <s> <d>  - Copy file (simulated)",
                    "",
                    "  \x1b[1;36mSystem Info:\x1b[0m",
                    "    neofetch    - System information with ASCII art",
                    "    uname -a    - System information",
                    "    whoami      - Display current user",
                    "    hostname    - Display hostname",
                    "    uptime      - System uptime",
                    "    date        - Current date/time",
                    "    df -h       - Disk space",
                    "    free -h     - Memory usage",
                    "    lscpu       - CPU information",
                    "    top         - Process overview",
                    "",
                    "  \x1b[1;36mApplications:\x1b[0m",
                    "    open <app>  - Launch application",
                    "    xdg-open    - Same as open",
                    "",
                    "  \x1b[1;36mUtilities:\x1b[0m",
                    "    echo <text> - Print text",
                    "    grep <p> <f>- Search in file",
                    "    history     - Command history",
                    "    alias       - Show aliases",
                    "    man <cmd>   - Manual page",
                    "    clear       - Clear terminal",
                    "    exit        - Close terminal",
                    "",
                    "  \x1b[1;36mFun:\x1b[0m",
                    "    sudo <cmd>  - Run as superuser",
                    "    sl          - Steam Locomotive 🚂",
                    "    cowsay <t>  - Cow says...",
                    "    fortune     - Fortune cookie",
                    "    cmatrix     - Matrix rain (simulated)",
                    ""
                ]);
                break;

            case "cls":
            case "clear":
                setHistory([]);
                break;

            case "pwd":
                setHistory([...newHistory, `/${currentPath.join("/")}`]);
                break;

            case "hostname":
                setHistory([...newHistory, "linux-aura"]);
                break;

            case "uname":
                if (args.includes("-a") || args.includes("--all")) {
                    setHistory([...newHistory, "Linux linux-aura 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux"]);
                } else if (args.includes("-r")) {
                    setHistory([...newHistory, "6.8.0-31-generic"]);
                } else {
                    setHistory([...newHistory, "Linux"]);
                }
                break;

            case "uptime":
                setHistory([...newHistory, ` ${new Date().toLocaleTimeString()} up 4:12, 1 user, load average: 1.24, 0.98, 0.76`]);
                break;

            case "free":
                setHistory([...newHistory,
                    "              total        used        free      shared  buff/cache   available",
                    "Mem:       65536000    27614000    22456000     1234000    15466000    36200000",
                    "Swap:      16777216     2013184    14764032",
                ]);
                break;

            case "df":
                setHistory([...newHistory,
                    "Filesystem      Size  Used Avail Use% Mounted on",
                    "/dev/nvme0n1p2  1.8T  944G  856G  53% /",
                    "tmpfs            32G  832M   31G   3% /tmp",
                    "/dev/nvme0n1p1  512M   32M  480M   7% /boot/efi",
                    "/dev/sda1       4.0T  1.9T  2.1T  48% /mnt/data",
                ]);
                break;

            case "lscpu":
                setHistory([...newHistory,
                    "Architecture:            x86_64",
                    "CPU op-mode(s):          32-bit, 64-bit",
                    "Byte Order:              Little Endian",
                    "CPU(s):                  24",
                    "Thread(s) per core:      2",
                    "Core(s) per socket:      16",
                    "Socket(s):               1",
                    "Model name:              Intel(R) Core(TM) i9-14900K",
                    "CPU MHz:                 5800.000",
                    "CPU max MHz:             5800.0000",
                    "L1d cache:               640 KiB",
                    "L2 cache:                24 MiB",
                    "L3 cache:                36 MiB",
                ]);
                break;

            case "top":
                setHistory([...newHistory,
                `top - ${new Date().toLocaleTimeString()} up 4:12,  1 user,  load average: 1.24, 0.98, 0.76`,
                    "Tasks: 247 total,   2 running, 245 sleeping,   0 stopped,   0 zombie",
                    "%Cpu(s):  12.3 us,  3.2 sy,  0.0 ni, 82.1 id,  1.8 wa,  0.0 hi,  0.6 si",
                    "MiB Mem :  64000.0 total,  22456.0 free,  27614.0 used,  15466.0 buff/cache",
                    "MiB Swap:  16384.0 total,  14764.0 free,   2013.2 used.  36200.0 avail Mem",
                    "",
                    "  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND",
                    "  567 aman      20   0 4.321g 567.8m  98.2m S  12.3   8.7   2:34.56 firefox",
                    "  678 aman      20   0 2.147g 412.3m  67.5m S   8.1   6.3   1:45.23 code",
                    "  456 aman      20   0 1.856g 274.2m  45.8m S   5.4   4.2   3:12.78 gnome-shell",
                    "  789 aman      20   0  856.4m 201.5m  34.2m S   4.5   3.1   0:56.34 node",
                    "  234 root      20   0  456.7m 117.8m  67.4m S   3.2   1.8   4:23.91 Xorg",
                    " 1011 root      20   0  721.3m 182.4m  42.1m S   2.1   2.8   0:34.67 docker",
                    " 1122 postgres  20   0  312.8m 123.6m  28.9m S   1.4   1.9   0:45.12 postgres",
                ]);
                break;

            case "neofetch": {
                const neofetchLines: string[] = [];
                const maxLines = Math.max(NEOFETCH_ART.length, NEOFETCH_INFO.length);
                for (let i = 0; i < maxLines; i++) {
                    const artLine = NEOFETCH_ART[i] || "";
                    const infoLine = NEOFETCH_INFO[i] || "";
                    neofetchLines.push(`${artLine}   ${infoLine}`);
                }
                setHistory([...newHistory, ...neofetchLines, ""]);
                break;
            }

            case "tree": {
                const node = resolveNode(currentPath);
                if (node && node.type === 'directory') {
                    const dir = node as DirectoryNode;
                    const treeLines = ["."];
                    const entries = Object.entries(dir.children || {});
                    entries.forEach(([name, child], i) => {
                        const isLast = i === entries.length - 1;
                        const prefix = isLast ? "└── " : "├── ";
                        const indicator = child.type === 'directory' ? `\x1b[1;34m${name}/\x1b[0m` : name;
                        treeLines.push(`${prefix}${indicator}`);
                    });
                    treeLines.push(`\n${entries.filter(([, c]) => c.type === 'directory').length} directories, ${entries.filter(([, c]) => c.type === 'file').length} files`);
                    setHistory([...newHistory, ...treeLines]);
                }
                break;
            }

            case "ls": {
                const node = resolveNode(currentPath);
                if (node && node.type === 'directory') {
                    const dir = node as DirectoryNode;
                    if (args.includes("-la") || args.includes("-l") || args.includes("-al")) {
                        const items = Object.entries(dir.children || {}).map(([name, child]) => {
                            const isDir = child.type === 'directory';
                            const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
                            const size = isDir ? "4096" : " " + Math.floor(Math.random() * 5000 + 100).toString().padStart(4);
                            const date = "Feb 21 14:32";
                            const displayName = isDir ? `\x1b[1;34m${name}\x1b[0m` : name;
                            return `${perms}  1 aman aman ${size} ${date} ${displayName}`;
                        });
                        setHistory([...newHistory, `total ${items.length * 4}`, ...items]);
                    } else {
                        const items = Object.keys(dir.children || {}).map(name => {
                            const child = dir.children[name];
                            return child.type === 'directory' ? `\x1b[1;34m${name}\x1b[0m` : name;
                        });
                        setHistory([...newHistory, items.join("  ")]);
                    }
                } else {
                    setHistory([...newHistory, "Error: Current path is invalid."]);
                }
                break;
            }

            case "cd": {
                if (args.length === 0 || args[0] === "~") {
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
                } else if (target === "/") {
                    setCurrentPath([]);
                    setHistory([...newHistory]);
                } else if (target.startsWith("/")) {
                    const newPath = target.split("/").filter(Boolean);
                    const node = resolveNode(newPath);
                    if (node && node.type === 'directory') {
                        setCurrentPath(newPath);
                        setHistory([...newHistory]);
                    } else {
                        setHistory([...newHistory, `bash: cd: ${target}: No such file or directory`]);
                    }
                } else {
                    const node = resolveNode([...currentPath, target]);
                    if (node && node.type === 'directory') {
                        setCurrentPath([...currentPath, target]);
                        setHistory([...newHistory]);
                    } else {
                        setHistory([...newHistory, `bash: cd: ${target}: No such file or directory`]);
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
                    setHistory([...newHistory, `cat: ${filename}: No such file or directory`]);
                }
                break;
            }

            case "touch":
                if (args.length === 0) {
                    setHistory([...newHistory, "Usage: touch <filename>"]);
                } else {
                    setHistory([...newHistory]); // Silently succeed
                }
                break;

            case "mkdir":
                if (args.length === 0) {
                    setHistory([...newHistory, "Usage: mkdir <dirname>"]);
                } else {
                    setHistory([...newHistory]); // Silently succeed
                }
                break;

            case "rm":
                if (args.length === 0) {
                    setHistory([...newHistory, "Usage: rm <file>"]);
                } else if (args[0] === "-rf" && args[1] === "/") {
                    setHistory([...newHistory, "\x1b[1;31m😈 Nice try! This is a simulated OS.\x1b[0m"]);
                } else {
                    setHistory([...newHistory]);
                }
                break;

            case "cp":
                if (args.length < 2) {
                    setHistory([...newHistory, "Usage: cp <source> <dest>"]);
                } else {
                    setHistory([...newHistory]);
                }
                break;

            case "echo":
                setHistory([...newHistory, args.join(" ").replace(/['"]/g, "")]);
                break;

            case "grep":
                if (args.length < 2) {
                    setHistory([...newHistory, "Usage: grep <pattern> <file>"]);
                } else {
                    const pattern = args[0];
                    const file = args[1];
                    const node = resolveNode([...currentPath, file]);
                    if (node && node.type === 'file') {
                        const fileNode = node as FileNode;
                        const matches = fileNode.content.split("\\n")
                            .filter(line => line.toLowerCase().includes(pattern.toLowerCase()))
                            .map(line => line.replace(new RegExp(`(${pattern})`, 'gi'), `\x1b[1;31m$1\x1b[0m`));
                        if (matches.length > 0) {
                            setHistory([...newHistory, ...matches]);
                        } else {
                            setHistory([...newHistory]);
                        }
                    } else {
                        setHistory([...newHistory, `grep: ${file}: No such file or directory`]);
                    }
                }
                break;

            case "history":
                setHistory([...newHistory, ...commandHistory.map((c, i) => `  ${i + 1}  ${c}`)]);
                break;

            case "alias":
                setHistory([...newHistory,
                    "alias ll='ls -la'",
                    "alias la='ls -A'",
                    "alias l='ls -CF'",
                    "alias gs='git status'",
                    "alias gc='git commit'",
                    "alias gp='git push'",
                    "alias vim='nvim'",
                    "alias python='python3'",
                ]);
                break;

            case "man":
                if (args.length === 0) {
                    setHistory([...newHistory, "What manual page do you want?\nFor example, try 'man man'."]);
                } else {
                    setHistory([...newHistory,
                    `\x1b[1m${args[0].toUpperCase()}(1)\x1b[0m              User Commands              \x1b[1m${args[0].toUpperCase()}(1)\x1b[0m`,
                        "",
                        "\x1b[1mNAME\x1b[0m",
                    `       ${args[0]} - a simulated command in Linux Aura OS`,
                        "",
                        "\x1b[1mDESCRIPTION\x1b[0m",
                        `       This is a portfolio website simulating a Linux desktop environment.`,
                    `       The '${args[0]}' command provides familiar Linux functionality.`,
                        "",
                        "\x1b[1mAUTHOR\x1b[0m",
                        "       Written by Aman Maurya.",
                        "",
                        "\x1b[1mSEE ALSO\x1b[0m",
                        "       help(1), open(1), neofetch(1)",
                        "",
                    ]);
                }
                break;

            case "whoami":
                setHistory([...newHistory, "aman"]);
                break;

            case "id":
                setHistory([...newHistory, "uid=1000(aman) gid=1000(aman) groups=1000(aman),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users),118(docker)"]);
                break;

            case "date":
                setHistory([...newHistory, new Date().toString()]);
                break;

            case "cal": {
                const now = new Date();
                const monthName = now.toLocaleString('default', { month: 'long' });
                const year = now.getFullYear();
                const header = `     ${monthName} ${year}`;
                const days = "Su Mo Tu We Th Fr Sa";
                const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
                const firstDay = new Date(year, now.getMonth(), 1).getDay();
                let calLines = [header, days];
                let line = "   ".repeat(firstDay);
                for (let d = 1; d <= daysInMonth; d++) {
                    const dayStr = d === now.getDate() ? `\x1b[7m${d.toString().padStart(2)}\x1b[0m` : d.toString().padStart(2);
                    line += dayStr + " ";
                    if ((firstDay + d) % 7 === 0) {
                        calLines.push(line.trimEnd());
                        line = "";
                    }
                }
                if (line.trim()) calLines.push(line.trimEnd());
                setHistory([...newHistory, ...calLines]);
                break;
            }

            case "sudo":
                if (args.length === 0) {
                    setHistory([...newHistory, "usage: sudo [-h] command"]);
                } else if (args.join(" ") === "rm -rf /") {
                    setHistory([...newHistory, "\x1b[1;31m🛑 Permission denied. Not today, hacker!\x1b[0m"]);
                } else if (args[0] === "apt" || args[0] === "apt-get") {
                    setHistory([...newHistory,
                        "Reading package lists... Done",
                        "Building dependency tree... Done",
                        "Reading state information... Done",
                        `\x1b[1;33m⚠ This is a simulated OS. Packages are imaginary!\x1b[0m`,
                    ]);
                } else if (args[0] === "su") {
                    setHistory([...newHistory, "\x1b[1;32m[sudo] password for aman: \x1b[0m", "\x1b[1;31mroot@linux-aura:~#\x1b[0m Just kidding! 😄"]);
                } else {
                    setHistory([...newHistory, `\x1b[1;32m[sudo]\x1b[0m Running '${args.join(" ")}' as root...`, "Done."]);
                }
                break;

            case "apt":
            case "apt-get":
                setHistory([...newHistory, "\x1b[1;33mE: Could not open lock file /var/lib/dpkg/lock - Permission denied\x1b[0m", "Try: sudo apt ..."]);
                break;

            case "pip":
            case "pip3":
                setHistory([...newHistory, "\x1b[1;33m⚠ This is a simulated terminal. pip is not available.\x1b[0m"]);
                break;

            case "git":
                if (args[0] === "status") {
                    setHistory([...newHistory,
                        "On branch main",
                        "Your branch is up to date with 'origin/main'.",
                        "",
                        "nothing to commit, working tree clean",
                    ]);
                } else if (args[0] === "log") {
                    setHistory([...newHistory,
                        "\x1b[33mcommit 4a2b3c1d5e6f7890abcdef0123456789abcdef01\x1b[0m",
                        "Author: Aman Maurya <amaurya.dev@gmail.com>",
                        "Date:   Fri Feb 21 2026 14:30:00 +0530",
                        "",
                        "    feat: Add Linux portfolio with system monitor",
                        "",
                        "\x1b[33mcommit 1234567890abcdef0123456789abcdef01234567\x1b[0m",
                        "Author: Aman Maurya <amaurya.dev@gmail.com>",
                        "Date:   Thu Feb 20 2026 10:15:00 +0530",
                        "",
                        "    initial commit: Linux Aura Portfolio",
                    ]);
                } else {
                    setHistory([...newHistory, `git: '${args[0] || ""}' is not a git command.`]);
                }
                break;

            case "sl":
                setHistory([...newHistory,
                    "      ====        ________                ___________",
                    "  _D _|  |_______/        \\__I_I_____===__|_________|",
                    "   |(_)---  |   H\\________/ |   |        =|___ ___|  ",
                    "   /     |  |   H  |  |     |   |         ||_| |_||  ",
                    "  |      |  |   H  |__--------------------| [___] |  ",
                    "  | ________|___H__/__|_____/[][]~\\_______|       |  ",
                    "  |/ |   |-----------I_____I [][] []  D   |=======|__",
                    "        🚂💨 Choo Choo!",
                ]);
                break;

            case "cowsay": {
                const msg = args.join(" ") || "Moo! Visit my portfolio!";
                const line = "-".repeat(msg.length + 2);
                setHistory([...newHistory,
                ` ${line}`,
                `< ${msg} >`,
                ` ${line}`,
                    "        \\   ^__^",
                    "         \\  (oo)\\_______",
                    "            (__)\\       )\\/\\",
                    "                ||----w |",
                    "                ||     ||",
                ]);
                break;
            }

            case "fortune":
                const fortunes = [
                    "\"The best way to predict the future is to create it.\" - Peter Drucker",
                    "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
                    "\"First, solve the problem. Then, write the code.\" - John Johnson",
                    "\"Programming isn't about what you know; it's about what you can figure out.\" - Chris Pine",
                    "\"The only way to learn a new programming language is by writing programs in it.\" - Dennis Ritchie",
                    "\"Talk is cheap. Show me the code.\" - Linus Torvalds",
                    "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler",
                ];
                setHistory([...newHistory, fortunes[Math.floor(Math.random() * fortunes.length)]]);
                break;

            case "cmatrix":
                setHistory([...newHistory, "\x1b[32m" + Array(5).fill(0).map(() =>
                    Array(60).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join("")
                ).join("\n") + "\x1b[0m", "", "Press any key to exit... (not really, this is simulated 😄)"]);
                break;

            case "ping":
                if (args.length === 0) {
                    setHistory([...newHistory, "Usage: ping <hostname>"]);
                } else {
                    setHistory([...newHistory,
                    `PING ${args[0]} (93.184.216.34) 56(84) bytes of data.`,
                    `64 bytes from ${args[0]}: icmp_seq=1 ttl=56 time=12.3 ms`,
                    `64 bytes from ${args[0]}: icmp_seq=2 ttl=56 time=11.8 ms`,
                    `64 bytes from ${args[0]}: icmp_seq=3 ttl=56 time=13.1 ms`,
                    `--- ${args[0]} ping statistics ---`,
                        "3 packets transmitted, 3 received, 0% packet loss, time 2004ms",
                        "rtt min/avg/max/mdev = 11.8/12.4/13.1/0.532 ms",
                    ]);
                }
                break;

            case "which":
                if (args.length === 0) {
                    setHistory([...newHistory, "Usage: which <command>"]);
                } else {
                    setHistory([...newHistory, `/usr/bin/${args[0]}`]);
                }
                break;

            case "env":
                setHistory([...newHistory,
                    "SHELL=/bin/bash",
                    "USER=aman",
                    "HOME=/home/aman",
                    "LANG=en_US.UTF-8",
                    "TERM=xterm-256color",
                    "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                    "DISPLAY=:0",
                    "XDG_SESSION_TYPE=x11",
                    "DESKTOP_SESSION=gnome",
                    "GTK_THEME=Adw:dark",
                    "EDITOR=nvim",
                ]);
                break;

            case "open":
            case "xdg-open": {
                const target = args[0];
                if (!target) {
                    setHistory([...newHistory, `Usage: ${command} <app_name> or <file>`]);
                    break;
                }

                const config = appConfigs[target] || appConfigs[target.charAt(0).toUpperCase() + target.slice(1)];
                if (config) {
                    launchApp(target.charAt(0).toUpperCase() + target.slice(1), config.props, config.title);
                    setHistory([...newHistory, `Launching ${target}...`]);
                    break;
                }

                const node = resolveNode([...currentPath, target]);
                if (node && node.type === 'file') {
                    const file = node as FileNode;
                    if (file.component) {
                        const fileParams = appConfigs[file.component];
                        launchApp(file.component, fileParams ? fileParams.props : {}, fileParams ? fileParams.title : file.name);
                        setHistory([...newHistory, `Launching ${file.name}...`]);
                        break;
                    }
                }

                setHistory([...newHistory, `\x1b[1;31mError:\x1b[0m App or file not found: ${target}`]);
                break;
            }

            case "exit":
                setHistory([...newHistory, "exit", "\x1b[1;33mlogout\x1b[0m"]);
                break;

            default:
                if (command !== "") {
                    setHistory([...newHistory, `bash: ${command}: command not found`]);
                } else {
                    setHistory([...newHistory]);
                }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            // Simple tab completion
            const node = resolveNode(currentPath);
            if (node && node.type === 'directory') {
                const dir = node as DirectoryNode;
                const matches = Object.keys(dir.children || {}).filter(name =>
                    name.toLowerCase().startsWith(input.split(/\s+/).pop()?.toLowerCase() || "")
                );
                if (matches.length === 1) {
                    const parts = input.split(/\s+/);
                    parts[parts.length - 1] = matches[0];
                    setInput(parts.join(" "));
                } else if (matches.length > 1) {
                    setHistory([...history, `${getPrompt()}${input}`, matches.join("  ")]);
                }
            }
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            setHistory([]);
        }
    };

    // Render colored text
    const renderLine = (line: string) => {
        // Simple ANSI color code parser
        const parts: { text: string; style: React.CSSProperties }[] = [];
        let remaining = line;
        let currentStyle: React.CSSProperties = {};

        while (remaining.length > 0) {
            const escIdx = remaining.indexOf("\x1b[");
            if (escIdx === -1) {
                parts.push({ text: remaining, style: { ...currentStyle } });
                break;
            }

            if (escIdx > 0) {
                parts.push({ text: remaining.substring(0, escIdx), style: { ...currentStyle } });
            }

            const mEnd = remaining.indexOf("m", escIdx);
            if (mEnd === -1) {
                parts.push({ text: remaining.substring(escIdx), style: { ...currentStyle } });
                break;
            }

            const code = remaining.substring(escIdx + 2, mEnd);
            remaining = remaining.substring(mEnd + 1);

            const codes = code.split(";");
            for (const c of codes) {
                switch (c) {
                    case "0": currentStyle = {}; break;
                    case "1": currentStyle = { ...currentStyle, fontWeight: "bold" }; break;
                    case "7": currentStyle = { ...currentStyle, backgroundColor: "#555", color: "#fff" }; break;
                    case "30": currentStyle = { ...currentStyle, color: "#45475a" }; break;
                    case "31": currentStyle = { ...currentStyle, color: "#f38ba8" }; break;
                    case "32": currentStyle = { ...currentStyle, color: "#a6e3a1" }; break;
                    case "33": currentStyle = { ...currentStyle, color: "#f9e2af" }; break;
                    case "34": currentStyle = { ...currentStyle, color: "#89b4fa" }; break;
                    case "35": currentStyle = { ...currentStyle, color: "#cba6f7" }; break;
                    case "36": currentStyle = { ...currentStyle, color: "#94e2d5" }; break;
                    case "37": currentStyle = { ...currentStyle, color: "#cdd6f4" }; break;
                }
            }
        }

        return parts.map((p, i) => (
            <span key={i} style={p.style}>{p.text}</span>
        ));
    };

    return (
        <div
            className="h-full bg-[#1e1e2e] text-[#cdd6f4] font-mono p-4 overflow-auto text-sm"
            ref={containerRef}
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap mb-0.5 leading-relaxed">{renderLine(line)}</div>
            ))}
            <div className="flex items-center">
                <span className="mr-0 whitespace-pre">{renderLine(getPrompt())}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none flex-1 text-[#cdd6f4] w-full caret-[#a6e3a1]"
                    autoFocus
                    spellCheck={false}
                />
            </div>
        </div>
    );
};

export default TerminalApp;
