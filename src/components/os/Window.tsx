
import React, { useRef } from 'react';
import { useOS } from '@/context/OSContext';
import { X, Minus, Square } from 'lucide-react';
import { WindowState } from '@/types/os';
import Draggable from 'react-draggable';

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ window, children }) => {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useOS();
    const nodeRef = useRef(null);

    if (window.minimized) return null;

    // We treat all windows with the same "Terminal" style now, per user request.
    // Except maybe the actual Terminal component might have some slight variations if needed,
    // but the user wants "this window code pallate" applied.

    return (
        <Draggable
            handle=".window-header" // Dragging handle
            nodeRef={nodeRef}
            onStart={() => focusWindow(window.id)}
            disabled={window.maximized}
        >
            <div
                ref={nodeRef}
                className={`fixed flex flex-col shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-200 font-sans
         ${window.maximized ? 'inset-0 w-full h-full rounded-none' : 'rounded-lg border border-[#333]'}`}
                style={{
                    width: window.maximized ? '100%' : window.size.width,
                    height: window.maximized ? '100%' : window.size.height,
                    zIndex: window.zIndex,
                    left: window.maximized ? 0 : window.position.x,
                    top: window.maximized ? 0 : window.position.y,
                    backgroundColor: '#1E1E1E', // Dark window body
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
                onClick={() => focusWindow(window.id)}
            >
                <div
                    className="window-header h-12 flex items-center px-4 bg-[#2C2C2C] select-none border-b border-[#111]"
                    onDoubleClick={() => maximizeWindow(window.id)}
                >
                    {/* Left spacer for balance */}
                    <div className="w-14"></div>

                    {/* Center: Title (Standard GUI Style) */}
                    <div className="flex-1 text-center text-sm text-gray-300 font-medium tracking-wide">
                        {window.title}
                    </div>

                    {/* Right: Window Controls (Linux/Windows style) */}
                    <div className="flex items-center space-x-2 ml-4 group">
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
                            className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 border border-[#DEA123] transition-colors flex items-center justify-center"
                        >
                            <Minus size={8} className="text-[#995d0d] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                            className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 border border-[#1AAB29] transition-colors flex items-center justify-center"
                        >
                            <Square size={6} className="text-[#0a6617] opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                            className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 border border-[#E0443E] transition-colors flex items-center justify-center"
                        >
                            <X size={8} className="text-[#8e0e0e] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
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
