
import React, { useRef } from 'react';
import { useOS } from '@/context/OSContext';
import { X, Minus, Square, Info } from 'lucide-react';
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

    const isTerminal = window.component === 'Terminal';

    return (
        <Draggable
            handle=".window-header"
            nodeRef={nodeRef}
            onStart={() => focusWindow(window.id)}
            disabled={window.maximized}
        >
            <div
                ref={nodeRef}
                className={`fixed flex flex-col shadow-2xl overflow-hidden backdrop-blur-sm transition-opacity duration-200
         ${window.maximized ? 'inset-0 w-full h-full rounded-none' : 'rounded-lg border border-gray-700/50'}`}
                style={{
                    width: window.maximized ? '100%' : window.size.width,
                    height: window.maximized ? '100%' : window.size.height,
                    zIndex: window.zIndex,
                    left: window.maximized ? 0 : window.position.x,
                    top: window.maximized ? 0 : window.position.y,
                    backgroundColor: isTerminal ? 'rgba(0,0,0,0.9)' : '#1e1e1e', // Terminal is darker/translucent
                }}
                onClick={() => focusWindow(window.id)}
            >
                {/* Title Bar */}
                <div
                    className={`window-header h-10 flex justify-between items-center cursor-move select-none px-4 border-b border-white/5
          ${isTerminal ? 'bg-[#2d2d2d] text-gray-300' : 'bg-[#323233] text-gray-200'}`}
                    onDoubleClick={() => maximizeWindow(window.id)}
                >
                    <div className="flex items-center space-x-3">
                        {/* Window Controls - Linux/Ubuntu style (left side, colored circles) */}
                        {/* Or standard Right side controls? Let's go with standard right side for familiarity but style them nicely */}
                        <span className="font-medium text-sm tracking-wide opacity-80 flex items-center gap-2">
                            {/* Icon based on app type? */}
                            {isTerminal && <span className="text-green-500">➜</span>}
                            {window.title}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            <Minus size={14} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            <Square size={12} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                            className="p-1.5 hover:bg-red-500 rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Window Content */}
                <div className="flex-1 overflow-hidden relative">
                    {children}
                </div>
            </div>
        </Draggable>
    );
};

export default Window;
