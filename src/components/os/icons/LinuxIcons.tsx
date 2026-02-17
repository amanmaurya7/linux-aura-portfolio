
import React from 'react';

export const UserHomeIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Folder Back */}
        <path d="M4,12 L28,12 L32,16 L60,16 C62.209,16 64,17.791 64,20 L64,56 C64,58.209 62.209,60 60,60 L4,60 C1.791,60 0,58.209 0,56 L0,16 C0,13.791 1.791,12 4,12 Z" fill="#E67E22" />
        {/* Folder Front */}
        <path d="M4,24 L60,24 C62.209,24 64,25.791 64,28 L64,56 C64,58.209 62.209,60 60,60 L4,60 C1.791,60 0,58.209 0,56 L0,28 C0,25.791 1.791,24 4,24 Z" fill="#F39C12" />
        {/* User Icon on Folder */}
        <circle cx="32" cy="38" r="6" fill="white" opacity="0.8" />
        <path d="M32 46 C 26 46, 22 56, 22 56 L 42 56 C 42 56, 38 46, 32 46 Z" fill="white" opacity="0.8" />
    </svg>
);

export const ExperienceIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Briefcase Body */}
        <rect x="6" y="16" width="52" height="40" rx="4" ry="4" fill="#8D6E63" />
        <rect x="6" y="16" width="52" height="12" fill="#5D4037" />
        {/* Handle */}
        <path d="M22,16 L22,8 C22,6 24,4 26,4 L38,4 C40,4 42,6 42,8 L42,16" fill="none" stroke="#3E2723" strokeWidth="4" />
        {/* Buckles */}
        <rect x="10" y="24" width="6" height="8" fill="#FFC107" />
        <rect x="48" y="24" width="6" height="8" fill="#FFC107" />
        {/* Document Stickout */}
        <rect x="14" y="12" width="36" height="4" fill="white" />
    </svg>
);

export const ProjectsIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Base */}
        <rect x="8" y="8" width="48" height="48" rx="8" fill="#5E35B1" />
        {/* Code Brackets */}
        <path d="M24 24 L16 32 L24 40" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 24 L48 32 L40 40" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 20 L30 44" stroke="#B39DDB" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
);

export const SkillsIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Monitor Frame */}
        <rect x="4" y="8" width="56" height="36" rx="4" fill="#37474F" />
        {/* Screen */}
        <rect x="8" y="12" width="48" height="28" fill="#263238" />
        {/* Stand */}
        <rect x="28" y="44" width="8" height="8" fill="#546E7A" />
        <path d="M20 52 L44 52 L46 56 L18 56 Z" fill="#546E7A" />
        {/* Code Lines */}
        <rect x="12" y="16" width="20" height="2" fill="#00E676" />
        <rect x="12" y="20" width="30" height="2" fill="#0277BD" />
        <rect x="12" y="24" width="24" height="2" fill="#E91E63" />
        {/* Graph */}
        <path d="M36 32 L40 24 L44 28 L48 18 L52 24" fill="none" stroke="#FFC107" strokeWidth="2" />
    </svg>
);

export const EducationIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Book Cover */}
        <rect x="10" y="8" width="44" height="48" rx="2" fill="#D32F2F" />
        {/* Pages */}
        <rect x="14" y="12" width="36" height="40" fill="white" />
        {/* Text Lines */}
        <rect x="18" y="18" width="28" height="2" fill="#BDBDBD" />
        <rect x="18" y="24" width="28" height="2" fill="#BDBDBD" />
        <rect x="18" y="30" width="28" height="2" fill="#BDBDBD" />
        <rect x="18" y="36" width="20" height="2" fill="#BDBDBD" />
        {/* Bookmark */}
        <path d="M40 8 L40 24 L44 20 L48 24 L48 8 Z" fill="#FFC107" />
    </svg>
);

export const AwardsIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Ribbon Back */}
        <path d="M24 40 L24 60 L32 54 L40 60 L40 40" fill="#C62828" />
        {/* Medal */}
        <circle cx="32" cy="24" r="20" fill="#FFD700" />
        <circle cx="32" cy="24" r="16" fill="#FFC107" />
        {/* Star */}
        <path d="M32 12 L35 20 L44 20 L37 26 L40 34 L32 29 L24 34 L27 26 L20 20 L29 20 Z" fill="#FFF9C4" />
    </svg>
);

export const ContactIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Envelope Body */}
        <rect x="4" y="12" width="56" height="40" rx="4" fill="#E0E0E0" />
        {/* Flap */}
        <path d="M4 12 L32 36 L60 12" fill="#BDBDBD" />
        <path d="M4 12 L32 36 L60 12" fill="none" stroke="#9E9E9E" strokeWidth="1" />
        {/* @ Symbol stamp */}
        <circle cx="32" cy="36" r="10" fill="#2196F3" />
        <text x="32" y="40" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">@</text>
    </svg>
);

export const TerminalIcon = ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Terminal Window */}
        <rect x="4" y="8" width="56" height="48" rx="4" fill="#212121" />
        {/* Header Bar */}
        <path d="M4 8 C4 5.791 5.791 4 8 4 L56 4 C58.209 4 60 5.791 60 8 L60 16 L4 16 L4 8 Z" fill="#424242" transform="translate(0, 4)" />
        {/* Prompt */}
        <text x="10" y="32" fill="#4CAF50" fontSize="16" fontFamily="monospace" fontWeight="bold">&gt;</text>
        <rect x="24" y="20" width="12" height="4" fill="white" opacity="0.8" />
    </svg>
);
