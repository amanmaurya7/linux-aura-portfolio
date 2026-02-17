
import React, { useState } from 'react';
import { Wifi, Bluetooth, Monitor, Battery, Bell, Lock, User, Info, Search, ChevronRight, Moon, Volume2, Power } from 'lucide-react';
import { useOS } from '@/context/OSContext';

const SettingsApp = () => {
    const { wallpaper, setWallpaper } = useOS();
    const [activeTab, setActiveTab] = useState('wifi');
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [connectedWifi, setConnectedWifi] = useState<string | null>("Home_WiFi_5G");
    const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [volume, setVolume] = useState(75);
    const [brightness, setBrightness] = useState(100);

    const tabs = [
        { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
        { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth },
        { id: 'background', label: 'Background', icon: Monitor },
        { id: 'sound', label: 'Sound', icon: Volume2 },
        { id: 'power', label: 'Power', icon: Battery },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy', icon: Lock },
        { id: 'users', label: 'Users', icon: User },
        { id: 'about', label: 'About', icon: Info },
    ];

    const wallPapers = [
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1974",
        "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2023&q=80"
    ];

    const handleWifiConnect = (net: string) => {
        if (!wifiEnabled) return;
        if (connectedWifi === net) {
            setConnectedWifi(null); // Disconnect
        } else {
            // Simulate connecting
            setConnectedWifi(null);
            setTimeout(() => setConnectedWifi(net), 1000);
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'wifi':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center bg-[#2C2C2E] p-4 rounded-xl">
                            <span className="text-white font-medium">Wi-Fi</span>
                            <div
                                onClick={() => setWifiEnabled(!wifiEnabled)}
                                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${wifiEnabled ? 'bg-blue-500' : 'bg-gray-600'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${wifiEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        {wifiEnabled && (
                            <div className="bg-[#2C2C2E] rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-700 font-medium text-gray-400 text-sm">Available Networks</div>
                                {['Home_WiFi_5G', 'Office_Guest', 'Starbucks_Free_WiFi', 'Neighbour_WiFi'].map((net, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleWifiConnect(net)}
                                        className="flex justify-between items-center p-4 hover:bg-white/5 cursor-pointer border-b border-gray-700 last:border-0"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Wifi size={18} className={connectedWifi === net ? "text-blue-400" : "text-gray-300"} />
                                            <span className={connectedWifi === net ? "text-blue-400 font-medium" : "text-gray-200"}>{net}</span>
                                        </div>
                                        {connectedWifi === net && <span className="text-blue-400 text-sm">Connected</span>}
                                        {connectedWifi === null && connectedWifi !== net && <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin opacity-0 group-active:opacity-100"></div>}
                                        {i !== 0 && connectedWifi !== net && <Lock size={14} className="text-gray-500" />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'bluetooth':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center bg-[#2C2C2E] p-4 rounded-xl">
                            <span className="text-white font-medium">Bluetooth</span>
                            <div
                                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${bluetoothEnabled ? 'bg-blue-500' : 'bg-gray-600'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${bluetoothEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        {bluetoothEnabled && (
                            <div className="bg-[#2C2C2E] rounded-xl overflow-hidden">
                                <div className="p-4 border-b border-gray-700 font-medium text-gray-400 text-sm">My Devices</div>
                                {['AirPods Pro', 'MX Master 3', 'Keychron K2'].map((dev, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 hover:bg-white/5 cursor-pointer border-b border-gray-700 last:border-0">
                                        <div className="flex items-center space-x-3">
                                            <Bluetooth size={18} className={i === 0 ? "text-blue-400" : "text-gray-400"} />
                                            <span>{dev}</span>
                                        </div>
                                        <span className="text-gray-500 text-sm">{i === 0 ? 'Connected' : 'Not Connected'}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'background':
                return (
                    <div className="animate-fade-in space-y-4">
                        <div className="bg-[#2C2C2E] p-4 rounded-xl flex items-center justify-between">
                            <span className="font-medium">Dark Mode Appearance</span>
                            <div
                                onClick={() => setDarkMode(!darkMode)}
                                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${darkMode ? 'bg-blue-500' : 'bg-gray-600'}`}
                            >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        <h3 className="text-lg font-medium px-1">Wallpapers</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {wallPapers.map((url, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setWallpaper(url)}
                                    className={`aspect-video bg-cover bg-center rounded-xl cursor-pointer hover:opacity-90 transition-all border-2 ${wallpaper === url ? 'border-blue-500 scale-[1.02] shadow-xl' : 'border-transparent'}`}
                                    style={{ backgroundImage: `url('${url}')` }}
                                >
                                    {wallpaper === url && (
                                        <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-[1px] rounded-lg">
                                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">Active</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'sound':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-[#2C2C2E] p-4 rounded-xl space-y-4">
                            <div className="flex flex-col space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Output Volume</span>
                                    <span className="text-gray-400">{volume}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={(e) => setVolume(parseInt(e.target.value))}
                                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'power':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-[#2C2C2E] rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                                <span>Power Mode</span>
                                <span className="text-blue-400">Balanced</span>
                            </div>
                            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                                <span>Screen Energy Saving</span>
                                <div className="w-12 h-7 rounded-full p-1 bg-blue-500 cursor-pointer"><div className="w-5 h-5 bg-white rounded-full shadow-md translate-x-5"></div></div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <span>Battery Health</span>
                                <span className="text-green-400">Normal (98%)</span>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="bg-[#2C2C2E] rounded-xl overflow-hidden animate-fade-in">
                        {['Do Not Disturb', 'Lock Screen Notifications', 'App Badges'].map((item, i) => (
                            <div key={i} className="p-4 border-b border-gray-700 last:border-0 flex justify-between items-center">
                                <span>{item}</span>
                                <div className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors ${i === 0 ? 'bg-gray-600' : 'bg-blue-500'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${i === 0 ? 'translate-x-0' : 'translate-x-5'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'privacy':
                return (
                    <div className="bg-[#2C2C2E] rounded-xl overflow-hidden animate-fade-in">
                        {['Location Services', 'Camera Access', 'Microphone Access', 'Screen Recording'].map((item, i) => (
                            <div key={i} className="p-4 border-b border-gray-700 last:border-0 flex justify-between items-center hover:bg-white/5 cursor-pointer">
                                <span>{item}</span>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <span className="text-sm">{i < 2 ? 'In Use' : 'Off'}</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'users':
                return (
                    <div className="bg-[#2C2C2E] p-4 rounded-xl flex items-center space-x-4 animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-xl font-bold text-white uppercase shadow-lg">
                            AM
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">Aman Maurya</h3>
                            <p className="text-gray-400 text-sm">Administrator • Password Protected</p>
                        </div>
                        <button className="px-4 py-2 bg-[#3A3A3C] hover:bg-[#4A4A4C] rounded-lg text-sm font-medium transition-colors">
                            Edit
                        </button>
                    </div>
                );
            case 'about':
                return (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in">
                        <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg mb-4">
                            <span className="text-4xl font-bold text-white">OS</span>
                        </div>
                        <h2 className="text-2xl font-bold">Linux Aura OS</h2>
                        <p className="text-gray-400">Version 2.0.4 (Stable)</p>
                        <div className="bg-[#2C2C2E] rounded-xl w-full max-w-md mt-6 overflow-hidden text-left">
                            <div className="p-4 border-b border-gray-700 flex justify-between">
                                <span className="text-gray-400">Processor</span>
                                <span>Intel Core i9-14900K</span>
                            </div>
                            <div className="p-4 border-b border-gray-700 flex justify-between">
                                <span className="text-gray-400">Memory</span>
                                <span>64 GB DDR5</span>
                            </div>
                            <div className="p-4 border-b border-gray-700 flex justify-between">
                                <span className="text-gray-400">Graphics</span>
                                <span>NVIDIA RTX 4090</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span className="text-gray-400">Disk Capacity</span>
                                <span>2 TB NVMe SSD</span>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-[#3A3A3C] hover:bg-[#4A4A4C] rounded-lg text-sm font-medium transition-colors mt-4">
                            Check for Updates
                        </button>
                    </div>
                )
            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select an option to view settings
                    </div>
                )
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-full bg-[#1C1C1E] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#2C2C2E]/50 border-b md:border-b-0 md:border-r border-[#3A3A3C] flex flex-col shrink-0">
                <div className="p-4 hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-[#3A3A3C] text-white pl-9 pr-4 py-1.5 rounded-lg text-sm border-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-x-auto md:overflow-y-auto px-2 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-1 scrollbar-hide py-2 items-center md:items-stretch">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors shrink-0 whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-600 text-white font-medium' : 'hover:bg-[#3A3A3C] text-gray-300'}`}
                        >
                            <tab.icon size={18} className="mr-0 md:mr-3" />
                            <span className="hidden md:inline flex-1 text-left">{tab.label}</span>
                            <span className="inline md:hidden ml-2">{tab.label}</span>
                            {activeTab === tab.id && <ChevronRight size={14} className="hidden md:block" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-[#1C1C1E] p-4 md:p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6 hidden md:block">{tabs.find(t => t.id === activeTab)?.label}</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default SettingsApp;
