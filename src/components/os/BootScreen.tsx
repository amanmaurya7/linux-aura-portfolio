
import React, { useEffect, useState } from "react";
import { useOS } from "@/context/OSContext";

const bootMessages = [
    "[    0.000000] Linux version 6.8.0-31-generic (buildd@lcy02-amd64-036) (gcc-13 (Ubuntu 13.2.0-23ubuntu4) 13.2.0)",
    "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-31-generic root=/dev/nvme0n1p2 ro quiet splash",
    "[    0.000000] BIOS-provided physical RAM map:",
    "[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
    "[    0.000001] ACPI: RSDP 0x00000000000F0490 000024 (v02 LENOVO)",
    "[    0.000001] ACPI: XSDT 0x0000000076FEC188 0000EC (v01 LENOVO TP-R0J   00002520 PTL  00000002)",
    "[    0.012345] CPU: Intel(R) Core(TM) i9-14900K @ 5.80GHz",
    "[    0.015678] x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'",
    "[    0.023456] ACPI: PCI Root Bridge [PCI0] (domain 0000 [bus 00-fe])",
    "[    0.034567] PCI: Using configuration type 1 for base access",
    "[    0.045678] clocksource: tsc-early: mask: 0xffffffffffffffff max_cycles: 0x29c1ee5c4c6",
    "[    0.056789] e820: update [mem 0x00000000-0x00000fff] usable ==> reserved",
    "[    0.067890] Initializing cgroup subsys cpuset",
    "[    0.078901] Initializing cgroup subsys cpu",
    "[    0.089012] Initializing cgroup subsys cpuacct",
    "[    0.100123] random: get_random_bytes called from start_kernel+0x42/0x5b0",
    "[    0.234567] Mount-cache hash table entries: 65536 (order: 7, 524288 bytes, linear)",
    "[    0.345678] smpboot: CPU0: Intel(R) Core(TM) i9-14900K (family: 0x6, model: 0xb7)",
    "[    0.456789] smp: Bringing up secondary CPUs ...",
    "[    0.567890] smpboot: Total of 24 processors activated",
    "[    0.678901] devtmpfs: initialized",
    "[    0.789012] clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff",
    "[    0.890123] NET: Registered PF_NETLINK/PF_ROUTE protocol family",
    "[    0.901234] DMA: preallocated 4096 KiB GFP_KERNEL pool for atomic allocations",
    "[    1.012345] ACPI: Added _OSI(Module Device)",
    "[    1.123456] ACPI: Added _OSI(Processor Device)",
    "[    1.234567] pci 0000:01:00.0: [10de:2684] type 00 class 0x030000 NVIDIA RTX 4090",
    "[    1.345678] nvidia: module license 'NVIDIA' accepted by GPU driver",
    "[    1.456789] nvidia: NVIDIA UNIX x86_64 Kernel Module  550.54.14  Thu Feb 22 01:44:30 UTC 2024",
    "[    1.567890] input: AT Translated Set 2 keyboard as /devices/platform/i8042/serio0/input/input0",
    "[    1.678901] EXT4-fs (nvme0n1p2): mounted filesystem with ordered data mode",
    "[    1.789012] systemd[1]: systemd 255 (255.4-1ubuntu8) running in system mode",
    "[    1.890123] systemd[1]: Detected architecture x86-64.",
    "[    1.901234] systemd[1]: Hostname set to <linux-aura>.",
    "[    2.012345] systemd[1]: Starting GNOME Display Manager...",
    "[    2.123456] systemd[1]: Started NetworkManager.",
    "[    2.234567] systemd[1]: Reached target Graphical Interface.",
    "[    2.345678] systemd[1]: Starting Linux Aura Portfolio OS...",
    "",
    "Starting Linux Aura OS v2.0...",
];

const BootScreen = () => {
    const { setBootComplete } = useOS();
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [phase, setPhase] = useState<"grub" | "boot" | "loading">("grub");
    const [progress, setProgress] = useState(0);
    const [selectedGrub, setSelectedGrub] = useState(0);

    // GRUB phase
    useEffect(() => {
        if (phase !== "grub") return;
        const timer = setTimeout(() => {
            setPhase("boot");
        }, 2500);
        return () => clearTimeout(timer);
    }, [phase]);

    // Boot messages phase
    useEffect(() => {
        if (phase !== "boot") return;
        const interval = setInterval(() => {
            setVisibleLines((prev) => {
                if (prev.length < bootMessages.length) {
                    return [...prev, bootMessages[prev.length]];
                } else {
                    clearInterval(interval);
                    setPhase("loading");
                    return prev;
                }
            });
        }, 55);
        return () => clearInterval(interval);
    }, [phase]);

    // Loading bar phase
    useEffect(() => {
        if (phase !== "loading") return;
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(setBootComplete, 300);
                    return 100;
                }
                return prev + 3;
            });
        }, 40);
        return () => clearInterval(interval);
    }, [phase, setBootComplete]);

    // GRUB screen
    if (phase === "grub") {
        const grubEntries = [
            "   Linux Aura OS 2.0.4 (kernel 6.8.0-31-generic)",
            "   Linux Aura OS 2.0.4 (recovery mode)",
            "   Linux Aura OS 2.0.4 (kernel 6.6.0-28-generic)",
            "   System Setup",
        ];
        return (
            <div className="h-screen w-screen bg-[#1a1a2e] flex flex-col items-center justify-center font-mono text-sm select-none overflow-hidden">
                {/* GRUB Header */}
                <div className="w-full max-w-2xl px-8">
                    <div className="border border-[#45475a] rounded-sm bg-[#0a0a1a] p-6">
                        <div className="text-center text-gray-400 text-xs mb-4">
                            GNU GRUB  version 2.12-1
                        </div>

                        {grubEntries.map((entry, i) => (
                            <div
                                key={i}
                                className={`py-1 px-3 text-sm cursor-pointer ${i === selectedGrub
                                    ? "bg-white text-black font-bold"
                                    : "text-gray-300"
                                    }`}
                                onMouseEnter={() => setSelectedGrub(i)}
                            >
                                {i === selectedGrub ? "▸" : " "}{entry}
                            </div>
                        ))}

                        <div className="mt-6 text-[11px] text-gray-500 space-y-1">
                            <p>Use the ↑ and ↓ keys to select which entry is highlighted.</p>
                            <p>Press enter to boot the selected OS, 'e' to edit the commands</p>
                            <p>before booting or 'c' for a command-line.</p>
                        </div>
                    </div>

                    <div className="text-[11px] text-gray-600 mt-3 text-center">
                        *The highlighted entry will be executed automatically in 2s.
                    </div>
                </div>
            </div>
        );
    }

    // Boot messages screen
    if (phase === "boot") {
        return (
            <div className="h-screen w-screen bg-black text-green-400 font-mono text-xs overflow-hidden p-4 select-none">
                <div className="overflow-y-auto h-full space-y-0.5">
                    {visibleLines.filter(Boolean).map((line, i) => (
                        <div
                            key={i}
                            className="whitespace-pre-wrap animate-fade-in"
                            style={{
                                animationDelay: `${i * 10}ms`,
                                color: (line || "").startsWith("Starting") ? "#89b4fa" :
                                    (line || "").includes("NVIDIA") ? "#a6e3a1" :
                                        (line || "").includes("error") ? "#f38ba8" : "#94e2d5"
                            }}
                        >
                            {line}
                        </div>
                    ))}
                    <span className="inline-block w-2 h-4 bg-green-400 animate-cursor-blink ml-1" />
                </div>
            </div>
        );
    }

    // Loading bar screen
    return (
        <div className="h-screen w-screen bg-[#1e1e2e] flex flex-col items-center justify-center select-none">
            {/* Linux Aura Logo */}
            <div className="mb-8">
                <div className="w-20 h-20 mx-auto mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#89b4fa" strokeWidth="2" opacity="0.3" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#89b4fa" strokeWidth="1.5" opacity="0.5" />
                        <circle cx="50" cy="50" r="15" fill="#89b4fa" opacity="0.8" />
                        <circle cx="50" cy="50" r="6" fill="#cdd6f4" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-center text-[#cdd6f4] tracking-wider">
                    Linux Aura OS
                </h1>
                <p className="text-sm text-center text-[#6c7086] mt-1">v2.0.4</p>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-[#313244] rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#89b4fa] to-[#cba6f7] rounded-full transition-all duration-100 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>

            {/* Loading dots */}
            <div className="flex gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-[#89b4fa] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BootScreen;
