
import React, { useRef } from 'react';
import { useOS } from '@/context/OSContext';
import { X, Minus, Square } from 'lucide-react';
import { WindowState } from '@/types/os';
import Draggable from 'react-draggable';

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ window: winState, children }) => {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOS();
    const nodeRef = useRef(null);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        // Use global window object
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        const handleResize = () => checkMobile();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (winState.minimized) return null;

    const isMaximized = winState.maximized || isMobile;

    return (
        <Draggable
            handle=".window-header"
            nodeRef={nodeRef}
            onStart={() => focusWindow(winState.id)}
            disabled={isMaximized}
        >
            <div
                ref={nodeRef}
                className={`fixed flex flex-col shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-200 font-sans
         ${isMaximized ? 'inset-0 w-full h-full rounded-none' : 'rounded-lg border border-[#333]'}`}
                style={{
                    width: isMaximized ? '100%' : winState.size.width,
                    zIndex: winState.zIndex,
                    left: isMaximized ? 0 : winState.position.x,
                    top: isMaximized ? 0 : winState.position.y,
                    backgroundColor: '#1E1E1E',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    // On mobile, account for taskbar height (bottom-12) if we want to not cover it, 
                    // or just cover it. Usually desktop OS windows cover everything except maybe taskbar. 
                    // For now, let's let it be standard full screen, but maybe add bottom padding for taskbar if needed.
                    bottom: isMobile ? '3rem' : undefined, // 3rem = 12 = 48px taskbar height
                    height: isMobile ? 'auto' : (isMaximized ? '100%' : winState.size.height),
                }}
                onClick={() => focusWindow(winState.id)}
            >
                <div
                    className="window-header h-12 flex items-center px-4 bg-[#2C2C2C] select-none border-b border-[#111]"
                    onDoubleClick={() => maximizeWindow(winState.id)}
                >
                    {/* Window Controls (Left side on macOS/Linux style, or Right). Let's keep them on Right as per previous file but maybe adjust for mobile */}

                    {/* Left spacer or title */}
                    <div className="flex-1 text-left md:text-center text-sm text-gray-300 font-medium tracking-wide truncate pr-2">
                        {winState.title}
                    </div>

                    {/* Right: Window Controls */}
                    <div className="flex items-center space-x-2 ml-4">
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(winState.id); }}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Minus size={16} className="text-gray-400" />
                        </button>
                        {!isMobile && (
                            <button
                                onClick={(e) => { e.stopPropagation(); maximizeWindow(winState.id); }}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <Square size={14} className="text-gray-400" />
                            </button>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(winState.id); }}
                            className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors text-gray-400"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Window Content */}
                <div className="flex-1 overflow-hidden relative bg-[#1E1E1E]">
                    {children}
                </div>
            </div>
        </Draggable>
    );
};

export default Window;
