
import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '@/context/OSContext';

const bootSequence = [
    "   [ OK ] Started Update UTMP about System Runlevel Changes.",
    "   [ OK ] Started Service for snap application multipass.10091.",
    "   [ OK ] Started Service for snap application multipass.10091.",
    "   [ OK ] Reached target System Initialization.",
    "   [ OK ] Started Daily apt download activities.",
    "   [ OK ] Started Daily apt upgrade and clean activities.",
    "   [ OK ] Started Daily dpkg/apt check activities.",
    "   [ OK ] Started Message of the Day.",
    "   [ OK ] Started discard unused blocks once a week.",
    "   [ OK ] Started Refresh fwupd metadata and update motifs.",
    "   [ OK ] Started Daily Cleanup of Temporary Directories.",
    "   [ OK ] Reached target Basic System.",
    "   [ OK ] Reached target Timers.",
    "   [ OK ] Reached target Paths.",
    "   [ OK ] Reached target Sockets.",
    "   Starting Kernel...",
    "   [    0.000000] Linux version 6.8.0-31-generic (buildd@lcy02-amd64-040) (gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #31-Ubuntu SMP PREEMPT_DYNAMIC Sat Apr 20 00:40:06 UTC 2026",
    "   [    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.8.0-31-generic root=UUID=1a2b3c4d-5e6f-7890-a1b2-c3d4e5f6g7h8 ro quiet splash vt.handoff=7",
    "   [    0.004211] Console: colour dummy device 80x25",
    "   [    0.004278] printk: console [tty0] enabled",
    "   [    0.345678] Calibrating delay loop... 4286.04 BogoMIPS (lpj=2143022)",
    "   [    0.567890] Mountpoint-cache hash table entries: 16384 (order: 5, 131072 bytes, linear)",
    "   [    1.234567] Freeing unused kernel image memory: 2024K",
    "   [    1.345678] Write protecting the kernel read-only data: 26624k",
    "   [    1.456789] Freeing unused kernel image memory: 2020K",
    "   [    1.567890] Run /init as init process",
    "   Loading Linux-Aura-OS modules...",
    "   [ OK ] Started User Manager for UID 1000.",
    "   [ OK ] Started Session 1 of user aman.",
    "   [ OK ] Reached target Graphical Interface.",
    "   Starting Desktop Environment...",
];

const BootScreen = () => {
    const { setBootComplete } = useOS();
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentIndex = 0;
        let timeoutId: NodeJS.Timeout;

        const runBootStep = () => {
            if (currentIndex >= bootSequence.length) {
                timeoutId = setTimeout(() => {
                    setBootComplete();
                }, 1000);
                return;
            }

            const line = bootSequence[currentIndex];
            if (line) {
                setLines((prev) => [...prev, line]);
            }

            currentIndex++;

            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }

            // Random delay between 20ms and 200ms for realism
            const randomDelay = Math.random() * 180 + 20;
            timeoutId = setTimeout(runBootStep, randomDelay);
        };

        timeoutId = setTimeout(runBootStep, 100);

        return () => clearTimeout(timeoutId);
    }, [setBootComplete]);

    return (
        <div className="h-screen w-screen bg-black text-gray-400 font-mono p-10 overflow-hidden cursor-none select-none flex flex-col justify-end pb-20">
            <div ref={containerRef} className="flex flex-col space-y-1 overflow-y-auto max-h-full scrollbar-none">
                {lines.map((line, index) => {
                    if (!line) return null;
                    return (
                        <div key={index} className="flex flex-wrap break-words text-sm md:text-base">
                            <span className="text-green-500 mr-2">{line.includes("[ OK ]") ? "[  OK  ]" : "        "}</span>
                            <span className={line.includes("Failed") ? "text-red-500" : "text-gray-300"}>
                                {line.replace("[ OK ]", "")}
                            </span>
                        </div>
                    );
                })}
                <div className="animate-pulse text-green-500 mt-2">_</div>
            </div>
        </div>
    );
};

export default BootScreen;
