
import React, { useState, useRef, useEffect } from "react";
import { Save, Copy, Undo, Redo, Search, X, FileText, Code } from "lucide-react";

interface TextEditorProps {
    fileName?: string;
    content?: string;
}

const TextEditorApp: React.FC<TextEditorProps> = ({ fileName = "untitled.txt", content = "" }) => {
    const [text, setText] = useState(content);
    const [saved, setSaved] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [lineNumbers, setLineNumbers] = useState(true);
    const [wordWrap, setWordWrap] = useState(true);
    const [cursorLine, setCursorLine] = useState(1);
    const [cursorCol, setCursorCol] = useState(1);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const lines = text.split("\n");
    const totalChars = text.length;
    const totalWords = text.trim() ? text.trim().split(/\s+/).length : 0;

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        // In a real app this would persist to the virtual filesystem
    };

    const handleCursorChange = () => {
        if (textareaRef.current) {
            const pos = textareaRef.current.selectionStart;
            const beforeCursor = text.substring(0, pos);
            const line = beforeCursor.split("\n").length;
            const col = pos - beforeCursor.lastIndexOf("\n");
            setCursorLine(line);
            setCursorCol(col);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            handleSave();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "f") {
            e.preventDefault();
            setShowSearch(!showSearch);
        }
        // Tab support
        if (e.key === "Tab") {
            e.preventDefault();
            const textarea = textareaRef.current;
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const newText = text.substring(0, start) + "    " + text.substring(end);
                setText(newText);
                setSaved(false);
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 4;
                }, 0);
            }
        }
    };

    const getFileLanguage = () => {
        const ext = fileName.split(".").pop()?.toLowerCase();
        const langMap: Record<string, string> = {
            js: "JavaScript",
            jsx: "JavaScript (React)",
            ts: "TypeScript",
            tsx: "TypeScript (React)",
            py: "Python",
            md: "Markdown",
            json: "JSON",
            html: "HTML",
            css: "CSS",
            txt: "Plain Text",
            sh: "Shell Script",
            yml: "YAML",
            yaml: "YAML",
        };
        return langMap[ext || ""] || "Plain Text";
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e2e] text-gray-200 font-mono overflow-hidden">
            {/* Menu bar */}
            <div className="h-8 bg-[#181825] border-b border-[#313244] flex items-center px-3 text-xs shrink-0 gap-4">
                <button onClick={handleSave} className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#313244] transition-colors text-gray-400 hover:text-white">
                    <Save size={12} /> Save
                </button>
                <button onClick={() => navigator.clipboard.writeText(text)} className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#313244] transition-colors text-gray-400 hover:text-white">
                    <Copy size={12} /> Copy All
                </button>
                <button onClick={() => setShowSearch(!showSearch)} className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[#313244] transition-colors text-gray-400 hover:text-white">
                    <Search size={12} /> Find
                </button>
                <div className="flex-1" />
                <div className="flex items-center gap-2 text-gray-500">
                    <FileText size={12} />
                    <span>{fileName}</span>
                    {!saved && <span className="w-2 h-2 rounded-full bg-[#fab387]" title="Unsaved changes" />}
                </div>
            </div>

            {/* Search bar */}
            {showSearch && (
                <div className="h-9 bg-[#252540] border-b border-[#313244] flex items-center px-3 gap-2 shrink-0 animate-slide-down">
                    <Search size={14} className="text-gray-500" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Find in file..."
                        className="bg-[#313244] text-gray-200 px-2 py-1 rounded text-xs flex-1 max-w-xs focus:outline-none focus:ring-1 focus:ring-[#89b4fa]"
                        autoFocus
                    />
                    <span className="text-[10px] text-gray-500">
                        {searchText ? `${text.split(searchText).length - 1} results` : ""}
                    </span>
                    <button onClick={() => setShowSearch(false)} className="p-1 hover:bg-[#313244] rounded">
                        <X size={14} className="text-gray-500" />
                    </button>
                </div>
            )}

            {/* Editor */}
            <div className="flex-1 flex overflow-hidden">
                {/* Line numbers */}
                {lineNumbers && (
                    <div className="bg-[#181825] border-r border-[#313244] text-gray-600 text-xs leading-[1.625rem] py-2 px-2 text-right select-none overflow-hidden shrink-0 w-12">
                        {lines.map((_, i) => (
                            <div
                                key={i}
                                className={`${i + 1 === cursorLine ? "text-[#cdd6f4]" : ""}`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                )}

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    onKeyUp={handleCursorChange}
                    onClick={handleCursorChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[#cdd6f4] p-2 text-xs leading-[1.625rem] resize-none focus:outline-none caret-[#89b4fa] font-mono selection:bg-[#89b4fa]/30"
                    style={{
                        whiteSpace: wordWrap ? "pre-wrap" : "pre",
                        overflowWrap: wordWrap ? "break-word" : "normal",
                        tabSize: 4,
                    }}
                    spellCheck={false}
                />
            </div>

            {/* Status bar */}
            <div className="h-6 bg-[#181825] border-t border-[#313244] flex items-center px-3 text-[10px] text-gray-500 shrink-0 gap-4">
                <span className="flex items-center gap-1">
                    <Code size={10} />
                    {getFileLanguage()}
                </span>
                <span>Ln {cursorLine}, Col {cursorCol}</span>
                <span>{lines.length} lines</span>
                <span>{totalWords} words</span>
                <span>{totalChars} chars</span>
                <div className="flex-1" />
                <span>UTF-8</span>
                <span>LF</span>
                <span>{saved ? "Saved" : "Modified"}</span>
            </div>
        </div>
    );
};

export default TextEditorApp;
