
import React, { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { Lock, Power, Wifi, Battery, KeyRound } from "lucide-react";
import photo from "@/assets/IMG_1172.jpeg";

const LoginScreen = () => {
    const { login, wallpaper, isLocked } = useOS();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Show lock screen initially, click or key press to show login form
    useEffect(() => {
        const handleInteraction = () => {
            if (!showLogin) setShowLogin(true);
        };
        window.addEventListener("keydown", handleInteraction);
        window.addEventListener("click", handleInteraction);
        return () => {
            window.removeEventListener("keydown", handleInteraction);
            window.removeEventListener("click", handleInteraction);
        };
    }, [showLogin]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Accept any password or empty
        if (password === "" || password.toLowerCase() === "password" || password === "1234" || password.length > 0) {
            login();
        }
    };

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = time.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    // Lock screen (just shows time, click to proceed)
    if (!showLogin) {
        return (
            <div
                className="h-screen w-screen bg-cover bg-center relative overflow-hidden cursor-pointer select-none"
                style={{ backgroundImage: `url('${wallpaper}')` }}
            >
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                    <div className="text-7xl sm:text-8xl font-light tracking-wide animate-fade-in">
                        {formattedTime}
                    </div>
                    <div className="text-lg sm:text-xl text-white/80 mt-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        {formattedDate}
                    </div>

                    {/* Swipe up hint */}
                    <div className="absolute bottom-12 flex flex-col items-center animate-fade-in-up text-white/50" style={{ animationDelay: "0.5s" }}>
                        <div className="w-10 h-1 bg-white/30 rounded-full mb-3 animate-bounce" />
                        <span className="text-xs">{isLocked ? "Click to unlock" : "Click to sign in"}</span>
                    </div>
                </div>

                {/* Status bar top */}
                <div className="absolute top-4 right-4 flex items-center gap-3 text-white/60 text-xs z-10">
                    <Wifi size={14} />
                    <Battery size={14} />
                    <span>{formattedTime}</span>
                </div>
            </div>
        );
    }

    // Login form
    return (
        <div
            className="h-screen w-screen bg-cover bg-center relative overflow-hidden select-none"
            style={{ backgroundImage: `url('${wallpaper}')` }}
        >
            {/* Dark blur overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-2xl" />

            {/* Status bar top */}
            <div className="absolute top-4 right-4 flex items-center gap-3 text-white/60 text-xs z-10">
                <Wifi size={14} />
                <Battery size={14} />
                <span>{formattedTime}</span>
            </div>

            {/* Login Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                {/* Time */}
                <div className="text-4xl sm:text-5xl font-light tracking-wide mb-2 animate-fade-in-down">
                    {formattedTime}
                </div>
                <div className="text-sm text-white/60 mb-10 animate-fade-in-down" style={{ animationDelay: "0.1s" }}>
                    {formattedDate}
                </div>

                {/* Avatar */}
                <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#89b4fa] via-[#cba6f7] to-[#f38ba8] p-1 shadow-2xl shadow-[#89b4fa]/30 mb-4">
                        <img
                            src={photo}
                            alt="Aman Maurya"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Name */}
                <h2 className="text-xl font-semibold mb-1 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    Aman Maurya
                </h2>
                <p className="text-xs text-white/50 mb-6 animate-fade-in" style={{ animationDelay: "0.25s" }}>
                    aman@linux-aura
                </p>

                {/* Login form */}
                <form onSubmit={handleLogin} className="w-72 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    <div className={`relative group ${error ? 'animate-shake' : ''}`}>
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#89b4fa] transition-colors" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="Password (press Enter)"
                            autoFocus
                            className={`
                                w-full bg-white/10 backdrop-blur-md text-white pl-10 pr-12 py-3 rounded-full
                                border border-white/20 focus:border-[#89b4fa]/60
                                focus:outline-none focus:ring-2 focus:ring-[#89b4fa]/20
                                text-sm placeholder-white/30 transition-all
                                ${error ? 'border-red-400/60 ring-2 ring-red-400/20' : ''}
                            `}
                        />
                        <button
                            type="submit"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-[#89b4fa] rounded-full hover:bg-[#89b4fa]/80 transition-colors"
                        >
                            <KeyRound size={14} className="text-[#1e1e2e]" />
                        </button>
                    </div>
                    {error && (
                        <p className="text-red-400 text-xs text-center mt-2 animate-fade-in">
                            Incorrect password. Try again.
                        </p>
                    )}
                    <p className="text-white/30 text-[10px] text-center mt-3">
                        Enter any password or just press Enter
                    </p>
                </form>

                {/* Other users / power */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-white/40">
                    <button className="flex flex-col items-center gap-1 hover:text-white/70 transition-colors text-xs">
                        <Power size={16} />
                        <span>Power Off</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
