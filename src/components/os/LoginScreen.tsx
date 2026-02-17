
import React, { useState, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { User, Lock, ArrowRight, Power } from "lucide-react";
import photo from "../../assets/IMG_1172.jpeg";

const LoginScreen = () => {
    const { login } = useOS();
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            // Any password works for now, or make empty
            if (true) {
                login();
            } else {
                setError(true);
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-between py-12 relative overflow-hidden"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1974')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

            {/* Time */}
            <div className="z-10 text-center text-white drop-shadow-md animate-fade-in-down">
                <div className="text-6xl md:text-8xl font-thin tracking-wider mb-2">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
                <div className="text-xl md:text-2xl font-light opacity-90">
                    {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Login Form */}
            <div className="z-10 w-full max-w-sm px-4">
                <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl animate-fade-in-up">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-xl relative group">
                            <img src={photo} alt="User" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white text-xs">Change</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold text-white tracking-wide">Aman Maurya</h2>
                        <p className="text-gray-400 text-sm mt-1">Administrator</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" size={16} />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-lg py-2.5 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all`}
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/10 hover:bg-white/20 rounded-md text-gray-300 hover:text-white transition-all disabled:opacity-50"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        {error && <p className="text-red-400 text-xs text-center animate-shake">Incorrect password. Please try again.</p>}

                        {loading && (
                            <div className="flex justify-center mt-4">
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}

                        {!loading && (
                            <p className="text-center text-gray-500 text-xs mt-4">Hint: Just press Enter 😉</p>
                        )}
                    </form>
                </div>
            </div>

            {/* Footer / Controls */}
            <div className="z-10 flex space-x-6 text-white/70">
                <button className="flex flex-col items-center hover:text-white transition-colors gap-1 group">
                    <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                        <Power size={20} />
                    </div>
                    <span className="text-xs">Shut Down</span>
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
