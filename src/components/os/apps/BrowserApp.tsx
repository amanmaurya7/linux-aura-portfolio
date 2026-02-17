
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Star, Plus, X, Globe, ExternalLink, AlertCircle } from 'lucide-react';

interface Tab {
    id: number;
    title: string;
    url: string;
    displayUrl: string;
    history: string[];
    currentIndex: number;
    iframeKey: number;
    isLoading: boolean;
}

const DEFAULT_URL = 'about:home';
const GOOGLE_SEARCH_URL = 'https://www.google.com/search?igu=1&q=';

const BrowserApp = () => {
    const [tabs, setTabs] = useState<Tab[]>([{
        id: 1,
        title: 'New Tab',
        url: DEFAULT_URL,
        displayUrl: '',
        history: [DEFAULT_URL],
        currentIndex: 0,
        iframeKey: 0,
        isLoading: false
    }]);
    const [activeTabId, setActiveTabId] = useState(1);
    const inputRef = useRef<HTMLInputElement>(null);

    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

    // Helper to update active tab state
    const updateActiveTab = (updates: Partial<Tab>) => {
        setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, ...updates } : t));
    };

    const normalizeUrl = (input: string) => {
        if (input === 'about:home') return input;

        let url = input.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            if (url.includes('.') && !url.includes(' ')) {
                url = `https://${url}`;
            } else {
                url = `${GOOGLE_SEARCH_URL}${encodeURIComponent(url)}`;
            }
        }
        return url;
    };

    const handleNavigate = (input: string) => {
        const finalUrl = normalizeUrl(input);

        if (finalUrl === activeTab.url) {
            handleRefresh();
            return;
        }

        const newHistory = activeTab.history.slice(0, activeTab.currentIndex + 1);
        newHistory.push(finalUrl);

        updateActiveTab({
            url: finalUrl,
            displayUrl: finalUrl === 'about:home' ? '' : finalUrl,
            history: newHistory,
            currentIndex: newHistory.length - 1,
            title: finalUrl === 'about:home' ? 'New Tab' : finalUrl,
            isLoading: true
        });
    };

    const handleBack = () => {
        if (activeTab.currentIndex > 0) {
            const newIndex = activeTab.currentIndex - 1;
            const newUrl = activeTab.history[newIndex];
            updateActiveTab({
                currentIndex: newIndex,
                url: newUrl,
                displayUrl: newUrl === 'about:home' ? '' : newUrl,
                title: newUrl === 'about:home' ? 'New Tab' : newUrl,
                iframeKey: activeTab.iframeKey + 1 // Force reload on back
            });
        }
    };

    const handleForward = () => {
        if (activeTab.currentIndex < activeTab.history.length - 1) {
            const newIndex = activeTab.currentIndex + 1;
            const newUrl = activeTab.history[newIndex];
            updateActiveTab({
                currentIndex: newIndex,
                url: newUrl,
                displayUrl: newUrl === 'about:home' ? '' : newUrl,
                title: newUrl === 'about:home' ? 'New Tab' : newUrl,
                iframeKey: activeTab.iframeKey + 1
            });
        }
    };

    const handleRefresh = () => {
        updateActiveTab({
            iframeKey: activeTab.iframeKey + 1,
            isLoading: true
        });
    };

    const handleHome = () => {
        handleNavigate('about:home');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleNavigate(activeTab.displayUrl);
        }
    };

    const handleNewTab = () => {
        const newId = Math.max(0, ...tabs.map(t => t.id)) + 1;
        const newTab: Tab = {
            id: newId,
            title: 'New Tab',
            url: DEFAULT_URL,
            displayUrl: '',
            history: [DEFAULT_URL],
            currentIndex: 0,
            iframeKey: 0,
            isLoading: false
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
    };

    const handleCloseTab = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (tabs.length === 1) return; // Prevent closing last tab

        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);

        if (activeTabId === id) {
            setActiveTabId(newTabs[newTabs.length - 1].id);
        }
    };

    const handleOpenExternal = () => {
        if (activeTab.url && activeTab.url !== 'about:home') {
            window.open(activeTab.url, '_blank');
        }
    };

    // Update display URL when switching tabs
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = activeTab.displayUrl;
        }
    }, [activeTabId, activeTab.displayUrl]);

    // Shortcuts for the start page
    const shortcuts = [
        { name: "Google", url: "https://www.google.com/webhp?igu=1", color: "bg-blue-500" },
        { name: "Bing", url: "https://www.bing.com", color: "bg-blue-400" },
        { name: "Wikipedia", url: "https://www.wikipedia.org", color: "bg-black" },
        { name: "VS Code", url: "https://vscode.dev", color: "bg-blue-600" },
    ];

    return (
        <div className="flex flex-col h-full w-full bg-[#F1F3F4] text-gray-800 font-sans">
            {/* Tab Bar */}
            <div className="h-10 bg-[#DEE1E6] flex items-end px-2 space-x-1 pt-2 overflow-x-auto scrollbar-hide">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`
                            flex items-center px-3 py-1.5 max-w-[200px] min-w-[120px] text-xs shadow-sm relative group cursor-pointer transition-all rounded-t-lg select-none
                            ${activeTabId === tab.id ? 'bg-[#F1F3F4] z-10' : 'bg-transparent hover:bg-white/50 text-gray-600'}
                        `}
                    >
                        <span className="truncate pr-4 flex-1">{tab.title === DEFAULT_URL ? 'New Tab' : tab.title}</span>
                        <button
                            onClick={(e) => handleCloseTab(e, tab.id)}
                            className="p-0.5 rounded-full hover:bg-gray-200 opacity-60 hover:opacity-100"
                        >
                            <X size={10} />
                        </button>
                        {/* Connecting bottom line for aesthetic */}
                        {activeTabId === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F1F3F4] z-10 w-full"></div>}
                        {activeTabId !== tab.id && <div className="absolute right-0 top-2 bottom-2 w-[1px] bg-gray-400/30"></div>}
                    </div>
                ))}

                <button
                    onClick={handleNewTab}
                    className="p-1.5 hover:bg-gray-300 rounded-full mb-1 ml-1 transition-colors"
                >
                    <Plus size={16} className="text-gray-600" />
                </button>
            </div>

            {/* Address Bar */}
            <div className="h-14 bg-[#F1F3F4] border-b border-gray-200 flex items-center px-4 space-x-3 z-20 relative shadow-sm">
                <div className="flex items-center space-x-2 text-gray-500">
                    <button onClick={handleBack} disabled={activeTab.currentIndex === 0} className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-30 transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <button onClick={handleForward} disabled={activeTab.currentIndex === activeTab.history.length - 1} className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-30 transition-colors">
                        <ArrowRight size={18} />
                    </button>
                    <button onClick={handleRefresh} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                        <RotateCw size={18} />
                    </button>
                    <button onClick={handleHome} className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                        <Home size={18} />
                    </button>
                </div>

                <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        {(!activeTab.url || activeTab.url === 'about:home') ? <Search size={14} className="text-gray-400" /> : <LockIcon size={12} className="text-green-600" />}
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search Google or type a URL"
                        value={activeTab.displayUrl}
                        onChange={(e) => updateActiveTab({ displayUrl: e.target.value })}
                        onKeyDown={handleKeyDown}
                        onFocus={(e) => e.target.select()}
                        className="w-full bg-white text-gray-700 pl-10 pr-10 py-2 rounded-full text-sm focus:outline-none focus:shadow-md border border-gray-200 focus:border-blue-500/30 transition-all font-sans shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <Star size={14} className="text-gray-400 hover:text-yellow-400 cursor-pointer" />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleOpenExternal}
                        title="Open in real browser (if site is blocked)"
                        className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500"
                    >
                        <ExternalLink size={18} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-gray-100 shadow-sm">
                        A
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative bg-white overflow-hidden">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`absolute inset-0 w-full h-full flex flex-col ${activeTabId === tab.id ? 'visible z-10' : 'invisible -z-10'}`}
                    >
                        {tab.url === 'about:home' ? (
                            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8 animate-fade-in">
                                <div className="w-full max-w-2xl flex flex-col items-center space-y-8">
                                    <h1 className="text-5xl font-bold text-gray-700 select-none">Google</h1>
                                    <div className="w-full relative shadow-md rounded-full">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            className="w-full px-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-shadow"
                                            placeholder="Search Google or type a URL"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleNavigate(e.currentTarget.value);
                                            }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 gap-4 w-full pt-4">
                                        {shortcuts.map((site) => (
                                            <button
                                                key={site.name}
                                                onClick={() => handleNavigate(site.url)}
                                                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-200/50 transition-colors gap-3 group"
                                            >
                                                <div className={`w-12 h-12 rounded-full ${site.color} flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform`}>
                                                    {site.name[0]}
                                                </div>
                                                <span className="text-xs font-medium text-gray-600">{site.name}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start space-x-3 max-w-lg">
                                        <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={18} />
                                        <div className="text-xs text-blue-800">
                                            <strong>Note:</strong> Most major websites (YouTube, Facebook, etc.) block embedding in virtual browsers.
                                            If a site shows a blank screen or error, use the <ExternalLink size={10} className="inline mx-1" /> button in the toolbar to open it in your real browser.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {tab.isLoading && (
                                    <div className="h-0.5 w-full bg-gray-100 overflow-hidden relative">
                                        <div className="absolute insert-0 h-full bg-blue-500 animate-loading-bar w-1/3"></div>
                                    </div>
                                )}
                                <iframe
                                    key={`${tab.id}-${tab.iframeKey}`}
                                    src={tab.url}
                                    className="w-full h-full border-none bg-white"
                                    title={`Browser Content ${tab.id}`}
                                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                                    onLoad={() => {
                                        updateActiveTab({ isLoading: false });
                                    }}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes loading-bar {
                    0% { left: -35%; }
                    100% { left: 100%; }
                }
                .animate-loading-bar {
                    animation: loading-bar 2s infinite linear;
                }
            `}</style>
        </div>
    );
};

// Simple Lock Icon component since it wasn't imported globally or might conflict
const LockIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

export default BrowserApp;
